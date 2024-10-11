import PaymentRequestsTable from "../_components/payment-requests-table";

export default function PaymentRequestsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Payment Requests</h1>
      <PaymentRequestsTable />
    </div>
  );
}
