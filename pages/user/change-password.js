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
import FormInput from '../../components/UI/form-input';
import { useRef, useState } from 'react';

export default function UserChangePasswordPage() {
  const [isValid, setIsValid] = useState(true);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredNewPassword !== enteredConfirmPassword) {
      setIsValid(false);
      console.log('Confirm Password not match');
      return;
    }

    const response = await fetch('/api/user/change-password', {
      method: 'POST',
      body: JSON.stringify({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    alert(data.message);
  };

  return (
    <div className='p-10 rounded-xl border border-zinc-200'>
      <h3 className='text-2xl font-semibold tracking-wider'>Change Password</h3>
      <div className='mt-8 h-screen'>
        <form
          onSubmit={submitHandler}
          className='max-w-lg w-full mx-12 shadow-md rounded-2xl space-y-5 bg-yellow-100 p-10'
        >
          <FormInput
            ref={oldPasswordRef}
            label='Old Password'
            name='old-password'
            type='password'
          />
          <FormInput
            ref={newPasswordRef}
            label='New Password'
            name='new-password'
            type='password'
          />
          <FormInput
            ref={confirmPasswordRef}
            label='Confirm Password'
            name='confirm-password'
            type='password'
          />
          <button
            type='submit'
            className='w-full px-6 py-4 bg-green-600 text-white text-xl rounded-2xl shadow-md hover:bg-green-500 transition'
          >
            Reset Password
          </button>
        </form>
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

  return {
    props: {
      session,
    },
  };
}

UserChangePasswordPage.sidebarContent = [
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

UserChangePasswordPage.getSidebarLayout = (page, sidebarContent) => {
  return (
    <Layout>
      <SidebarLayout sidebarContent={sidebarContent}>{page}</SidebarLayout>
    </Layout>
  );
};
