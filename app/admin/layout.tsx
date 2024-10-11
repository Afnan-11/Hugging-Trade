import {ReactNode} from "react";
import DashboardSideBar from "../dashboard/_components/dashboard-side-bar";
import DashboardTopNav from "../dashboard/_components/dashbord-top-nav";
import {AdminAuthWrapper} from "./_components/admin-auth-wrapper";

export default function AdminLayout({children}: {children: ReactNode}) {
  return (
    <AdminAuthWrapper>
      <DashboardTopNav />

      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <DashboardSideBar isAdmin={true} />
        <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
      </div>
    </AdminAuthWrapper>
  );
}
