"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMenu } from "@/hooks/use-menu";
import { navLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const MobileNav = () => {
  const menu = useMenu();
  const router = useRouter();
  const onNavigate = (href: string) => {
    router.push(href);
    menu.onClose();
  };
  return (
    <nav className="lg:hidden">
      <Sheet key="left" open={menu.isOpen} onOpenChange={menu.onClose}>
        <Button onClick={menu.onOpen} variant="ghost">
          <Menu />
        </Button>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Gym</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <div className="py-10 flex flex-col gap-5 ">
            {navLinks.map((link) => (
              <Button
                onClick={() => onNavigate(link.href)}
                className="flex justify-start"
                variant="ghost"
                key={link.id}
              >
                {link.title}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
