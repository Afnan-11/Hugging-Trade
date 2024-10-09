"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slider";
import { HTMLProps } from "react";

interface Props {
  sliderTitle: string;
  sliderText: string;
  sliderAverageMonthlyIncome: string;
}

const SliderCalculator = ({
  sliderTitle,
  sliderText,
  sliderAverageMonthlyIncome,
}: Props) => {
  // State for initial deposit, months, and calculated balance
  const [initialDeposit, setInitialDeposit] = useState(500);
  const [months, setMonths] = useState(2);
  const [balance, setBalance] = useState(0);

  // Function to calculate the compounded balance
  const calculateBalance = useCallback(() => {
    let currentBalance = initialDeposit;
    for (let i = 0; i < months; i++) {
      // Calculate the profit for the month based on the current balance
      const profit = currentBalance * 2;

      // Deduct 35% of the profit
      const netProfit = profit * (1 - 0.35);

      // Update the current balance by adding the net profit to the existing balance
      currentBalance += netProfit;
    }
    setBalance(currentBalance);
  }, [initialDeposit, months]);

  useEffect(() => {
    calculateBalance();
  }, [calculateBalance]);
  return (
    <div className="flex flex-col justify-center items-center h-[772px]  gradient-pricing px-5 lg:px-0">
      <div className="bg-white rounded-xl shadow-2xl lg:w-[1152px] lg:h-[485px] h-[720px] p-5 lg:p-0  lg:px-10">
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
          className="-mt-32 ml-auto translate-x-20 hidden lg:block"
        />

        <div className="  text-center  ">
          <div className="space-y-5">
            <h2 className="font-bold lg:text-h2 text-h2M leading-10 lg:leading-none px-5 lg:px-0">
              {sliderTitle}
            </h2>
            <p className="text-pMobile lg:text-pMain px-5 lg:px-0">
              {sliderText}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10">
          <div className="lg:w-1/2  flex flex-col  items-center justify-center lg:items-start lg:justify-start">
            <div className="bg-[#EFF6FF] w-[400px] lg:w-[528px] rounded-xl p-2 lg:p-0">
              <p className="lg:text-[60px] text-[35px] text-[#2563EB] font-bold text-center">
                $
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="text-[28.13px] "> USD</span>
              </p>
            </div>
            <div className="flex justify-center items-center w-full ">
              <p className="text-[16px] text-[#6B7280] px-5 pt-3 text-center">
                {sliderAverageMonthlyIncome}
                {/* *Average monthly income after deducting our 35% platform fee */}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col items-start justify-start lg:pl-5 pt-5 lg:pt-0">
            <p className="text-[13.78px] text-[#374151] font-medium ">
              Investment Period: {months} months
            </p>

            <div className="w-full max-w-md">
              <Slider
                value={months}
                marks
                min={1}
                max={12}
                onChange={(value: number) => setMonths(value)}
                className="w-full h-2 mt-2 bg-[#F4F4F5] rounded"
                renderTrack={(
                  props: HTMLProps<HTMLDivElement>,
                  state: { index: number; value: number }
                ) => {
                  const { key, ...restProps } = props;
                  return (
                    <div
                      {...restProps}
                      key={key}
                      style={{
                        ...restProps.style,
                        backgroundColor:
                          state.index === 0 ? "#18181B" : "#F4F4F5",
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
              <div className="flex justify-between items-center pl-2 pt-2">
                <p>1m</p>
                <p className="pr-6">6m</p>
                <p>12m</p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-center gap-5">
              <div className="flex flex-col justify-start items-start gap-2 mt-3 lg:-mt-3">
                <label
                  htmlFor=""
                  className="text-[13.89px] text-[#374151] font-medium mt-2"
                >
                  Enter your initial deposit
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
                  className="p-2 border rounded-xl focus:border-[#2563EB] focus:ring-[#2563EB] focus:ring-1 outline-none"
                />
              </div>
            </div>
            <p className="text-[11.81px] text-[#6B7280] font-medium mt-2">
              * Minimum: $300
            </p>
          </div>
        </div>

        <Image
          src={"/Images/HomePage/Group (4).svg"}
          alt="image"
          width={56.54}
          height={62.71}
          className="-mt-20  translate-y-20 translate-x-20 hidden lg:block"
        />

        <div className="flex justify-center my-10 px-10 lg:px-0">
          <div className="w-full lg:w-auto">
            <Link href="/" className="block w-full">
              <div className="lg:text-[20px] text-center hover:bg-[#4977db] w-full lg:w-[197px] py-3 text-white rounded-2xl bg-[#2563EB]">
                Start free trial
              </div>
            </Link>

            <p className="text-[11.44px] text-[#6B7280]  mt-2 text-center">
              Start with as little as $300.
            </p>
          </div>
        </div>

        <div className="-mt-[200px]">
          <Image
            src={"/Images/HomePage/scribble final version-63.svg"}
            alt="image"
            width={127}
            height={104.6}
            className=" ml-auto -translate-x-36 hidden lg:block"
          />
        </div>

        <div className="-mt-[200px]">
          <Image
            src={"/Images/HomePage/scribble final version-07 (2).svg"}
            alt="image"
            width={47.32}
            height={54.4}
            className=" ml-auto -translate-x-10 translate-y-40 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderCalculator;
