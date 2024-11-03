import Footer from "./Footer";
import Navbar from "./Navbar";
import {routing} from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

export default function PageWrapper({children, params}: {children: React.ReactNode; params: {locale: Locale}}) {
  const locale = params.locale;

  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
