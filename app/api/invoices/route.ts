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

    const invoices = await prisma.invoices.findMany({
      orderBy: {
        created_time: "desc",
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
