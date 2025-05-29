import React from "react";
import ReviewStar from "./ReviewStar";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  affiliateReviewTitle: string;
  reviewListItems: Array<{
    _id: string;
    name: string;
    position: {
      en: string;
      de: string;
      es: string;
      fr: string;
      it: string;
      pt: string;
    };
    text: {
      en: string;
      de: string;
      es: string;
      fr: string;
      it: string;
      pt: string;
    };
    authorImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  }>;
  locale: string;
}

type Locale = 'en' | 'de' | 'es' | 'fr' | 'it' | 'pt';

const Testimonial = ({ affiliateReviewTitle, reviewListItems, locale }: Props) => {
  
  return (
    <div className="lg:px-20">
      <div className="flex flex-col lg:flex-row lg:justify-around justify-center items-center gap-10 lg:gap-40">
        <Image
          src={"/Images/AffiliatePage/Vector (4).svg"}
          alt="img"
          width={140}
          height={140}
          className="hidden lg:block"
        />
        <h2 className="lg:text-[50px] text-[20px] md:text-h2M text-black font-bold text-center leading-tight lg:leading-none">
          {affiliateReviewTitle}
        </h2>
        <Image
          src={"/Images/AffiliatePage/SVG (3).svg"}
          alt="img"
          width={140}
          height={140}
        />
      </div>

      <div className="my-10 lg:my-20">
        <div className="flex flex-wrap justify-center items-center gap-5 ">
          {reviewListItems.map((af, index) => (
            <div
              key={af._id || index}
              className={`w-[360px]  space-y-5 border-[1px] border-[#C0C0C0] rounded-lg p-5 flex flex-col justify-between ${locale === "en" ? "h-[370px]" : "h-[400px]"}`}
            >
              <div className="flex justify-start items-center gap-2">
                <ReviewStar />
                <ReviewStar />
                <ReviewStar />
                <ReviewStar />
                <ReviewStar />
              </div>
              <p className="text-[16px] text-left leading-[30px] flex-grow">
              {af.text[locale as Locale] || af.text.en} 
              </p>
              <div className="flex justify-start items-center gap-3 ">
                <div className="w-[68px] h-[68px]">
                  <Image
                    src={urlFor(af.authorImage).url()}
                    alt="img"
                    width={200}
                    height={200}
                    className="rounded-full correct-image"
                  />
                </div>
                <div>
                  <p className="text-[16px] text-black font-bold text-left">
                    {af.name}
                  </p>
                  <p className="text-[16px] text-black font-bold text-left">
                    {af.position[locale as Locale] || af.position.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

