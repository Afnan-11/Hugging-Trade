"use client";

import React, {useMemo} from "react";
import {Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartContainer, ChartTooltip} from "@/components/ui/chart";

type UserSourceChartProps = {
  users: any[];
};

export default function UserSourceChart({users}: UserSourceChartProps = {users: []}) {
  const platformColors: Record<string, string> = {
    instagram: "#E1306C",
    facebook: "#1877F2",
    x: "#000000",
    linkedin: "#0A66C2",
    tiktok: "#000000",
    youtube: "#FF0000",
    google: "#4285F4",
    email: "#D44638",
    // Add more platform colors as needed
  };

  const chartData = useMemo(() => {
    const sourceCount: Record<string, number> = {};

    // Count users for each source
    users.forEach((user) => {
      const source = user.source?.toLowerCase(); // Normalize source names
      if (source) {
        sourceCount[source] = (sourceCount[source] || 0) + 1;
      }
    });

    // Convert the sourceCount object to the format expected by the chart
    return Object.entries(sourceCount)
      .map(([source, count]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1), // Capitalize first letter
        value: count,
        color: platformColors[source.toLowerCase()] || "hsl(var(--chart-1))", // Use platform color or default
      }))
      .sort((a, b) => b.value - a.value); // Sort by value in descending order
  }, [users]);

  // Create a configuration object for ChartContainer
  const chartConfig = useMemo(() => {
    return chartData.reduce(
      (acc, item) => {
        acc[item.name] = {color: item.color};
        return acc;
      },
      {} as Record<string, {color: string}>,
    );
  }, [chartData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{top: 20, right: 30, left: 20, bottom: 5}}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                type="category"
                tickFormatter={(value) => `${value} (${chartData.find((item) => item.name === value)?.value || 0})`}
              />
              <YAxis
                type="number"
                hide
              />
              <ChartTooltip
                content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-md border border-border bg-background p-2 shadow-md">
                        <p className="font-semibold">{data.name}</p>
                        <p>Users: {data.value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
