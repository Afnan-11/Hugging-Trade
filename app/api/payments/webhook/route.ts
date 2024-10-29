import {N_OF_DAYS_BEFORE_PAYMENT_REQUEST, STRATEGY_ID_MT4, STRATEGY_ID_MT5} from "@/utils/constants";
import {getUserWithLastPaymentRequest} from "@/app/actions/paymentRequests";
import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import {Knock} from "@knocklabs/node";
import {notifyUser, subscribeToStrategy} from "@/utils/functions";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const knock = new Knock(process.env.KNOCK_API_SECRET!);
export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const supabase: any = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
  const reqText = await req.text();
  return webhooksHandler(reqText, req, supabase);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted",
  supabase: ReturnType<typeof createServerClient>,
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData: any = {
    subscription_id: subscription.id,
    stripe_user_id: subscription.customer,
    status: subscription.status,
    start_date: new Date(subscription.created * 1000).toISOString(),
    plan_id: subscription.items.data[0]?.price.id,
    user_id: subscription.metadata?.userId || "",
    email: customerEmail,
  };

  let data, error;
  if (type === "deleted") {
    ({data, error} = await supabase
      .from("subscriptions")
      .update({status: "cancelled", email: customerEmail})
      .match({subscription_id: subscription.id})
      .select());
    if (!error) {
      const {error: userError} = await supabase.from("user").update({subscription: null}).eq("email", customerEmail);
      if (userError) {
        console.error("Error updating user subscription status:", userError);
        return NextResponse.json({
          status: 500,
          error: "Error updating user subscription status",
        });
      }
    }
  } else {
    let shouldCreate = type === "created";

    if (subscription.status == "trialing" && type === "updated") {
      // this because on trial we event.updated before event.created
      shouldCreate = true;
    } else if (subscription.status == "trialing" && type === "created") {
      if (!subscriptionData.user_id) delete subscriptionData.user_id;
      shouldCreate = false;
    }
    ({data, error} = await supabase
      .from("subscriptions")
      [shouldCreate ? "insert" : "update"](shouldCreate ? [subscriptionData] : subscriptionData)
      .match({subscription_id: subscription.id})
      .select());
    console.log("data", data);
  }

  if (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Subscription ${type} success`,
    data,
  });
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  status: "succeeded" | "failed",
  supabase: ReturnType<typeof createServerClient>,
) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerEmail = await getCustomerEmail(invoice.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const invoiceData = {
    invoice_id: invoice.id,
    subscription_id: invoice.subscription as string,
    amount_paid: status === "succeeded" ? invoice.amount_paid / 100 : undefined,
    amount_due: status === "failed" ? invoice.amount_due / 100 : undefined,
    currency: invoice.currency,
    status,
    user_id: invoice.metadata?.userId,
    email: customerEmail,
  };

  const {data, error} = await supabase.from("invoices").insert([invoiceData]);

  if (error) {
    console.error(`Error inserting invoice (payment ${status}):`, error);
    return NextResponse.json({
      status: 500,
      error: `Error inserting invoice (payment ${status})`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Invoice payment ${status}`,
    data,
  });
}

async function handleCheckoutSessionCompleted(event: Stripe.Event, supabase: ReturnType<typeof createServerClient>) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata: any = session?.metadata;

  if (session.mode === "setup") {
    const setupIntent = session.setup_intent as string;
    const setupIntentData = await stripe.setupIntents.retrieve(setupIntent);
    if (!setupIntentData.metadata) throw new Error("Setup intent metadata not found");
    if (!setupIntentData.payment_method) throw new Error("Payment method not found");

    const customer = await stripe.customers.update(setupIntentData.metadata.customer_id, {
      invoice_settings: {
        default_payment_method: setupIntentData.payment_method as string,
      },
    });

    try {
      await notifyUser({user_id: setupIntentData?.metadata?.user_id}, "credit-card-updated", {});
    } catch (error) {
      console.error("Error notifying user", error);
      return NextResponse.json({
        status: 500,
        error: "Error notifying user",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Default payment method updated successfully",
    });
  }

  if (metadata?.subscription === "true") {
    console.log("subscription");
    // This is for subscription payments
    const subscriptionId = session.subscription;
    try {
      await stripe.subscriptions.update(subscriptionId as string, {metadata});

      const {error: invoiceError} = await supabase
        .from("invoices")
        .update({user_id: metadata?.userId})
        .eq("email", metadata?.email);
      if (invoiceError) throw new Error("Error updating invoice");

      const {data: userData, error: userError} = await supabase
        .from("user")
        .update({subscription: session.id})
        .eq("user_id", metadata?.userId)
        .select()
        .single();
      if (userError) throw new Error("Error updating user subscription");

      await subscribeToStrategy(
        userData.metaapi_account_id as string,
        userData.user_id as string,
        userData.metaapi_platform === "mt5" ? STRATEGY_ID_MT5 : STRATEGY_ID_MT4,
      );

      return NextResponse.json({
        status: 200,
        message: "Subscription metadata updated successfully",
      });
    } catch (error) {
      console.error("Error updating subscription metadata:", error);
      return NextResponse.json({
        status: 500,
        error: "Error updating subscription metadata",
      });
    }
  } else {
    // This is for one-time payments
    console.log("one-time payment");
    try {
      const {data: lastPaymentRequest, error: userError} = await supabase
        .from("payment_requests")
        .select(
          `
        *,
        user:user_id (
          id,
          email,
          first_name,
          last_name,
          is_admin,
          metaapi_account_id,
          user_id,
          metaapi_platform
        )
      `,
        )
        .eq("user.id", metadata?.userId)
        .eq("user.is_admin", false)
        .limit(1)

        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        throw new Error("Error fetching user");
      }

      if (!lastPaymentRequest) throw new Error("Error fetching last payment request");

      const paymentData = {
        user_id: metadata?.userId,
        stripe_id: session.id,
        email: session.customer_details?.email,
        amount: session.amount_total! / 100,
        customer_details: JSON.stringify(session.customer_details),
        payment_intent: session.payment_intent,
        currency: session.currency,
      };

      const [
        {data: paymentsData, error: paymentsError},
        {error: paymentRequestError},
        {data: newPaymentRequest, error: newPaymentRequestError},
      ] = await Promise.all([
        supabase.from("payments").insert([paymentData]),
        supabase
          .from("payment_requests")
          .update({payment_status: "paid", paid_at: new Date()})
          .eq("id", lastPaymentRequest?.id as string),
        supabase.from("payment_requests").insert([
          {
            user_id: metadata?.userId,
            month_start: new Date(lastPaymentRequest.month_end as Date),
            month_end: new Date(
              new Date(lastPaymentRequest.month_end as Date).getTime() +
                N_OF_DAYS_BEFORE_PAYMENT_REQUEST * 24 * 60 * 60 * 1000,
            ),
            profit_start: lastPaymentRequest.profit_end as number,
          },
        ]),
      ]);

      if (paymentsError) throw new Error("Error inserting payment");
      if (paymentRequestError) throw new Error("Error updating payment request");
      if (newPaymentRequestError) throw new Error("Error creating new payment request");

      if (lastPaymentRequest.payment_status === "overdue") {
        console.log("re subscribe to strategy");
        // @ts-ignore
        const strategyId = lastPaymentRequest.user.metaapi_platform === "mt5" ? STRATEGY_ID_MT5 : STRATEGY_ID_MT4;
        // @ts-ignore
        await subscribeToStrategy(
          // @ts-ignore
          lastPaymentRequest.user.metaapi_account_id,
          // @ts-ignore
          lastPaymentRequest.user.user_id,
          strategyId,
        );
        console.log("re subscribed to strategy");
      }

      if (newPaymentRequestError) {
        console.error("Error creating new payment request:", newPaymentRequestError);
      }

      return NextResponse.json({
        status: 200,
        message: "Payment and payment request updated successfully",
        // updatedUser,
      });
    } catch (error) {
      console.error("Error handling checkout session:", error);
      return NextResponse.json({
        status: 500,
        error,
      });
    }
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest,
  supabase: ReturnType<typeof createServerClient>,
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(reqText, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("event", event.type);
    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created", supabase);
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated", supabase);
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted", supabase);
      case "invoice.payment_succeeded":
        return handleInvoiceEvent(event, "succeeded", supabase);
      case "invoice.payment_failed":
        return handleInvoiceEvent(event, "failed", supabase);
      case "checkout.session.completed":
        //@ts-ignore
        return handleCheckoutSessionCompleted(event, supabase);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}
