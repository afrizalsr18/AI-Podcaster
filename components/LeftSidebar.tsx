"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          className="flex cursor-ponter items-center gap-1 pb-10 max-lg:justify-center"
          href="/"
        >
          <Image src="/icons/logo.svg" width={23} height={27} alt="Logo" />
          <h1 className="text-24 font-extrabold text-orange-1 max-lg:hidden italic">
            Ghost
          </h1>
          <h1 className="text-24 font-extrabold text-white max-lg:hidden italic">
            Cast
          </h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              key={route}
              href={route}
              className={cn(
                "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-orange-1 ": isActive },
              )}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            asChild
            className="text-16 w-full bg-orange-1 font-extrabold text-black-1"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-orange-1 font-extrabold text-black-1"
            onClick={() => signOut(() => router.push("/"))}
          >
            <Link href="/sign-in">Sign Out</Link>
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
