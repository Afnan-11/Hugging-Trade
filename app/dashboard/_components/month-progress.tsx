"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {AlertTriangle, DollarSign, TrendingUp} from "lucide-react";
import {
  EXTRA_FEES_PERCENTAGE,
  N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN,
  N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE,
} from "@/utils/constants";

type MonthProgressProps = {
  monthStart: Date;
  monthEnd: Date;
  owedAmount: number | null;
  profit: number;
  status: string | null;
  compact?: boolean;
};

export function MonthProgress({monthStart, monthEnd, owedAmount, profit, status, compact = false}: MonthProgressProps) {
  const now = new Date(new Date().setDate(new Date().getDate()));
  const totalDays = Math.ceil((monthEnd.getTime() - monthStart.getTime()) / (1000 * 3600 * 24));
  const daysElapsed = Math.ceil((now.getTime() - monthStart.getTime()) / (1000 * 3600 * 24));
  const progress = Math.min((daysElapsed / totalDays) * 100, 100);

  const paymentDueDate = new Date(monthEnd.getTime() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE * 24 * 60 * 60 * 1000);
  const totalPaymentDays = N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE;
  const paymentDaysElapsed = Math.max(0, Math.ceil((now.getTime() - monthEnd.getTime()) / (1000 * 3600 * 24)));
  const paymentProgress = Math.min((paymentDaysElapsed / totalPaymentDays) * 100, 100);

  const frozenDate = new Date(monthEnd.getTime() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN * 24 * 60 * 60 * 1000);
  const totalFrozenDays = N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN;
  const frozenDaysElapsed = Math.max(0, Math.ceil((now.getTime() - paymentDueDate.getTime()) / (1000 * 3600 * 24)));
  const frozenProgress = Math.min((frozenDaysElapsed / totalFrozenDays) * 100, 100);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"});
  };

  return (
    <Card className={`w-full ${compact ? "mx-auto max-w-md border-0 shadow-none" : ""}`}>
      <CardHeader className={`mb-6 ${compact ? "p-0" : "p-6"}`}>
        <CardTitle className={`mb-4 ${compact ? "text-lg" : "text-xl"} font-semibold`}>Subscription Cycle</CardTitle>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-primary/10 p-6">
            <div className="mb-1 text-sm font-medium text-primary">Profit</div>
            <div className="flex items-center text-2xl font-bold text-chart-2">
              <TrendingUp className="mr-1 h-6 w-6" />${!status ? "Pending" : profit.toFixed(2)}
            </div>
          </div>
          <div className="rounded-lg bg-secondary/40 p-6">
            <div className="mb-1 text-sm font-medium">Owed Amount</div>
            <div className="flex items-center text-2xl font-bold">
              <DollarSign className="mr-1 h-6 w-6" />${!status ? "Pending" : owedAmount?.toFixed(2)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`space-y-6 ${compact ? "p-0" : "p-6"}`}>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium">
              <span>
                {formatDate(monthStart)} <br /> (Start)
              </span>
              <span className="-translate-x-1/4 text-center">
                {formatDate(monthEnd)}
                <br /> (End)
              </span>
              <span className="flex translate-x-1/4 items-center gap-1 text-center">
                {formatDate(paymentDueDate)} <br />
                (Due)
              </span>
              <span className="flex items-center gap-1 text-end">
                {formatDate(frozenDate)}
                <br /> (Freeze)
                {frozenDaysElapsed > totalFrozenDays && <AlertTriangle className="h-4 w-4 text-destructive" />}
              </span>
            </div>
            <div className="relative mt-2 flex">
              <div className="flex-1">
                <Progress
                  value={progress}
                  className="h-3 rounded-r-none border-r border-accent"
                  indicatorClassName={`bg-accent`}
                />
                <div className="text-center text-xs text-muted-foreground">Cycle</div>
              </div>
              <div className="flex-1">
                <Progress
                  value={paymentProgress}
                  className="h-3 rounded-l-none rounded-r-none border-r border-accent"
                  indicatorClassName={`bg-orange-500 `}
                />
                <div className="text-center text-xs text-muted-foreground">Payment Period</div>
              </div>
              <div className="flex-1">
                <Progress
                  value={frozenProgress}
                  className="h-3 rounded-l-none"
                  indicatorClassName="bg-destructive"
                />
                <div className="text-center text-xs text-muted-foreground">Frozen Period</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center font-semibold">
          {daysElapsed <= totalDays && (
            <span className="text-primary">
              Active: Day {daysElapsed} of {totalDays} (Ends {formatDate(monthEnd)})
            </span>
          )}
          {daysElapsed > totalDays && paymentDaysElapsed <= totalPaymentDays && (
            <span className="text-warning">
              Payment Due: {totalPaymentDays - paymentDaysElapsed} days left before extra fees (Due{" "}
              {formatDate(paymentDueDate)})
            </span>
          )}
          {paymentDaysElapsed > totalPaymentDays && frozenDaysElapsed <= totalFrozenDays && (
            <span className="text-destructive">
              Overdue: Account will be frozen in {totalFrozenDays - frozenDaysElapsed} days if payment is not received
              (Freeze date: {formatDate(frozenDate)})
            </span>
          )}
          {frozenDaysElapsed > totalFrozenDays && (
            <span className="text-destructive">
              Frozen: Account is frozen as of {formatDate(frozenDate)}. Please make a payment to continue using our
              trading strategy
            </span>
          )}
        </div>
        <div className="space-y-2 rounded-lg bg-muted p-4 text-sm md:p-6">
          <p className="flex items-center">
            <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-accent"></span>
            Profit share payment due within {N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN} days after month end
          </p>
          <p className="flex items-center">
            <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
            Account frozen if payment not received after {N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN} days
          </p>
          <p className="flex items-center">
            <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-destructive"></span>
            {`${N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE} day period to make payment (if not ${EXTRA_FEES_PERCENTAGE * 100}% is added to the payment)`}
          </p>
          <p className="flex items-center">
            <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-destructive"></span>
            {`${N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN} day period to transfer, if not account disconnected from trading strategy`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
