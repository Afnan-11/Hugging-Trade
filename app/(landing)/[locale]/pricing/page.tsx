import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccordionPricing from "@/components/AccordionPricing";
import {client} from "@/sanity/lib/client";
import {PricingTypes} from "@/types";
import VideoMembers from "@/components/VideoMembers";
import CountdownTimer from "@/components/CountdownTimer";
import PricingContent from "@/components/PricingContent";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function getPricing(): Promise<PricingTypes | null> {
  try {
    const query = `
      *[_type == "pricing"][0]{
  pricingHeroTitle,
  pricingHeroTitle_de,
  pricingHeroTitle_es,
  pricingHeroTitle_fr,
  pricingHeroTitle_it,
  pricingHeroTitle_pt,

  pricingHeroText,
  pricingHeroText_de,
  pricingHeroText_es,
  pricingHeroText_fr,
  pricingHeroText_it,
  pricingHeroText_pt,

  pricingSectionTwoTitle,
  pricingSectionTwoTitle_de,
  pricingSectionTwoTitle_es,
  pricingSectionTwoTitle_fr,
  pricingSectionTwoTitle_it,
  pricingSectionTwoTitle_pt,

  pricingSectionTwoText,
  pricingSectionTwoText_de,
  pricingSectionTwoText_es,
  pricingSectionTwoText_fr,
  pricingSectionTwoText_it,
  pricingSectionTwoText_pt,

  priceMonth,
  discountMonth,
  discountYear,
  showYearlyDiscount,

  pricingLeftText,
  pricingLeftText_de,
  pricingLeftText_es,
  pricingLeftText_fr,
  pricingLeftText_it,
  pricingLeftText_pt,

  leftListItems[]{
    _id,
    text_en,
    text_de,
    text_es,
    text_fr,
    text_it,
    text_pt
  },

  leftSmallTextUnderButtonOne,
  leftSmallTextUnderButtonOne_de,
  leftSmallTextUnderButtonOne_es,
  leftSmallTextUnderButtonOne_fr,
  leftSmallTextUnderButtonOne_it,
  leftSmallTextUnderButtonOne_pt,

  leftSmallTextUnderButtonTwo,
  leftSmallTextUnderButtonTwo_de,
  leftSmallTextUnderButtonTwo_es,
  leftSmallTextUnderButtonTwo_fr,
  leftSmallTextUnderButtonTwo_it,
  leftSmallTextUnderButtonTwo_pt,

  pricingRightTitle,
  pricingRightTitle_de,
  pricingRightTitle_es,
  pricingRightTitle_fr,
  pricingRightTitle_it,
  pricingRightTitle_pt,

  rightListItems[]{
    _id,
    text_en,
    text_de,
    text_es,
    text_fr,
    text_it,
    text_pt
  },

  buttonRight,
  buttonRight_de,
  buttonRight_es,
  buttonRight_fr,
  buttonRight_it,
  buttonRight_pt,

  textUnderRightButton,
  textUnderRightButton_de,
  textUnderRightButton_es,
  textUnderRightButton_fr,
  textUnderRightButton_it,
  textUnderRightButton_pt,

  sectionFourTitleOne,
  sectionFourTitleOne_de,
  sectionFourTitleOne_es,
  sectionFourTitleOne_fr,
  sectionFourTitleOne_it,
  sectionFourTitleOne_pt,

  sectionFourTitleTwo,
  sectionFourTitleTwo_de,
  sectionFourTitleTwo_es,
  sectionFourTitleTwo_fr,
  sectionFourTitleTwo_it,
  sectionFourTitleTwo_pt,

  metaTitle,
  metaTitle_de,
  metaTitle_es,
  metaTitle_fr,
  metaTitle_it,
  metaTitle_pt,

  metaDescription,
  metaDescription_de,
  metaDescription_es,
  metaDescription_fr,
  metaDescription_it,
  metaDescription_pt,

  keywords
}

    `;
    const data: PricingTypes = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch pricing data:", error);
    return null;
  }
}

export const revalidate = 10;

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const pricing: PricingTypes | null = await getPricing();
  const locale = params.locale;

  const title =
    locale === "en"
      ? pricing?.metaTitle
      : locale === "de"
        ? pricing?.metaTitle_de
        : locale === "es"
          ? pricing?.metaTitle_es
          : locale === "fr"
            ? pricing?.metaTitle_fr
            : locale === "it"
              ? pricing?.metaTitle_it
              : pricing?.metaTitle_pt;

  const description =
    locale === "en"
      ? pricing?.metaDescription
      : locale === "de"
        ? pricing?.metaDescription_de
        : locale === "es"
          ? pricing?.metaDescription_es
          : locale === "fr"
            ? pricing?.metaDescription_fr
            : locale === "it"
              ? pricing?.metaDescription_it
              : pricing?.metaDescription_pt;
  const keywords = pricing?.keywords ? pricing.keywords.join(", ") : "";

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    creator: "Hugging Trade",
    generator: "Next.js",
    publisher: "Hugging Trade",
    alternates: {
      canonical: `https://www.huggingtrade.com/${locale}/pricing`,
      languages: {
        en: "https://www.huggingtrade.com/en/pricing",
        de: "https://www.huggingtrade.com/de/pricing",
        es: "https://www.huggingtrade.com/es/pricing",
        fr: "https://www.huggingtrade.com/fr/pricing",
        it: "https://www.huggingtrade.com/it/pricing",
        pt: "https://www.huggingtrade.com/pt/pricing",
      },
    },
    openGraph: {
      images: [
        {
          url: "https://www.huggingtrade.com/opengraph-image.jpg",
          width: 1200,
          height: 628,
          alt: "Hugging Trade Open Graph Image",
        },
      ],
    },
  };
}

export default async function Pricing({params}: {params: {locale: string}}) {
  const pricing: PricingTypes | null = await getPricing();
  const t = await getTranslations("PricingPage");
  const locale = params.locale;
  return (
    <div>
      <CountdownTimer />
      <div className="mb-20 overflow-hidden lg:mb-0">
        <div className="relative hidden lg:block">
          <Image
            src={"/Images/PricingPage/Vector (3).svg"}
            alt="img"
            width={1574}
            height={710}
            loading="eager"
            priority
          />
        </div>

        <div className="pointer-events-none px-5 lg:absolute lg:inset-16">
          <div>
            <div className="flex items-center justify-center gap-5">
              <Image
                src={"/Images/PricingPage/scribble final version-34.svg"}
                alt="image"
                width={78.77}
                height={65.54}
                className="mr-auto hidden -translate-y-[150px] translate-x-[45px] lg:block lg:-translate-y-0"
              />
              <div className="space-y-5 pb-5 text-center lg:w-[1107px]">
                <h1 className="mt-10 text-[40px] font-black leading-tight lg:mt-20 lg:text-[48px]">
                 
                  {locale === "en"
                    ? pricing?.pricingHeroTitle
                    : locale === "de"
                      ? pricing?.pricingHeroTitle_de
                      : locale === "es"
                        ? pricing?.pricingHeroTitle_es
                        : locale === "fr"
                          ? pricing?.pricingHeroTitle_fr
                          : locale === "it"
                            ? pricing?.pricingHeroTitle_it
                            : pricing?.pricingHeroTitle_pt}
                </h1>
                <p className="pt-10 text-[22px] lg:pt-0">
                 
                  {locale === "en"
                    ? pricing?.pricingHeroText
                    : locale === "de"
                      ? pricing?.pricingHeroText_de
                      : locale === "es"
                        ? pricing?.pricingHeroText_es
                        : locale === "fr"
                          ? pricing?.pricingHeroText_fr
                          : locale === "it"
                            ? pricing?.pricingHeroText_it
                            : pricing?.pricingHeroText_pt}
                </p>
              </div>
              <Image
                src={"/Images/PricingPage/62.svg"}
                alt="image"
                width={83.16}
                height={45.11}
                className="ml-auto hidden -translate-x-[44px] lg:-mb-40 lg:block"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <div className="flex flex-col items-center justify-center rounded-[40px] border-[1px] border-gray-200 bg-white px-2 py-5 lg:h-[189px] lg:w-[592px] lg:flex-row lg:justify-start lg:gap-12 lg:py-0">
                <Image
                  src={"/Images/PricingPage/Clip path group.svg"}
                  alt="image"
                  width={61}
                  height={62.83}
                />
                <div className="">
                  <h2 className="text-center text-[32px] font-black lg:text-left">{t("depositMoneyTitle")}</h2>
                  <p className="text-center text-[20px] lg:text-left">{t("depositMoneyText")}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-[40px] border-[1px] border-gray-200 bg-white px-2 py-5 lg:h-[189px] lg:w-[592px] lg:flex-row lg:justify-start lg:gap-12 lg:py-0">
                <Image
                  src={"/Images/PricingPage/Group.svg"}
                  alt="image"
                  width={75}
                  height={78.27}
                />
                <div className="">
                  <h2 className="text-center text-[32px] font-black lg:text-left">{t("withdrawProfitsTitle")}</h2>
                  <p className="text-center text-[20px] lg:text-left">{t("withdrawProfitsText")}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-[40px] border-[1px] border-gray-200 bg-white px-2 py-5 lg:h-[189px] lg:w-[592px] lg:flex-row lg:justify-start lg:gap-12 lg:py-0">
                <Image
                  src={"/Images/PricingPage/secure-icon.svg.svg"}
                  alt="image"
                  width={86}
                  height={86}
                />
                <div className="">
                  <h2 className="text-center text-[32px] font-black lg:text-left">{t("safeAndSecureTitle")}</h2>
                  <p className="text-center text-[20px] lg:text-left">{t("safeAndSecureText")}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-[40px] border-[1px] border-gray-200 bg-white px-2 py-5 lg:h-[189px] lg:w-[592px] lg:flex-row lg:justify-start lg:gap-12 lg:py-0">
                <Image
                  src={"/Images/PricingPage/06.svg"}
                  alt="image"
                  width={88}
                  height={70.48}
                />
                <div className="">
                  <h2 className="text-center text-[32px] font-black lg:text-left">{t("noWorkRequiredTitle")}</h2>
                  <p className="text-center text-[20px] lg:text-left">{t("noWorkRequiredText")}</p>
                </div>
              </div>
            </div>

            <Image
              src={"/Images/PricingPage/61 (1).svg"}
              alt="image"
              width={67.32}
              height={77.4}
              className="-mt-5 mr-auto hidden translate-x-[45px] lg:block"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------------------- */}

        {pricing && (
          <PricingContent
            pricing={pricing}
            locale={locale}
          />
        )}

        {/* ------------------------------------------------------------------------------- */}

        <div className="mt-10 lg:mt-0">
          <VideoMembers locale={locale} />
        </div>
        {/* ---------------------------------------------------------------------------------------------- */}

        <div className="gradient-pricing lg:my-40">
          <div className="lg:relative">
            <div>
              <Image
                src={"/Images/PricingPage/bg_desktop.svg fill.svg"}
                alt="img"
                width={1440}
                height={416}
                className=""
              />
            </div>
            <div className="-mt-20 px-5 lg:absolute lg:inset-40 lg:-mt-0 lg:px-0">
              <div className="flex flex-col items-center justify-center gap-10">
                <div>
                  <h3 className="text-center text-[28px] text-black">
                    
                    {locale === "en"
                      ? pricing?.sectionFourTitleOne
                      : locale === "de"
                        ? pricing?.sectionFourTitleOne_de
                        : locale === "es"
                          ? pricing?.sectionFourTitleOne_es
                          : locale === "fr"
                            ? pricing?.sectionFourTitleOne_fr
                            : locale === "it"
                              ? pricing?.sectionFourTitleOne_it
                              : pricing?.sectionFourTitleOne_pt}
                  </h3>
                  <h3 className="text-center text-[28px] text-black">
                    
                    {locale === "en"
                      ? pricing?.sectionFourTitleTwo
                      : locale === "de"
                        ? pricing?.sectionFourTitleTwo_de
                        : locale === "es"
                          ? pricing?.sectionFourTitleTwo_es
                          : locale === "fr"
                            ? pricing?.sectionFourTitleTwo_fr
                            : locale === "it"
                              ? pricing?.sectionFourTitleTwo_it
                              : pricing?.sectionFourTitleTwo_pt}
                  </h3>
                </div>

                <Link
                  href="/sign-in"
                  className="block w-full lg:w-auto"
                >
                  <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[20px] text-white hover:bg-[#4977db] lg:w-[348px]">
                    {t("startFreeTrial")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------- */}

        <div className="relative mt-40 lg:pt-0">
          <div className="flex items-start justify-around lg:gap-[800px]">
            <Image
              src={"/Images/PricingPage/scribble final version-08.svg"}
              alt="image"
              width={82.91}
              height={65.21}
              className="-mt-10 hidden lg:block"
            />

            <Image
              src={"/Images/PricingPage/scribble final version-59.svg"}
              alt="image"
              width={79.19}
              height={73.86}
              className="mt-10 hidden lg:block"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end">
            <h2 className="pb-10 text-center text-[44px] font-bold">{t("faqTitle")}</h2>
          </div>
        </div>

        <div className="mb-32 flex flex-col items-center justify-center gap-2 px-5 lg:mb-40 lg:px-0">
          <AccordionPricing locale={locale} />
        </div>

        <Image
          src={"/Images/PricingPage/scribble final version-23.svg"}
          alt="image"
          width={83.16}
          height={45.11}
          className="-mt-60 ml-40"
        />
      </div>
    </div>
  );
}
