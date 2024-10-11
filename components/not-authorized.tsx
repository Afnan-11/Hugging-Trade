import {LockIcon} from "lucide-react";
import {Button} from "./ui/button";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-zinc-900">
      <div className="w-full max-w-md transform rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="relative mb-6 h-20 w-20">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <LockIcon
                className="h-10 w-10 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-center text-3xl font-extrabold text-transparent">
            Unauthorized Access
          </h1>
          <p className="mb-8 text-center text-xl text-gray-300">{`You don't have access to this page`}</p>
          <p className="mb-8 text-center text-gray-400">
            {`It looks like you haven't subscribed yet. To access this content, please upgrade to our premium service.`}
          </p>
          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
          <Button
            asChild
            className="w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg"
          >
            <Link href="/">Upgrade Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
