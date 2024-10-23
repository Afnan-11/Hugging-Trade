import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { HomeTypes } from "@/types";
import HomeCounter from "@/components/HomeCounter";
import { Metadata } from "next";
import Script from "next/script";
import CountdownTimer from "@/components/CountdownTimer";
import SliderCalculator from "@/components/SliderCalculator";
import VideoMembers from "@/components/VideoMembers";
import AccordionHome from "@/components/AccordionHome";

async function getHome(): Promise<HomeTypes | null> {
  try {
    const query = `
      *[_type == "home"][0]{
        heroTitle,
        heroText,
        heroTextUnderButton,
        sectionThreeTitle,
        sectionThreeText,
        sectionThreeStarsNumber,
        sectionThreeTextUnderStarsNumber,
        sectionThreeUsersNumber,
        sectionThreeTextUnderUsersNumber,
        sectionThreeTimeNumber,
        sectionThreeTextUnderTimeNumber,
        sliderTitle,
        sliderText,
        sliderAverageMonthlyIncome,
        sectionSixTitle,
        sectionSevenTitle,
        sectionSevenText,
        sectionSevenSubTitleOne,
        sectionFourteenTitle,
        reviewsText,
        metaTitle,
        metaDescription,
        keywords,
      }
    `;
    const data: HomeTypes = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return null;
  }
}

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const home: HomeTypes | null = await getHome();

  const title = home?.metaTitle;
  const description = home?.metaDescription;
  const keywords = home?.keywords ? home.keywords.join(", ") : "";

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    creator: "Hugging Trade",
    generator: "Next.js",
    publisher: "Hugging Trade",
    alternates: {
      canonical: "https://www.huggingtrade.com",
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

export default async function Home() {
  const home: HomeTypes | null = await getHome();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        name: "Hugging Trade",
        "@id": "https://huggingtrade.com",
        url: "https://huggingtrade.com",
        legalName: "Hugging Trade",
        description:
          "Hugging Trade is an automated trading platform offering hands-free investment strategies for clients worldwide. Our expert team manages trading using cautious, proven methods to deliver consistent returns while users simply connect their brokerage accounts and watch their profits grow.",
        logo: "https://www.huggingtrade.com/HuggingPrimaryWEBSITETextAndIcon%20(1).svg",
        foundingDate: "2021-09",
        owns: {
          "@type": "Product",
          name: "Hugging Trade",
          url: "https://huggingtrade.com/",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "5",
          },
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 King William St.",
          addressRegion: "London",
          postalCode: "EC4N 7BJ",
          addressCountry: "United Kingdom",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@huggingtrade.com",
        },
        sameAs: [
          "https://www.facebook.com/huggingtrade/",
          "https://www.instagram.com/huggingtrade/",
          "https://x.com/HuggingTrade",
          "https://www.youtube.com/@huggingtrade",
        ],
        faqPage: {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why is this better than other trading platforms or bots?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Unlike trading bots, which require manual setup and extensive backtesting, our experienced trading team delivers far higher returns without any effort on your part.",
              },
            },
            {
              "@type": "Question",
              name: "Who can use this platform?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Anyone from any country can use our platform—there are no restrictions.",
              },
            },
            {
              "@type": "Question",
              name: "Is there a money-back guarantee?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we offer a full money-back guarantee to give you complete peace of mind.",
              },
            },
            {
              "@type": "Question",
              name: "What brokers do you work with?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We recommend IC Markets for most regions and Oanda for the USA and Canada. Both are highly reputable with fast withdrawals and low to no commissions.",
              },
            },
            {
              "@type": "Question",
              name: "How does it work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our team of seasoned traders manage your account, trading on your behalf with cautious strategies to ensure no down months. We only profit when you do.",
              },
            },
            {
              "@type": "Question",
              name: "Short on time and want to learn trading?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hugging Trade is not aimed at those looking to learn trading. We believe in a fully managed approach where we do all the work for you while you enjoy triple returns each month.",
              },
            },
            {
              "@type": "Question",
              name: "How much can I make?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Every month, you can expect returns between 150%-200%. However, once your balance reaches $500,000, the monthly profit reduces to 50%, but could be more. Use the investment calculator on our website to calculate your projected earnings.",
              },
            },
            {
              "@type": "Question",
              name: "How do you make money?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We charge a monthly subscription and take 35% of your profits each month. However, once your balance reaches $500,000, the monthly profit reduces to 50%, and we take 15%.",
              },
            },
            {
              "@type": "Question",
              name: "Is my money secure?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, your funds remain with a regulated broker, and we can never access them. You’re always in control of your money.",
              },
            },
            {
              "@type": "Question",
              name: "How does the profit sharing work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "At the end of each month, we take 35% of your profits. You have 5 days to pay; if not, there’s an additional 5% penalty. After 10 days, your account will be disconnected until payment is made.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        name: "Hugging Trade",
        url: "https://huggingtrade.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://huggingtrade.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden lg:-mt-10 lg:mb-20 lg:pb-0">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        id="structured-data-homepage"
      />

      {/* <div className="lg:flex justify-center"> */}
        <CountdownTimer />
      {/* </div> */}
      <div>
        <div className="hidden pt-5 lg:block lg:pt-10">
          <div className="relative -mt-20">
            <div className="flex scale-90 transform items-center justify-center px-20">
              <Image
                src={"/Images/HomePage/Group 59497.svg"}
                alt="img"
                width={1283}
                height={723}
                loading="eager"
              />
            </div>
            <div className="absolute inset-1 flex flex-col items-center justify-center gap-5 text-center lg:gap-10">
              <h1 className={`px-5 font-black leading-tight text-black lg:w-[994px] lg:text-h1`}>{home?.heroTitle}</h1>

              <p className="text-pMain lg:w-[971px]">{home?.heroText}</p>

              <div className="flex flex-col items-center">
                <div className="relative z-[55]">
                  <Link
                    href="/sign-in"
                    className="block"
                  >
                    <div className="rounded-2xl bg-[#2563EB] text-center text-white hover:bg-[#4977db] lg:w-[348px] lg:py-3 lg:text-[22px]">
                      Start free trial
                    </div>
                  </Link>

                  <div className="w-[360px]">
                    <Image
                      src={"/Images/HomePage/scribble final version-72.svg"}
                      alt="image"
                      width={43}
                      height={63}
                      className="] z-50 -mt-7 ml-auto"
                      loading="eager"
                    />
                  </div>
                </div>
                <p className="-mt-3 text-[14px]">{home?.heroTextUnderButton}</p>
              </div>
            </div>

            <div className="ml-auto w-[400px]">
              <Image
                src={"/Images/HomePage/scribble final version-07.svg"}
                alt="image"
                width={67.32}
                height={774}
                className="z-50 mt-2"
                loading="eager"
              />
            </div>

            <div className="-mt-20 flex -translate-y-20 justify-center gap-2">
              <p className="text-[20px]">Excellent</p>
              <Image
                src={"/Images/HomePage/Frame 1261155460.svg"}
                alt="image"
                width={174}
                height={31}
                loading="eager"
              />
              <p className="text-[20px]">
                <span className="font-bold">4.9</span> out of 5 based on <span className="font-bold">592 reviews</span>
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}

        <div className="px-5 lg:hidden">
          <div className="pt-10">
            <div className="flex flex-col items-center justify-center gap-10 text-center lg:gap-10">
              <h2 className={`w-full text-[44px] font-black leading-[50px] text-black lg:leading-none`}>
                {home?.heroTitle}
              </h2>

              <p className="text-center text-pMobile">{home?.heroText}</p>

              <div className="flex w-[328px] flex-col items-center justify-center">
                <div className="w-full">
                  <Link
                    href="/sign-in"
                    scroll={true}
                    className="block"
                  >
                    <div className="rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white">
                      Start free trial
                    </div>
                  </Link>

                  <div className="w-full">
                    <Image
                      src={"/Images/HomePage/scribble final version-72.svg"}
                      alt="image"
                      width={43}
                      height={63}
                      className="z-50 -mt-7 ml-auto"
                      loading="eager"
                    />
                  </div>
                </div>
                <p className="-mt-3 text-[14px]">{home?.heroTextUnderButton}</p>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col items-center justify-center lg:-mt-5 lg:flex-row lg:gap-2">
              <p className="text-[20px]">Excellent</p>
              <Image
                src={"/Images/HomePage/Frame 1261155460.svg"}
                alt="image"
                width={174}
                height={31}
                className="scale-50"
                loading="eager"
              />
              <p className="text-[20px]">
                <span className="font-bold">4.9</span> out of 5 based on <span className="font-bold">592 reviews</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------- */}

      <div className="flex flex-col items-center px-5 py-10 pt-20 lg:px-0">
        <h2 className="w-full pb-7 text-center text-h2M font-bold leading-[50px] lg:w-[700px] lg:pb-0 lg:text-h2 lg:leading-none">
          The Hidden Pitfalls of Traditional Trading Methods
        </h2>
        <p className="w-full text-center text-pMobile lg:w-[600px] lg:pt-10 lg:text-pMain">
          Discover why conventional approaches are holding you back from true financial freedom.
        </p>

        <div className="relative">
          <div className="flex items-center justify-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59495 (1).svg"}
              alt="img"
              width={599}
              height={96}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center justify-center gap-5 text-center">
            <h3 className={`pt-14 text-[20px] font-bold text-white lg:w-[470px] lg:text-[30px]`}>
              Why DIY Trading is Costing You Time and Money
            </h3>
          </div>
        </div>

        <div className="space-y-6 pt-10 text-left text-[20px]">
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Spending countless hours on market research and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Making emotional decisions that lead to costly mistakes</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Struggling to balance trading with your full-time job</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Facing a steep learning curve and inconsistent results</p>
          </div>
        </div>

        <div className="py-5">
          <Image
            src={"/Images/HomePage/40-arrow-515x1024.png (1).svg"}
            alt="img"
            width={64.39}
            height={128.02}
            loading="lazy"
          />
        </div>

        <div className="relative">
          <div className="flex items-center justify-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59494.svg"}
              alt="img"
              width={676}
              height={96}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center justify-center gap-5 text-center">
            <h3 className="pt-14 text-[20px] font-bold text-white lg:w-[470px] lg:text-[30px]">
              Hugging Trade vs. Conventional Trading Solutions
            </h3>
          </div>
        </div>

        <div className="space-y-6 pt-10 text-left text-[20px]">
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />

            <p>Expert-driven strategies outperform AI bots and manual trading</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>No need for expensive, time-consuming courses</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Hands-off approach eliminates emotional decision-making</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
              loading="lazy"
            />
            <p>Aim for higher returns than traditional investments</p>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------------- */}

      <div className="lg:-mt-20">
        <HomeCounter
          sectionThreeTitle={home?.sectionThreeTitle || ""}
          sectionThreeText={home?.sectionThreeText || ""}
          sectionThreeStarsNumber={home?.sectionThreeStarsNumber || 0}
          sectionThreeTextUnderStarsNumber={home?.sectionThreeTextUnderStarsNumber || ""}
          sectionThreeUsersNumber={home?.sectionThreeUsersNumber || 0}
          sectionThreeTextUnderUsersNumber={home?.sectionThreeTextUnderUsersNumber || ""}
          sectionThreeTimeNumber={home?.sectionThreeTimeNumber || 0}
          sectionThreeTextUnderTimeNumber={home?.sectionThreeTextUnderTimeNumber || ""}
        />
      </div>

      {/* -------------------------------------------------------------------------------------- */}

      <SliderCalculator
        sliderTitle={home?.sliderTitle || ""}
        sliderText={home?.sliderText || ""}
        sliderAverageMonthlyIncome={home?.sliderAverageMonthlyIncome || ""}
      />

      {/* ---------------------------------------------------------------------------- */}

      <div className="px-5 py-20 lg:-mt-20 lg:px-0">
        <h2 className="text-center text-h2M font-bold leading-10 lg:text-h2">{home?.sectionSixTitle}</h2>

        <div className="flex flex-col items-center justify-center gap-20 pt-10 lg:flex-row lg:pt-20">
          <div>
            <p className="text-pMobile">Here&apos;s what you&apos;re missing by not using Hugging Trade:</p>
            <div className="space-y-3 pt-10 text-left text-pMobile">
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Potential monthly returns of 150-200%</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Precious time wasted on complex trading strategies</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Peace of mind from stress-free, automated trading</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>The lifestyle that comes with true financial freedom</p>
              </div>
            </div>

            <Image
              src={"/Images/HomePage/88.svg"}
              alt="image"
              width={81.83}
              height={63.64}
              className="-ml-20 -mt-10 hidden lg:block"
              loading="lazy"
            />

            <Link
              href="/sign-in"
              scroll={true}
              className="block w-full"
            >
              <div className="mt-10 w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[22px] text-white hover:bg-[#4977db] lg:-mt-5 lg:w-[197px]">
                Start free trial
              </div>
            </Link>
          </div>

          <Image
            src={"/Images/HomePage/Group 59481.svg"}
            alt="image"
            width={318}
            height={417.45}
            className="w-40 lg:w-[290px]"
            loading="lazy"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------- */}

      <div className="px-5 lg:px-0 lg:py-20 xl:px-20">
        <h2 className="text-center text-h2M font-bold leading-tight lg:text-h2 lg:leading-none">
          {home?.sectionSevenTitle}
        </h2>
        <p className="pt-10 text-center text-pMobile lg:pt-5 lg:text-pMain">{home?.sectionSevenText}</p>

        <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
          <div className="py-20">
            <h3 className="pb-3 text-center text-h3 font-bold lg:text-left">{home?.sectionSevenSubTitleOne}</h3>
            <p className="pb-10 text-center text-pMobile lg:w-[800px] lg:text-left">
              Create your Hugging Trade account and securely link your preferred brokerage account. Your funds stay
              under your control - always.
            </p>

            <div className="space-y-5">
              <div className="flex items-center justify-start gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-109.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  loading="lazy"
                />
                <p className="text-pMobile">Sign up for your Hugging Trade account in minutes</p>
              </div>

              <div className="flex items-center justify-start gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-110.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  loading="lazy"
                />
                <p className="text-pMobile">Connect your preferred brokerage account securely</p>
              </div>

              <div className="flex items-center justify-start gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-111.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  loading="lazy"
                />
                <p className="text-pMobile">Choose your initial investment amount - $300 minimum required</p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/Images/HomePage/SVG.svg"}
              alt="image"
              width={305}
              height={305}
              className="-mt-20 w-40 lg:w-[305px]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="scale-90 transform">
          <Image
            src={"/Images/HomePage/03.svg"}
            alt="image"
            width={137}
            height={159.23}
            className="z-50 -mb-32 ml-auto hidden -translate-x-24 lg:block"
            loading="lazy"
          />
          <div className="flex items-center justify-center">
            <div className="w-full space-y-10 rounded-[48px] border-[1px] border-gray-200 px-10 py-10 shadow-md lg:w-[1000px]">
              <div className="flex items-center lg:justify-center lg:gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-27.svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-5"
                  loading="lazy"
                />
                <p className="text-center text-[25px] font-black leading-7 lg:text-[32px] lg:font-bold lg:leading-none">
                  No brokerage account yet?
                </p>

                <Image
                  src={"/Images/HomePage/scribble final version-27 (1).svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-5"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-pMobile font-medium lg:text-pMain">
                We&apos;ll guide you through setting up with one of our trusted partners.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <Image
          src={"/Images/HomePage/1.svg"}
          alt="image"
          width={69.45}
          height={72.31}
          className="ml-auto hidden lg:block lg:-translate-x-40"
          loading="lazy"
        />
        <div className="flex flex-col items-center justify-center px-2 lg:flex-row">
          <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-[490px] lg:justify-start">
            <div className="group flex w-[150px] items-center justify-center gap-2 rounded-xl bg-[#FAE4F9] p-3 hover:bg-[#945CA4] lg:w-[185px]">
              <Image
                src={"/Images/HomePage/Mask Group.svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#945CA4] group-hover:text-white">Limit</p>
            </div>

            <div className="group flex w-[175px] items-center justify-center gap-2 rounded-xl bg-[#E4E1FF] p-3 hover:bg-[#2563EB] lg:w-[210px]">
              <Image
                src={"/Images/HomePage/Mask Group (1).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#2563EB] group-hover:text-white">TWAP</p>
            </div>

            <div className="group flex w-[239px] items-center justify-center gap-2 rounded-xl bg-[#E1FEF3] p-3 hover:bg-[#029747]">
              <Image
                src={"/Images/HomePage/Mask Group (2).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#029747] group-hover:text-white">Market</p>
            </div>

            <div className="group flex w-[279px] items-center justify-center gap-2 rounded-xl bg-[#CCFAFE] p-3 hover:bg-[#2563EB]">
              <Image
                src={"/Images/HomePage/Mask Group (3).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#2563EB] group-hover:text-white">Stop limit</p>
            </div>

            <div className="group flex w-[174px] items-center justify-center gap-2 rounded-xl bg-[#E3EEFC] p-3 hover:bg-[#2563EB] lg:w-[209px]">
              <Image
                src={"/Images/HomePage/Mask Group (4).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#2563EB] group-hover:text-white">Scaled</p>
            </div>

            <div className="group flex w-[150px] items-center justify-center gap-2 rounded-xl bg-[#FCE9E3] p-3 hover:bg-[#E04515] lg:w-[185px]">
              <Image
                src={"/Images/HomePage/Mask Group (5).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:brightness-0 group-hover:contrast-200 group-hover:invert group-hover:filter"
                loading="lazy"
              />
              <p className="text-[36px] text-[#E04515] group-hover:text-white">Stop</p>
            </div>
          </div>
          <div className="px-5 pt-10 lg:px-0 lg:pt-0">
            <h3 className="pb-3 text-center text-h3 font-bold leading-tight lg:text-left lg:leading-none">
              Step 2: <span className="text-h3 font-bold">Customize Your Investment Strategy</span>
            </h3>
            <p className="pt-5 text-center text-pMobile lg:w-[775px] lg:text-left">
              Invest any amount you&apos;re comfortable with. Our system adapts to your goals, whether you&apos;re
              starting small or thinking big.
            </p>
            <p className="py-6 text-center text-pMobile lg:text-left">
              The longer you invest, the more profit you can earn.
            </p>
            <div className="space-y-3 text-left text-pMobile">
              <div className="flex items-center gap-2">
                {/* <CircleCheck color="#A0A3A9" /> */}
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="text-pMobile">No complex strategies — just one that works.</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="text-[20px]">Set your desired investment amount</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="text-[20px]">Adjust your deposit anytime as your goals change.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="scale-90 transform lg:mt-20">
          <Image
            src={"/Images/HomePage/03.svg"}
            alt="image"
            width={137}
            height={159.23}
            className="z-50 -mb-32 ml-auto hidden -translate-x-44 lg:block"
            loading="lazy"
          />
          <div className="flex items-center justify-center pr-5 lg:pr-0">
            <Image
              src={"/Images/HomePage/Vector.svg"}
              alt="image"
              width={24.07}
              height={24.93}
              className="z-50 -mt-8 -translate-x-32"
              loading="lazy"
            />
            <div className="mt-5 w-full space-y-10 rounded-[48px] border-[1px] border-gray-200 px-5 py-5 shadow-md lg:mt-0 lg:w-[1000px] lg:px-10 lg:py-10">
              <div className="flex items-center justify-center lg:gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-27.svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-10 lg:-mt-5"
                  loading="lazy"
                />
                <p className="text-center text-[25px] font-bold leading-7 lg:text-[32px] lg:leading-none">
                  Wondering about minimum investments?
                </p>

                <Image
                  src={"/Images/HomePage/scribble final version-27 (1).svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-10 lg:-mt-5"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-pMobile font-medium lg:text-pMain">
                Start small and scale up as you see results. $300 recommended.
              </p>
            </div>
          </div>
          <Image
            src={"/Images/HomePage/scribble final version-48.svg"}
            alt="image"
            width={73.28}
            height={69.35}
            className="z-50 -mt-8 ml-auto -translate-x-14 lg:-translate-x-72"
            loading="lazy"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------------- */}

      <div className="mt-10 flex flex-col items-center justify-center px-5 lg:mt-20 lg:flex-row lg:gap-40 lg:px-0">
        <div className="">
          <h3 className="pb-3 text-center text-h3 font-bold lg:text-left">
            Step 3: <span className="text-h3 font-bold">Watch Your Wealth Grow</span>
          </h3>
          <p className="pb-10 text-center text-pMobile lg:w-[640px] lg:text-left">
            Relax as our expert traders work for you. We combine deep market insights with technical analysis to target
            150-200% monthly returns.
          </p>

          <div className="space-y-4 text-left text-[20px]">
            <div className="flex items-center gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
                loading="lazy"
              />
              <p>Advanced algorithms execute trades automatically</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
                loading="lazy"
              />
              <p>Real-time performance tracking keeps you informed</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
                loading="lazy"
              />
              <p>Monthly payouts allow for reinvestment or withdrawal</p>
            </div>
          </div>
        </div>

        <Image
          src={"/Images/HomePage/Group 59488.svg"}
          alt="image"
          width={419.6}
          height={354.5}
          className="w-64 pb-20 lg:h-[354.5] lg:w-[419.6px]"
          loading="lazy"
        />
      </div>

      <div className="scale-90 transform">
        <Image
          src={"/Images/HomePage/03.svg"}
          alt="image"
          width={137}
          height={159.23}
          className="z-50 -mb-32 ml-auto hidden -translate-x-44 lg:block"
          loading="lazy"
        />
        <div className="flex items-center justify-center px-5 lg:px-0">
          <Image
            src={"/Images/HomePage/Vector (1).svg"}
            alt="image"
            width={41.67}
            height={43.59}
            className="z-50 -mt-8 hidden -translate-x-32 lg:block"
            loading="lazy"
          />
          <div className="space-y-10 rounded-[48px] border-[1px] border-gray-200 px-5 py-10 shadow-md lg:w-[1000px] lg:px-10">
            <div className="flex items-center justify-center gap-5">
              <Image
                src={"/Images/HomePage/scribble final version-27.svg"}
                alt="image"
                width={42.99}
                height={39.65}
                className="-mt-5"
                loading="lazy"
              />
              <p className="text-center text-[25px] font-bold leading-7 lg:text-[32px] lg:leading-none">
                Curious about accessing your profits?
              </p>

              <Image
                src={"/Images/HomePage/scribble final version-27 (1).svg"}
                alt="image"
                width={42.99}
                height={39.65}
                className="-mt-5"
                loading="lazy"
              />
            </div>
            <p className="text-center text-pMobile font-medium lg:text-pMain">
              Enjoy monthly payouts - reinvest or withdraw, it&apos;s your choice.
            </p>
          </div>
        </div>
        <Image
          src={"/Images/HomePage/scribble final version-129.svg"}
          alt="image"
          width={71.3}
          height={67.67}
          className="-mt-14 mr-auto translate-x-60"
          loading="lazy"
        />
        <Image
          src={"/Images/HomePage/19.svg"}
          alt="image"
          width={71.3}
          height={67.67}
          className="ml-auto mt-0 hidden -translate-x-40 pb-5 lg:-mt-8 lg:block lg:pb-0"
          loading="lazy"
        />
      </div>

      {/* -------------------------------------------------------------------- */}

      <div className="gradient-home my-20 px-5 pb-10 lg:px-0 xl:px-20">
        <div className="relative pt-20">
          <div className="flex justify-center">
            <Image
              src={"/Images/HomePage/Vector (2).svg"}
              alt="image"
              width={1282}
              height={86}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end">
            <h2 className="text-center text-h2M font-bold lg:w-[500px] lg:text-h2">
              Secure<span className="text-[#2563EB]">.</span>Fast
              <span className="text-[#2563EB]">.</span>Easy
              <span className="text-[#2563EB]">.</span>
            </h2>
            <p className="text-center text-pMobile lg:pt-1 lg:text-pMain">
              Our platform executes trades, while keeping all information confidential.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:flex-row">
          <div className="flex h-[370px] w-[397.33px] flex-col items-center justify-center rounded-3xl bg-white p-5">
            <Image
              src={"/Images/HomePage/Image.svg"}
              alt="image"
              width={124}
              height={124}
              loading="lazy"
            />
            <p className="pt-5 text-[28px] font-bold">Your funds are secure</p>
            <p className="w-[303px] pt-4 text-center text-[17px]">
              Hugging Trade doesn&apos;t have access to funds on your brokerage account and cannot withdraw them.
            </p>
          </div>

          <div className="flex h-[370px] w-[397.33px] flex-col items-center justify-center rounded-3xl bg-white p-5">
            <Image
              src={"/Images/HomePage/61.svg"}
              alt="image"
              width={71}
              height={105}
              loading="lazy"
            />
            <p className="pt-5 text-[28px] font-bold">API key is all you need</p>
            <p className="w-[303px] pt-4 text-center text-[17px]">
              Simply connect your brokerage account using a secure API connection and get started.
            </p>
          </div>

          <div className="flex h-[370px] w-[397.33px] flex-col items-center justify-center rounded-3xl bg-white p-5">
            <Image
              src={"/Images/HomePage/08.svg"}
              alt="image"
              width={108.18}
              height={96.25}
              loading="lazy"
            />
            <p className="pt-5 text-[28px] font-bold">Fast trading servers</p>
            <p className="w-[303px] pt-4 text-center text-[17px]">
              Our servers are located close to popular exchanges to ensure stable and fast order execution.
            </p>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------- */}
      <VideoMembers />
      {/* ------------------------------------------------------------------------------------------------- */}

      <div className="relative mt-20 pt-20 lg:mt-0 xl:px-20">
        <div className="flex justify-center">
          <Image
            src={"/Images/HomePage/Vector (2).svg"}
            alt="image"
            width={1282}
            height={86}
            className="hidden lg:block"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <h2 className="pb-10 text-center text-h2M font-bold lg:text-h2">FAQ</h2>
        </div>
      </div>

      <div className="px-5 lg:px-0">
        <AccordionHome />
      </div>
      {/* ------------------------------------------------------------------------------------------------------ */}

      <div className="mx-5 -mt-20 mb-10 rounded-2xl bg-[#F3F4F6] lg:mx-20 lg:my-10 lg:-mt-0 lg:rounded-[56px]">
        <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 pb-20 lg:px-0">
          <h2 className="text-center text-h2M font-bold leading-tight lg:text-h2 lg:leading-none">
            One Dashboard. Many Trading Tools
          </h2>
          <p className="text-center text-pMobile text-[#374151] lg:w-[868px] lg:text-pMain">
            Hugging Trade goes beyond expert trading, offering automated trading and actionable analytics in a
            multi-functional platform.
          </p>
          <Image
            src={"/Images/HomePage/Tablist.svg"}
            alt="image"
            width={385}
            height={56}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center justify-center px-5 lg:flex-row lg:px-0 lg:pl-32">
          <div className="lg:-mt-[120px]">
            <h3 className="pb-10 text-center text-[25px] font-bold lg:w-[500px] lg:text-left lg:text-[20px]">
              Manage portfolio performance and maximize returns with all-in-one dashboard:
            </h3>

            <div className="space-y-2 text-left text-pMobile">
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>3-minute sign-up process</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Accurate profit forecasting</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Flexible investment options</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Expert-driven trading strategies</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p>Real-time performance tracking</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="">No long-term commitment - cancel anytime</p>
              </div>
            </div>
          </div>

          <div>
            <Image
              src={"/Images/HomePage/Dashboard.svg"}
              alt="image"
              width={1320}
              height={732}
              className="mt-5 -translate-x-[9px] pb-5 lg:mt-0 lg:-translate-x-[0px] lg:pb-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------------- */}

      <Image
        src={"/Images/HomePage/Group 59507 (2).svg"}
        alt="image"
        width={115.62}
        height={113.39}
        className="z-[60] block translate-x-[20px] translate-y-[335px] lg:hidden"
        loading="lazy"
      />

      <div className="-mb-[200px] -mt-20 h-[1000px] scale-75 transform lg:hidden">
        <div className="">
          <Image
            src={"/Images/HomePage/Vector (9).svg"}
            alt="image"
            width={317.84}
            height={288.56}
            loading="lazy"
          />

          <Image
            src={"/Images/HomePage/Vector (8).svg"}
            alt="image"
            width={317.84}
            height={288.56}
            loading="lazy"
          />

          <Image
            src={"/Images/HomePage/Vector (6).svg"}
            alt="image"
            width={309}
            height={282}
            loading="lazy"
          />
        </div>
        <div className="-mt-[1000px]">
          <div className="relative z-50 -mb-[130px]">
            <div className="flex items-center justify-center pt-14">
              <Image
                src={"/Images/HomePage/Group 59495 (1).svg"}
                alt="img"
                width={437}
                height={96}
                loading="lazy"
              />
            </div>
            <div className="absolute inset-1 flex flex-col items-center justify-center gap-5 text-center">
              <h2 className={`w-full pt-12 text-[30px] font-bold text-white`}>{home?.sectionFourteenTitle}</h2>
            </div>
          </div>

          <div className="relative mt-[200px] flex flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <Image
                src={"/Images/HomePage/Group 59512 (1).svg"}
                alt="image"
                width={176.9}
                height={680.88}
                className="translate-x-20 translate-y-6"
                loading="lazy"
              />

              <div className="absolute inset-0 mt-[100px] flex flex-col items-center justify-center gap-80 text-[25px] font-bold">
                <p className="-translate-y-5">Sign Up</p>
                <p className="">Connect</p>
                <p className="-translate-y-7">Start trading</p>
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <p className="">All your data is secured with high-end encryption.</p>

              <Link
                href="/sign-in"
                scroll={true}
                className="z-[85] block w-full"
              >
                <div className="mt-10 w-full rounded-2xl bg-[#2563EB] py-3 text-center text-[20px] text-white hover:bg-[#4977db] lg:w-[210px]">
                  Start free trial
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={"/Images/HomePage/Group (5).svg"}
        alt="image"
        width={102.06}
        height={106.05}
        className="w-14 -translate-y-[300px] translate-x-[300px] lg:hidden"
        loading="lazy"
      />

      {/* -------------------------------------------------------------------------------------- */}
      <div className="mt-60 hidden lg:block">
        <div className="relative z-50 -mb-[350px] mr-14">
          <div className="flex items-center justify-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59495 (1).svg"}
              alt="img"
              width={437}
              height={96}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center justify-center gap-5 text-center">
            <h2 className={`pt-12 font-bold text-white lg:w-[470px] lg:text-[30px]`}>{home?.sectionFourteenTitle}</h2>
          </div>
        </div>

        <div className="relative mt-40 flex flex-col items-center gap-20">
          <Image
            src={"/Images/HomePage/Group 59508.svg"}
            alt="image"
            width={1000}
            height={573}
            loading="lazy"
          />

          <div className="absolute inset-0 mt-[50px] flex items-center justify-around px-40 text-[32px] font-bold">
            <p>Sign Up</p>
            <p>Connect</p>
            <p>Start trading</p>
          </div>

          <div className="-mt-[300px] flex flex-col items-center gap-1">
            <p className="">All your data is secured with high-end encryption.</p>

            <Link
              href="/sign-in"
              scroll={true}
              className="z-50 block"
            >
              <div className="mr-14 mt-10 rounded-2xl bg-[#2563EB] text-center text-white hover:bg-[#4977db] lg:w-[210px] lg:py-3 lg:text-[20px]">
                Start free trial
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
