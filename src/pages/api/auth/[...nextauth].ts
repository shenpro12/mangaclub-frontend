import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import request from "@/util/request";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: any, req) {
        let userInfo: any = await request.post("account/signin", {
          userNameOrEmail: credentials?.userNameOrEmail,
          password: credentials?.password,
        });

        if (userInfo.status) {
          return {
            id: userInfo.user.id,
            name: userInfo.user.userName,
            email: userInfo.user.email,
            image: userInfo.user.avatar,
            isAdmin: userInfo.user.isAdmin,
            accessToken: userInfo.user.accessToken,
            refeshToken: userInfo.user.refeshToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/", signOut: "/" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
