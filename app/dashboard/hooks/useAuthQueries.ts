import {useQuery} from "@tanstack/react-query";
import {isAuthorized} from "@/app/actions/isAuthorized";
import {getUserWithLastPaymentRequest} from "@/app/actions/paymentRequests";
import {getUserWithSubscription} from "@/app/actions/getUser";

export function useIsAuthorized(userId: string) {
  return useQuery({
    queryKey: ["isAuthorized", userId],
    queryFn: () => isAuthorized(userId),
  });
}

export function useUserWithLastPaymentRequest(userId: string) {
  return useQuery({
    queryKey: ["userWithLastPaymentRequest", userId],
    queryFn: () => getUserWithLastPaymentRequest(userId),
  });
}

export function useUserWithSubscription(userId: string) {
  return useQuery({
    queryKey: ["userWithSubscription", userId],
    queryFn: () => getUserWithSubscription(userId),
  });
}
