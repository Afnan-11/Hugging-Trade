"use server";

import prisma from "@/lib/db";
export async function getProfitShareHistory(userId: string) {
  const paidRequests = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      payment_requests: {
        where: {
          payment_status: "paid",
        },
        orderBy: {paid_at: "desc"},
      },
    },
  });

  return paidRequests?.payment_requests;
}
