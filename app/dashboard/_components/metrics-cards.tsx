import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DollarSignIcon, TrendingUpIcon, CalendarIcon, HistoryIcon, BarChartIcon, ActivityIcon} from "lucide-react";

type MetricsCardsProps = {
  metrics: any; // Replace 'any' with a more specific type if available
};
type MonthlyAnalytics = {
  date: string;
  profit: number;
};

function getMonthlyProfits(monthlyAnalytics: MonthlyAnalytics[]) {
  if (!monthlyAnalytics || monthlyAnalytics?.length === 0)
    return {
      currentMonthProfit: "Not available",
      previousMonthProfit: "Not available",
      currentMonth: "Not available",
      previousMonth: "Not available",
    };
  // Get current date
  const currentDate = new Date();

  // Format current month
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

  // Calculate previous month
  const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const previousMonth = `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, "0")}`;

  // Sort the analytics by date in descending order
  const sortedAnalytics = monthlyAnalytics?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Find the current month's data
  const currentMonthData = sortedAnalytics.find((item) => item.date === currentMonth);
  const previousMonthData = sortedAnalytics.find((item) => item.date === previousMonth);

  return {
    currentMonthProfit: currentMonthData ? currentMonthData.profit : "Not available",
    previousMonthProfit: previousMonthData ? previousMonthData.profit : "Not available",
    currentMonth,
    previousMonth,
  };
}

export function MetricsCards({metrics}: MetricsCardsProps) {
  const monthlyProfits = getMonthlyProfits(metrics.monthlyAnalytics);

  return (
    <div className="grid flex-1 gap-4 md:grid-cols-4">
      <MetricCard
        title="Current Balance"
        value={`${metrics?.balance?.toLocaleString()}$`}
        description={`${metrics?.absoluteGain ? metrics?.absoluteGain?.toFixed(2) : "Pending"}% from opening account`}
        icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Total Profit"
        value={`${metrics?.profit?.toLocaleString()}$`}
        description={`${metrics?.monthlyGain ? metrics?.monthlyGain?.toFixed(2) : "Pending"}% monthly gain`}
        icon={<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="This Month’s Profit"
        value={`${metrics?.paymentRequests?.thisMonthPaymentRequest.payment_status === "pending" ? "Pending" : metrics?.paymentRequests?.thisMonthPaymentRequest?.profit_end - metrics?.paymentRequests?.thisMonthPaymentRequest?.profit_start + "$"}`}
        description={`${new Date(metrics?.paymentRequests?.thisMonthPaymentRequest?.month_start).toLocaleDateString("en-US", {month: "long", day: "numeric"})} - ${new Date(metrics?.paymentRequests?.thisMonthPaymentRequest?.month_end).toLocaleDateString("en-US", {month: "long", day: "numeric"})}`}
        icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Profit Amount Due"
        value={`${metrics?.paymentRequests?.thisMonthPaymentRequest.payment_status == "pending" ? "Pending" : metrics?.paymentRequests?.thisMonthPaymentRequest?.owed_amount + "$"}`}
        description={`${new Date(metrics?.paymentRequests?.thisMonthPaymentRequest?.month_start).toLocaleDateString("en-US", {month: "long", day: "numeric"})} - ${new Date(metrics?.paymentRequests?.thisMonthPaymentRequest?.month_end).toLocaleDateString("en-US", {month: "long", day: "numeric"})}`}
        icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// ... Include the getMonthlyProfits function here
