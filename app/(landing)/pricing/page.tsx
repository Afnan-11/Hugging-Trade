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

export async function getPricing(): Promise<PricingTypes | null> {
  try {
    const query = `
      *[_type == "pricing"][0]{
        pricingHeroTitle,
        pricingHeroText,
        pricingSectionTwoTitle,
        pricingSectionTwoText,
        priceMonth,
        discountMonth,
        discountYear,
        pricingLeftText,
        leftListItems,
        leftSmallTextUnderButtonOne,
        leftSmallTextUnderButtonTwo,
        pricingRightTitle,
        rightListItems,
        buttonRight,
        textUnderRightButton,
        sectionFourTitleOne,
        sectionFourTitleTwo,
        metaTitle,
        metaDescription,
        keywords,
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

export async function generateMetadata(): Promise<Metadata> {
  const pricing: PricingTypes | null = await getPricing();

  const title = pricing?.metaTitle;

  const description = pricing?.metaDescription;
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
      canonical: "https://www.huggingtrade.com/pricing",
    },
    openGraph: {
      images: [
        {
          url: "https://www.huggingtrade.com/opengraph-image.jpg",
          width: 1200,
          height: 628,
        },
      ],
    },
  };
}

export default async function Pricing() {
  const pricing: PricingTypes | null = await getPricing();
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
                  {pricing?.pricingHeroTitle}
                </h1>
                <p className="pt-10 text-[22px] lg:pt-0">{pricing?.pricingHeroText}</p>
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
                  <h2 className="text-center text-[32px] font-black lg:text-left">Deposit money</h2>
                  <p className="text-center text-[20px] lg:text-left">
                    Sign up to and deposit money to your brokerage account.
                  </p>
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
                  <h2 className="text-center text-[32px] font-black lg:text-left">Withdraw profits anytime</h2>
                  <p className="text-center text-[20px] lg:text-left">
                    Get paid, and withdraw profits from your account anytime.
                  </p>
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
                  <h2 className="text-center text-[32px] font-black lg:text-left">Safe and secure</h2>
                  <p className="text-center text-[20px] lg:text-left">
                    We never touch your money, it&apos;s always yours.
                  </p>
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
                  <h2 className="text-center text-[32px] font-black lg:text-left">No work required</h2>
                  <p className="text-center text-[20px] lg:text-left">Never lift a finger, we trade on your behalf.</p>
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

        {pricing && <PricingContent pricing={pricing} />}

        {/* ------------------------------------------------------------------------------- */}

        <div className="mt-10 lg:mt-0">
          <VideoMembers />
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
                  <h3 className="text-center text-[28px] text-black">{pricing?.sectionFourTitleOne}</h3>
                  <h3 className="text-center text-[28px] text-black">{pricing?.sectionFourTitleTwo}</h3>
                </div>

                <Link
                  href="/sign-up"
                  className="block w-full lg:w-auto"
                >
                  <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[20px] text-white hover:bg-[#4977db] lg:w-[210px]">
                    Start free trial
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
            <h2 className="pb-10 text-center text-[44px] font-bold">FAQ</h2>
          </div>
        </div>

        <div className="mb-32 flex flex-col items-center justify-center gap-2 px-5 lg:mb-40 lg:px-0">
          <AccordionPricing />
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
