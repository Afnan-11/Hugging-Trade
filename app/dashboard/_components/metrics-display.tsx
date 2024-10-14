"use client";

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {MetricsCards} from "./metrics-cards";
import {MetricsMonthlyDailyChart} from "./metrics-monthly-daily-chart";
import {useUser} from "@clerk/nextjs";
import {ProfitShareHistoryTable} from "@/app/dashboard/payment/profit-share/profit-share-history-table";
import {DashboardSkeleton} from "../layout";

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
  if (error)
    return (
      <p className="">
        {`Your account's connection with your broker is taking longer than usual. Please try again later. If the issue
        persists beyond 30 minutes, kindly contact our support team for assistance.`}
      </p>
    );
  if (!metrics) return null;

  return (
    <>
      <h1 className="border-b py-4 text-3xl font-bold tracking-tight">Welcome {firstName}</h1>
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
