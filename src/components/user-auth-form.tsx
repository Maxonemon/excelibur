"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { buttonVariants } from "~/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/src/components/ui/form";
import { Input } from "~/src/components/ui/input";
import { ny } from "~/src/lib/utils";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});
type FormData = z.infer<typeof userAuthSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: { email: "" },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const router = useRouter(); // Initialize useRouter in the client-side component

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsGitHubLoading(provider === "github");
    setIsGoogleLoading(provider === "google");

    try {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/app",
        ...(isIOS && { redirect: true }),
      });

      if (!isIOS) {
        if (result?.ok) {
          toast.success("✅ Successfully authenticated");
          router.push("/app");
        } else {
          toast.error("❌ Authentication error");
        }
      }
    } catch (error) {
      toast.error("❌ Authentication error");
    } finally {
      setIsGitHubLoading(false);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={ny("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading || isGitHubLoading || isGoogleLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className={ny(buttonVariants())}
              disabled={isLoading || isGitHubLoading || isGoogleLoading}
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Sign In with Email
            </button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          handleOAuthSignIn("github");
          // toast("✅ successfully authenticated");
        }}
        disabled={isLoading || isGitHubLoading || isGoogleLoading}
        className={ny(buttonVariants({ variant: "outline" }))}
      >
        {isGitHubLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 size-4" />
        )}
        Github
      </button>

      <button
        onClick={() => {
          handleOAuthSignIn("google");
          // toast("✅ successfully authenticated");
        }}
        disabled={isLoading || isGitHubLoading || isGoogleLoading}
        className={ny(buttonVariants({ variant: "outline" }))}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="google logo"
            width={17}
            height={17}
            className="mr-2 size-4"
          />
        )}
        Google
      </button>
    </div>
  );
}
