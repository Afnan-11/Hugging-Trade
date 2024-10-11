"use client";
import React, {useMemo, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Invoice {
  id: number;
  created_time: string;
  invoice_id: string;
  subscription_id: string;
  amount_paid: string;
  amount_due: string | null;
  currency: string;
  status: string;
  email: string;
  user_id: string | null;
}

const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await axios.get("/api/invoices");
  return response.data;
};

export default function InvoicesTable() {
  const [filter, setFilter] = useState("");

  const {
    data: invoices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  const filteredInvoices = useMemo(() => {
    return invoices?.filter((invoice) =>
      [invoice.invoice_id, invoice.email, invoice.status].join(" ").toLowerCase().includes(filter.toLowerCase()),
    );
  }, [invoices, filter]);

  if (isLoading) return <p>Loading invoices...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter invoices..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Amount Due</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices?.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoice_id}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.amount_paid}</TableCell>
              <TableCell>{invoice.amount_due || "-"}</TableCell>
              <TableCell>{invoice.currency.toUpperCase()}</TableCell>
              <TableCell>
                <span className={`font-semibold ${getStatusColor(invoice.status)}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{new Date(invoice.created_time).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "paid":
      return "text-green-600 dark:text-green-400";
    case "pending":
      return "text-yellow-600 dark:text-yellow-400";
    case "failed":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}
