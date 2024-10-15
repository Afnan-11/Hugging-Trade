"use client";

import React, {useState, useEffect} from "react";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import axios from "axios";
import {toast} from "sonner";
import {N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE} from "@/utils/constants";
import {LastPaymentRequest} from "@/types/payment";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertTriangle, CreditCard, Info} from "lucide-react";
import {MonthProgress} from "@/app/dashboard/_components/month-progress";
import {ProfitShareHistoryTable} from "./profit-share-history-table";

interface PaymentSectionProps {
  user: any;
  lastPaymentRequest: LastPaymentRequest;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({user, lastPaymentRequest}) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  return (
    <div className="">
      <h1 className="pb-4 text-2xl font-bold tracking-tight text-accent md:text-3xl lg:text-4xl">
        Profit Share Summary
      </h1>
      <div className={`mb-8 grid gap-8 ${lastPaymentRequest.payment_status !== "pending" ? "md:grid-cols-2" : ""}`}>
        <MonthProgress
          monthStart={lastPaymentRequest.month_start}
          monthEnd={lastPaymentRequest.month_end}
          owedAmount={lastPaymentRequest.owed_amount}
          profit={
            lastPaymentRequest.profit_end !== null ? lastPaymentRequest.profit_end - lastPaymentRequest.profit_start : 0
          }
          status={lastPaymentRequest.payment_status}
        />
        {lastPaymentRequest.payment_status !== "pending" && (
          <div className="flex flex-col justify-between gap-8">
            <PaymentDetailsCard
              lastPaymentRequest={lastPaymentRequest}
              user={user}
              stripePromise={stripePromise}
            />
            <AdditionalInfoCard />
          </div>
        )}
      </div>
      <ProfitShareHistoryTable userId={user.user_id} />
    </div>
  );
};

export default PaymentSection;

interface PaymentDetailsCardProps {
  lastPaymentRequest: LastPaymentRequest;
  user: any;
  stripePromise: Promise<Stripe | null> | null;
}

const PaymentDetailsCard: React.FC<PaymentDetailsCardProps> = ({lastPaymentRequest, user, stripePromise}) => {
  const status = lastPaymentRequest.payment_status;

  const handleCheckout = async () => {
    try {
      const {data} = await axios.post(`/api/payments/create-checkout-session`, {
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        subscription: false,
        amount: lastPaymentRequest.owed_amount! * 100,
      });

      if (data.sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
        return response;
      } else {
        console.error("Failed to create checkout session");
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
    }
  };

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Status:</span>
            {status && (
              <span
                className={`font-semibold ${status === "overdue" || status === "frozen" ? "text-destructive" : "text-primary"}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span>Due Date:</span>
            <span className="font-semibold">
              {new Date(
                lastPaymentRequest.month_end.getTime() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE * 24 * 60 * 60 * 1000,
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-semibold">Credit Card</span>
          </div>
        </div>
        <Button
          onClick={handleCheckout}
          className="w-full"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Now
        </Button>
      </CardContent>
    </Card>
  );
};

const AdditionalInfoCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">Additional Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-sm">
      <p className="flex items-start">
        <Info className="mr-2 h-4 w-4 flex-shrink-0" />
        Your profit share payment is calculated based on the total profit generated during the subscription cycle.
      </p>
      <p className="flex items-start">
        <Info className="mr-2 h-4 w-4 flex-shrink-0" />
        The owed amount is a percentage of the profit as agreed in your contract.
      </p>
      <p className="flex items-start">
        <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 text-yellow-500" />
        Failure to pay within {N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE} days after the cycle end may result in account
        suspension.
      </p>
    </CardContent>
  </Card>
);
