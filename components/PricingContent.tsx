"use client";

import {ArrowRight, Check} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import PeriodToggle from "./PeriodToggle";
import {PricingTypes} from "@/types";
import {useTranslations} from "next-intl";

import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Button} from "./ui/button";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

interface PricingContentProps {
  user?: any;
  pricing: PricingTypes;
  areOnlyCardsShown?: boolean;
  locale: string;
}

const PricingContent: React.FC<PricingContentProps> = ({user, pricing, areOnlyCardsShown, locale}) => {
  console.log("pricing", pricing);
  console.log("locale", locale);
  const [selectedPeriod, setSelectedPeriod] = useState<"year" | "month">("month");
  const priceIdYearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!;
  const priceIdMonthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!;

  const t = useTranslations("PricingPage");

  // Calculate discounted monthly price and savings
  const discountPercentageMonth = pricing.discountMonth; // Assuming a 20% discount for month
  const originalPrice = pricing.priceMonth; // Monthly price from Sanity
  const discountedPriceMonthly = (originalPrice * (1 - discountPercentageMonth / 100)).toFixed(2);
  const savings = (originalPrice - Number(discountedPriceMonthly)).toFixed(2);

  // Calculate discounted yearly price and savings
  // Assuming priceMonth and discountYear are coming from pricing object
  const discountPercentageYear = pricing.discountYear; // Yearly discount percentage from Sanity
  const originalPriceMonth = pricing.priceMonth; // Monthly price from Sanity

  // Calculate the regular yearly price (without discount)
  const regularYearlyPrice = originalPriceMonth * 12;

  // Calculate the discounted monthly price
  const discountedPriceYearly = (originalPriceMonth * (1 - discountPercentageYear / 100)).toFixed(2);

  // Calculate the total discounted yearly price
  const totalDiscountedYearlyPrice = (Number(discountedPriceYearly) * 12).toFixed(2);

  // Calculate savings per year
  const yearlySavings = (regularYearlyPrice - Number(totalDiscountedYearlyPrice)).toFixed(2);

  // console.log("Yearly savings: $", yearlySavings);

  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      setIsLoading(true);
      const {data} = await axios.post(`/api/payments/create-checkout-session`, {
        userId: user?.id,
        email: user?.emailAddresses?.[0]?.emailAddress,
        priceId,
        subscription,
        tolt_referral: typeof window !== "undefined" && "tolt_referral" in window ? (window as any).tolt_referral : "",
      });

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response;
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Error during checkout");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={areOnlyCardsShown ? "" : "py-10 lg:py-40"}>
      {!areOnlyCardsShown && (
        <div className="space-y-5 px-5 lg:px-20">
          <h2 className="text-center text-[20px] md:text-[40px] font-bold leading-tight lg:text-[56px] lg:leading-none">
            {locale === "en"
              ? pricing.pricingSectionTwoTitle
              : locale === "de"
                ? pricing.pricingSectionTwoTitle_de
                : locale === "es"
                  ? pricing.pricingSectionTwoTitle_es
                  : locale === "fr"
                    ? pricing.pricingSectionTwoTitle_fr
                    : locale === "it"
                      ? pricing.pricingSectionTwoTitle_it
                      : pricing.pricingSectionTwoTitle_pt}
          </h2>
          <p className="text-center text-[16px] md:text-[22px]">
            {locale === "en"
              ? pricing.pricingSectionTwoText
              : locale === "de"
                ? pricing.pricingSectionTwoText_de
                : locale === "es"
                  ? pricing.pricingSectionTwoText_es
                  : locale === "fr"
                    ? pricing.pricingSectionTwoText_fr
                    : locale === "it"
                      ? pricing.pricingSectionTwoText_it
                      : pricing.pricingSectionTwoText_pt}
          </p>
        </div>
      )}

      <div
        className={`flex flex-col items-center justify-center gap-5 lg:flex-row ${!areOnlyCardsShown ? "mt-20" : ""}`}
      >
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

      <div className="mt-8 space-y-10 px-5 lg:flex lg:items-center lg:justify-center lg:space-y-0 lg:px-5">
        <div className="space-y-10 rounded-[20px] border-[1px] border-[#E4E7E5] p-10 lg:h-[549.58px] lg:w-[524px]">
          <div className="space-y-5">
            <div className="space-x-2 text-center text-[30px] font-medium md:whitespace-nowrap lg:h-[100px]">
              {selectedPeriod === "month" ? (
                <>
                  <span>
                    ${discountedPriceMonthly}
                    {t("month")}
                  </span>
                  <span className="price-line text-[20px] text-gray-400">
                    {" "}
                    ${originalPrice}
                    {t("month")}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    ${discountedPriceYearly}
                    {t("month")}
                  </span>
                  <span className="price-line text-[20px] text-gray-400">
                    {" "}
                    ${originalPriceMonth}
                    {t("month")}
                  </span>
                </>
              )}

              {selectedPeriod === "month" && (
                <div className="flex justify-center">
                  <div className="w-[320px] rounded-[20px] bg-green-100 p-2 text-center text-[20px] text-[#07c37a]">
                    {t("youSave")} ${savings} {t("perMonth")}
                  </div>
                </div>
              )}

              {selectedPeriod === "year" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[320px] rounded-[20px] bg-green-100 p-2 text-center text-[20px] text-[#07c37a]">
                    {t("youSave")} ${yearlySavings} {t("perYear")}
                  </div>
                </div>
              )}
            </div>

            <p className="text-[15.49px]">
              {locale === "en"
                ? pricing.pricingLeftText
                : locale === "de"
                  ? pricing.pricingLeftText_de
                  : locale === "es"
                    ? pricing.pricingLeftText_es
                    : locale === "fr"
                      ? pricing.pricingLeftText_fr
                      : locale === "it"
                        ? pricing.pricingLeftText_it
                        : pricing.pricingLeftText_pt}
            </p>
          </div>

          <div className="space-y-2">
            {pricing.leftListItems.map((price, index) => (
              <div
                key={price._id || index}
                className="flex items-center justify-start gap-2"
              >
                <div className="rounded-full bg-[#2563EB] p-1">
                  <Check
                    color="white"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[15.49px]">{(price as any)[`text_${locale}`] || price.text_en}</p>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            <div className="flex justify-center lg:justify-start">
              <Button
                disabled={isLoading}
                onClick={() => {
                  if (user?.id) {
                    handleCheckout(selectedPeriod == "year" ? priceIdYearly : priceIdMonthly, true);
                  } else {
                    router.push("/onboarding");
                    toast("Please login or sign up to purchase", {
                      description: "You must be logged in to make a purchase",
                      action: {
                        label: "Sign In",
                        onClick: () => {
                          router.push("/onboarding");
                        },
                      },
                    });
                  }
                }}
                className={`rounded-xl bg-[#2563EB] py-3 text-center text-[15.62px] text-white ${locale === "en" ? "lg:w-[229.52px]" : "lg:w-[380px]"}`}
                type="button"
              >
                {t("startYourFreeTrial")}
              </Button>
            </div>
            <div className="flex items-center justify-start gap-2">
              <Image
                src={"/Images/HomePage/checkmark.svg.svg"}
                alt="img"
                width={14}
                height={14}
              />

              <p className="text-[13.45px] text-[#89908B]">
                {locale === "en"
                  ? pricing.leftSmallTextUnderButtonOne
                  : locale === "de"
                    ? pricing.leftSmallTextUnderButtonOne_de
                    : locale === "es"
                      ? pricing.leftSmallTextUnderButtonOne_es
                      : locale === "fr"
                        ? pricing.leftSmallTextUnderButtonOne_fr
                        : locale === "it"
                          ? pricing.leftSmallTextUnderButtonOne_it
                          : pricing.leftSmallTextUnderButtonOne_pt}
              </p>
              <div className="flex items-center justify-start gap-2">
                <Image
                  src={"/Images/HomePage/checkmark.svg.svg"}
                  alt="img"
                  width={14}
                  height={14}
                />
                <p className="text-[13.45px] text-[#89908B]">
                  {locale === "en"
                    ? pricing.leftSmallTextUnderButtonTwo
                    : locale === "de"
                      ? pricing.leftSmallTextUnderButtonTwo_de
                      : locale === "es"
                        ? pricing.leftSmallTextUnderButtonTwo_es
                        : locale === "fr"
                          ? pricing.leftSmallTextUnderButtonTwo_fr
                          : locale === "it"
                            ? pricing.leftSmallTextUnderButtonTwo_it
                            : pricing.leftSmallTextUnderButtonTwo_pt}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-20 rounded-[20px] border-[1px] border-[#E4E7E5] bg-[#EFF1EF] p-12 lg:h-[549.58px] lg:w-[524px]">
          <h3 className="text-[20.63px] font-medium">
            {/* {pricing.pricingRightTitle} */}
            {locale === "en"
              ? pricing.pricingRightTitle
              : locale === "de"
                ? pricing.pricingRightTitle_de
                : locale === "es"
                  ? pricing.pricingRightTitle_es
                  : locale === "fr"
                    ? pricing.pricingRightTitle_fr
                    : locale === "it"
                      ? pricing.pricingRightTitle_it
                      : pricing.pricingRightTitle_pt}
          </h3>

          <div>
            {pricing.rightListItems.map((price, index) => (
              <div
                key={price._id || index}
                className="my-1 flex items-center justify-start gap-2"
              >
                <div className="rounded-full bg-[#2563EB] p-1">
                  <Check
                    color="white"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[17.02px] font-medium">{(price as any)[`text_${locale}`] || price.text_en}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 underline underline-offset-2">
              <Link href="/">
                {/* {pricing.buttonRight} */}
                {locale === "en"
                  ? pricing.buttonRight
                  : locale === "de"
                    ? pricing.buttonRight_de
                    : locale === "es"
                      ? pricing.buttonRight_es
                      : locale === "fr"
                        ? pricing.buttonRight_fr
                        : locale === "it"
                          ? pricing.buttonRight_it
                          : pricing.buttonRight_pt}
              </Link>
              <ArrowRight
                width={16.78}
                height={17}
              />
            </div>
            <p className="text-[12px] text-[#89908B]">
              {/* {pricing.textUnderRightButton} */}
              {locale === "en"
                ? pricing.textUnderRightButton
                : locale === "de"
                  ? pricing.textUnderRightButton_de
                  : locale === "es"
                    ? pricing.textUnderRightButton_es
                    : locale === "fr"
                      ? pricing.textUnderRightButton_fr
                      : locale === "it"
                        ? pricing.textUnderRightButton_it
                        : pricing.textUnderRightButton_pt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
