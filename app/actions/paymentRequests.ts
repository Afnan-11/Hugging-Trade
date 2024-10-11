"use server";

import prisma from "@/lib/db";

export async function getUserWithLastPaymentRequest(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
    include: {
      payment_requests: {
        orderBy: {created_time: "desc"},
        take: 1,
      },
    },
  });
  return {user, lastPaymentRequest: user?.payment_requests[0]};
}
