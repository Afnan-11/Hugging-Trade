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

    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_time: true,
        is_admin: true,
        source: true,
      },
      orderBy: {
        created_time: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
