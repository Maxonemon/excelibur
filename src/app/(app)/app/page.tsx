import { redirect } from "next/navigation";
import { signOut } from "~/src/auth";
import Chat from "~/src/components/chat";
import getSession from "~/src/lib/getSession";

export const Metadata = {
  title: "app",
};
export default async function page() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }
  return (
    <>
      <main className="my-24 flex flex-col justify-center items-center ">
        <Chat/>
      </main>
    </>
  );
}
