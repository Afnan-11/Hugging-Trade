import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { HomeTypes } from "@/types";
import SliderCalculator from "@/components/SliderCalculator";
import AccordionHome from "@/components/AccordionHome";
import VideoMembers from "@/components/VideoMembers";
import HomeCounter from "@/components/HomeCounter";
import CountdownTimer from "@/components/CountdownTimer";
import { Metadata } from "next";

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
    return null; // Return null if an error occurs
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
  };
}

export default async function Home() {
  const home: HomeTypes | null = await getHome();
  return (
    <div className="lg:pb-0 lg:-mt-10 lg:mb-20  overflow-hidden">
      <CountdownTimer />
      <div>
        <div className="  hidden lg:block pt-5 lg:pt-10 ">
          <div className="relative -mt-20">
            <div className="transform scale-90 flex justify-center items-center px-20">
              <Image
                src={"/Images/HomePage/Group 59497.svg"}
                alt="img"
                width={1283}
                height={723}
                loading="eager"
                priority
              />
            </div>
            <div className="absolute inset-1 flex flex-col items-center  justify-center text-center gap-5 lg:gap-10 ">
              <h1
                className={`lg:text-h1  font-black text-black  px-5 lg:w-[994px] leading-tight `}
              >
                {home?.heroTitle}
              </h1>

              <p className="lg:w-[971px] text-pMain">{home?.heroText}</p>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <Link href="/" className="block">
                    <div className="lg:text-[22px] text-center hover:bg-[#4977db]  lg:w-[348px] lg:py-3 text-white rounded-2xl bg-[#2563EB]">
                      Start free trial
                    </div>
                  </Link>

                  <div className="w-[360px]">
                    <Image
                      src={"/Images/HomePage/scribble final version-72.svg"}
                      alt="image"
                      width={43}
                      height={63}
                      className="z-50 -mt-7 ml-auto ]"
                    />
                  </div>
                </div>
                <p className="text-[14px] -mt-3">{home?.heroTextUnderButton}</p>
              </div>
            </div>

            <div className="w-[400px] ml-auto">
              <Image
                src={"/Images/HomePage/scribble final version-07.svg"}
                alt="image"
                width={67.32}
                height={774}
                className="z-50 mt-2"
              />
            </div>

            <div className="flex justify-center gap-2 -mt-20 -translate-y-20">
              <p className="text-[20px]">Excellent</p>
              <Image
                src={"/Images/HomePage/Frame 1261155460.svg"}
                alt="image"
                width={174}
                height={31}
              />
              <p className="text-[20px]">
                <span className="font-bold">4.9</span> out of 5 based on{" "}
                <span className="font-bold">592 reviews</span>
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}

        <div className="px-5 lg:hidden">
          <div className="pt-10">
            <div className=" flex flex-col items-center  justify-center text-center gap-10 lg:gap-10 ">
              <h1
                className={` text-[44px] font-black text-black  w-full leading-[50px] lg:leading-none   `}
              >
                {home?.heroTitle}
              </h1>

              <p className=" text-pMobile text-center ">{home?.heroText}</p>

              <div className="flex flex-col items-center justify-center w-[328px]">
                <div className=" w-full">
                  <Link href="/" className="block">
                    <div className="text-[22px]  text-center py-3 text-white rounded-2xl bg-[#2563EB]">
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
                    />
                  </div>
                </div>
                <p className="text-[14px] -mt-3">{home?.heroTextUnderButton}</p>
              </div>
            </div>

            <div className=" mt-5 flex flex-col lg:flex-row justify-center items-center lg:gap-2 lg:-mt-5 w-full ">
              <p className="text-[20px] ">Excellent</p>
              <Image
                src={"/Images/HomePage/Frame 1261155460.svg"}
                alt="image"
                width={174}
                height={31}
                className="scale-50"
              />
              <p className="text-[20px]">
                <span className="font-bold">4.9</span> out of 5 based on{" "}
                <span className="font-bold">592 reviews</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------- */}

      <div className="flex flex-col items-center px-5 lg:px-0 py-10 pt-20">
        <h2 className="font-bold lg:text-h2 text-h2M text-center pb-7 lg:pb-0 w-full leading-[50px] lg:leading-none  lg:w-[700px]">
          The Hidden Pitfalls of Traditional Trading Methods
        </h2>
        <p className="text-center text-pMobile lg:text-pMain w-full lg:w-[600px] lg:pt-10">
          Discover why conventional approaches are holding you back from true
          financial freedom.
        </p>

        <div className="relative">
          <div className="  flex justify-center items-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59495 (1).svg"}
              alt="img"
              width={599}
              height={96}
              priority
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center  justify-center text-center gap-5  ">
            <h3
              className={` text-[20px]  lg:text-[30px]  lg:w-[470px] font-bold text-white   pt-14  `}
            >
              Why DIY Trading is Costing You Time and Money
            </h3>
          </div>
        </div>

        <div className="space-y-6 pt-10 text-[20px] text-left">
          <div className="flex  items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
            />
            <p>Spending countless hours on market research and analysis</p>
          </div>
          <div className="flex  items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
            />
            <p>Making emotional decisions that lead to costly mistakes</p>
          </div>
          <div className="flex  items-center gap-2">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
            />
            <p>Struggling to balance trading with your full-time job</p>
          </div>
          <div className="flex  items-center gap-2 ">
            <Image
              src={"/Images/HomePage/x-circle.svg"}
              alt="img"
              width={29}
              height={29}
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
            priority
            quality={100}
          />
        </div>

        <div className="relative">
          <div className=" flex justify-center items-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59494.svg"}
              alt="img"
              width={676}
              height={96}
              priority
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center  justify-center text-center gap-5  ">
            <h3 className="text-[20px]  lg:text-[30px] lg:w-[470px] font-bold text-white  pt-14">
              Hugging Trade vs. Conventional Trading Solutions
            </h3>
          </div>
        </div>

        <div className="space-y-6 pt-10 text-[20px] text-left">
          <div className="flex  items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
            />

            <p>
              Expert-driven strategies outperform AI bots and manual trading
            </p>
          </div>
          <div className="flex  items-center gap-2">
            {/* <CircleCheck color="gray" /> */}
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
            />
            <p>No need for expensive, time-consuming courses</p>
          </div>
          <div className="flex  items-center gap-2">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
            />
            <p>Hands-off approach eliminates emotional decision-making</p>
          </div>
          <div className="flex  items-center gap-2 ">
            <Image
              src={"/Images/HomePage/checkmark.svg.svg"}
              alt="img"
              width={29}
              height={29}
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
          sectionThreeTextUnderStarsNumber={
            home?.sectionThreeTextUnderStarsNumber || ""
          }
          sectionThreeUsersNumber={home?.sectionThreeUsersNumber || 0}
          sectionThreeTextUnderUsersNumber={
            home?.sectionThreeTextUnderUsersNumber || ""
          }
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

      <div className="py-20 px-5 lg:px-0 lg:-mt-20 ">
        <h2 className="font-bold text-h2M lg:text-h2 text-center leading-10">
          {home?.sectionSixTitle}
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-20 pt-10 lg:pt-20">
          <div>
            <p className="text-pMobile ">
              Here&apos;s what you&apos;re missing by not using Hugging Trade:
            </p>
            <div className="space-y-3 pt-10 text-pMobile   text-left">
              <div className="flex  items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Potential monthly returns of 150-200%</p>
              </div>
              <div className="flex  items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Precious time wasted on complex trading strategies</p>
              </div>
              <div className="flex  items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Peace of mind from stress-free, automated trading</p>
              </div>
              <div className="flex  items-center gap-2 ">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
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
            />

            <Link href="/" className="block w-full">
              <div className="text-[22px] text-center hover:bg-[#4977db] w-full lg:w-[197px] lg:-mt-5 mt-10 py-3 text-white rounded-2xl bg-[#2563EB]">
                Start free trial
              </div>
            </Link>
          </div>

          <Image
            src={"/Images/HomePage/Group 59481.svg"}
            alt="image"
            width={318}
            height={417.45}
            className="lg:w-[290px] w-40"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------- */}

      <div className="lg:py-20 px-5 lg:px-0 xl:px-20">
        <h2 className="font-bold text-h2M lg:text-h2 text-center leading-tight lg:leading-none">
          {home?.sectionSevenTitle}
        </h2>
        <p className="lg:text-pMain text-pMobile text-center pt-10 lg:pt-5">
          {home?.sectionSevenText}
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="py-20">
            <h3 className="font-bold text-h3 lg:text-left text-center pb-3">
              Step 1:{" "}
              <span className="font-bold text-h3 ">Effortless Setup</span>
            </h3>
            <p className="lg:w-[800px] text-pMobile pb-10 text-center lg:text-left">
              Create your Hugging Trade account and securely link your preferred
              brokerage account. Your funds stay under your control - always.
            </p>

            <div className="space-y-5">
              <div className="flex justify-start items-center gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-109.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  className=""
                />
                <p className=" text-pMobile ">
                  Sign up for your AutoTrade Pro account in minutes
                </p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-110.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  className=""
                />
                <p className=" text-pMobile ">
                  Connect your preferred brokerage account securely
                </p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <Image
                  src={"/Images/HomePage/scribble final version-111.svg"}
                  alt="image"
                  width={19}
                  height={35}
                  className=""
                />
                <p className=" text-pMobile ">
                  Choose your initial investment amount - $300 minimum required
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/Images/HomePage/SVG.svg"}
              alt="image"
              width={305}
              height={305}
              className="w-40 lg:w-[305px] -mt-20"
            />
          </div>
        </div>

        <div className="transform scale-90  ">
          <Image
            src={"/Images/HomePage/03.svg"}
            alt="image"
            width={137}
            height={159.23}
            className="z-50 ml-auto -mb-32 -translate-x-24 hidden lg:block"
          />
          <div className="flex justify-center items-center ">
            <div className="border-[1px] shadow-md border-gray-200 rounded-[48px] py-10 px-10 w-full lg:w-[1000px] space-y-10">
              <div className="flex lg:justify-center items-center lg:gap-5 ">
                <Image
                  src={"/Images/HomePage/scribble final version-27.svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-5 "
                />
                <p className=" text-[25px] lg:text-[32px] font-black lg:font-bold text-center leading-7 lg:leading-none">
                  No brokerage account yet?
                </p>

                <Image
                  src={"/Images/HomePage/scribble final version-27 (1).svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="-mt-5 "
                />
              </div>
              <p className="text-center text-pMobile lg:text-pMain  font-medium ">
                We&apos;ll guide you through setting up with one of our trusted
                partners.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" pt-10">
        <Image
          src={"/Images/HomePage/1.svg"}
          alt="image"
          width={69.45}
          height={72.31}
          className="ml-auto lg:-translate-x-40 hidden lg:block"
        />
        <div className="flex flex-col lg:flex-row justify-center items-center px-2">
          <div className="flex flex-wrap justify-center items-center lg:justify-start gap-2 w-full lg:w-[490px] ">
            <div className="w-[150px] lg:w-[185px] bg-[#FAE4F9] hover:bg-[#945CA4] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group.svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#945CA4] group-hover:text-white text-[36px]">
                Limit
              </p>
            </div>

            <div className="w-[175px] lg:w-[210px] bg-[#E4E1FF] hover:bg-[#2563EB] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group (1).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#2563EB] group-hover:text-white text-[36px]">
                TWAP
              </p>
            </div>

            <div className="w-[239px] bg-[#E1FEF3] hover:bg-[#029747] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group (2).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#029747] group-hover:text-white text-[36px]">
                Market
              </p>
            </div>

            <div className="w-[279px] bg-[#CCFAFE] hover:bg-[#2563EB] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group (3).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#2563EB] group-hover:text-white text-[36px]">
                Stop limit
              </p>
            </div>

            <div className="w-[174px] lg:w-[209px] bg-[#E3EEFC] hover:bg-[#2563EB] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group (4).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#2563EB] group-hover:text-white text-[36px]">
                Scaled
              </p>
            </div>

            <div className="w-[150px] lg:w-[185px] bg-[#FCE9E3] hover:bg-[#E04515] gap-2 flex justify-center items-center p-3 rounded-xl group">
              <Image
                src={"/Images/HomePage/Mask Group (5).svg"}
                alt="image"
                width={42}
                height={42}
                className="group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <p className="text-[#E04515] group-hover:text-white text-[36px]">
                Stop
              </p>
            </div>
          </div>
          <div className="px-5 lg:px-0 pt-10 lg:pt-0 ">
            <h3 className="font-bold  text-h3 text-center lg:text-left pb-3 leading-tight lg:leading-none">
              Step 2:{" "}
              <span className="font-bold text-h3">
                Customize Your Investment Strategy
              </span>
            </h3>
            <p className="lg:w-[775px] text-pMobile pt-5 text-center lg:text-left">
              Invest any amount you&apos;re comfortable with. Our system adapts
              to your goals, whether you&apos;re starting small or thinking big.
            </p>
            <p className=" text-pMobile py-6 text-center lg:text-left">
              The longer you invest, the more profit you can earn.
            </p>
            <div className="space-y-3  text-pMobile text-left">
              <div className="flex  items-center gap-2">
                {/* <CircleCheck color="#A0A3A9" /> */}
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p className="text-pMobile">
                  No complex strategies — just one that works.
                </p>
              </div>
              <div className="flex  items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p className="text-[20px]">
                  Set your desired investment amount
                </p>
              </div>
              <div className="flex  items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p className="text-[20px]">
                  Adjust your deposit anytime as your goals change.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-20 transform scale-90 ">
          <Image
            src={"/Images/HomePage/03.svg"}
            alt="image"
            width={137}
            height={159.23}
            className="z-50 ml-auto -mb-32 -translate-x-44 hidden lg:block"
          />
          <div className="flex justify-center items-center pr-5 lg:pr-0">
            <Image
              src={"/Images/HomePage/Vector.svg"}
              alt="image"
              width={24.07}
              height={24.93}
              className="z-50 -mt-8 -translate-x-32"
            />
            <div className="border-[1px] border-gray-200 shadow-md rounded-[48px] mt-5 lg:mt-0 py-5 lg:py-10 px-5 lg:px-10 w-full lg:w-[1000px] space-y-10">
              <div className="flex justify-center items-center lg:gap-5 ">
                <Image
                  src={"/Images/HomePage/scribble final version-27.svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="lg:-mt-5 -mt-10"
                />
                <p className="text-[25px] lg:text-[32px] font-bold leading-7 lg:leading-none text-center">
                  Wondering about minimum investments?
                </p>

                <Image
                  src={"/Images/HomePage/scribble final version-27 (1).svg"}
                  alt="image"
                  width={42.99}
                  height={39.65}
                  className="lg:-mt-5 -mt-10"
                />
              </div>
              <p className="text-center text-pMobile lg:text-pMain font-medium">
                Start small and scale up as you see results. $300 recommended.
              </p>
            </div>
          </div>
          <Image
            src={"/Images/HomePage/scribble final version-48.svg"}
            alt="image"
            width={73.28}
            height={69.35}
            className="z-50 ml-auto -mt-8 lg:-translate-x-72 -translate-x-14"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------------- */}

      <div className="lg:mt-20 mt-10 px-5 lg:px-0 flex flex-col lg:flex-row justify-center items-center lg:gap-40  ">
        <div className="">
          <h3 className="font-bold text-h3 text-center lg:text-left pb-3">
            Step 3:{" "}
            <span className="font-bold text-h3 ">Watch Your Wealth Grow</span>
          </h3>
          <p className="lg:w-[640px] text-pMobile text-center lg:text-left pb-10">
            Relax as our expert traders work for you. We combine deep market
            insights with technical analysis to target 150-200% monthly returns.
          </p>

          <div className="space-y-4  text-[20px] text-left">
            <div className="flex  items-center gap-2">
              {/* <CircleCheck color="#A0A3A9" /> */}
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
              />
              <p>Advanced algorithms execute trades automatically</p>
            </div>
            <div className="flex  items-center gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
              />
              <p>Real-time performance tracking keeps you informed</p>
            </div>
            <div className="flex  items-center gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={29}
                height={29}
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
          className="pb-20 w-64 lg:w-[419.6px] lg:h-[354.5]"
        />
      </div>

      <div className="transform scale-90  ">
        <Image
          src={"/Images/HomePage/03.svg"}
          alt="image"
          width={137}
          height={159.23}
          className="z-50 ml-auto -mb-32 -translate-x-44 hidden lg:block"
        />
        <div className="flex justify-center items-center px-5 lg:px-0">
          <Image
            src={"/Images/HomePage/Vector (1).svg"}
            alt="image"
            width={41.67}
            height={43.59}
            className="z-50  -mt-8 -translate-x-32 hidden lg:block"
          />
          <div className="border-[1px] border-gray-200 shadow-md rounded-[48px] py-10 lg:px-10 px-5 lg:w-[1000px] space-y-10">
            <div className="flex justify-center items-center gap-5 ">
              <Image
                src={"/Images/HomePage/scribble final version-27.svg"}
                alt="image"
                width={42.99}
                height={39.65}
                className="-mt-5"
              />
              <p className="text-[25px] lg:text-[32px] font-bold leading-7 lg:leading-none text-center">
                Curious about accessing your profits?
              </p>

              <Image
                src={"/Images/HomePage/scribble final version-27 (1).svg"}
                alt="image"
                width={42.99}
                height={39.65}
                className="-mt-5"
              />
            </div>
            <p className="text-center text-pMobile lg:text-pMain font-medium">
              Enjoy monthly payouts - reinvest or withdraw, it&apos;s your
              choice.
            </p>
          </div>
        </div>
        <Image
          src={"/Images/HomePage/scribble final version-129.svg"}
          alt="image"
          width={71.3}
          height={67.67}
          className=" mr-auto -mt-14 translate-x-60 "
        />
        <Image
          src={"/Images/HomePage/19.svg"}
          alt="image"
          width={71.3}
          height={67.67}
          className=" ml-auto mt-0 lg:-mt-8  -translate-x-40 pb-5 lg:pb-0 hidden lg:block"
        />
      </div>

      {/* -------------------------------------------------------------------- */}

      <div className="gradient-home pb-10 my-20 px-5 lg:px-0  xl:px-20">
        <div className="relative pt-20">
          <div className=" flex justify-center">
            <Image
              src={"/Images/HomePage/Vector (2).svg"}
              alt="image"
              width={1282}
              height={86}
            />
          </div>
          <div className="absolute inset-0 flex flex-col  justify-end items-center">
            <h2 className="font-bold lg:w-[500px] text-h2M lg:text-h2 text-center ">
              Secure<span className="text-[#2563EB]">.</span>Fast
              <span className="text-[#2563EB]">.</span>Easy
              <span className="text-[#2563EB] ">.</span>
            </h2>
            <p className="text-pMobile lg:text-pMain text-center lg:pt-1">
              Our platform executes trades, while keeping all information
              confidential.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 pt-10">
          <div className="bg-white w-[397.33px] h-[370px] rounded-3xl flex flex-col justify-center items-center p-5">
            <Image
              src={"/Images/HomePage/Image.svg"}
              alt="image"
              width={124}
              height={124}
            />
            <p className="text-[28px] font-bold pt-5">Your funds are secure</p>
            <p className="text-[17px] w-[303px] pt-4 text-center">
              Hugging Trade doesn&apos;t have access to funds on your brokerage
              account and cannot withdraw them.
            </p>
          </div>

          <div className="bg-white w-[397.33px] h-[370px] rounded-3xl flex flex-col justify-center items-center p-5">
            <Image
              src={"/Images/HomePage/61.svg"}
              alt="image"
              width={71}
              height={105}
            />
            <p className="text-[28px] font-bold pt-5">
              API key is all you need
            </p>
            <p className="text-[17px] w-[303px] pt-4 text-center">
              Simply connect your brokerage account using a secure API
              connection and get started.
            </p>
          </div>

          <div className="bg-white w-[397.33px] h-[370px] rounded-3xl flex flex-col justify-center items-center p-5">
            <Image
              src={"/Images/HomePage/08.svg"}
              alt="image"
              width={108.18}
              height={96.25}
            />
            <p className="text-[28px] font-bold pt-5">Fast trading servers</p>
            <p className="text-[17px] w-[303px] pt-4 text-center">
              Our servers are located close to popular exchanges to ensure
              stable and fast order execution.
            </p>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------- */}
      <VideoMembers />
      {/* ------------------------------------------------------------------------------------------------- */}

      <div className="relative pt-20 mt-20 lg:mt-0  xl:px-20">
        <div className=" flex justify-center">
          <Image
            src={"/Images/HomePage/Vector (2).svg"}
            alt="image"
            width={1282}
            height={86}
            className="hidden lg:block "
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end items-center">
          <h2 className="font-bold text-h2M lg:text-h2 text-center pb-10">
            FAQ
          </h2>
        </div>
      </div>

      <div className="px-5 lg:px-0">
        <AccordionHome />
      </div>
      {/* ------------------------------------------------------------------------------------------------------ */}

      <div className="bg-[#F3F4F6] -mt-20 lg:-mt-0 mx-5 lg:mx-20 lg:my-10 lg:rounded-[56px] rounded-2xl  mb-10">
        <div className="flex flex-col justify-center items-center gap-5 py-10 px-5 lg:px-0 pb-20">
          <h2 className="font-bold text-h2M lg:text-h2 text-center leading-tight lg:leading-none">
            One Dashboard. Many Trading Tools
          </h2>
          <p className="lg:w-[868px] text-pMobile lg:text-pMain text-[#374151] text-center">
            Hugging Trade goes beyond expert trading, offering automated trading
            and actionable analytics in a multi-functional platform.
          </p>
          <Image
            src={"/Images/HomePage/Tablist.svg"}
            alt="image"
            width={385}
            height={56}
          />
        </div>

        <div className="lg:pl-32  flex flex-col lg:flex-row justify-center items-center px-5 lg:px-0">
          <div className="lg:-mt-[120px]">
            <h3 className="font-bold lg:text-[20px] text-[25px] lg:text-left text-center  pb-10 lg:w-[500px]">
              Manage portfolio performance and maximize returns with all-in-one
              dashboard:
            </h3>

            <div className="space-y-2  text-pMobile text-left">
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>3-minute sign-up process</p>
              </div>
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Accurate profit forecasting</p>
              </div>
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Flexible investment options</p>
              </div>
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Expert-driven trading strategies</p>
              </div>
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
                />
                <p>Real-time performance tracking</p>
              </div>
              <div className="flex  items-center gap-4">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={29}
                  height={29}
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
              className="-translate-x-[9px] lg:-translate-x-[0px] pb-5 lg:pb-0 mt-5 lg:mt-0"
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
        className="block z-[60] lg:hidden translate-y-[335px] translate-x-[20px]"
      />

      <div className=" h-[1000px] lg:hidden  transform scale-75 -mt-20 -mb-[200px]">
        <div className="">
          <Image
            src={"/Images/HomePage/Vector (9).svg"}
            alt="image"
            width={317.84}
            height={288.56}
          />

          <Image
            src={"/Images/HomePage/Vector (8).svg"}
            alt="image"
            width={317.84}
            height={288.56}
          />

          <Image
            src={"/Images/HomePage/Vector (6).svg"}
            alt="image"
            width={309}
            height={282}
          />
        </div>
        <div className="-mt-[1000px]">
          <div className="z-50 relative -mb-[130px]">
            <div className=" flex justify-center items-center pt-14">
              <Image
                src={"/Images/HomePage/Group 59495 (1).svg"}
                alt="img"
                width={437}
                height={96}
                loading="eager"
                priority
              />
            </div>
            <div className="absolute inset-1 flex flex-col items-center  justify-center text-center gap-5  ">
              <h2
                className={`  text-[30px] w-full font-bold text-white  pt-12  `}
              >
                {home?.sectionFourteenTitle}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center mt-[200px] relative">
            <div className=" w-full flex justify-center items-center relative">
              <Image
                src={"/Images/HomePage/Group 59512 (1).svg"}
                alt="image"
                width={176.9}
                height={680.88}
                className="translate-x-20 translate-y-6"
              />

              <div className=" text-[25px] mt-[100px] font-bold absolute inset-0 flex flex-col justify-center items-center gap-80 ">
                <p className=" -translate-y-5 ">Sign Up</p>
                <p className="">Connect</p>
                <p className=" -translate-y-7 ">Start trading</p>
              </div>
            </div>

            <div className="flex flex-col items-center  mt-20">
              <p className="">
                All your data is secured with high-end encryption.
              </p>

              <Link href="/" className="block z-[85] w-full">
                <div className="text-[20px] text-center hover:bg-[#4977db] mt-10 w-full lg:w-[210px] py-3 text-white rounded-2xl bg-[#2563EB]">
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
        className="w-14 translate-x-[300px] -translate-y-[300px] lg:hidden"
      />

      {/* -------------------------------------------------------------------------------------- */}
      <div className="hidden lg:block mt-60">
        <div className="z-50 relative -mb-[350px] mr-14">
          <div className=" flex justify-center items-center pt-14">
            <Image
              src={"/Images/HomePage/Group 59495 (1).svg"}
              alt="img"
              width={437}
              height={96}
              loading="eager"
              priority
            />
          </div>
          <div className="absolute inset-1 flex flex-col items-center  justify-center text-center gap-5  ">
            <h2
              className={`   lg:text-[30px] lg:w-[470px] font-bold text-white  pt-12  `}
            >
              {home?.sectionFourteenTitle}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center mt-40 relative gap-20">
          <Image
            src={"/Images/HomePage/Group 59508.svg"}
            alt="image"
            width={1000}
            height={573}
          />

          <div className="text-[32px] font-bold absolute inset-0  flex justify-around items-center  mt-[50px] px-40">
            <p>Sign Up</p>
            <p>Connect</p>
            <p>Start trading</p>
          </div>

          <div className="flex flex-col items-center gap-1 -mt-[300px]">
            <p className="">
              All your data is secured with high-end encryption.
            </p>

            <Link href="/" className="block z-50">
              <div className="lg:text-[20px] text-center  hover:bg-[#4977db] mr-14 mt-10  lg:w-[210px] lg:py-3 text-white rounded-2xl bg-[#2563EB]">
                Start free trial
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
