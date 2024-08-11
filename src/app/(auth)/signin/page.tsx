import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "~/src/components/ui/button";
import { UserAuthForm } from "~/src/components/user-auth-form";
import { ny } from "~/src/lib/utils";

export const metadata: Metadata = {
  title: "Login | nyxb UI",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={ny(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 size-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        <div className="flex flex-col gap-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">Get started</h1>
          <p className="text-muted-foreground text-sm">Login to your account</p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm"></p>
      </div>
    </div>
  );
}