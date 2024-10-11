"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { PricingTypes } from "@/types";

async function getPricing() {
  const query = `
  *[_type == "pricing"][0]{ 
    discountYear,
  }
  `;
  const data = await client.fetch(query);
  return data;
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

  useEffect(() => {
    async function fetchPricing() {
      const data = await getPricing();
      setPricing(data);
    }
    fetchPricing();
  }, []);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (
          prevTime.days === 0 &&
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(timer);
          return prevTime;
        }

        const newTime = { ...prevTime };
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

  return (
    <div className="relative">
      {isVisible && (
        <div className="relative">
          <div className="fixed bottom-1 md:left-[120px] lg:bottom-5 lg:left-[140px] z-50">
            <Image
              src={"/Images/HomePage/Group 59507 (2).svg"}
              alt="image"
              width={109.39}
              height={114.2}
              className="z-50 translate-y-[170px] translate-x-[800px] hidden lg:block"
            />

            <div className="flex items-center justify-center lg:justify-start">
              <div className="lg:translate-x-10 translate-y-[60px] rounded-full bg-yellow-400 text-[#2563eb] font-bold py-2 px-10 text-[16px]">
                Save up to {pricing?.discountYear ?? 0}%
              </div>
            </div>

            <XCircle
              width={40}
              height={40}
              color="#2563eb"
              onClick={() => setIsVisible(false)}
              className="cursor-pointer translate-y-4 ml-auto z-[55]"
            />

            <div className="bg-[#2563eb] mx-5 lg:mx-0 lg:w-[1240px] lg:h-[72px] p-2 flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:rounded-full rounded-3xl">
              <span className="text-white text-[22px] font-semibold text-center px-6 pt-2 lg:pt-0">
                Your exclusive one-time trial discount
              </span>

              <div className="flex items-center space-x-4 text-white lg:ml-auto lg:pr-6">
                {Object.entries(timeLeft).map(([unit, value], index) => {
                  const unitAbbreviation = {
                    days: "days",
                    hours: "hours",
                    minutes: "min",
                    seconds: "sec",
                  }[unit];

                  return (
                    <div key={unit} className="text-center">
                      <div className="w-[50px]">
                        <div
                          className={`text-[26px] p-0 font-black ${
                            index !== Object.entries(timeLeft).length - 1
                              ? "border-r-[1px] pr-4"
                              : ""
                          }`}
                        >
                          {value.toString().padStart(2, "0")}
                        </div>
                      </div>
                      <div className="text-[12px] border-none pr-2">
                        {unitAbbreviation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
