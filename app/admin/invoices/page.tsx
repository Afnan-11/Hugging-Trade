import InvoicesTable from "../_components/invoices-table";

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Invoices</h1>
      <InvoicesTable />
    </div>
  );
}
