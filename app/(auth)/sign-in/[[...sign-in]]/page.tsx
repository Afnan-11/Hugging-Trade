"use client";
import config from "@/config";
import {SignIn} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  return <SignIn />;
}
