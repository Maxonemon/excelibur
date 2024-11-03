// src/app/actions/updateProfile.ts

"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/src/auth";
import { prisma } from "~/src/prisma";
import { UpdateProfileValues } from "../../lib/validations";

export async function updateProfile(data: UpdateProfileValues) {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Assuming you have the userId in your data
      data: { name: data.name },
    });
    revalidatePath("/app", "layout");
    return updatedUser;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile.");
  }
}
