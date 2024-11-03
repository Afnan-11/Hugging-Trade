import React from "react";
import Image from "next/image";
import SliderAffiliate from "@/components/SliderAffiliate";
import {client} from "@/sanity/lib/client";
import {AffiliateTypes} from "@/types";
import AccordionAffiliate from "@/components/AccordionAffiliate";
import {Metadata} from "next";
import Testimonial from "@/components/Testimonial";
import {getTranslations} from "next-intl/server";

async function getAffiliate(): Promise<AffiliateTypes | null> {
  try {
    const query = `
      *[_type == "affiliate"][0]{
  affiliateHeroTitle,
  affiliateHeroTitle_de,
  affiliateHeroTitle_es,
  affiliateHeroTitle_fr,
  affiliateHeroTitle_it,
  affiliateHeroTitle_pt,

  affiliateHeroText,
  affiliateHeroText_de,
  affiliateHeroText_es,
  affiliateHeroText_fr,
  affiliateHeroText_it,
  affiliateHeroText_pt,

  affiliateReviewTitle,
  affiliateReviewTitle_de,
  affiliateReviewTitle_es,
  affiliateReviewTitle_fr,
  affiliateReviewTitle_it,
  affiliateReviewTitle_pt,

  averageUSD,
  percent,

  reviewListItems[] {
    name,
    position {
      en,
      de,
      es,
      fr,
      it,
      pt
    },
    text {
      en,
      de,
      es,
      fr,
      it,
      pt
    },
    authorImage {
      asset->{
        _id,
        url
      }
    }
  },

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
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch affiliate data:", error);
    return null;
  }
}

export const revalidate = 10;

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const affiliate: AffiliateTypes | null = await getAffiliate();
  const locale = params.locale;

  const title =
    locale === "en"
      ? affiliate?.metaTitle
      : locale === "de"
        ? affiliate?.metaTitle_de
        : locale === "es"
          ? affiliate?.metaTitle_es
          : locale === "fr"
            ? affiliate?.metaTitle_fr
            : locale === "it"
              ? affiliate?.metaTitle_it
              : affiliate?.metaTitle_pt;

  const description =
    locale === "en"
      ? affiliate?.metaDescription
      : locale === "de"
        ? affiliate?.metaDescription_de
        : locale === "es"
          ? affiliate?.metaDescription_es
          : locale === "fr"
            ? affiliate?.metaDescription_fr
            : locale === "it"
              ? affiliate?.metaDescription_it
              : affiliate?.metaDescription_pt;
  const keywords = affiliate?.keywords ? affiliate.keywords.join(", ") : "";

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    creator: "Hugging Trade",
    generator: "Next.js",
    publisher: "Hugging Trade",
    alternates: {
      canonical: `https://www.huggingtrade.com/${locale}/affiliate`,
      languages: {
        en: "https://www.huggingtrade.com/en/affiliate",
        de: "https://www.huggingtrade.com/de/affiliate",
        es: "https://www.huggingtrade.com/es/affiliate",
        fr: "https://www.huggingtrade.com/fr/affiliate",
        it: "https://www.huggingtrade.com/it/affiliate",
        pt: "https://www.huggingtrade.com/pt/affiliate",
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

export default async function Affiliate({params}: {params: {locale: string}}) {
  const affiliate: AffiliateTypes | null = await getAffiliate();
  const t = await getTranslations("AffiliatePage");
  const locale = params.locale;
  return (
    <div className="mt-20 overflow-hidden px-5 lg:-mt-7 lg:px-0">
      <div className="flex flex-col items-center justify-start lg:px-10 lg:pt-28">
        <div>
          <Image
            src={"/Images/AffiliatePage/Group (1).svg"}
            alt="img"
            width={71.98}
            height={79.84}
            loading="eager"
            priority
            className="absolute -ml-10 -mt-20 hidden lg:block"
          />
          <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
            <div className={`w-full lg:h-[442px] lg:space-y-10 ${locale === "en" ? "lg:w-[642px]" : "lg:w-[802px]"}`}>
              <h1
                className={`text-center font-black leading-tight lg:text-left lg:text-[64px] lg:font-bold lg:leading-[60px] ${locale === "en" ? "text-[44px]" : "text-[35px]"}`}
              >
                {locale === "en"
                  ? affiliate?.affiliateHeroTitle || ""
                  : locale === "de"
                    ? affiliate?.affiliateHeroTitle_de || ""
                    : locale === "es"
                      ? affiliate?.affiliateHeroTitle_es || ""
                      : locale === "fr"
                        ? affiliate?.affiliateHeroTitle_fr || ""
                        : locale === "it"
                          ? affiliate?.affiliateHeroTitle_it || ""
                          : affiliate?.affiliateHeroTitle_pt || ""}
              </h1>
              <p className="w-full py-10 text-center text-[23px] lg:w-[631px] lg:py-0 lg:text-left">
                {locale === "en"
                  ? affiliate?.affiliateHeroText || ""
                  : locale === "de"
                    ? affiliate?.affiliateHeroText_de || ""
                    : locale === "es"
                      ? affiliate?.affiliateHeroText_es || ""
                      : locale === "fr"
                        ? affiliate?.affiliateHeroText_fr || ""
                        : locale === "it"
                          ? affiliate?.affiliateHeroText_it || ""
                          : affiliate?.affiliateHeroText_pt || ""}
              </p>
            </div>

            <Image
              src={"/Images/AffiliatePage/SVG (1).svg"}
              alt="img"
              width={140}
              height={140}
              loading="eager"
              priority
              className="-mb-80 -ml-20 hidden lg:block"
            />

            <div className="lg:-mt-10">
              <SliderAffiliate
                averageUSD={affiliate?.averageUSD || 0}
                percent={affiliate?.percent || 0}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center lg:-mt-5 lg:justify-start">
            <div className="block w-full lg:w-auto">
              <a
                href="https://affiliates.huggingtrade.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white hover:bg-[#4977db] lg:w-[348px]">
                  {t("getLink")}
                </div>
              </a>
            </div>
          </div>

          <Image
            src={"/Images/AffiliatePage/scribble final version-07 (1).svg"}
            alt="img"
            width={67.32}
            height={77.4}
            loading="eager"
            priority
            className="ml-auto hidden -translate-x-44 lg:block"
          />
        </div>
      </div>

      {/* ----------------------------------------------------------------------------- */}

      <div className="gradient-pricing my-20 rounded-xl py-10 lg:rounded-none lg:px-20">
        <Image
          src={"/Images/AffiliatePage/small-doodle-01_bold.svg.svg"}
          alt="img"
          width={70}
          height={70}
          className="hidden translate-x-44 lg:block"
        />
        <h2 className="pb-10 text-center text-[50px] font-bold leading-tight text-black lg:pb-0 lg:leading-none">
          {t("howToStart")}
        </h2>
        <Image
          src={"/Images/AffiliatePage/SVG (2).svg"}
          alt="img"
          width={140}
          height={140}
          className="ml-auto hidden -translate-x-44 -translate-y-36 lg:block"
        />

        <div className="flex flex-col items-center justify-start gap-6 px-3 lg:-mt-10 lg:flex-row lg:justify-around lg:gap-0 lg:px-0">
          <div className="w-full space-y-3 lg:w-[357px]">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={"/Images/AffiliatePage/Background.svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">{t("getLink")}</h3>
            </div>
            <p className="text-[16px] lg:text-left">{t("start1")}</p>
          </div>

          <div className="w-full space-y-3 lg:w-[357px]">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (1).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">{t("start2")}</h3>
            </div>
            <p className="text-[16px] lg:text-left">{t("start3")}</p>
          </div>

          <div className="w-full space-y-3 lg:w-[357px]">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (2).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">{t("start4")}</h3>
            </div>
            <p className="text-[16px] lg:text-left">{t("start5")}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center lg:mt-20">
          <div className="block w-full lg:w-auto">
            <a
              href="https://affiliates.huggingtrade.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white hover:bg-[#4977db] lg:w-[348px]">
                {t("getLink")}
              </div>
            </a>
          </div>
        </div>

        <Image
          src={"/Images/AffiliatePage/Vector (4).svg"}
          alt="img"
          width={140}
          height={140}
          className="ml-auto hidden -translate-x-44 -translate-y-20 lg:block"
        />
      </div>

      {/* ------------------------------------------------------------------------------------- */}

      <div className="lg:-mt-10">
        <Testimonial
          affiliateReviewTitle={
            locale === "en"
              ? affiliate?.affiliateReviewTitle || ""
              : locale === "de"
                ? affiliate?.affiliateReviewTitle_de || ""
                : locale === "es"
                  ? affiliate?.affiliateReviewTitle_es || ""
                  : locale === "fr"
                    ? affiliate?.affiliateReviewTitle_fr || ""
                    : locale === "it"
                      ? affiliate?.affiliateReviewTitle_it || ""
                      : affiliate?.affiliateReviewTitle_pt || ""
          }
          reviewListItems={affiliate?.reviewListItems || []}
          locale={locale}
        />
      </div>

      {/* ------------------------------------------------------------------------------------- */}

      <div className="relative mt-40 lg:pt-0">
        <div className="flex items-start justify-around lg:gap-[800px]">
          <Image
            src={"/Images/AffiliatePage/scribble final version-34 (1).svg"}
            alt="image"
            width={78.77}
            height={65.54}
            className="-mt-10 hidden lg:block"
          />

          <Image
            src={"/Images/AffiliatePage/62 (1).svg"}
            alt="image"
            width={83.16}
            height={45.11}
            className="mt-10 hidden translate-y-44 lg:block"
          />
        </div>
        <div className="absolute inset-0 mt-5 flex flex-col items-center justify-end lg:mt-0">
          <h2 className="pb-10 text-center text-[44px] font-bold">{t("faqTitle")}</h2>
        </div>
      </div>

      <div className="lg:mb-40">
        <AccordionAffiliate locale={locale} />
      </div>
    </div>
  );
}
