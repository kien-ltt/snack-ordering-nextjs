import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cart from '../cart/cart';
import CartBtn from '../cart/cart-btn';

export default function MainNavigation() {
  const router = useRouter();
  const [cartIsHidden, setCartIsHidden] = useState(true);

  const toggleCartBtnHandler = () => {
    setCartIsHidden((prevState) => !prevState);
  };

  const loginClickedHandler = () => {
    router.push('/auth');
  };

  return (
    <>
      <header className='fixed top-0 h-20 z-50 w-full flex bg-white justify-between items-center px-12 border-b border-gray-100 shadow-sm'>
        <div className='ml-28'>
          <Link className='text-3xl font-bold' href='/'>
            Food Ordering Tool
          </Link>
        </div>
        <div className='flex justify-end items-center text-lg mr-20'>
          <div className='group h-10 w-full max-w-md flex justify-between items-center bg-zinc-100 rounded-xl mx-16 my-8 p-4 border border-zinc-100 hover:border-zinc-200'>
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
          <button
            onClick={loginClickedHandler}
            className='ml-6 h-12 w-44 px-6 bg-yellow-400 text-white font-bold rounded-xl shadow-sm border border-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400'
          >
            Log in
          </button>
          <button className='h-12 w-44 ml-3'>
            <Link className='hover:underline hover:text-yellow-400' href='/'>
              Sign up
            </Link>
          </button>
        </div>
      </header>
      <Cart isHidden={cartIsHidden} />
    </>
  );
}
