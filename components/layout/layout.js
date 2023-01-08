import { useState } from 'react';
import { useRouter } from 'next/router';
import Cart from '../cart/cart';
import Modal from '../UI/modal';
import MainNavigation from './main-navigation';

export default function Layout(props) {
  const [cartIsShown, setCartIsShown] = useState(false);
  const router = useRouter();

  const toggleCartHandler = () => {
    setCartIsShown((prevState) => !prevState);
  };

  return (
    <>
      <MainNavigation onToggleCart={toggleCartHandler} />
      {cartIsShown && <Cart onToggleCart={toggleCartHandler} />}
      <main className='mx-auto w-[80%] mb-12'>{props.children}</main>
    </>
  );
}
