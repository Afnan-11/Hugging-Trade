"use client";

import {redirect} from "next/navigation";
import prisma from "@/lib/db";
import PageWrapper from "@/components/wrapper/page-wrapper";
import PaymentSection from "./payment-section";
import {isAuthorized} from "@/app/actions/isAuthorized";
import {getUserWithLastPaymentRequest} from "@/app/actions/paymentRequests";
import NotAuthorized from "@/components/not-authorized";
import {useDashboardAuth} from "@/app/dashboard/hooks/useDashboardAuth";

export default function PaymentPage() {
  const {authorized, user, lastPaymentRequest, message, isLoading} = useDashboardAuth();

  if (!lastPaymentRequest) {
    redirect("/dashboard");
  }

  return (
    <PaymentSection
      user={user}
      lastPaymentRequest={lastPaymentRequest}
    />
  );
}
