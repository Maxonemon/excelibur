import { redirect } from "next/navigation";
import { auth } from "~/src/auth";
import { Toaster } from "~/src/components/ui/sonner";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/app");
  }
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
