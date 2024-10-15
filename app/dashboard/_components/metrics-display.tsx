"use client";

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {MetricsCards} from "./metrics-cards";
import {MetricsMonthlyDailyChart} from "./metrics-monthly-daily-chart";
import {useUser} from "@clerk/nextjs";
import {ProfitShareHistoryTable} from "@/app/dashboard/payment/profit-share/profit-share-history-table";
import {DashboardSkeleton} from "../layout";

import {AlertCircle, RefreshCcw, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type MetricsData = any;

const fetchMetrics = async (): Promise<MetricsData> => {
  const response = await axios.get("/api/metaapi/metrics");
  return response.data;
};

export function MetricsDisplay() {
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
  });
  const {user} = useUser();

  const firstName = user?.firstName;

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <Error />;
  if (!metrics) return null;

  return (
    <>
      <h1 className="pb-4 text-2xl font-bold tracking-tight text-accent md:text-3xl lg:text-4xl">
        Welcome {firstName}
      </h1>
      <div className="mt-6 flex-1 space-y-4">
        <MetricsCards metrics={metrics} />
        <div className="flex flex-col gap-4 lg:flex-row">
          <MetricsMonthlyDailyChart
            monthlyAnalytics={metrics?.monthlyAnalytics}
            dailyGrowth={metrics?.dailyGrowth}
          />
          <ProfitShareHistoryTable userId={user?.id!} />
        </div>

        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <MetricsOverviewChart monthlyData={metrics.monthlyData} />
        </div> */}
      </div>
    </>
  );
}

export default function Error() {
  const openBeaconChat = () => {
    if (typeof window !== "undefined" && "Beacon" in window) {
      (window as any).Beacon("open");
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connection Delay</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account's connection with your broker is taking longer than usual.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-sm text-gray-500">
            Please try again later. If the issue persists beyond 30 minutes, kindly contact our support team for
            assistance.
          </p>
          <div className="flex flex-col space-y-4">
            <Button
              className="w-full"
              onClick={openBeaconChat}
            >
              <span className="flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4" />
                Chat With Support
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
