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

    const invoicesWithUserIds = await prisma.invoices.findMany({
      orderBy: {
        created_time: "desc",
      },
    });

    // Map over the invoices to add only the user_id from the user table
    const invoicesWithOnlyUserIds = await Promise.all(
      invoicesWithUserIds.map(async (invoice) => {
        const subscription = await prisma.subscriptions.findFirst({
          where: {
            subscription_id: invoice.subscription_id, // Match the subscription ID
          },
          select: {
            user_id: true, // Select only the user_id
          },
        });
        console.log(invoice.subscription_id);

        return {
          ...invoice,
          userId: subscription?.user_id || null, // Attach only the user_id
        };
      }),
    );

    // const invoices = await prisma.invoices.findMany({
    //   orderBy: {
    //     created_time: "desc",
    //   },
    // });

    return NextResponse.json(invoicesWithOnlyUserIds);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
