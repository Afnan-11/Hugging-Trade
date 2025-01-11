"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import Slider from "react-slider";
import {HTMLProps} from "react";
import {useTranslations} from "next-intl";

interface Props {
  sliderTitle: string;
  sliderText: string;
  sliderAverageMonthlyIncome: string;
}

const SliderCalculator = ({sliderTitle, sliderText, sliderAverageMonthlyIncome}: Props) => {
  // State for initial deposit, months, and calculated balance
  const [initialDeposit, setInitialDeposit] = useState(500);
  const [months, setMonths] = useState(2);
  const [balance, setBalance] = useState(0);

  const t = useTranslations("HomePage");

  // Function to calculate the compounded balance
  const calculateBalance = useCallback(() => {
    const data = [];
    let currentBalance = initialDeposit;

    for (let i = 1; i <= months; i++) {
      const startingBalance = currentBalance;

      // Calculate profit (e.g., if balance > $500,000, profit multiplier is 0.5)
      const profit = currentBalance >= 500000 ? currentBalance * 0.5 : currentBalance * 2;

      // Calculate fee percentage (e.g., 35% for balance < $500,000)
      const platformFeeRate = currentBalance >= 500000 ? 0.15 : 0.35;
      const fee = profit * platformFeeRate;

      // Calculate ending balance
      const endingBalance = startingBalance + (profit - fee);

      // Save data for the month
      data.push({month: i, startingBalance, profit, fee, endingBalance});

      // Update current balance for the next iteration
      currentBalance = endingBalance;
    }

    setBalance(currentBalance);
  }, [initialDeposit, months]);

  useEffect(() => {
    calculateBalance();
  }, [calculateBalance]);
  return (
    <div className="gradient-pricing flex flex-col items-center justify-center px-5 lg:h-[775px] lg:px-0">
      <div className="h-[780px] rounded-xl bg-white p-5 shadow-2xl lg:h-[490px] lg:w-[1152px] lg:p-0 lg:px-10">
        <Image
          src={"/Images/HomePage/bg_affiliate-program-reviews_desktop.svg.svg"}
          alt="image"
          width={277.08}
          height={109.07}
          className="ml-10 hidden lg:block"
        />

        <Image
          src={"/Images/HomePage/Group 59507 (1).svg"}
          alt="image"
          width={109.39}
          height={114.2}
          className="-mt-32 ml-auto hidden translate-x-20 lg:block"
        />

        <div className="text-center">
          <div className="space-y-5">
            <h2 className="px-5 text-h2M font-bold leading-10 lg:px-0 lg:text-h2 lg:leading-none">{sliderTitle}</h2>
            <p className="px-5 text-pMobile lg:px-0 lg:text-pMain">{sliderText}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center lg:flex-row lg:items-start">
          <div className="flex flex-col items-center justify-center lg:w-1/2 lg:items-start lg:justify-start">
            <div className="w-[400px] rounded-xl bg-[#EFF6FF] p-2 lg:w-[528px] lg:p-0">
              <p className="text-center text-[35px] font-bold text-[#2563EB] lg:text-[60px]">
                $
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="text-[28.13px]"> USD</span>
              </p>
            </div>
            <div className="flex w-full items-center justify-center">
              <p className="px-5 pt-3 text-center text-[16px] text-[#6B7280]">{sliderAverageMonthlyIncome}</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-5 lg:w-1/2 lg:pl-5 lg:pt-0">
            <p className="text-[13.78px] font-medium text-[#374151]">
              {t("investmentPeriod")} {months} {t("months")}
            </p>

            <div className="w-full max-w-md">
              <Slider
                value={months}
                marks
                min={1}
                max={12}
                onChange={(value: number) => setMonths(value)}
                className="mt-2 h-2 w-full rounded bg-[#F4F4F5]"
                renderTrack={(props: HTMLProps<HTMLDivElement>, state: {index: number; value: number}) => {
                  const {key, ...restProps} = props;
                  return (
                    <div
                      key={key}
                      {...restProps}
                      style={{
                        ...restProps.style,
                        backgroundColor: state.index === 0 ? "#18181B" : "#F4F4F5",
                      }}
                      className="h-2 rounded"
                    >
                      {restProps.children}
                    </div>
                  );
                }}
                renderThumb={(props) => (
                  <div
                    {...props}
                    key={props.key}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      marginTop: "-6px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "2px solid blue",
                      cursor: "pointer",
                    }}
                  />
                )}
              />
              <div className="flex items-center justify-between pl-2 pt-2">
                <p>1m</p>
                <p className="pr-6">6m</p>
                <p>12m</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 pt-3">
              <div className="mt-3 flex flex-col items-start justify-start gap-2 lg:-mt-3">
                <label
                  htmlFor=""
                  className="mt-2 text-[13.89px] font-medium text-[#374151]"
                >
                  {t("deposit")}
                </label>
                <input
                  type="number"
                  id="deposit"
                  value={initialDeposit === 0 ? "" : initialDeposit}
                  min="1"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setInitialDeposit(0);
                    } else {
                      setInitialDeposit(Number(value));
                    }
                  }}
                  className="rounded-xl border bg-white p-2 outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
            <p className="mt-2 text-[11.81px] font-medium text-[#6B7280]">{t("minDeposit")}</p>
          </div>
        </div>

        <Image
          src={"/Images/HomePage/Group (4).svg"}
          alt="image"
          width={56.54}
          height={62.71}
          className="-mt-20 hidden translate-x-20 translate-y-20 lg:block"
        />

        <div className="my-10 flex justify-center px-10 lg:px-0">
          <div className="w-full lg:w-auto">
            <Link
              href="/sign-up"
              scroll={true}
              className="block w-full"
            >
              <div className="w-full rounded-2xl bg-[#2563EB] py-3 text-center text-white hover:bg-[#4977db] lg:w-[348px] lg:text-[20px]">
                {t("startFreeTrial")}
              </div>
            </Link>

            <p className="mt-2 text-center text-[11.44px] text-[#6B7280]">{t("minDeposit2")}</p>
          </div>
        </div>

        <div className="-mt-[200px]">
          <Image
            src={"/Images/HomePage/scribble final version-63.svg"}
            alt="image"
            width={127}
            height={104.6}
            className="ml-auto hidden -translate-x-36 lg:block"
          />
        </div>

        <div className="-mt-[200px]">
          <Image
            src={"/Images/HomePage/scribble final version-07 (2).svg"}
            alt="image"
            width={47.32}
            height={54.4}
            className="ml-auto hidden -translate-x-10 translate-y-40 lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderCalculator;
