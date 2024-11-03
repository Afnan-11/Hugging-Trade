import AccordionHome from "@/components/AccordionHome";
import SliderCalculator from "@/components/SliderCalculator";
import {client} from "@/sanity/lib/client";
import {HomeTypes} from "@/types";
import React from "react";
import Image from "next/image";
import VideoMembers from "@/components/VideoMembers";

async function getHome(): Promise<HomeTypes | null> {
  try {
    const query = `
        *[_type == "home"][0]{ 
          sliderTitle,
  sliderTitle_de,
  sliderTitle_es,
  sliderTitle_fr,
  sliderTitle_it,
  sliderTitle_pt,
  sliderText,
  sliderText_de,
  sliderText_es,
  sliderText_fr,
  sliderText_it,
  sliderText_pt,
  sliderAverageMonthlyIncome,
  sliderAverageMonthlyIncome_de,
  sliderAverageMonthlyIncome_es,
  sliderAverageMonthlyIncome_fr,
  sliderAverageMonthlyIncome_it,
  sliderAverageMonthlyIncome_pt,
        }
      `;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return null;
  }
}

export const revalidate = 10;

export default async function InvestmentCalculator({params}: {params: {locale: string}}) {
  const home: HomeTypes | null = await getHome();
  const locale = params.locale;

  return (
    <div className="-mb-40 overflow-hidden lg:-mb-20 lg:-mt-10 lg:pb-0">
      <div className="mb-20">
        <SliderCalculator
          sliderTitle={
            locale === "en"
              ? home?.sliderTitle || ""
              : locale === "de"
                ? home?.sliderTitle_de || ""
                : locale === "es"
                  ? home?.sliderTitle_es || ""
                  : locale === "fr"
                    ? home?.sliderTitle_fr || ""
                    : locale === "it"
                      ? home?.sliderTitle_it || ""
                      : home?.sliderTitle_pt || ""
          }
          sliderText={
            locale === "en"
              ? home?.sliderText || ""
              : locale === "de"
                ? home?.sliderText_de || ""
                : locale === "es"
                  ? home?.sliderText_es || ""
                  : locale === "fr"
                    ? home?.sliderText_fr || ""
                    : locale === "it"
                      ? home?.sliderText_it || ""
                      : home?.sliderText_pt || ""
          }
          sliderAverageMonthlyIncome={
            locale === "en"
              ? home?.sliderAverageMonthlyIncome || ""
              : locale === "de"
                ? home?.sliderAverageMonthlyIncome_de || ""
                : locale === "es"
                  ? home?.sliderAverageMonthlyIncome_es || ""
                  : locale === "fr"
                    ? home?.sliderAverageMonthlyIncome_fr || ""
                    : locale === "it"
                      ? home?.sliderAverageMonthlyIncome_it || ""
                      : home?.sliderAverageMonthlyIncome_pt || ""
          }
        />
      </div>

      <div className="px-5 lg:px-0">
        <VideoMembers locale={locale} />
      </div>

      <div className="relative mt-20 pt-20 lg:mt-0 xl:px-20">
        <div className="flex justify-center">
          <Image
            src={"/Images/HomePage/Vector (2).svg"}
            alt="image"
            width={1282}
            height={86}
            className="hidden lg:block"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <h2 className="pb-10 text-center text-h2M font-bold lg:text-h2">FAQ</h2>
        </div>
      </div>

      <div className="px-5 lg:px-0">
        <AccordionHome locale={locale} />
      </div>
    </div>
  );
}
