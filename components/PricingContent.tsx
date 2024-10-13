"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import PeriodToggle from "./PeriodToggle";
import { PricingTypes } from "@/types";


interface PricingContentProps {
  pricing: PricingTypes;
}

const PricingContent: React.FC<PricingContentProps> = ({ pricing }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"year" | "month">(
    "month"
  );

  // Calculate discounted monthly price and savings
  const discountPercentageMonth = pricing.discountMonth; // Assuming a 20% discount for month
  const originalPrice = pricing.priceMonth; // Monthly price from Sanity
  const discountedPriceMonthly = (
    originalPrice *
    (1 - discountPercentageMonth / 100)
  ).toFixed(2);
  const savings = (
    originalPrice - Number(discountedPriceMonthly)
  ).toFixed(2);

  // Calculate discounted yearly price and savings
  // Assuming priceMonth and discountYear are coming from pricing object
const discountPercentageYear = pricing.discountYear; // Yearly discount percentage from Sanity
const originalPriceMonth = pricing.priceMonth; // Monthly price from Sanity

// Calculate the regular yearly price (without discount)
const regularYearlyPrice = originalPriceMonth * 12;

// Calculate the discounted monthly price
const discountedPriceYearly = (
  originalPriceMonth * (1 - discountPercentageYear / 100)
).toFixed(2);

// Calculate the total discounted yearly price
const totalDiscountedYearlyPrice = (Number(discountedPriceYearly) * 12).toFixed(2);

// Calculate savings per year
const yearlySavings = (regularYearlyPrice - Number(totalDiscountedYearlyPrice)).toFixed(2);

// console.log("Yearly savings: $", yearlySavings);

  return (
    <div className="py-10 lg:py-40">
      <div className="px-5 lg:px-20 space-y-5">
        <h2 className="text-[40px] lg:text-[56px] font-bold text-center leading-tight lg:leading-none">
          {pricing.pricingSectionTwoTitle}
        </h2>
        <p className="text-[22px] text-center">
          {pricing.pricingSectionTwoText}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-20">
        <div className="flex items-center gap-2">
          <PeriodToggle
            selectedPeriod={selectedPeriod}
            onPeriodChange={(period) => setSelectedPeriod(period)}
            discountYear={pricing.discountYear}
            discountMonth={pricing.discountMonth}

          />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      <div className="lg:flex lg:justify-center lg:items-center mt-8 px-5 lg:px-5 space-y-10 lg:space-y-0">
        <div className="lg:w-[524px] lg:h-[549.58px] p-10  border-[#E4E7E5] border-[1px] rounded-[20px] space-y-10">
          <div className="space-y-5">
            <div className="text-[30px] lg:h-[100px] text-center font-medium space-x-2">
              {selectedPeriod === "month" ? (
                // <span>Starts at ${originalPriceMonth}/month</span>
                <>
                  <span>${discountedPriceMonthly}/month</span>
                  <span className="price-line text-[20px] text-gray-400">
                    {" "}
                    ${originalPrice}/month
                  </span>
                </>
              ) : (
                <>
                  <span>${discountedPriceYearly}/month</span>
                  <span className="price-line text-[20px] text-gray-400">
                    {" "}
                    ${originalPriceMonth}/month
                  </span>
                </>
              )}

              {selectedPeriod === "month" && (
                <div className="flex justify-center">
                  <div className="bg-green-100 w-[320px] text-[#07c37a] p-2 rounded-[20px] text-[20px] text-center">
                    You save ${savings} per month!
                  </div>
                </div>
              )}

              {selectedPeriod === "year" && (
                <div className="flex flex-col justify-center items-center">
                  <div className="bg-green-100 w-[320px] text-[#07c37a] p-2 rounded-[20px] text-[20px] text-center">
                    You save ${yearlySavings} per year!
                  </div>
                  
                </div>
              )}


            </div>

            <p className="text-[15.49px]">{pricing.pricingLeftText}</p>
          </div>

          <div className="space-y-2">
            {pricing.leftListItems.map((price, index) => (
              <div
                key={price._id || index}
                className="flex justify-start items-center gap-2"
              >
                <div className="rounded-full bg-[#2563EB] p-1">
                  <Check color="white" width={10} height={10} />
                </div>
                <p className="text-[15.49px]">{price.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            <Link href="/">
              <div className="text-[15.62px] text-center lg:w-[229.52px] py-3 text-white rounded-xl bg-[#2563EB]">
                Start your 30-day free trial
              </div>
            </Link>
            <div className="flex justify-start items-center gap-2 ">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={14}
                height={14}
              />

              <p className="text-[13.45px] text-[#89908B]">
                {pricing.leftSmallTextUnderButtonOne}
                {/* Change your tier anytime */}
              </p>
              <div className="flex justify-start items-center gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={14}
                  height={14}
                />
                <p className="text-[13.45px] text-[#89908B]">{pricing.leftSmallTextUnderButtonTwo}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[524px] lg:h-[549.58px] space-y-20 p-12 bg-[#EFF1EF] border-[#E4E7E5] border-[1px] rounded-[20px]">
          <h3 className="text-[20.63px] font-medium">
            {pricing.pricingRightTitle}
          </h3>

          <div>
            {pricing.rightListItems.map((price, index) => (
              <div
                key={price._id || index}
                className="flex justify-start items-center gap-2 my-1"
              >
                <div className="rounded-full bg-[#2563EB] p-1">
                  <Check color="white" width={10} height={10} />
                </div>
                <p className="text-[17.02px] font-medium">{price.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 underline underline-offset-2">
              <Link href="/">{pricing.buttonRight}</Link>
              <ArrowRight width={16.78} height={17} />
            </div>
            <p className="text-[12px] text-[#89908B]">
              {pricing.textUnderRightButton}

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
