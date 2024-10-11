import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/admin/users">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>Manage user accounts</CardContent>
        </Card>
      </Link>
      <Link href="/admin/invoices">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>View and manage invoices</CardContent>
        </Card>
      </Link>
      <Link href="/admin/payment-requests">
        <Card>
          <CardHeader>
            <CardTitle>Payment Requests</CardTitle>
          </CardHeader>
          <CardContent>Handle payment requests</CardContent>
        </Card>
      </Link>
    </div>
  );
}
