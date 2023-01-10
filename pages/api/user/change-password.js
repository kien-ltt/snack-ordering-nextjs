import { connectDB } from '../../../lib/db';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { hashPassword, verifyPassword } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.status(401).json({
      message: 'You must be logged in to change password.',
    });
    return;
  }

  const client = await connectDB();
  const db = client.db('snack-ordering');

  try {
    const user = await db.collection('users').findOne({
      username: session.user.username,
    });

    if (!user) {
      client.close();
      res.status(404).json({
        message: 'User not found!',
      });
      return;
    }

    const oldPasswordIsValid = verifyPassword(
      req.body.oldPassword,
      user.password
    );

    if (!oldPasswordIsValid) {
      client.close();
      res.status(403).json({
        message: 'Old password is incorrect',
      });
      return;
    }

    if (!req.body.newPassword || req.body.newPassword.trim().length < 6) {
      client.close();
      res.status(422).json({
        message:
          'Invalid password - password must be at least 6 characters long.',
      });
      return;
    }

    const hashedPassword = await hashPassword(req.body.newPassword);

    await db.collection('users').updateOne(
      { username: session.user.username },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.status(201).json({
      message: 'Change password successfully',
    });
    client.close();
  } catch (err) {
    res.status(500).json({
      message: 'Unable to change password!',
    });
    client.close();
  }
}
