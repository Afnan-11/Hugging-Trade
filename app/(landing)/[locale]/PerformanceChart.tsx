"use client";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart, BarChart, Bar} from "recharts";
import {ChartConfig, ChartContainer, ChartTooltip} from "@/components/ui/chart";
import {chartData} from "./chartdata";
import {Button} from "@/components/ui/button";
import {useState} from "react";

const chartConfig = {
  sp500: {
    label: "S&P 500",
    color: "hsl(var(--chart-1))",
  },
  fund: {
    label: "Fund",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PerformanceChartArea() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1Y");

  const getFilteredData = () => {
    const now = new Date();
    const monthsToSubtract =
      selectedPeriod === "6M"
        ? 6
        : selectedPeriod === "1Y"
          ? 12
          : selectedPeriod === "3Y"
            ? 36
            : selectedPeriod === "5Y"
              ? 60
              : 0; // "All" case - return all data by using 0 months subtraction

    if (monthsToSubtract === 0) {
      return chartData;
    }

    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract);
    return chartData.filter((item) => new Date(item.date) >= cutoffDate);
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl px-2 font-medium">
      <div className="flex items-center justify-between">
        <div className="my-10 flex">
          <div className="mr-4 flex items-center">
            <div
              className="mr-1 h-2 w-2"
              style={{backgroundColor: chartConfig.fund.color}}
            />
            <span>Fund</span>
          </div>
          <div className="flex items-center">
            <div
              className="mr-1 h-2 w-2"
              style={{backgroundColor: chartConfig.sp500.color}}
            />
            <span>S&P 500</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={selectedPeriod === "6M" ? "default" : "outline"}
            className="h-8 w-8"
            onClick={() => setSelectedPeriod("6M")}
          >
            6M
          </Button>
          <Button
            variant={selectedPeriod === "1Y" ? "default" : "outline"}
            className="h-8 w-8"
            onClick={() => setSelectedPeriod("1Y")}
          >
            1Y
          </Button>
          <Button
            variant={selectedPeriod === "3Y" ? "default" : "outline"}
            className="h-8 w-8"
            onClick={() => setSelectedPeriod("3Y")}
          >
            3Y
          </Button>
          <Button
            variant={selectedPeriod === "5Y" ? "default" : "outline"}
            className="h-8 w-8"
            onClick={() => setSelectedPeriod("5Y")}
          >
            5Y
          </Button>
          <Button
            variant={selectedPeriod === "All" ? "default" : "outline"}
            className="h-8 w-8"
            onClick={() => setSelectedPeriod("All")}
          >
            All
          </Button>
        </div>
      </div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={getFilteredData()}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={Math.floor(getFilteredData().length / 6)}
            tickFormatter={(value) => value.slice(0, 3)}
            height={100}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <YAxis
            axisLine={false}
            tickMargin={8}
            width={30}
            domain={[(dataMin: number) => Math.max(0, dataMin), "auto"]}
            tickFormatter={(value) => `${value}%`}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <ChartTooltip
            cursor={{
              stroke: "hsl(var(--muted-background))",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
            content={({active, payload}) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload;
              const date = new Date(data.date);
              const year = date.getFullYear();
              return (
                <div className="space-y-1 rounded-lg bg-white p-2 shadow-lg">
                  <p className="font-medium">{`${data.month} ${year}`}</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-fund)]" />
                    Fund: {data.fund}%
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-sp500)]" />
                    S&P 500: {data.sp500}%
                  </div>
                </div>
              );
            }}
          />
          <Area
            dataKey="sp500"
            type="natural"
            fill="var(--color-sp500)"
            fillOpacity={0.4}
            stroke="var(--color-sp500)"
            stackId="a"
            dot={false}
            animationDuration={1000}
          />
          <Area
            dataKey="fund"
            type="natural"
            fill="var(--color-fund)"
            fillOpacity={0.4}
            stroke="var(--color-fund)"
            stackId="a"
            dot={false}
            animationDuration={1000}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export function PerformanceChartLine() {
  return (
    <div className="mx-auto mt-20 max-w-5xl px-2">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={Math.floor(chartData.length / 6)}
            tickFormatter={(value) => value.slice(0, 3)}
            height={100}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <YAxis
            axisLine={false}
            tickMargin={8}
            width={30}
            domain={[(dataMin: number) => Math.max(0, dataMin), "auto"]}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <ChartTooltip
            cursor={false}
            content={({active, payload}) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload;
              const date = new Date(data.date);
              const year = date.getFullYear();
              return (
                <div className="space-y-1 rounded-lg bg-white p-2 shadow-lg">
                  <p className="font-medium">{`${data.month} ${year}`}</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-fund)]" />
                    Fund: {data.fund}%
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-sp500)]" />
                    S&P 500: {data.sp500}%
                  </div>
                </div>
              );
            }}
          />
          <Line
            dataKey="sp500"
            type="linear"
            stroke="var(--color-sp500)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="3 3"
          />
          <Line
            dataKey="fund"
            type="linear"
            stroke="var(--color-fund)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export function PerformanceChartBar() {
  return (
    <div className="mx-auto mt-20 max-w-5xl px-2">
      <div className="mb-4 flex justify-center">
        <div className="mr-4 flex items-center">
          <div className="mr-1 h-2 w-2 bg-[var(--color-fund)]" />
          <span>Fund</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-2 w-2 bg-[var(--color-sp500)]" />
          <span>S&P 500</span>
        </div>
      </div>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={Math.floor(chartData.length / 6)}
            tickFormatter={(value) => value.slice(0, 3)}
            height={100}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <YAxis
            axisLine={false}
            tickMargin={8}
            width={30}
            domain={[(dataMin: number) => Math.max(0, dataMin), "auto"]}
            className="text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
          />
          <ChartTooltip
            cursor={false}
            content={({active, payload}) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload;
              const date = new Date(data.date);
              const year = date.getFullYear();
              return (
                <div className="space-y-1 rounded-lg bg-white p-2 shadow-lg">
                  <p className="font-medium">{`${data.month} ${year}`}</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-fund)]" />
                    Fund: {data.fund}%
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-[var(--color-sp500)]" />
                    S&P 500: {data.sp500}%
                  </div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="fund"
            fill="var(--color-fund)"
          />
          <Bar
            dataKey="sp500"
            fill="var(--color-sp500)"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
