import Image from 'next/image';
import CartItem from './cart-item';
import vndIcon from '../../public/images/other-icon/vnd1.png';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const DUMMY_FOODCART = [
  {
    id: 'f1',
    src: '/images/food-item/karo.jpg',
    name: 'Banh ga Karo',
    price: 5000,
    amount: 2,
  },
  {
    id: 'f2',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 10000,
    amount: 1,
  },
  {
    id: 'f3',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 10000,
    amount: 1,
  },
  {
    id: 'f4',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 10000,
    amount: 1,
  },
  {
    id: 'f5',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 10000,
    amount: 1,
  },
];

export default function Cart(props) {
  const cartCtx = useContext(CartContext);

  const plusBtnClickedHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const minusBtnClickedHandler = (id) => {
    cartCtx.removeItem(id);
  };

  return (
    <div
      className={`fixed ${
        props.isHidden ? 'hidden' : 'flex'
      } flex-col w-1/3 h-[calc(100%_-_7rem)] z-40 px-10 bg-white bottom-4 right-0 shadow-md rounded-l-3xl`}
    >
      <div className='flex w-full pt-8 items-center space-x-2'>
        <div className='text-2xl font-semibold'>My order</div>
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
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
          />
        </svg>
      </div>
      <div className='py-6 mt-4'>
        <ul className='space-y-6 max-h-80 overflow-auto scrollbar'>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              src={item.src}
              amount={item.amount}
              price={item.price}
              name={item.name}
              totalPrice={item.price * item.amount}
              onPlusItem={plusBtnClickedHandler.bind(null, item)}
              onMinusItem={minusBtnClickedHandler.bind(null, item.id)}
            />
          ))}
        </ul>
      </div>
      <div className='absolute bottom-12 left-10 right-10 space-y-6'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg'>Total Amount:</h3>
          <div className='flex justify-between items-center space-x-2'>
            <h2 className='text-2xl'>{cartCtx.totalAmount.toLocaleString()}</h2>
            <div className='relative w-6 h-6 brightness-125'>
              <Image className='object-contain' src={vndIcon} fill />
            </div>
          </div>
        </div>
        <button className='w-full p-3 bg-green-600 text-white text-md font-semibold shadow-md text-center rounded-lg hover:bg-green-500 transition-all duration-150'>
          Checkout
        </button>
      </div>
    </div>
  );
}
