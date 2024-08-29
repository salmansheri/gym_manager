"use client";

import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { redirect, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";
import { ModeToggle } from "./mode-toggle";
import { useReadLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
export const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();
  const type = useReadLocalStorage("type");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  if (type !== "admin") {
    router.push("/sign-up");
  }

  return (
    <header className="h-20 ">
      <div className="px-5 md:px-20 lg:px-36 flex items-center justify-between h-full w-full">
        {/* Navbar  */}
        <div className="hidden lg:flex items-center gap-5">
          <div>
            <h1 className="text-2xl font-bold">Gym</h1>
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={cn(
                  isActive && "border bg-white/20 px-4 py-2 rounded"
                )}
                key={link.id}
                href={link.href}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
        <MobileNav />

        <div className="flex items-center  gap-5">
          <p>Welcome Admin!</p>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
