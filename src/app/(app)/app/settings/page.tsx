
import { Metadata } from "next";
import SettingsPage from "./settingsPage";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "~/src/auth";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  const session= await auth()
  const user= session?.user
  if(!user){
    redirect("/signin")
  }

  return <SettingsPage user={user} />;
}