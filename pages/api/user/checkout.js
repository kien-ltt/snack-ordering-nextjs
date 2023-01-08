import { connectDB } from '../../../lib/db';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  console.log(session);

  if (!session) {
    res.status(401).json({
      message: 'You must be logged in to checkout.',
    });
    return;
  }

  const purchaseItems = req.body.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      amount: item.amount,
    };
  });

  try {
    const client = await connectDB();
    const db = client.db('snack-ordering');

    await db.collection('purchase-records').insertOne({
      username: session.user.username,
      name: session.user.name,
      purchasedItems: purchaseItems,
      totalAmount: req.body.totalAmount,
      purchasedAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'Checkout successfully',
    });
    client.close();
  } catch (err) {
    res.status(500).json({
      message: 'Unable to checkout!',
    });
    client.close();
  }
}
