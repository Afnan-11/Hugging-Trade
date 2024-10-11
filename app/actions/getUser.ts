"use server";

import prisma from "@/lib/db";

export async function getUser(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });
  return {user};
}

export async function getUserWithSubscription(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });

  const subscription = await prisma.subscriptions.findFirst({
    where: {
      user_id: userId,
    },
  });

  return {user, subscription};
}
