import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import prisma from "~/src/lib/prisma";
import { updateProfileSchema, UpdateProfileValues } from "~/src/lib/validations";

export async function updateProfile(values: UpdateProfileValues): Promise<void> {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      console.error("No user ID found in session");
      throw new Error("Unauthorized");
    }

    const { name } = updateProfileSchema.parse(values);

    await prisma.user.update({
      where: {id: userId},
      data:{name}
      
    });

    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to update profile:", error.message || error);
    throw new Error("Failed to update profile");
  }
}
