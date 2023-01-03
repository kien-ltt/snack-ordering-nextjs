import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectDB } from '../../../lib/db';

export default NextAuth({
  session: {
    // use jwt by default
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDB();

        const usersCollection = client.db().collection('users');

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
});
