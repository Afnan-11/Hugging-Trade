import {NextResponse} from "next/server";
import axios from "axios";
import {MetaApiUrl} from "@/utils/constants";

export async function GET() {
  try {
    const token = process.env.METAAPI_ACCESS_KEY;
    if (!token) throw new Error("METAAPI_ACCESS_KEY is not configured");

    const response = await axios.get(`${MetaApiUrl}/users/current/accounts`, {
      headers: {
        "auth-token": token,
      },
    });

    // Get all accounts
    const accounts = response.data;

    // Delete each account
    for (const account of accounts) {
      try {
        await axios.delete(`${MetaApiUrl}/users/current/accounts/${account._id}`, {
          headers: {
            "auth-token": token,
          },
        });
        console.log(`Successfully deleted account ${account._id}`);
      } catch (error) {
        console.error(`Error deleting account ${account._id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "All accounts deleted successfully",
      deletedAccounts: accounts.map((acc: any) => acc._id),
    });
  } catch (error) {
    console.error("Error fetching/deleting MetaAPI accounts:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
