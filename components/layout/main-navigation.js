import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cart from '../cart/cart';
import CartBtn from '../cart/cart-btn';
import ProfileBtn from '../user/profile-btn';

export default function MainNavigation(props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleCartBtnHandler = () => {
    props.onToggleCart();
  };

  const loginClickedHandler = () => {
    router.push('/auth');
  };

  const logoutClickedHandler = () => {
    signOut();
  };

  return (
    <>
      <header
        id='header'
        className='fixed top-0 h-20 z-50 w-full flex bg-white justify-between items-center px-12 border-b border-gray-100 shadow-sm'
      >
        <div className='ml-28'>
          <Link className='text-3xl font-bold' href='/'>
            Food Ordering Tool
          </Link>
        </div>
        <nav className='flex justify-end items-center text-lg mr-20 space-x-7'>
          <div className='group h-10 w-full max-w-md flex justify-between items-center bg-zinc-100 rounded-xl my-8 p-4 border border-zinc-100 hover:border-zinc-200'>
            <input
              type='text'
              className='w-full font-thin text-sm bg-transparent focus:outline-none text-black rounded-lg placeholder:text-sm placeholder:tracking-wide placeholder:font-sans placeholder:font-thin'
              alt='Search'
              name='Search'
              placeholder='Search'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-yellow-400'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </div>
          <CartBtn onToggleCartBtn={toggleCartBtnHandler} />
          {!session && (
            <button
              onClick={loginClickedHandler}
              className='h-12 w-52 px-6 bg-yellow-400 text-white font-bold rounded-xl shadow-sm border border-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400'
            >
              Log in
            </button>
          )}
          {session && (
            <>
              <Link href='/user/profile'>
                <ProfileBtn />
              </Link>
              <button
                onClick={logoutClickedHandler}
                className='ml-6 h-12 w-52 px-6 bg-yellow-400 text-white font-bold rounded-xl shadow-sm border border-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400'
              >
                Log out
              </button>
            </>
          )}
          {!session && (
            <Link
              className='flex items-center justify-center h-12 w-auto whitespace-nowrap hover:text-yellow-400'
              href='/'
            >
              Sign up
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
