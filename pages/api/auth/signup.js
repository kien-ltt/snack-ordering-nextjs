import { hashPassword } from '../../../lib/auth';
import { connectDB } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { username, password } = req.body;

  if (!username || !username.match(/^[a-zA-Z0-9]+$/)) {
    res.status(422).json({
      message: 'Invalid username - username must contain no special character',
    });
    return;
  }

  if (!password || password.trim().length < 6) {
    res.status(422).json({
      message:
        'Invalid password - password must be at least 6 characters long.',
    });
    return;
  }

  const client = await connectDB();

  const usersCollection = client.db().collection('users');

  const existingUser = await usersCollection.findOne({ username });

  if (existingUser) {
    res.status(422).json({
      message: 'User already exists. Please choose another username.',
    });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  try {
    await usersCollection.insertOne({
      username,
      password: hashedPassword,
    });
  } catch {
    res.status(500).json({
      message: 'Something went wrong. Please try again.',
    });
    client.close();
    return;
  }

  res.status(201).json({
    message: 'Created user!',
  });
  client.close();
}
