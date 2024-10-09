"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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

  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && isDesktop) setStartCounting(true);
    },
  });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center lg:py-20 gradient-home lg:mt-20 py-10 px-5"
    >
      <h2 className="font-bold text-h2M lg:text-h2 text-center leading-tight">
        {sectionThreeTitle}
      </h2>
      <p className="text-pMobile lg:text-pMain lg:w-[657px] text-center pt-5 lg:pt-0">
        {sectionThreeText}
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 pt-10">
        <div className="bg-white lg:w-[397.33px] w-[350px] rounded-3xl flex flex-col justify-center items-center p-5">
          <Image
            src={"/Images/HomePage/star.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
          />
          <p className="text-[64px] font-bold">
            $
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeStarsNumber}
                duration={5}
                separator=","
                decimals={sectionThreeStarsNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeStarsNumber // Display the static value on mobile
            )}
            <span className="text-[#2563EB]">M</span>
          </p>
          <p className="text-[22px] text-center">
            {sectionThreeTextUnderStarsNumber}
          </p>
        </div>

        <div className="bg-white lg:w-[397.33px] w-[350px] rounded-3xl flex flex-col justify-center items-center p-5">
          <Image
            src={"/Images/HomePage/users.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
          />
          <p className="text-[64px] font-bold">
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeUsersNumber}
                duration={5}
                separator=","
                decimals={sectionThreeUsersNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeUsersNumber 
            )}
            <span className="text-[#2563EB]">K</span>
          </p>
          <p className="text-[22px] text-center">
            {sectionThreeTextUnderUsersNumber}
          </p>
        </div>

        <div className="bg-white lg:w-[397.33px] w-[350px] rounded-3xl flex flex-col justify-center items-center p-5">
          <Image
            src={"/Images/HomePage/time.svg fill.svg"}
            alt="image"
            width={50}
            height={50}
          />
          <p className="text-[64px] font-bold">
            $
            {isDesktop && startCounting ? (
              <CountUp
                start={0}
                end={sectionThreeTimeNumber}
                duration={5}
                separator=","
                decimals={sectionThreeTimeNumber % 1 !== 0 ? 2 : 0}
                decimal="."
              />
            ) : (
              sectionThreeTimeNumber
            )}
            <span className="text-[#2563EB]">M</span>
          </p>
          <p className="text-[22px] text-center">
            {sectionThreeTextUnderTimeNumber}
          </p>
        </div>
      </div>

      <div className="lg:flex lg:justify-center lg:items-center w-[250px] lg:w-auto">
        <Link href="/" className="block w-full">
          <div className="text-[20px] text-center hover:bg-[#4977db] w-full lg:w-[197.11px] my-10 py-3 text-white rounded-2xl bg-[#2563EB]">
            Start free trial
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeCounter;
