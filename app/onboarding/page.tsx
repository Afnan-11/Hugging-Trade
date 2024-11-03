import PageWrapper from "@/components/wrapper/page-wrapper";
import prisma from "@/lib/db";
import {redirect} from "next/navigation";
import Steps from "./_components/steps";
import {auth} from "@clerk/nextjs/server";
import MockDashboard from "../dashboard/_components/mock-dashboard";
import {getPricing} from "@/app/(landing)/[locale]/pricing/page";
import {PricingTypes} from "@/types";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

export default async function page({ params }: { params: { locale: Locale } }) {
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
    <PageWrapper params={params}>
      <MockDashboard />
      <Steps
        user={user}
        pricing={pricing}
      />
    </PageWrapper>
  );
}
