"use server";

import {isAuthorized} from "@/app/actions/isAuthorized";

export async function checkAuthorization(userId: string) {
  try {
    const {authorized, message} = await isAuthorized(userId);
    return {authorized, message};
  } catch (error) {
    console.error("Error in checkAuthorization:", error);
    return {authorized: false, message: "An error occurred while checking authorization"};
  }
}
