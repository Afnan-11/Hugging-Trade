"use client";
import React, {useMemo, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface PaymentRequest {
  id: number;
  created_time: string;
  user_id: number;
  month_start: string;
  month_end: string;
  profit_start: number;
  profit_end: number | null;
  owed_amount: number | null;
  payment_status: string | null;
  user: {
    user_id: number;
  };
}

const fetchPaymentRequests = async (): Promise<PaymentRequest[]> => {
  const response = await axios.get("/api/payment-requests");
  return response.data;
};

export default function PaymentRequestsTable() {
  const [filter, setFilter] = useState("");

  const {
    data: paymentRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentRequests"],
    queryFn: fetchPaymentRequests,
  });

  const filteredPaymentRequests = useMemo(() => {
    return paymentRequests?.filter((request) =>
      [request.user_id.toString(), request.payment_status, request.user.user_id]
        .join(" ")
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );
  }, [paymentRequests, filter]);

  if (isLoading) return <p>Loading payment requests...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter payment requests..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>

            <TableHead>Month Start</TableHead>
            <TableHead>Month End</TableHead>
            <TableHead>Profit Start</TableHead>
            <TableHead>Profit End</TableHead>
            <TableHead>Owed Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPaymentRequests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request?.user?.user_id}</TableCell>
              <TableCell>{new Date(request.month_start).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(request.month_end).toLocaleDateString()}</TableCell>
              <TableCell>${request.profit_start.toFixed(2)}</TableCell>
              <TableCell>{request.profit_end ? `$${request.profit_end.toFixed(2)}` : "-"}</TableCell>
              <TableCell>{request.owed_amount ? `$${request.owed_amount.toFixed(2)}` : "-"}</TableCell>
              <TableCell>
                <span className={`font-semibold ${getStatusColor(request.payment_status)}`}>
                  {request.payment_status
                    ? request.payment_status.charAt(0).toUpperCase() + request.payment_status.slice(1)
                    : "-"}
                </span>
              </TableCell>
              <TableCell>{new Date(request.created_time).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function getStatusColor(status: string | null): string {
  if (!status) return "text-gray-600 dark:text-gray-400";
  switch (status.toLowerCase()) {
    case "paid":
      return "text-green-600 dark:text-green-400";
    case "pending":
      return "text-yellow-600 dark:text-yellow-400";
    case "overdue":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}
