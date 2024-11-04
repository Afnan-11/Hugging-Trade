import {Button} from "@/components/ui/button";
import Navbar from "@/components/wrapper/Navbar";
import Link from "next/link";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const session = await stripe.checkout.sessions.retrieve(searchParams?.session_id as string);

  const jsonString = JSON.stringify(session, null, 2);

  return (
    <main className="min-w-screen flex flex-col items-center justify-between">
      <Navbar locale="en" />
      <h1 className="mb-3 mt-[35vh] scroll-m-20 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome to Hugging Trade 🎉
      </h1>
      <p className="w-[60%] text-center leading-7">Let&apos;s get cooking</p>
      <Link
        href="/dashboard"
        className="mt-4"
      >
        <Button>Access Dashboard</Button>
      </Link>
    </main>
  );
}
