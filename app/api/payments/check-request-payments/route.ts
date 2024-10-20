import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {MetaStats} from "metaapi.cloud-sdk/esm-node";
import {Knock} from "@knocklabs/node";
import axios from "axios";
import {STRATEGY_ID_MT4, STRATEGY_ID_MT5} from "@/utils/constants";
import {
  CopyFactoryUrl,
  EXTRA_FEES_PERCENTAGE,
  N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN,
  N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE,
  PROFIT_SHARE_PERCENTAGE,
  BALANCE_THRESHOLD,
  REDUCED_PROFIT_SHARE_PERCENTAGE,
} from "@/utils/constants";
import {notifyUser} from "@/utils/functions";

const prisma = new PrismaClient();
const knock = new Knock(process.env.KNOCK_API_SECRET!);
const metaStats = new MetaStats(process.env.METAAPI_ACCESS_KEY!);

export async function GET() {
  try {
    const users = await getUsers();
    await Promise.all(users.map(processUser));
    console.log("Checked payment requests successfully for all users");
    return NextResponse.json({message: "Checked payment requests successfully!"}, {status: 200});
  } catch (error) {
    console.error("Error checking payment requests:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}

async function getUsers() {
  return prisma.user.findMany({
    where: {is_admin: false},
    include: {
      payment_requests: {
        orderBy: {created_time: "desc"},
        take: 2,
      },
    },
  });
}

async function processUser(user: any) {
  const lastRequest = user.payment_requests[0];
  if (!lastRequest) {
    console.log(`No payment requests found for user ${user.id}`);
    return;
  }
  const now = new Date();
  const frozenDate = new Date(
    lastRequest.month_end.getTime() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST_FROZEN * 24 * 60 * 60 * 1000,
  );
  const overdueDate = new Date(
    lastRequest.month_end.getTime() + N_OF_DAYS_BEFORE_PAYMENT_REQUEST_OVERDUE * 24 * 60 * 60 * 1000,
  );
  if (now > frozenDate) {
    await handleFreezingAccount(user, lastRequest);
  } else if (now > overdueDate) {
    await handleOverduePayment(user, lastRequest);
  } else if (now >= lastRequest.month_end && lastRequest.payment_status === "pending") {
    await handleOnduePayment(user, lastRequest);
  }
}

async function handleFreezingAccount(user: any, lastRequest: any) {
  console.log(`Account ${user.metaapi_account_id} is frozen. Notifying user...`);
  const strategyId = user.metaapi_platform === "mt5" ? STRATEGY_ID_MT5 : STRATEGY_ID_MT4;
  await Promise.all([
    removeSubscription(user.metaapi_account_id!, strategyId),
    updatePaymentRequest(lastRequest.id, lastRequest.profit_end, lastRequest.owed_amount, "frozen"),
    // prisma.user.update({
    //   where: {id: user.id},
    //   data: {account_status: "frozen"},
    // }),
  ]);
  console.log("Account frozen. Notifying user...");
  await notifyUser(user, "payment-requests-frozen", {payment_status: "frozen"});
  console.log("Notified user of account freezing");
}

async function handleOverduePayment(user: any, lastRequest: any) {
  const profit = lastRequest.profit_end;

  const owedAmount = (profit - lastRequest.profit_start) * (PROFIT_SHARE_PERCENTAGE + EXTRA_FEES_PERCENTAGE);
  await Promise.all([updatePaymentRequest(lastRequest.id, profit, owedAmount, "overdue")]);
  await notifyUser(user, "payment-requests-overdue", {payment_status: "overdue"});
}

async function handleOnduePayment(user: any, lastRequest: any) {
  console.log(`Payment request ${lastRequest.id} for user ${user.id} is pending. Notifying user...`);
  const metrics = await getMetrics(user);
  const profit = metrics?.profit || 0;
  const balance = metrics?.balance || 0;
  const percentage = balance > BALANCE_THRESHOLD ? PROFIT_SHARE_PERCENTAGE : REDUCED_PROFIT_SHARE_PERCENTAGE;
  const owedAmount = (profit - lastRequest.profit_start) * percentage;

  await updatePaymentRequest(lastRequest.id, profit, owedAmount, "ondue");
  await notifyUser(user, "payment-requests-ondue", {
    owed_amount: owedAmount,
    profit: (profit - lastRequest.profit_start).toFixed(2),
    percentage: percentage * 100,
  });
  console.log("Notified user of ondue payment request");
}

async function getMetrics(user: any) {
  try {
    return await metaStats.getMetrics(user.metaapi_account_id);
  } catch (error) {
    console.error(`Error getting metrics for user ${user.id}:`, error);
    return null;
  }
}

async function updatePaymentRequest(id: number, profit: number, owedAmount: number, status: string) {
  return prisma.payment_requests.update({
    where: {id},
    data: {
      payment_status: status,
      profit_end: profit,
      owed_amount: owedAmount,
    },
  });
}

async function removeSubscription(accountId: string, strategyId: string) {
  try {
    const response = await axios.delete(
      `${CopyFactoryUrl}/users/current/configuration/subscribers/${accountId}/subscriptions/${strategyId}`,
      {
        headers: {
          "auth-token": process.env.METAAPI_ACCESS_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`Error removing subscription for account ${accountId}:`, error);
    throw new Error(`Failed to remove subscription for account ${accountId}`);
  }
}
