import React from "react";
import Image from "next/image";
import SliderAffiliate from "@/components/SliderAffiliate";
import { client } from "@/sanity/lib/client";
import { AffiliateTypes } from "@/types";
import AccordionAffiliate from "@/components/AccordionAffiliate";
import { Metadata } from "next";
import Testimonial from "@/components/Testimonial";

async function getAffiliate(): Promise<AffiliateTypes | null> {
  try {
    const query = `
      *[_type == "affiliate"][0]{
        affiliateHeroTitle,
        affiliateHeroText,
        affiliateReviewTitle,
        averageUSD,
        percent,
        reviewListItems[]{
          name,
          position,
          text,
          authorImage{
            asset->{
              _id,
              url
            }
          }
        },
        metaTitle,
        metaDescription,
        keywords,
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

export async function generateMetadata(): Promise<Metadata> {
  const affiliate: AffiliateTypes | null = await getAffiliate();

  const title = affiliate?.metaTitle;

  const description = affiliate?.metaDescription;
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
      canonical: "https://www.huggingtrade.com/affiliate",
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

export default async function Affiliate() {
  const affiliate: AffiliateTypes | null = await getAffiliate();
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
            <div className="w-full lg:h-[442px] lg:w-[642px] lg:space-y-10">
              <h1 className="text-center text-[44px] font-black leading-tight lg:text-left lg:text-[64px] lg:font-bold lg:leading-[60px]">
                {affiliate?.affiliateHeroTitle}
              </h1>
              <p className="w-full py-10 text-center text-[23px] lg:w-[631px] lg:py-0 lg:text-left">
                {affiliate?.affiliateHeroText}
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

          <div className="mt-5 flex items-center justify-center lg:justify-start lg:-mt-5 ">
            <div className="block w-full lg:w-auto">
              <a
                href="https://affiliates.huggingtrade.com"
                target="_blank"
                rel="noopener noreferrer"
              >

                <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white hover:bg-[#4977db] lg:w-[282.95px]">
                  Get your affiliate link
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
          How to get started
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
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">
                Get your affiliate link
              </h3>
            </div>
            <p className="text-[16px] lg:text-left">
              Copy your personal referral link and share it across your channels.
            </p>
          </div>

          <div className="w-full space-y-3 lg:w-[357px]">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (1).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">Invite friends</h3>
            </div>
            <p className="text-[16px] lg:text-left">The more customers you attract, the more revenue you get.</p>
          </div>

          <div className="w-full space-y-3 lg:w-[357px]">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (2).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] font-bold leading-tight lg:text-[26px] lg:leading-none">
                Earn 30% commission
              </h3>
            </div>
            <p className="text-[16px] lg:text-left">Get paid for every package your referred users purchase.</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center lg:mt-20">
          <div className="block w-full lg:w-auto">
            <a
              href="https://affiliates.huggingtrade.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              
                <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white hover:bg-[#4977db] lg:w-[282.95px]">
                  Get your affiliate link
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
          affiliateReviewTitle={affiliate?.affiliateReviewTitle || ""}
          reviewListItems={affiliate?.reviewListItems || []}
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
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <h2 className="pb-10 text-center text-[44px] font-bold">FAQ</h2>
        </div>
      </div>

      <div className="lg:mb-40">
        <AccordionAffiliate />
      </div>

      {/* ------------------------------------------------------------------------------------------ */}
    </div>
  );
}
