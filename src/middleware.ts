import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token && token.isAdmin) {
        return true;
      }
      return false;
    },
  },
});

export const config = {
  matcher: ["/manager/:path*", "/manga-editor/:path*"],
};
