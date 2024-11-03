"use server";
import Link from "next/link";
import { buttonVariants } from "../../src/components/ui/button";
import { ny } from "../../src/lib/utils";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import UserButton from "./user-button";

export default async function AppHeader() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <header className="animate-fade-in fixed left-0 top-0 z-50 w-full -translate-y-4 border-b opacity-0 backdrop-blur-md [--animation-delay:600ms] ">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/">
          <img src="/favicon.ico" width={50} />
        </Link>
        <Link className="text-md flex items-center" href="/">
          Excelibur
        </Link>

        <div className="ml-auto flex h-full items-center">
          {!session?.user ? (
            <Link
              className={ny(
                buttonVariants({ variant: "secondary" }),
                "mr-6 text-sm"
              )}
              href="/signin"
            >
              Log in
            </Link>
          ) : (
            <UserButton user={session?.user} />
          )}
        </div>
      </div>
    </header>
  );
}
