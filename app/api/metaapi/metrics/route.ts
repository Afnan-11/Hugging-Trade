import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";

import prisma from "@/lib/db";
import {MetaStats} from "metaapi.cloud-sdk/esm-node";

export async function GET() {
  try {
    const {userId} = auth();

    if (!userId) {
      return NextResponse.json({error: "User not authenticated"}, {status: 401});
    }

    const user = await prisma.user.findUnique({
      where: {user_id: userId},
      include: {
        payment_requests: {
          orderBy: {created_time: "desc"},
        },
      },
    });

    if (!user?.metaapi_account_id) {
      return NextResponse.json({error: "MetaAPI account not set up"}, {status: 400});
    }

    const token = process.env.METAAPI_ACCESS_KEY!; // Store your token in environment variables
    const accountId = user?.metaapi_account_id;
    const metaStats = new MetaStats(token);

    // Fetch account metrics
    // const connection = account.getRPCConnection();
    // await connection.connect(); // Make sure the connection is initialized
    // const accountInformation = await connection.getAccountInformation();

    const metrics = await metaStats.getMetrics(accountId, true);

    if (!user.didResetProfit) {
      user.payment_requests[0].profit_start = metrics.profit || 0;
      await Promise.all([
        prisma.user.update({
          where: {id: user.id},
          data: {didResetProfit: true},
        }),
        prisma.payment_requests.update({
          where: {id: user.payment_requests[0].id},
          data: {profit_start: metrics.profit || 0},
        }),
      ]);
    }

    // Extract relevant data from the metrics
    const dashboardData = {
      balance: metrics.balance,
      profit: metrics.profit,
      trades: metrics.trades,
      dailyGain: metrics.dailyGain,
      monthlyGain: metrics.monthlyGain,
      absoluteGain: metrics.absoluteGain,
      dailyGrowth: metrics.dailyGrowth,
    };

    return NextResponse.json({
      ...metrics,
      paymentRequests: {
        thisMonthPaymentRequest: user?.payment_requests[0],
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error as any);
    return NextResponse.json({error: (error as any) || "Failed to fetch metrics"}, {status: 500});
  }
}
