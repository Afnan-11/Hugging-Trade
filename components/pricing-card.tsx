"use client";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import React, {useEffect, useState} from "react";
import {Button} from "./ui/button";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {Spinner} from "./ui/spinner";
type PricingCardProps = {
  user: any;
  priceIdMonthly: any;
  priceIdYearly: any;
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

export const PricingCard = ({
  user,
  isYearly,
  title,
  priceIdMonthly,
  priceIdYearly,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      setIsLoading(true);
      const {data} = await axios.post(`/api/payments/create-checkout-session`, {
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        priceId,
        subscription,
        tolt_referral: typeof window !== "undefined" && "tolt_referral" in window ? (window as any).tolt_referral : "",
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
      setIsLoading(false);
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
          {isYearly && yearlyPrice && monthlyPrice ? (
            <div className="flex justify-between">
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">{title}</CardTitle>
              <div
                className={cn(
                  "h-fit rounded-xl bg-zinc-200 px-2.5 py-1 text-sm text-black dark:bg-zinc-800 dark:text-white",
                  {
                    "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black": popular,
                  },
                )}
              >
                Save ${monthlyPrice * 12 - yearlyPrice}
              </div>
            </div>
          ) : (
            <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">{title}</CardTitle>
          )}
          <div className="flex gap-0.5">
            <h2 className="text-3xl font-bold">
              {yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : "Custom"}
            </h2>
            <span className="mb-1 flex flex-col justify-end text-sm">
              {yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}
            </span>
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
          disabled={isLoading}
          onClick={() => {
            if (user?.id) {
              handleCheckout(isYearly ? priceIdYearly : priceIdMonthly, true);
            } else {
              router.push("/sign-in");
              toast("Please login or sign up to purchase", {
                description: "You must be logged in to make a purchase",
                action: {
                  label: "Sign In",
                  onClick: () => {
                    router.push("/sign-in");
                  },
                },
              });
            }
          }}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black"
          type="button"
        >
          <div className="fr om-[#c7d2fe] absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b to-[#8678f9] opacity-75 blur" />
          {isLoading ? <Spinner /> : actionLabel}
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
