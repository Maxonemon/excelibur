import { redirect } from "next/navigation";
import { auth } from "~/src/auth";
import { SiteFooter } from "~/src/components/site-footer";
import { SiteHeader } from "~/src/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/app");
  }
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
