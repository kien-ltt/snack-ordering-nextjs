import { connectDB } from '../../../lib/db';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.status(401).json({
      message: 'You must be logged in to access this api route.',
    });
    return;
  }

  console.log(session.user.username);

  if (req.method === 'GET') {
    try {
      const client = await connectDB();
      const db = client.db('snack-ordering');

      const data = await db
        .collection('users')
        .findOne({ username: session.user.username });

      res.status(200).json({
        message: 'Found user data!',
        data: data,
      });
      client.close();
      return;
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong. Please try again.',
      });
      client.close();
      return;
    }
  }
}
