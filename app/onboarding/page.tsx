import PageWrapper from "@/components/wrapper/page-wrapper";
import prisma from "@/lib/db";
import {redirect} from "next/navigation";
import Steps from "./_components/steps";
import {auth} from "@clerk/nextjs/server";
import MockDashboard from "../dashboard/_components/mock-dashboard";
import {getPricing} from "@/app/(landing)/pricing/page";
import {PricingTypes} from "@/types";

export default async function page() {
  const {userId} = auth();
  const pricing: PricingTypes | null = await getPricing();
  let user: any;

  if (!userId) redirect("/sign-in");

  if (userId) {
    user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        is_admin: true,
        metaapi_account_id: true,
        subscription: true,
      },
    });
    if (user?.is_admin || (user?.metaapi_account_id && user?.subscription)) redirect(`/dashboard`);
  }
  return (
    <PageWrapper>
      <MockDashboard />
      <Steps
        user={user}
        pricing={pricing}
      />
    </PageWrapper>
  );
}
