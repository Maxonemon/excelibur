import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  ...authConfig,

  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      } else if (isLoggedIn && isTryingToAccessApp) {
        return true;
      } else if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app", request.nextUrl));
      } else if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      } else if (isLoggedIn && request.nextUrl.pathname.includes("/signin")) {
        return Response.redirect(new URL("/app", request.nextUrl));
      } else if (isLoggedIn && request.nextUrl.pathname === "/") {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return false;
    },
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
