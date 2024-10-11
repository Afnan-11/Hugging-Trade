"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useUser} from "@clerk/nextjs";
import {Skeleton} from "@/components/ui/skeleton";
import {Stripe} from "@stripe/stripe-js";
import {toast} from "sonner";
import axios from "axios";
import {updateStripeCard} from "@/app/actions/update-stripe-card";
import {useUserWithSubscription} from "@/app/dashboard/hooks/useAuthQueries";

export function UpdateStripeCard() {
  const {user, isLoaded: isUserLoaded} = useUser();
  const {data: userData, isLoading: isUserDataLoading} = useUserWithSubscription(user?.id ?? "");
  const [isUpdating, setIsUpdating] = useState(false);

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const router = useRouter();

  console.log(userData);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async () => {
    if (!userData?.subscription?.stripe_user_id || !userData?.subscription?.subscription_id || !user?.id) {
      toast.error("Customer ID or Subscription ID is not set");
      return;
    }
    try {
      setIsUpdating(true);
      const sessionId = await updateStripeCard({
        customerId: userData.subscription.stripe_user_id,
        subscriptionId: userData.subscription.subscription_id,
        userId: user.id,
      });

      if (sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({
          sessionId: sessionId,
        });
        return response;
      } else {
        console.error("Failed to create checkout session");
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Update Card Information</CardTitle>
        <CardDescription className="text-center">Securely update your card information through Stripe.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Click the button below to proceed to the secure Stripe payment page.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleCheckout();
          }}
          disabled={isUpdating}
          className="w-full"
        >
          {isUpdating ? "Processing..." : "Update Card Information"}
        </Button>
      </CardFooter>
    </Card>
  );
}
