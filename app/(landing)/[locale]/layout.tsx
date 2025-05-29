import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({locale}).catch(() => {
    notFound();
  });

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <PageWrapper params={{locale}}>
        <div className=" md:my-[5rem]">{children}</div>
      </PageWrapper>
    </NextIntlClientProvider>
  );
}
