import Layout from '../../components/layout/layout';
import SidebarLayout from '../../components/layout/sidebar-layout';
import {
  Heart,
  Lock,
  Person,
  ShoppingBag,
} from '../../components/icon/sidebar-icons';
import OrderItem from '../../components/user/order/order-item';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { connectDB } from '../../lib/db';

export default function UserOrdersPage({ session, purchaseRecords }) {
  console.log(purchaseRecords);
  return (
    <div className='p-10 rounded-xl border border-zinc-200'>
      <h3 className='text-2xl font-semibold tracking-wider'>
        Purchased Orders
      </h3>
      <div className='mt-4 h-screen overflow-y-scroll scrollbar'>
        {purchaseRecords.map((order) => (
          <OrderItem
            items={order.purchasedItems}
            purchasedAt={order.purchasedAt}
            totalAmount={order.totalAmount}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const client = await connectDB();
  const db = client.db('snack-ordering');

  const data = await db
    .collection('purchase-records')
    .find(
      {
        username: session.user.username,
        purchasedAt: {
          $gte: new Date(
            new Date().getTime() - 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
      { projection: { _id: 0 } }
    )
    .toArray();

  client.close();
  return {
    props: {
      session,
      purchaseRecords: data,
    },
  };
}

UserOrdersPage.sidebarContent = [
  {
    id: 'i1',
    icon: <ShoppingBag />,
    sectionName: 'Orders',
    href: '/user/orders',
  },
  {
    id: 'i2',
    icon: <Heart />,
    sectionName: 'Favorites',
    href: '/user/favorites',
  },
  {
    id: 'i3',
    icon: <Person />,
    sectionName: 'Personal data',
    href: '/user/profile',
  },
  {
    id: 'i4',
    icon: <Lock />,
    sectionName: 'Change password',
    href: '/user/change-password',
  },
];

UserOrdersPage.getSidebarLayout = (page, sidebarContent) => {
  return (
    <Layout>
      <SidebarLayout sidebarContent={sidebarContent}>{page}</SidebarLayout>
    </Layout>
  );
};
