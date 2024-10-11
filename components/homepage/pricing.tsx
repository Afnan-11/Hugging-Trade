"use client";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";

import {plans, TITLE_TAILWIND_CLASS} from "@/utils/constants";
import {PricingCard} from "../pricing-card";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

const PricingHeader = ({title, subtitle}: {title: string; subtitle: string}) => (
  <section className="text-center">
    <h1 className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight text-gray-900 dark:text-white`}>
      {title}
    </h1>
    <p className="pt-1 text-gray-600 dark:text-gray-400">{subtitle}</p>
    <br />
  </section>
);

const PricingSwitch = ({onSwitch}: PricingSwitchProps) => (
  <Tabs
    defaultValue="0"
    className="mx-auto w-40"
    onValueChange={onSwitch}
  >
    <TabsList className="px-2 py-6">
      <TabsTrigger
        value="0"
        className="text-base"
      >
        <p className="text-black dark:text-white">Monthly</p>
      </TabsTrigger>
      <TabsTrigger
        value="1"
        className="text-base"
      >
        <p className="text-black dark:text-white">Yearly</p>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1);
  const {user} = useUser();

  return (
    <div>
      <PricingHeader
        title="Sample Pricing Plans"
        subtitle="Use these sample pricing cards in your SAAS"
      />
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return (
            <PricingCard
              user={user}
              key={plan.title}
              {...plan}
              isYearly={isYearly}
            />
          );
        })}
      </section>
    </div>
  );
}
