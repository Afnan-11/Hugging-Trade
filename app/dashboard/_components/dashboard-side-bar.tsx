"use client";

import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {adminRoutes, userRoutes} from "@/utils/constants";
import {Banknote, Folder, HomeIcon, Settings, Calculator, CreditCard, Users} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Route = {
  href: string;
  icon: React.ElementType;
  label: string;
};

export default function DashboardSideBar({isAdmin = false}: {isAdmin?: boolean}) {
  const pathname = usePathname();
  const routes = isAdmin ? adminRoutes : userRoutes;

  return (
    <div className="hidden h-full border-r lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map((route, index) => (
              <>
                {index === routes.length - 1 && <Separator className="my-2" />}
                <Link
                  target={route.target}
                  key={route.href}
                  className={cn("flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted", {
                    "bg-accent text-accent-foreground hover:bg-accent/90": pathname === route.href,
                  })}
                  href={route.href}
                >
                  <div className="rounded-lg border border-gray-400 bg-white p-1 text-foreground dark:border-gray-800 dark:bg-black">
                    <route.icon className="h-3 w-3" />
                  </div>
                  {route.label}
                </Link>
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
