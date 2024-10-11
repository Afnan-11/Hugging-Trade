import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

type MetricsOverviewChartProps = {
  monthlyData: any[]; // Replace 'any' with a more specific type if available
};

export function MetricsOverviewChart({monthlyData}: MetricsOverviewChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={monthlyData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="total"
              fill="#adfa1d"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
