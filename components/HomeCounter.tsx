"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import CountUp from "react-countup";
import {useInView} from "react-intersection-observer";
import {useTranslations} from 'next-intl';

interface Props {
  sectionThreeTitle: string;
  sectionThreeText: string;
  sectionThreeStarsNumber: number;
  sectionThreeTextUnderStarsNumber: string;
  sectionThreeUsersNumber: number;
  sectionThreeTextUnderUsersNumber: string;
  sectionThreeTimeNumber: number;
  sectionThreeTextUnderTimeNumber: string;
}

const HomeCounter = ({
  sectionThreeTitle,
  sectionThreeText,
  sectionThreeStarsNumber,
  sectionThreeTextUnderStarsNumber,
  sectionThreeUsersNumber,
  sectionThreeTextUnderUsersNumber,
  sectionThreeTimeNumber,
  sectionThreeTextUnderTimeNumber,
}: Props) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [startCounting, setStartCounting] = useState(false);

  const t = useTranslations('HomePage');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const {ref} = useInView({
    triggerOnce: true,
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && isDesktop) setStartCounting(true);
    },
  });

  return (
    <div
      ref={ref}
      className="gradient-home flex flex-col items-center px-5 pt-2.5 md:py-10 lg:mt-20 lg:py-20"
    >
      <h2 className="text-center text-[20px] md:text-h2M font-bold leading-tight lg:text-h2">{sectionThreeTitle}</h2>
      <p className="pt-2 md:pt-5 text-center text-pMobile lg:w-[657px] lg:pt-0 lg:text-pMain">{sectionThreeText}</p>

      <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:flex-row">
        <div className="flex w-[350px] flex-col items-center justify-center rounded-3xl bg-white p-5 lg:w-[397.33px]">
          <Image
            src={"/Images/HomePage/star.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
          />
          <p className="text-[33px] md:text-[64px] font-bold">
            $
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeStarsNumber}
                duration={10}
                separator=","
                decimals={sectionThreeStarsNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeStarsNumber // Display the static value on mobile
            )}
            <span className="text-[#2563EB]">M</span>
          </p>
          <p className="text-center text-[16px] md:text-[22px]">{sectionThreeTextUnderStarsNumber}</p>
        </div>

        <div className="flex w-[350px] flex-col items-center justify-center rounded-3xl bg-white p-5 lg:w-[397.33px]">
          <Image
            src={"/Images/HomePage/users.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
            className="w-[30px] h-[30px] md:w-[50px] md:[50px]"
          />
          <p className="text-[33px] md:text-[64px] font-bold">
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeUsersNumber}
                duration={10}
                separator=","
                decimals={sectionThreeUsersNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeUsersNumber
            )}
            <span className="text-[#2563EB]">K</span>
          </p>
          <p className="text-center text-[16px] md:text-[22px]">{sectionThreeTextUnderUsersNumber}</p>
        </div>

        <div className="flex w-[350px] flex-col items-center justify-center rounded-3xl bg-white p-5 lg:w-[397.33px]">
          <Image
            src={"/Images/HomePage/time.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
          />
          <p className="text-[33px] md:text-[64px] font-bold">
            $
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeTimeNumber}
                duration={10}
                separator=","
                decimals={sectionThreeTimeNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeTimeNumber
            )}
            <span className="text-[#2563EB]">M</span>
          </p>
          <p className="text-center text-[16px] md:text-[22px]">{sectionThreeTextUnderTimeNumber}</p>
        </div>
      </div>

      <div className="w-[250px] lg:flex lg:w-auto lg:items-center lg:justify-center">
        <Link
          href="/sign-up"
          scroll={true}
          className="block w-full"
        >
          <div className="my-10  w-full rounded-2xl bg-[#2563EB] py-2  md:py-3 text-center  md:text-[20px] text-white hover:bg-[#4977db] lg:w-[348px]">
          {t("startFreeTrial")}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeCounter;
