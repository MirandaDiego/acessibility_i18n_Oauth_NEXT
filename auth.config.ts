import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { z } from 'zod';

async function getUser(email: string) {
  const user = await sql`SELECT * FROM users WHERE email=${email}`;
  return user.rows[0];
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsed.success) {
          const { email, password } = parsed.data;
          const user = await getUser(email);
          if (user && bcrypt.compareSync(password, user.password)) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
};
