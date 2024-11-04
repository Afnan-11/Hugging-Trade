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

    const subscriptions = await prisma.subscriptions.findMany();

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
        user_id: true,
      },
      orderBy: {
        created_time: "desc",
      },
    });

    const usersWithSubscription = users.map((user) => {
      const latestSubscription = subscriptions.find((sub) => sub.user_id === user.user_id);
      return {...user, subscription: latestSubscription};
    });

    return NextResponse.json(usersWithSubscription);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
