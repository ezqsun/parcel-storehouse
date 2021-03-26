import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import Adapter from "../../../lib/auth/Adapter"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    })
  ],
  database: Adapter,
  secret: 'KnUwR9F9uRt3NVf3UQPyfMaTEAxqsEz4NLXTmxQJcx',

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // encryption: true,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
    // verifyRequest:
    // newUser: null
  },
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },
  events: {},
  debug: false,
})