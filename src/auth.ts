//auth.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/thumbnails")) {
        return `${baseUrl}/thumbnails`;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
});
