"use client";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
type PricingCardProps = {
  user: any;
  priceId: any;
  price: number;
  isYearly?: boolean;
  title: string;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

export const PricingCardProfitShare = ({
  user,
  title,
  priceId,
  price,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const router = useRouter();

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async () => {
    try {
      const {data} = await axios.post(`/api/payments/create-checkout-session`, {
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        priceId,
        subscription: false,
        amount: price * 100,
      });

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response;
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Error during checkout");
      return;
    }
  };
  return (
    <Card
      className={cn(
        `flex w-72 flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
            exclusive,
        },
      )}
    >
      <div>
        <CardHeader className="pb-8 pt-4">
          <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">{title}</CardTitle>
          <div className="flex gap-0.5">
            <h2 className="text-3xl font-bold">{price ? `$${price}` : "Custom"}</h2>
            <span className="mb-1 flex flex-col justify-end text-sm">{price ? "/month" : null}</span>
          </div>
          <CardDescription className="h-12 pt-1.5">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {features.map((feature: string) => (
            <CheckItem
              key={feature}
              text={feature}
            />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button
          onClick={() => {
            if (user?.id) {
              handleCheckout();
            } else {
              toast("Please login or sign up to purchase", {
                description: "You must be logged in to make a purchase",
                action: {
                  label: "Sign Up",
                  onClick: () => {
                    router.push("/sign-up");
                  },
                },
              });
            }
          }}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black"
          type="button"
        >
          <div className="fr om-[#c7d2fe] absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
const CheckItem = ({text}: {text: string}) => (
  <div className="flex gap-2">
    <CheckCircle2
      size={18}
      className="my-auto text-green-400"
    />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);
