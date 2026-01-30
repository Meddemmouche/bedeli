import NextAuth from "next-auth"
import { verifyUser, getUserByEmail } from "./auth-helpers"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await verifyUser(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          return null;
        }     // Placeholder:
        return {
          id: user.id.toString(), // must be a string
          email: user.email,
          name: `${user.f_name} ${user.l_name}`,
        };
      },
    }),
  ],
  pages: {
    signIn: "/connection",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
})