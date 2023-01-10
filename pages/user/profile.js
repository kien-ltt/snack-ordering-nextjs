import Layout from '../../components/layout/layout';
import SidebarLayout from '../../components/layout/sidebar-layout';
import {
  Heart,
  Lock,
  Person,
  ShoppingBag,
} from '../../components/icon/sidebar-icons';
import Image from 'next/image';
import EditableField from '../../components/UI/editable-field';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { connectDB } from '../../lib/db';

export default function UserProfilePage({ session, userData }) {
  return (
    <div className='p-10 rounded-xl border border-zinc-200'>
      <h3 className='text-2xl font-semibold tracking-wider'>Personal Data</h3>
      <div className='p-4 mt-4 h-screen'>
        <div className='flex justify-between items-center space-x-12 px-20 py-6'>
          <div className='flex justify-start items-center space-x-12 '>
            <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-300 shadow-md'>
              <Image
                className='object-contain'
                src='/images/user-avatar.png'
                fill
              />
            </div>
            <div className='text-2xl font-semibold'>{userData.name}</div>
          </div>
          <div className='flex flex-col justify-center items-center space-y-2 p-4 text-xl ring-2 ring-yellow-400 rounded-xl'>
            <div className='flex justify-center items-center space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3'
                />
              </svg>
              <span className='font-semibold text-base'>Current Balance: </span>
            </div>
            <div className='flex justify-center items-center space-x-2'>
              <span className='text-xl'>
                {userData.balance.toLocaleString()}
              </span>
              <div className='relative w-6 h-6 brightness-110'>
                <Image
                  className='object-contain'
                  src='/images/other-icon/vnd1.png'
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-14 mt-6'>
          <EditableField label='Username' value={userData.username} />
          <EditableField label='Gender' value={userData.gender} />
          <EditableField label='Phone' value={userData.phone} />
        </div>
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
    .collection('users')
    .findOne({ username: session.user.username }, { projection: { _id: 0 } });

  client.close();
  return {
    props: {
      session,
      userData: data,
    },
  };
}

UserProfilePage.sidebarContent = [
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

UserProfilePage.getSidebarLayout = (page, sidebarContent) => {
  return (
    <Layout>
      <SidebarLayout sidebarContent={sidebarContent}>{page}</SidebarLayout>
    </Layout>
  );
};
