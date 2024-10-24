"use client";
import {useState, useEffect, ReactNode} from "react";
import NotAuthorized from "@/components/not-authorized";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import {ProfitShareOverlay} from "./_components/profit-share-overlay";
import {useDashboardAuth} from "./hooks/useDashboardAuth";
import {Skeleton} from "@/components/ui/skeleton";
import {SourceModal} from "./_components/source-modal";

export default function DashboardLayout({children}: {children: ReactNode}) {
  const {authorized, user, lastPaymentRequest, message, isLoading} = useDashboardAuth();
  const [showSourceModal, setShowSourceModal] = useState(false);

  useEffect(() => {
    if (user && user?.source === null) {
      setShowSourceModal(true);
    }
  }, [user]);

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
      <SourceModal
        showSourceModal={showSourceModal}
        setShowSourceModal={setShowSourceModal}
      />
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
