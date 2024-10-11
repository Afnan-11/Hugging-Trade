"use client";

import {Button} from "@/components/ui/button";
import {useRouter, usePathname} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useState, useEffect} from "react";
import {MonthProgress} from "./month-progress";
import {LastPaymentRequest} from "@/types/payment";

export function ProfitShareOverlay({
  status,
  lastPaymentRequest,
}: {
  status: string | null; // "ondue" | "overdue" | "frozen" | "paid";
  lastPaymentRequest: LastPaymentRequest;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(pathname !== "/dashboard/payment/profit-share");
  }, [pathname]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (status === "overdue" || status === "frozen") {
          router.push("/dashboard/payment/profit-share");
        } else setIsOpen(false);
      }}
    >
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Profit Share Payment Required</DialogTitle>
          <DialogDescription>Your payment for the current cycle is {status}.</DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <MonthProgress
            monthStart={lastPaymentRequest.month_start}
            monthEnd={lastPaymentRequest.month_end}
            owedAmount={lastPaymentRequest.owed_amount}
            profit={
              lastPaymentRequest.profit_end !== null
                ? lastPaymentRequest.profit_end - lastPaymentRequest.profit_start
                : 0
            }
            status={status}
            compact
          />
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard/payment/profit-share");
            }}
            className="w-full"
          >
            Go to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
