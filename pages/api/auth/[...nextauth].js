import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { redirect } from 'next/dist/server/api-utils';
import { verifyPassword } from '../../../lib/auth';
import { connectDB } from '../../../lib/db';

export const nextAuthOptions = {
  session: {
    // use jwt by default
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDB();

        const usersCollection = client.db('snack-ordering').collection('users');

        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Incorrect password!');
        }

        client.close();
        return { name: user.name, username: user.username };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
