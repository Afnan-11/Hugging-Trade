import {NextResponse} from "next/server";

export default async function handler() {
  try {
    const response = await fetch("/api/payments/check-request-payments", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to check payment requests");
    }

    return NextResponse.json({message: "Cron job completed successfully"}, {status: 200});
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
