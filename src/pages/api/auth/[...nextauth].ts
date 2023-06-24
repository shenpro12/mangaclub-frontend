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
    async jwt({ token, user, account, profile, trigger, session }) {
      if (trigger === "update" && session.newAT) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.accessToken = session.newAT;
      }
      if (trigger === "update" && session.newUserName) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.newUserName;
      }
      if (trigger === "update" && session.newEmail) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.email = session.newEmail;
      }
      if (trigger === "update" && session.newAvatarUrl) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.image = session.newAvatarUrl;
      }
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
