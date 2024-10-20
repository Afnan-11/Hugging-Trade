"use client";

import {useRouter} from "next/navigation";
import {useAuth} from "@clerk/nextjs";
import {useIsAuthorized, useUserWithLastPaymentRequest} from "./useAuthQueries";

export function useDashboardAuth() {
  const {userId, isLoaded} = useAuth();
  const router = useRouter();

  const {data: authData, isLoading: isAuthLoading} = useIsAuthorized(userId ?? "");
  const {data: userData, isLoading: isUserLoading} = useUserWithLastPaymentRequest(userId ?? "");

  if (!isLoaded || isAuthLoading || isUserLoading) {
    return {isLoading: true};
  }

  if (!userId) {
    router.push("/sign-in");
    return {isLoading: false};
  }

  const {user, lastPaymentRequest} = userData ?? {};

  if (!user) {
    router.push("/onboarding");
    return {isLoading: false};
  }

  if (user.is_admin) {
    router.push("/admin");
    return {isLoading: false};
  }

  if (!user.metaapi_account_id || !user.subscription) {
    router.push("/onboarding");
    return {isLoading: false};
  }

  if (!authData?.authorized) {
    return {authorized: false, message: authData?.message, isLoading: false};
  }

  return {
    authorized: true,
    user,
    lastPaymentRequest,
    isLoading: false,
  };
}
