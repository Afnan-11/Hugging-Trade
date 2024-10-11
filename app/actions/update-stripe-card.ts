"use server";
import {Stripe} from "stripe";
import {NextResponse} from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function updateStripeCard({
  customerId,
  subscriptionId,
  userId,
}: {
  customerId: string;
  subscriptionId: string;
  userId: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customerId,
      setup_intent_data: {
        metadata: {
          customer_id: customerId,
          subscription_id: subscriptionId,
          user_id: userId,
        },
      },
      success_url: `${process.env.FRONTEND_URL}/dashboard/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    return session.id;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
}
