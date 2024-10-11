// "use server";

// import prisma from "@/lib/db";
// import {processUser} from "../api/payments/check-request-payments/route";

// export async function getCheckRequestPayments(userId: string) {
//   const user = await prisma.user.findFirst({
//     where: {
//       user_id: userId,
//     },
//     include: {
//       payment_requests: {
//         orderBy: {created_time: "desc"},
//       },
//     },
//   });
//   await processUser(user);
//   const updatedUser = await prisma.user.findFirst({
//     where: {
//       user_id: userId,
//     },
//     include: {
//       payment_requests: {
//         orderBy: {created_time: "desc"},
//       },
//     },
//   });

//   return updatedUser?.payment_requests;
// }
