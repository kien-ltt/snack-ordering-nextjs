import Layout from '../../components/layout/layout';
import SidebarLayout from '../../components/layout/sidebar-layout';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import {
  Heart,
  Lock,
  Person,
  ShoppingBag,
} from '../../components/icon/sidebar-icons';

export default function UserFavoritesPage() {
  return (
    <div className='p-10 rounded-xl border border-zinc-200'>
      <h3 className='text-2xl font-semibold tracking-wider'>Orders</h3>
      <div className='mt-4 h-screen'>UserFavoritesPage</div>;
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

  return {
    props: {
      session,
    },
  };
}

UserFavoritesPage.sidebarContent = [
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

UserFavoritesPage.getSidebarLayout = (page, sidebarContent) => {
  return (
    <Layout>
      <SidebarLayout sidebarContent={sidebarContent}>{page}</SidebarLayout>
    </Layout>
  );
};
