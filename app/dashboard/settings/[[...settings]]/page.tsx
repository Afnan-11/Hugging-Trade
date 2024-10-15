"use client";
import {useUser} from "@clerk/nextjs";
import {UserProfile} from "@clerk/nextjs";
import {UpdateStripeCard} from "@/components/update-stripe-card";
export default function Settings() {
  const {user} = useUser();

  return (
    <div className="flex flex-col">
      <h1 className="pb-4 text-2xl font-bold tracking-tight text-accent md:text-3xl lg:text-4xl">Settings</h1>

      <div className="flex w-fit flex-col space-y-4">
        <UpdateStripeCard />
        <h2 className="text-xl font-bold">Update Profile</h2>
        <UserProfile
          path="/dashboard/settings"
          routing="path"
        />
      </div>
    </div>
  );
}
