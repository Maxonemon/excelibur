"use client";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UpdateProfileValues,
  updateProfileSchema,
} from "../../../../lib/validations";

import { User } from "next-auth";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateProfile } from "~/src/app/actions/updateProfile"; // Import the server action

interface SettingsPageProps {
  user: User;
}

export default function SettingsPage({ user }: SettingsPageProps) {
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: UpdateProfileValues) {
    startTransition(async () => {
      try {
        await updateProfile(data); // Call the server action
        toast.success("Profile updated.");
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    });
  }

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user.name || "" },
  });

  return (
    <main className="px-3 py-24">
      <section className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-sm space-y-2.5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a username" {...field} />
                  </FormControl>
                  <FormDescription>Your public username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
