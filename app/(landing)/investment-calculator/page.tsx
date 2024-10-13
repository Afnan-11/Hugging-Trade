import AccordionHome from "@/components/AccordionHome";
import SliderCalculator from "@/components/SliderCalculator";
import { client } from "@/sanity/lib/client";
import { HomeTypes } from "@/types";
import React from "react";
import Image from "next/image";
import VideoMembers from "@/components/VideoMembers";

async function getHome(): Promise<HomeTypes | null> {
  try {
    const query = `
        *[_type == "home"][0]{ 
          sliderTitle,
          sliderText,
          sliderAverageMonthlyIncome,
        }
      `;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return null;
  }
}



export const revalidate = 10;

export default async function InvestmentCalculator() {
  const home: HomeTypes | null = await getHome();
  
  return (
    <div className="lg:pb-0 lg:-mt-10 lg:mb-20 overflow-hidden">
      <div className="mb-20">
        <SliderCalculator
          sliderTitle={home?.sliderTitle || ""}
          sliderText={home?.sliderText || ""}
          sliderAverageMonthlyIncome={home?.sliderAverageMonthlyIncome || ""}
        />
      </div>

      <div className="px-5 lg:px-0">
        <VideoMembers />
       
      </div>

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
    </div>
  );
}
