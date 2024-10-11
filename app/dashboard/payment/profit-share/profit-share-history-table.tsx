import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useQuery} from "@tanstack/react-query";
import {getProfitShareHistory} from "@/app/actions/payments/getProfitShareHistory";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export const ProfitShareHistoryTable = ({userId}: {userId: string}) => {
  const {
    data: profitShareHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profitShareHistory", userId],
    queryFn: () => getProfitShareHistory(userId),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "overdue":
        return "text-destructive";
      default:
        return "text-gray-500";
    }
  };

  if (isLoading)
    return (
      <div className="flex-1 animate-pulse">
        <div className="mb-4 h-8 w-full rounded bg-gray-200"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex w-full space-x-4"
            >
              <div className="h-6 w-1/5 rounded bg-gray-200"></div>
              <div className="h-6 w-1/5 rounded bg-gray-200"></div>
              <div className="h-6 w-1/5 rounded bg-gray-200"></div>
              <div className="h-6 w-1/5 rounded bg-gray-200"></div>
              <div className="h-6 w-1/5 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error) return <div className="mt-8">Error: {error.message}</div>;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Profit History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full overflow-auto">
          <TableCaption>A list of your monthly profit history</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableHead>Day Start</TableHead>
              <TableHead>Day End</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Profit Due</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profitShareHistory?.map((payment: any) => (
              <TableRow key={payment.id}>
                <TableCell>{payment?.month_start?.toLocaleDateString()}</TableCell>
                <TableCell>{payment?.month_end?.toLocaleDateString()}</TableCell>
                <TableCell>${(payment?.profit_end - payment?.profit_start).toFixed(2)}</TableCell>
                <TableCell>${payment?.owed_amount?.toFixed(2)}</TableCell>
                <TableCell className={`font-semibold ${getStatusColor(payment?.payment_status)}`}>
                  {payment?.payment_status?.charAt(0).toUpperCase() + payment?.payment_status?.slice(1)}
                </TableCell>
                <TableCell>{payment?.paid_at?.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
