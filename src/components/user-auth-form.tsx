"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signIn } from "~/src/auth";
import { ny } from "~/src/lib/utils";
import { buttonVariants } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

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
  const router = useRouter();

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      setIsLoading(true);
      if (provider === "github") setIsGitHubLoading(true);
      if (provider === "google") setIsGoogleLoading(true);

      if (isIOS || isSafari) {
        // Direct redirect for iOS/Safari
        await signIn(provider, {
          callbackUrl: "/app",
          redirect: true,
        });
        return;
      }

      // Handle other browsers
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/app",
      });

      if (result?.ok) {
        toast.success("Successfully signed in");
        router.push("/app");
        router.refresh();
      } else {
        toast.error("❌Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
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
          </div>
        </form>
      </Form>

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

      <button
        onClick={() => handleOAuthSignIn("github")}
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
        onClick={() => handleOAuthSignIn("google")}
        disabled={isLoading || isGitHubLoading || isGoogleLoading}
        className={ny(buttonVariants({ variant: "outline" }))}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google"
            width={16}
            height={16}
            className="mr-2"
          />
        )}
        Google
      </button>
    </div>
  );
}
