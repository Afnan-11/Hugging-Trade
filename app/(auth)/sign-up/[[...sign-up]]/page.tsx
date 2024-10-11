"use client";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  if (!config?.auth?.enabled) {
    router.back();
  }

  return <SignUp />;
}
