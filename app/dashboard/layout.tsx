"use client";
import NotAuthorized from "@/components/not-authorized";
import {ReactNode} from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import {ProfitShareOverlay} from "./_components/profit-share-overlay";
import {useDashboardAuth} from "./hooks/useDashboardAuth";
import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardLayout({children}: {children: ReactNode}) {
  const {authorized, user, lastPaymentRequest, message, isLoading} = useDashboardAuth();

  if (!authorized && !isLoading) {
    return <NotAuthorized />;
  }

  return (
    <>
      <DashboardTopNav />
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <DashboardSideBar />
        <main className="overflow-x-hidden p-4">{isLoading ? <DashboardSkeleton /> : children}</main>
        {lastPaymentRequest && lastPaymentRequest.payment_status !== "pending" && (
          <ProfitShareOverlay
            lastPaymentRequest={lastPaymentRequest}
            status={lastPaymentRequest.payment_status}
          />
        )}
      </div>
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-24 w-full"
          />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
