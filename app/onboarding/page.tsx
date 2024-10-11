import PageWrapper from "@/components/wrapper/page-wrapper";
import prisma from "@/lib/db";
import {redirect} from "next/navigation";
import Steps from "./_components/steps";
import {auth} from "@clerk/nextjs/server";
import MockDashboard from "../dashboard/_components/mock-dashboard";
export default async function page() {
  const {userId} = auth();

  if (!userId) redirect("/sign-in");

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        is_admin: true,
        metaapi_account_id: true,
      },
    });
    if (user?.is_admin || user?.metaapi_account_id) redirect(`/dashboard`);
  }
  return (
    <PageWrapper>
      <MockDashboard />
      <Steps />
    </PageWrapper>
  );
}
