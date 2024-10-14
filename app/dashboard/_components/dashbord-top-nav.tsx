"use client";

import ModeToggle from "@/components/mode-toggle";
import {NotificationsFeed} from "@/components/notications-feed";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose} from "@/components/ui/dialog";
import {Separator} from "@/components/ui/separator";
import {SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {UserProfile} from "@/components/user-profile";
import config from "@/config";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Banknote, Folder, HomeIcon, Settings} from "lucide-react";
import Link from "next/link";
import {ReactNode} from "react";
import {adminRoutes, userRoutes} from "@/utils/constants";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {Logo} from "@/components/logo";

export default function DashboardTopNav() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const routes = isAdmin ? adminRoutes : userRoutes;

  return (
    <header className="flex items-center gap-4 border-b px-4 py-2">
      <Dialog>
        <SheetTrigger className="transition min-[1024px]:hidden">
          <HamburgerMenuIcon />
          <Link href="/dashboard">
            <span className="sr-only">Home</span>
          </Link>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <Logo />
          </SheetHeader>
          <div className="mt-[1rem] flex flex-col space-y-3">
            {routes.map((route) => (
              <DialogClose
                key={route.href}
                asChild
              >
                <Link
                  target={route.target}
                  href={route.href}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    {route.icon && <route.icon className="mr-2 h-4 w-4" />}
                    {route.label}
                  </Button>
                </Link>
              </DialogClose>
            ))}
          </div>
        </SheetContent>
      </Dialog>
      <div className="flex w-full justify-between">
        <Logo className="hidden md:block" />
        <div className="ml-auto flex items-center gap-2">
          <NotificationsFeed />
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
