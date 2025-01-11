"use client";
import React, {useState} from "react";
import {z} from "zod";
import SteppedProgress from "@/components/progress-steps";
import {toast} from "sonner";
import Step0 from "./step0";
import Step1 from "./step1";
import axios from "axios";
import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
import Step2 from "./step2";
import {PricingTypes} from "@/types";
import {Wallet} from "lucide-react";
const formSchema = z.object({
  server: z.string().min(1, {message: "Server is required"}),
  preferred_broker: z.string().min(1, {message: "Preferred broker is required"}),
  platform: z.string().min(1, {message: "Platform is required"}),
  login: z.string().min(1, {message: "Login is required"}),
  password: z.string().min(1, {message: "Password is required"}),
});

const Steps = ({pricing, user}: {pricing: PricingTypes | null; user: any}) => {
  const [currentStep, setCurrentStep] = useState(user?.metaapi_account_id ? 2 : 0);
  const [data, setData] = useState({
    preferred_broker: "",
    login: "",
    password: "",
    server: "",
    platform: "",
  });
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorizedParent, setIsAuthorizedParent] = useState<boolean | null>(null);
  const validateStep = (step: number) => {
    let stepSchema;
    if (step === 0) {
      stepSchema = formSchema.pick({preferred_broker: true});
    } else {
      stepSchema = formSchema.omit({preferred_broker: true});
    }

    const result = stepSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.issues);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsLoading(true);

    try {
      const validatedData = formSchema.parse(data);
      validatedData.platform = validatedData.platform.toLocaleLowerCase();
      await axios.post("/api/metaapi/accounts/create", validatedData);
      if (typeof window !== "undefined" && "tolt_referral" in window && "tolt" in window) {
        (window as any).tolt.signup(user?.emailAddresses?.[0]?.emailAddress);
      }
      toast.success("Account created successfully! Subscribe to a plan to continue.");
      setCurrentStep(2);
      // router.push("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues);
        setIsLoading(false);
        return;
      }
      console.error("Error updating user information:", error);
      toast.error(JSON.stringify((error as any)?.response?.data?.error) || "Failed to update user information");
      setIsLoading(false);
    }
  };

  return (
    <section className={currentStep === 0 ? "mx-auto max-w-5xl" : "flex items-center justify-center"}>
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Welcome to Hugging Trade</CardTitle>
            <CardDescription>Please complete the following steps to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <SteppedProgress
              currentStep={currentStep}
              steps={3}
              className="mb-10"
            />
            {currentStep === 0 && (
              <Step0
                data={data}
                setData={setData}
                errors={errors}
              />
            )}
            {currentStep === 1 && (
              <Step1
                data={data}
                setData={setData}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <Step2
                pricing={pricing}
                setIsAuthorizedParent={setIsAuthorizedParent}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep == 1 && (
              <Button
                disabled={isLoading}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentStep(currentStep - 1);
                }}
                variant="outline"
              >
                Back
              </Button>
            )}
            {currentStep === 1 ? (
              <Button
                type="submit"
                disabled={isLoading}
                className="space-x-2 bg-accent hover:bg-accent/80"
              >
                {isLoading && <Spinner size="sm" />} <span>Create Account</span>
              </Button>
            ) : currentStep === 0 ? (
              <Button
                type="button"
                className="ml-auto mr-0 bg-accent hover:bg-accent/80"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentStep === 0) {
                    if (validateStep(0)) setCurrentStep(currentStep + 1);
                  }
                }}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Confirm Deposit
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};

export default Steps;
