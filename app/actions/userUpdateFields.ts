"use server";
import {PrismaClient} from "@prisma/client";
import {getAuth} from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import {auth} from "@clerk/nextjs/server";

export const userUpdateFields = async (fields: Array<{key: string; value: string}>) => {
  console.log("jerere");
  const {userId} = auth();
  if (!userId) {
    throw new Error("User ID not found");
  }

  // Define fields that should not be updated
  const restrictedFields = ["is_admin", "subscription", "account_status", "payment_requests", "user_id"];

  // Filter out restricted fields and construct safeFields object
  const safeFields = fields.reduce(
    (acc, {key, value}) => {
      if (!restrictedFields.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as {[key: string]: string},
  );

  // Update user in the database
  try {
    await prisma.user.update({
      where: {user_id: userId},
      data: safeFields,
    });
  } catch (error) {
    console.error("Error updating user fields:", error);
    throw new Error("Failed to update user fields");
  }
};
