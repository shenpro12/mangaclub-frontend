import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken?: string | null;
      email?: string | null;
      exp?: number | null;
      iat?: number | null;
      id?: string | null;
      image?: string | null;
      isAdmin?: boolean | null;
      jti?: string | null;
      name?: string | null;
      picture?: string | null;
      refeshToken?: string | null;
      sub?: string | null;
    };
  }
}
