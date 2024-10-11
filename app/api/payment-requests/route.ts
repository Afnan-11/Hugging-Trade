import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import {auth} from "@clerk/nextjs/server";

export async function GET() {
  try {
    const {userId} = auth();

    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const currentUser = await prisma.user.findUnique({
      where: {user_id: userId},
      select: {is_admin: true},
    });

    if (!currentUser || !currentUser.is_admin) {
      return NextResponse.json({error: "Forbidden"}, {status: 403});
    }

    const paymentRequests = await prisma.payment_requests.findMany({
      orderBy: {
        created_time: "desc",
      },
    });

    return NextResponse.json(paymentRequests);
  } catch (error) {
    console.error("Error fetching payment requests:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
