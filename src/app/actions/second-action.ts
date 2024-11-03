"use server";

import { auth } from "~/src/auth";
import prisma from "~/src/prisma";

export async function updatify() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("No user ID found in session");
    throw new Error("Unauthorized");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { name: "Maguette" },
  });
}
