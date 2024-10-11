import {NextResponse} from "next/server";

export async function GET(request: Request) {
  // Implement your admin check logic here
  // For example, check if the user has an admin role in the database
  const isAdmin = true; // Replace with actual logic

  if (isAdmin) {
    return NextResponse.json({status: "success"});
  } else {
    return NextResponse.json({status: "unauthorized"}, {status: 401});
  }
}
