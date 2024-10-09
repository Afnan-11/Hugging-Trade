import React from "react";
import Image from "next/image";
import Link from "next/link";
import SliderAffiliate from "@/components/SliderAffiliate";
import { client } from "@/sanity/lib/client";
import { AffiliateTypes } from "@/types";
import AccordionAffiliate from "@/components/AccordionAffiliate";
import { Metadata } from "next";
import Testimonial from "@/components/Testimonial";

async function getAffiliate() {
  const query = `
  *[_type == "affiliate"][0]{
    affiliateHeroTitle,
    affiliateHeroText,
    affiliateReviewTitle,
    averageUSD,
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
}

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const affiliate: AffiliateTypes = await getAffiliate();

  const title = affiliate.metaTitle;

  const description = affiliate.metaDescription;
  const keywords = affiliate?.keywords ? affiliate.keywords.join(", ") : "";

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    creator: "Hugging Trade",
    generator: "Next.js",
    publisher: "Hugging Trade",
  };
}

export default async function Affiliate() {
  const affiliate: AffiliateTypes = await getAffiliate();
  return (
    <div className=" mt-20 lg:-mt-7  px-5 lg:px-0  overflow-hidden">
      <div className="lg:pt-28 flex flex-col justify-start items-center lg:px-10">
        <div>
          <Image
            src={"/Images/AffiliatePage/Group (1).svg"}
            alt="img"
            width={71.98}
            height={79.84}
            loading="eager"
            priority
            className="-mt-20 -ml-10 absolute hidden lg:block"
          />
          <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
            <div className="w-full lg:w-[642px] lg:h-[442px] lg:space-y-10">
              <h1 className="text-[44px] lg:text-[64px] font-black lg:font-bold lg:text-left text-center leading-tight lg:leading-[60px]">
                {affiliate.affiliateHeroTitle}
              </h1>
              <p className="text-[23px] w-full lg:w-[631px] lg:text-left text-center py-10 lg:py-0">
                {affiliate.affiliateHeroText}
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

            

            <div className="lg:-mt-10 ">
              <SliderAffiliate averageUSD={affiliate.averageUSD} />
            </div>
          </div>

          <div className="flex justify-start items-center lg:-mt-5 mt-5  ">
            <Link href="/" className="block w-full lg:w-auto">
              <div className="text-[22px] text-center hover:bg-[#4977db] w-full lg:w-[282.95px] py-3 text-white rounded-2xl bg-[#2563EB]">
                Get your affiliate link
              </div>
            </Link>
          </div>

          <Image
            src={"/Images/AffiliatePage/scribble final version-07 (1).svg"}
            alt="img"
            width={67.32}
            height={77.4}
            loading="eager"
            priority
            className="ml-auto -translate-x-44 hidden lg:block"
          />
        </div>
      </div>

      {/* ----------------------------------------------------------------------------- */}

      <div className="gradient-pricing py-10 lg:px-20 my-20 rounded-xl lg:rounded-none">
        <Image
          src={"/Images/AffiliatePage/small-doodle-01_bold.svg.svg"}
          alt="img"
          width={70}
          height={70}
          className="translate-x-44 hidden lg:block"
        />
        <h2 className="text-[50px] pb-10 lg:pb-0 text-black font-bold text-center leading-tight lg:leading-none">
          How to get started
        </h2>
        <Image
          src={"/Images/AffiliatePage/SVG (2).svg"}
          alt="img"
          width={140}
          height={140}
          className="ml-auto -translate-y-36  -translate-x-44 hidden lg:block"
        />

        <div className=" px-3 lg:px-0 flex flex-col lg:flex-row lg:justify-around justify-start items-center gap-6 lg:gap-0">
          <div className="w-full lg:w-[357px] space-y-3">
            <div className="flex justify-start items-center gap-3">
              <Image
                src={"/Images/AffiliatePage/Background.svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] lg:text-[26px]  font-bold leading-tight lg:leading-none">
                Get your affiliate link
              </h3>
            </div>
            <p className="text-[16px]  lg:text-left ">
              Copy your personal referral link and share it across your
              channels.
            </p>
          </div>

          <div className="w-full lg:w-[357px] space-y-3">
            <div className="flex justify-start items-center gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (1).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] lg:text-[26px]  font-bold leading-tight lg:leading-none">
                Invite friends
              </h3>
            </div>
            <p className="text-[16px]  lg:text-left">
              The more customers you attract, the more revenue you get.
            </p>
          </div>

          <div className="w-full lg:w-[357px] space-y-3">
            <div className="flex justify-start items-center gap-3">
              <Image
                src={"/Images/AffiliatePage/Background (2).svg"}
                alt="img"
                width={32}
                height={32}
              />
              <h3 className="text-[24px] lg:text-[26px]  font-bold leading-tight lg:leading-none">
                Earn 30% commission
              </h3>
            </div>
            <p className="text-[16px]  lg:text-left ">
              Get paid for every package your referred users purchase.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10  lg:mt-20">
          <Link href="/" className="block w-full lg:w-auto ">
            <div className="text-[20px] text-center hover:bg-[#4977db] w-full lg:w-[282.95px] py-3 text-white rounded-2xl bg-[#2563EB]">
              Get your affiliate link
            </div>
          </Link>
        </div>

        <Image
          src={"/Images/AffiliatePage/Vector (4).svg"}
          alt="img"
          width={140}
          height={140}
          className="ml-auto -translate-y-20  -translate-x-44 hidden lg:block"
        />
      </div>

      {/* ------------------------------------------------------------------------------------- */}
      {/* <div className="lg:px-20">
        <div className="flex flex-col lg:flex-row lg:justify-around justify-center items-center gap-10 lg:gap-40">
          <Image
            src={"/Images/AffiliatePage/Vector (4).svg"}
            alt="img"
            width={140}
            height={140}
            className="hidden lg:block"
          />
          <h2 className="text-[50px] text-black font-bold text-center leading-tight lg:leading-none">
            {affiliate.affiliateReviewTitle}
          </h2>
          <Image
            src={"/Images/AffiliatePage/SVG (3).svg"}
            alt="img"
            width={140}
            height={140}
          />
        </div>

        <div className="my-10 lg:my-20">
          <div className="flex flex-wrap justify-center items-center gap-5 ">
            {affiliate.reviewListItems.map((af, index) => (
              <div
                key={af._id || index}
                className="w-[360px] space-y-5 border-[1px] border-[#C0C0C0] rounded-lg p-5 flex flex-col justify-between"
              >
                <div className="flex justify-start items-center gap-2">
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                  <ReviewStar />
                </div>
                <p className="text-[16px] text-left leading-[30px] flex-grow">
                  {af.text}
                </p>
                <div className="flex justify-start items-center gap-3 ">
                  <div className="w-[68px] h-[68px]">
                    <Image
                      src={urlFor(af.authorImage).url()}
                      alt="img"
                      width={200}
                      height={200}
                      className="rounded-full correct-image"
                    />
                  </div>
                  <div>
                    <p className="text-[16px] text-black font-bold text-left">
                      {af.name}
                    </p>
                    <p className="text-[16px] text-black font-bold text-left">
                      {af.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <Testimonial affiliateReviewTitle={affiliate.affiliateReviewTitle} reviewListItems={affiliate.reviewListItems} />

      {/* ------------------------------------------------------------------------------------- */}

      <div className="relative lg:pt-0 mt-40 ">
        <div className=" flex justify-around items-start lg:gap-[800px]">
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
            className="mt-10 translate-y-44 hidden lg:block"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end items-center">
          <h2 className="font-bold text-[44px] text-center pb-10">FAQ</h2>
        </div>
      </div>

      <div className=" lg:mb-40">
        <AccordionAffiliate />
      </div>

      {/* ------------------------------------------------------------------------------------------ */}
    </div>
  );
}
