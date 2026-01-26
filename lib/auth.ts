import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    // Email/Password
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // TODO: Query your Drizzle DB here
        
        // Verify password with bcrypt
        // Return user object or null
        
        // Placeholder:
        if (credentials.email === "test@test.com") {
          return { id: "1", email: credentials.email, name: "Test User" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
})