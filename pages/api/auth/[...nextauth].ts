import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { prisma } from "../../../lib/prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) throw new Error('Invalid Credentials');
        const userFound = await prisma.admin.findUnique({
          where: {
            email: credentials?.email
          }
        });
        if (!userFound) throw new Error('No user found');
        const matchPassowrd = await bcrypt.compare(credentials.password, userFound.password)
        if (!matchPassowrd) throw new Error('Wrong passoword')
        return { ...userFound, provider: 'credentials' };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        if (user.provider == 'credentials') return true;
        const result = await fetch('http://localhost:3000/api/member/', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            iconUrl: user.image
          })
        });
        const { data } = await result.json()
        user.id = data.id;
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl + '/auth/login') {
        return baseUrl + '/admin/adminActivities';
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user,
          password: null
        };
        token.user.provider = user.provider !== 'credentials' ? 'google' : 'credentials';
      }
      return token;
    },
    async session({ session, user, token }) {
      const newSession = { ...session, user: { ...token.user } };
      return newSession;
    },
  }
}

export default NextAuth(authOptions);
