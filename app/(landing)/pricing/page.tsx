import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccordionPricing from "@/components/AccordionPricing";
import { client } from "@/sanity/lib/client";
import { PricingTypes } from "@/types";
import VideoMembers from "@/components/VideoMembers";
import CountdownTimer from "@/components/CountdownTimer";
import PricingContent from "@/components/PricingContent";
import { Metadata } from "next";

async function getPricing(): Promise<PricingTypes | null> {
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
      canonical: "https://huggingtrade.com/pricing", 
    },
    openGraph: {
      images: [
        {
          url: 'https://huggingtrade.com/opengraph-image.jpg',
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
      <div className="lg:mb-0 mb-20 overflow-hidden">
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

        <div className="lg:absolute lg:inset-16 px-5">
          <div>
            <div className="flex justify-center items-center gap-5">
              <Image
                src={"/Images/PricingPage/scribble final version-34.svg"}
                alt="image"
                width={78.77}
                height={65.54}
                className=" mr-auto  translate-x-[45px]  -translate-y-[150px] lg:-translate-y-0 hidden lg:block"
              />
              <div className="text-center lg:w-[1107px] space-y-5 pb-5">
                <h1 className="text-[40px] lg:text-[48px] font-black leading-tight mt-10 lg:mt-20">
                  {pricing?.pricingHeroTitle}
                </h1>
                <p className="text-[22px] pt-10 lg:pt-0">
                  {pricing?.pricingHeroText}
                </p>
              </div>
              <Image
                src={"/Images/PricingPage/62.svg"}
                alt="image"
                width={83.16}
                height={45.11}
                className=" ml-auto lg:-mb-40 -translate-x-[44px] hidden lg:block"
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5">
              <div className=" py-5 lg:py-0 flex flex-col justify-center lg:flex-row lg:justify-start items-center lg:gap-12 lg:w-[592px] lg:h-[189px] bg-white px-2 border-gray-200 border-[1px] rounded-[40px]">
                <Image
                  src={"/Images/PricingPage/Clip path group.svg"}
                  alt="image"
                  width={61}
                  height={62.83}
                />
                <div className="">
                  <h2 className="text-[32px] font-black text-center lg:text-left">
                    Deposit money
                  </h2>
                  <p className="text-[20px] text-center lg:text-left">
                    Sign up to and deposit money to your brokerage account.
                  </p>
                </div>
              </div>

              <div className="py-5 lg:py-0 flex flex-col justify-center lg:flex-row lg:justify-start items-center lg:gap-12 lg:w-[592px] lg:h-[189px] bg-white px-2 border-gray-200 border-[1px] rounded-[40px]">
                <Image
                  src={"/Images/PricingPage/Group.svg"}
                  alt="image"
                  width={75}
                  height={78.27}
                />
                <div className="">
                  <h2 className="text-[32px] font-black text-center lg:text-left">
                    Withdraw profits anytime
                  </h2>
                  <p className="text-[20px] text-center lg:text-left">
                    Get paid, and withdraw profits from your account anytime.
                  </p>
                </div>
              </div>

              <div className="py-5 lg:py-0 flex flex-col justify-center lg:flex-row lg:justify-start items-center lg:gap-12 lg:w-[592px] lg:h-[189px] bg-white px-2 border-gray-200 border-[1px] rounded-[40px]">
                <Image
                  src={"/Images/PricingPage/secure-icon.svg.svg"}
                  alt="image"
                  width={86}
                  height={86}
                />
                <div className="">
                  <h2 className="text-[32px] font-black text-center lg:text-left">
                    Safe and secure
                  </h2>
                  <p className="text-[20px] text-center lg:text-left ">
                    We never touch your money, it&apos;s always yours.
                  </p>
                </div>
              </div>

              <div className="py-5 lg:py-0 flex flex-col justify-center lg:flex-row lg:justify-start items-center lg:gap-12 lg:w-[592px] lg:h-[189px] bg-white px-2 border-gray-200 border-[1px] rounded-[40px]">
                <Image
                  src={"/Images/PricingPage/06.svg"}
                  alt="image"
                  width={88}
                  height={70.48}
                />
                <div className="">
                  <h2 className="text-[32px] font-black text-center lg:text-left">
                    No work required
                  </h2>
                  <p className="text-[20px] text-center lg:text-left">
                    Never lift a finger, we trade on your behalf.
                  </p>
                </div>
              </div>
            </div>

            <Image
              src={"/Images/PricingPage/61 (1).svg"}
              alt="image"
              width={67.32}
              height={77.4}
              className="mr-auto -mt-5  translate-x-[45px] hidden lg:block"
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

        <div className="lg:my-40 gradient-pricing">
          <div className="lg:relative ">
            <div>
              <Image
                src={"/Images/PricingPage/bg_desktop.svg fill.svg"}
                alt="img"
                width={1440}
                height={416}
                className=""
              />
            </div>
            <div className="lg:absolute lg:inset-40 -mt-20 lg:-mt-0 px-5 lg:px-0">
              <div className=" flex flex-col justify-center items-center gap-10">
                <div>
                  <h3 className="text-[28px] text-black text-center">
                    {pricing?.sectionFourTitleOne}
                  </h3>
                  <h3 className="text-[28px] text-black text-center">
                    {pricing?.sectionFourTitleTwo}
                  </h3>
                </div>

                <Link href="/" className="block w-full lg:w-auto">
                  <div className="text-[20px] text-center hover:bg-[#4977db] w-full  lg:w-[210px] py-3 text-white rounded-2xl bg-[#2563EB]">
                    Start free trial
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------- */}

        <div className="relative lg:pt-0 mt-40">
          <div className=" flex justify-around items-start lg:gap-[800px]">
            <Image
              src={"/Images/PricingPage/scribble final version-08.svg"}
              alt="image"
              width={82.91}
              height={65.21}
              className="-mt-10 hidden lg:block "
            />

            <Image
              src={"/Images/PricingPage/scribble final version-59.svg"}
              alt="image"
              width={79.19}
              height={73.86}
              className="mt-10 hidden lg:block"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end items-center">
            <h2 className="font-bold text-[44px] text-center pb-10">FAQ</h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 lg:mb-40 mb-32 px-5 lg:px-0">
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
