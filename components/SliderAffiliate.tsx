"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Slider from "react-slider";
import { HTMLProps } from "react";
import {useTranslations} from "next-intl";

interface SliderAffiliateProps {
  averageUSD: number;
  percent: number;
}

const SliderAffiliate: React.FC<SliderAffiliateProps> = ({ averageUSD, percent }) => {
  // The predefined values for the slider steps
  const values = useMemo(() => [10, 25, 50, 100], []);
  
  // State for the current index of invited friends and calculated income
  const [valueIndex, setValueIndex] = useState<number>(values.indexOf(50));
  const [averageIncome, setAverageIncome] = useState(0);

  const t = useTranslations("SliderAffiliate");

  // Function to calculate the average income based on invited friends
  const calculateIncome = useCallback(() => {
    // Calculate income based on the percent from Sanity
    const income = averageUSD * (percent / 100) * values[valueIndex];
    setAverageIncome(income);
  }, [valueIndex, averageUSD, values, percent]);

  useEffect(() => {
    calculateIncome();
  }, [calculateIncome]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-[#EFF6FF] p-10 lg:w-[505px] lg:h-[466px] rounded-xl">
        <h2 className="text-[20px] md:text-[32px] font-bold lg:text-left text-center">
        {t("yourAverage")}
        </h2>
        <div className="text-center mt-5 md:mt-10">
          <p className=" text-[45px] md:text-[100px] text-black font-bold leading-[60px] lg:leading-none">
            {averageIncome.toFixed(0)}{" "}
            <span className="text-[25px] md:text-[50px] text-[#2563EB] font-bold">USD</span>
          </p>
        </div>

        <div className="flex justify-center items-center  mt-10">
          <div className="w-full max-w-md">
            <p className="text-[18px] font-bold text-left pb-4">
            {t("numberOfFriends")}
            </p>
            <Slider
              value={valueIndex}
              min={0}
              max={values.length - 1}
              step={1}
              onChange={(index: number) => setValueIndex(index)}
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
                        state.index === 0 ? "#2563EB" : "#F4F4F5",
                      height: "5px",
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
                    height: "16px",
                    width: "16px",
                    marginTop: "-5px",
                    borderRadius: "50%",
                    borderColor: "#2563EB",
                    borderWidth: "2px",
                    backgroundColor: "white",

                    cursor: "pointer",
                  }}
                />
              )}
            />
            <div className="flex justify-between items-center pl-0 pt-2">
              {values.map((label, index) => (
                <p key={index}>{label}</p>
              ))}
            </div>
            <p className="text-[16px] text-[#6B7280] pt-5 text-center lg:text-left">
            {t("basedOn")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderAffiliate;
