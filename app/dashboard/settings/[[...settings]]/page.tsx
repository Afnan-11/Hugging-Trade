"use client";
import {useUser} from "@clerk/nextjs";
import {UserProfile} from "@clerk/nextjs";
import {UpdateStripeCard} from "@/components/update-stripe-card";
export default function Settings() {
  const {user} = useUser();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="border-b py-4 text-3xl font-bold tracking-tight">Settings</h1>

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
