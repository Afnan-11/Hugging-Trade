"use client";

import {useState, useMemo} from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

const formatCurrency = (value: number) => `${value?.toLocaleString?.()}$`;

const calculateCumulativeProfit = (data: any[]) => {
  let cumulativeProfit = 0;
  if (!data) return [];
  return data.map((item) => {
    if (item.profit !== undefined) {
      cumulativeProfit += item.profit;
    }
    return {...item, cumulativeProfit};
  });
};

const calculateAnnualData = (monthlyData: any[]) => {
  if (!monthlyData) return [];
  const annualData = monthlyData.reduce((acc, month) => {
    const year = new Date(month.date).getFullYear();
    const existingYear = acc.find((item: any) => item.year === year);
    if (existingYear) {
      existingYear.profit += month.profit;
    } else {
      acc.push({year, date: `${year}`, profit: month.profit});
    }
    return acc;
  }, []);
  return calculateCumulativeProfit(annualData);
};

const calculateYAxisDomain = (data: {cumulativeProfit: number}[]) => {
  const maxProfit = Math.max(...data.map((item) => item.cumulativeProfit));
  console.log("data", data);
  let yMax: number;
  let tickCount: number;

  if (!maxProfit) {
    yMax = 100;
    tickCount = 100;
  } else if (maxProfit < 1000) {
    yMax = Math.ceil(maxProfit / 500) * 500;
    tickCount = yMax / 500;
  } else if (maxProfit < 10000) {
    yMax = Math.ceil(maxProfit / 1000) * 1000;
    tickCount = yMax / 1000;
  } else {
    yMax = Math.ceil(maxProfit / 5000) * 5000;
    tickCount = yMax / 5000;
  }

  tickCount = Math.max(5, Math.min(10, tickCount));

  return {yMax, tickCount};
};

export function MetricsMonthlyDailyChart({monthlyAnalytics, dailyGrowth}: {monthlyAnalytics: any; dailyGrowth: any}) {
  const [view, setView] = useState("daily");

  const cumulativeMonthlyData = useMemo(() => calculateCumulativeProfit(monthlyAnalytics), [monthlyAnalytics]);
  const cumulativeDailyData = useMemo(() => calculateCumulativeProfit(dailyGrowth), [dailyGrowth]);
  const cumulativeAnnualData = useMemo(() => calculateAnnualData(monthlyAnalytics), [monthlyAnalytics]);

  const data = useMemo(() => {
    switch (view) {
      case "monthly":
        return cumulativeMonthlyData;
      case "annual":
        return cumulativeAnnualData;
      default:
        return cumulativeDailyData;
    }
  }, [view, cumulativeDailyData, cumulativeMonthlyData, cumulativeAnnualData]);

  const {yMax, tickCount} = useMemo(() => calculateYAxisDomain(data), [data]);
  console.log({yMax, tickCount});
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-2xl font-bold">Cumulative Profit Analytics</CardTitle>
          <Tabs
            value={view}
            onValueChange={setView}
          >
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart
            data={data}
            // margin={{top: 5, right: 5, left: 5, bottom: 5}}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--muted))"
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              tick={{fill: "hsl(var(--foreground) / 0.5)", fontSize: 14}}
            />
            <YAxis
              tick={{fill: "hsl(var(--foreground))"}}
              stroke="hsl(var(--foreground))"
              tickFormatter={formatCurrency}
              width={80}
              tickMargin={5}
              domain={[0, yMax]}
              tickCount={tickCount}
            />
            <Tooltip content={<CustomTooltip view={view} />} />
            <Legend className="mt-10" />
            <Line
              type="monotone"
              dataKey="cumulativeProfit"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={false}
              activeDot={{r: 8, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))"}}
              name="Cumulative Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({active, payload, label, view}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background p-4 shadow-lg">
        <p className="font-semibold text-foreground">{`${view === "annual" ? "Year" : "Date"}: ${label}`}</p>
        <p className="text-primary">{`Cumulative Profit: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};
