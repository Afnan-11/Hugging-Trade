import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import {CopyFactoryUrl, MetaApiUrl, N_OF_DAYS_BEFORE_PAYMENT_REQUEST} from "@/utils/constants";
import axios from "axios";
import {auth} from "@clerk/nextjs/server";
import MetaApi from "metaapi.cloud-sdk/esm-node";
import {isAuthorized} from "@/app/actions/isAuthorized";
import {Knock} from "@knocklabs/node";

export async function subscribeToStrategy(accountId: any, userId: string, strategyId: string) {
  console.log("accountId, userId", accountId, userId);
  if (!accountId) {
    const user = await prisma.user.findUnique({where: {user_id: userId}});
    accountId = user?.metaapi_account_id;
    console.log("accountId", accountId);
  }
  try {
    console.log("Subscribing to strategy");
    const response = await axios.put(
      `${CopyFactoryUrl}/users/current/configuration/subscribers/${accountId}`,
      {
        name: "Subscriber",
        subscriptions: [
          {
            strategyId: strategyId,
          },
        ],
      },
      {
        headers: {
          "auth-token": process.env.METAAPI_ACCESS_KEY,
        },
      },
    );
    console.log("Subscribed to strategy");
    return response.data;
  } catch (error) {
    console.error("Error subscribing to strategy:", error);
    await prisma.user.update({
      where: {user_id: userId},
      data: {metaapi_account_id: null},
    });
    console.log("Removed MetaAPI account from user");
    throw new Error("Error subscribing to strategy");
  }
}

const knock = new Knock(process.env.KNOCK_API_SECRET!);

export async function notifyUser(user: any, workflow: string, data: any) {
  return knock.workflows.trigger(workflow, {
    data: {
      user_id: user.user_id,
      email: user.email,
      ...data,
    },
    recipients: [
      {
        id: user.user_id,
        email: user.email,
        name: user?.name || user?.first_name || "",
      },
    ],
  });
}
