import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const {userId, email, priceId, subscription, tolt_referral, amount} = await req.json();

  if (subscription) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        currency: "usd",
        line_items: [{price: priceId, quantity: 1}],
        metadata: {userId, email, subscription, tolt_referral},
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        allow_promotion_codes: true,
      });

      return NextResponse.json({sessionId: session.id});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({error: "Failed to create checkout session"});
    }
  } else {
    // One-time payment
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
          userId: userId,
        },
        line_items: [
          {
            price_data: {
              currency: "usd", // Set your currency
              product_data: {
                name: "Profit Share", // Product name
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/dashboard`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      return NextResponse.json({sessionId: session.id});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json({error: "Failed to create checkout session"});
    }
  }
}
