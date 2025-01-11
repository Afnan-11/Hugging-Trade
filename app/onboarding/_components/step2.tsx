"use client";

import React, {useState, useEffect, memo} from "react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {checkAuthorization} from "@/app/actions/auth";
import {Spinner} from "@/components/ui/spinner";
import PricingContent from "@/components/PricingContent";
import {PricingTypes} from "@/types";

function Step2({
  pricing,
  setIsAuthorizedParent,
}: {
  pricing: PricingTypes | null;
  setIsAuthorizedParent: (isAuthorized: boolean | null) => void;
}) {
  const {user, isLoaded} = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    } else if (user?.id) {
      handleAuthorization(user.id);
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    setIsAuthorizedParent(isAuthorized);
  }, [isAuthorized, setIsAuthorizedParent]);

  async function handleAuthorization(userId: string) {
    try {
      const {authorized, message} = await checkAuthorization(userId);
      setAuthMessage(message);
      setIsAuthorized(authorized);
    } catch (error) {
      console.error("Error checking authorization:", error);
      setIsAuthorized(false);
      setAuthMessage("An error occurred while checking authorization.");
    }
  }

  if (!isLoaded || !user) {
    return (
      <div>
        Loading user data <Spinner />
      </div>
    );
  }

  if (isAuthorized === null) {
    return (
      <div>
        Checking authorization <Spinner />
      </div>
    );
  }

  return (
    <>
      {isAuthorized ? (
        <>
          {authMessage && <div className="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">{authMessage}</div>}
          <h2 className="mb-3 text-3xl font-semibold tracking-tight transition-colors">Welcome to Hugging Trade 🎉</h2>
          <p className="mb-3">
            You have successfully subscribed to Hugging Trade.
            <br />
            Let&apos;s get cooking
          </p>
        </>
      ) : (
        <div className="">
          {pricing && (
            <PricingContent
              pricing={pricing}
              user={user}
              areOnlyCardsShown
              locale="en"
            />
          )}
          {/*  {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              isYearly={false}
              user={user}
            />
          ))} */}
        </div>
      )}
    </>
  );
}

export default Step2;
