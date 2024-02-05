import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string,
      role: 'ADMIN' | 'BASIC'
    } & DefaultSession["user"]
  }
}
declare module "next-auth/jwt"{
  interface JWT extends DefaultJWT{
    role: 'ADMIN' | 'BASIC'
  }
}