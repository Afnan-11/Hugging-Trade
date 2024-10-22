import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import {
  CopyFactoryUrl,
  MetaApiUrl,
  N_OF_DAYS_BEFORE_PAYMENT_REQUEST,
  STRATEGY_ID_MT4,
  STRATEGY_ID_MT5,
} from "@/utils/constants";
import axios from "axios";
import {auth} from "@clerk/nextjs/server";
import MetaApi from "metaapi.cloud-sdk/esm-node";
import {isAuthorized} from "@/app/actions/isAuthorized";
import {notifyUser, subscribeToStrategy} from "@/utils/functions";

export async function POST(req: Request) {
  let account;
  try {
    const {userId} = auth();
    if (!userId) {
      return NextResponse.json({success: false, error: "User not authenticated"}, {status: 401});
    }

    // const {authorized, message} = await isAuthorized(userId);
    // if (!authorized) {
    //   console.log("User not authorized");
    //   return NextResponse.json({success: false, error: message}, {status: 401});
    // }

    const data = await req.json();
    const metaApiData = {
      name: data.platform === "mt5" ? "MT5 SUBSCRIBER ACCOUNT" : "MT4 SUBSCRIBER ACCOUNT",
      login: data.login,
      password: data.password,
      server: data.server,
      platform: data.platform,
      magic: 123456,
      copyFactoryRoles: ["SUBSCRIBER"],
      metastatsApiEnabled: true,
    };

    account = await createAndDeployAccount(metaApiData);
    const updatedUser = await updateUserWithMetaApiAccount(userId, {
      metaapi_account_id: account.id,
      metaapi_platform: data.platform,
    });

    notifyUser({user_id: userId, email: updatedUser.email, name: updatedUser.first_name}, "message", {
      message: "Your account has been created successfully! Thank you for your trust.",
    });

    return NextResponse.json({success: true, user: updatedUser});
  } catch (error) {
    if (account.id) removeAccount(account.id);

    console.error("Error in POST request:", error);
    return NextResponse.json({success: false, error: getErrorMessage(error)}, {status: 500});
  }
}

async function createAndDeployAccount(metaApiData: any) {
  try {
    // @ts-ignore
    console.log("Creating account", {metaApiData});
    const response = await axios.post(`${MetaApiUrl}/users/current/accounts`, metaApiData, {
      headers: {
        "auth-token": process.env.METAAPI_ACCESS_KEY,
        transaction_id: crypto.randomUUID(),
      },
      timeout: 30000, // 30 seconds timeout
    });
    console.log("Account created");
    return response.data;
  } catch (error) {
    console.error("MetaAPI Error Details:", (error as any)?.response?.data);
    throw new Error("Failed to create or deploy MetaAPI account");
  }
}

async function removeAccount(accountId: string) {
  try {
    await axios.delete(`${MetaApiUrl}/users/current/accounts/${accountId}`, {
      headers: {
        "auth-token": process.env.METAAPI_ACCESS_KEY,
      },
    });
  } catch (error) {
    console.error("Error removing account:", error);
    throw new Error("Failed to remove MetaAPI account");
  }
}

async function updateUserWithMetaApiAccount(userId: string, metaApiData: any) {
  try {
    console.log("Updating user with MetaAPI account");
    const updatedUser = await prisma.user.update({
      where: {user_id: userId},
      data: metaApiData,
    });
    console.log("User updated");

    console.log("Creating payment request");
    try {
      await prisma.payment_requests.create({
        data: {
          user: {
            connect: {id: updatedUser.id},
          },
          month_start: new Date(),
          month_end: new Date(Date.now() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST * 24 * 60 * 60 * 1000), // End after 30 days
          profit_start: 0,
        },
      });
      console.log("Payment request created");
      return updatedUser;
    } catch (error) {
      console.log("Error creating payment request, removing MetaAPI account");
      await prisma.user.update({
        where: {user_id: userId},
        data: {metaapi_account_id: null},
      });
      console.error("Error creating payment request:", error);
      throw new Error("Error creating payment request");
    }
  } catch (error) {
    console.error("Error updating user in Prisma:", error);
    throw new Error("Error updating user in Prisma");
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
