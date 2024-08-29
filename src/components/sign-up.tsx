"use client";

import { useEffect, useState } from "react";

import { AuthForm } from "@/components/forms/auth-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { OTPForm } from "./forms/otp-form";

export const SignUp = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-[90vw] lg:w-[50vw]">
      <CardHeader>
        <CardTitle>Sign up as User</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col lg:flex-row gap-5 py-5 items-center justify-center">
        <Button>Continue as Member</Button>
        <Dialog>
          <DialogTrigger>
            <Button>Continue as Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Continue as Admin</DialogTitle>
              <DialogDescription>Enter Your Admin Pin</DialogDescription>
            </DialogHeader>
            <OTPForm />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
