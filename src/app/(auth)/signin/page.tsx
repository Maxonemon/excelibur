"use client";

// Make sure you have this utility
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronLeft, Loader2 } from "lucide-react";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { GoogleLogoIcon } from "~/src/components/google-logo-icon";
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
    try {
      setIsGitHubLoading(provider === "github");
      setIsGoogleLoading(provider === "google");

      const result = await signIn(provider, {
        callbackUrl: "/app",
      });

      if (!result) {
        toast.error("Authentication failed", {
          description: "No response from authentication provider",
        });
        return;
      }

      if (result.error) {
        toast.error("Authentication failed", {
          description: "Could not sign in with your account. Please try again.",
        });
        return;
      }

      router.push("/app");
    } catch (error) {
      toast.error("Authentication failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsGitHubLoading(false);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className={ny(
        "min-h-screen flex items-center justify-center p-4",
        "bg-background"
      )}
    >
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
      <Card className="w-full max-w-md bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isGoogleLoading || isGitHubLoading}
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
              onClick={() => handleOAuthSignIn("github")}
              disabled={isGoogleLoading || isGitHubLoading}
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
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isGitHubLoading || isGoogleLoading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={isGitHubLoading || isGoogleLoading}
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
