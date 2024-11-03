"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {XCircle} from "lucide-react";
import {client} from "@/sanity/lib/client";
import {PricingTypes} from "@/types";
import {useTranslations} from "next-intl";

async function getPricing() {
  const query = `
    *[_type == "pricing"][0]{ 
      discountMonth,
      discountYear,
      showYearlyDiscount,
    }
  `;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    return null;
  }
}

export default function CountdownTimer() {
  const [pricing, setPricing] = useState<PricingTypes | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 54,
    seconds: 19,
  });
  const [isVisible, setIsVisible] = useState(true);

  const t = useTranslations("CountDownTimer");

  useEffect(() => {
    async function fetchPricing() {
      const data = await getPricing();
      setPricing(data);
    }
    fetchPricing();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.days === 0 && prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        const newTime = {...prevTime};
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else {
          newTime.seconds = 59;
          if (newTime.minutes > 0) {
            newTime.minutes--;
          } else {
            newTime.minutes = 59;
            if (newTime.hours > 0) {
              newTime.hours--;
            } else {
              newTime.hours = 23;
              newTime.days--;
            }
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:relative lg:flex lg:items-start lg:justify-center">
      <div className="relative">
        <div className="fixed bottom-1 z-50 mt-0 pt-0 md:left-[120px] lg:bottom-5 lg:left-[140px] lg:translate-y-[12%] lg:scale-75">
          <Image
            src="/Images/HomePage/Group 59507 (2).svg"
            alt="Discount Icon"
            width={109.39}
            height={114.2}
            className="relative z-50 hidden pt-0 lg:absolute lg:left-[750px] lg:top-[70px] lg:block"
          />

          <div className="mt-4 flex items-center justify-center lg:justify-start">
            <div className="translate-y-[60px] rounded-full bg-yellow-400 px-10 py-2 text-[16px] font-bold text-[#2563eb] lg:translate-x-10">
              {pricing?.showYearlyDiscount
                ? `${t("saveUpTo")} ${pricing?.discountYear ?? 0}% ${t("yearly")}`
                : `${t("saveUpTo")} ${pricing?.discountMonth ?? 0}% ${t("monthly")}`}
            </div>
          </div>

          <XCircle
            width={40}
            height={40}
            color="#2563eb"
            onClick={() => setIsVisible(false)}
            className="z-[55] ml-auto translate-y-4 cursor-pointer"
          />

          <div className="mx-5 flex flex-col items-center justify-center rounded-3xl bg-[#2563eb] p-2 lg:mx-0 lg:h-[72px] lg:w-[1240px] lg:flex-row lg:justify-between lg:rounded-full">
            <span className="px-6 pt-2 text-center text-[22px] font-semibold text-white lg:pt-0">
            {t("yourExclusive")}
            </span>

            <div className="flex items-center space-x-4 text-white lg:ml-auto lg:pr-6">
              {Object.entries(timeLeft).map(([unit, value], index) => {
                const unitAbbreviation = {
                  days: `${t("days")}`,
                  hours: `${t("hours")}`,
                  minutes: `${t("minutes")}`,
                  seconds: `${t("seconds")}`,
                }[unit];

                return (
                  <div
                    key={unit}
                    className="text-center"
                  >
                    <div className="w-[50px]">
                      <div
                        className={`p-0 text-[26px] font-black ${
                          index !== Object.entries(timeLeft).length - 1 ? "border-r-[1px] pr-4" : ""
                        }`}
                      >
                        {value.toString().padStart(2, "0")}
                      </div>
                    </div>
                    <div className="border-none pr-2 text-[12px]">{unitAbbreviation}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
