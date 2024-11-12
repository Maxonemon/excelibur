"use client";

// Make sure you have this utility
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronLeft, Loader2 } from "lucide-react";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GoogleLogoIcon from "~/src/components/google-logo-icon";
import { Button, buttonVariants } from "~/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/src/components/ui/card";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import { ny } from "~/src/lib/utils";

export default function LoginPage() {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsGitHubLoading(provider === "github");
    setIsGoogleLoading(provider === "google");

    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/app",
      });

      if (result?.error) {
        toast.error("❌ Authentication error");
      } else {
        toast.success("✅ Successfully authenticated");
        router.push("/app");
      }
    } catch (error) {
      toast.error("❌ Authentication error");
    } finally {
      setIsGitHubLoading(false);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className={ny(
        "min-h-screen flex items-center justify-center p-4",
        "bg-gray-100 dark:bg-gray-900"
      )}
    >
      <Link
        href="/"
        className={ny(
          buttonVariants({ variant: "secondary" }),
          "absolute left-4 top-4 md:left-8 md:top-8 text-slate-800"
        )}
      >
        <>
          <ChevronLeft className="mr-2 size-4" />
          Back
        </>
      </Link>
      <Card
        className={ny("w-full max-w-md shadow-lg", "bg-white dark:bg-gray-800")}
      >
        <CardHeader className="space-y-1">
          <CardTitle
            className={ny(
              "text-2xl font-bold",
              "text-gray-800 dark:text-white"
            )}
          >
            Sign in
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                handleOAuthSignIn("google");
                // toast("✅ successfully authenticated");
              }}
              disabled={isGoogleLoading || isGitHubLoading}
              className={ny(
                "w-full",
                "text-gray-800 dark:text-white",
                "border-gray-300 dark:border-gray-600",
                "hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {isGoogleLoading || isGitHubLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <GoogleLogoIcon className="mr-2 size-4" />
              )}
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleOAuthSignIn("github");
                // toast("✅ successfully authenticated");
              }}
              disabled={isGoogleLoading || isGitHubLoading}
              className={ny(
                "w-full",
                "text-gray-800 dark:text-white",
                "border-gray-300 dark:border-gray-600",
                "hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {isGitHubLoading || isGoogleLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <GitHubLogoIcon className="mr-2 size-4" />
              )}
              Github
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className={ny(
                  "px-2 text-gray-600 dark:text-gray-400",
                  "bg-white dark:bg-gray-800"
                )}
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800 dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className={ny(
                  "bg-gray-100 dark:bg-gray-700",
                  "text-gray-800 dark:text-white"
                )}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-800 dark:text-white"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                disabled={isGitHubLoading || isGoogleLoading}
                className={ny(
                  "bg-gray-100 dark:bg-gray-700",
                  "text-gray-800 dark:text-white"
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isGitHubLoading || isGoogleLoading}
            className={ny(
              "w-full",
              "bg-red-600 hover:bg-red-700",
              "text-white"
            )}
          >
            {isGoogleLoading && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}{" "}
            Sign In with Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
