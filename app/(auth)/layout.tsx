import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];


const layout = ({children, params}: {children: React.ReactNode, params: {locale: Locale}}) => {
  return (
    <PageWrapper params={params}>
      <div className="flex min-h-[80vh] items-center justify-center py-[8rem]">{children}</div>
    </PageWrapper>
  );
};

export default layout;
