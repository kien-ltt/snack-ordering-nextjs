import Image from 'next/image';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

const FoodItem = (props) => {
  const cartCtx = useContext(CartContext);

  const [amount, setAmount] = useState(0);
  const plusBtnClickedHandler = () => {
    setAmount((prevState) => prevState + 1);
  };
  const minusBtnClickedHandler = () => {
    if (amount > 0) {
      setAmount((prevState) => prevState - 1);
    }
  };

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      src: props.src,
      amount,
      price: props.price,
    });
  };

  return (
    <div className='group flex flex-col w-56 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all ease-out duration-200'>
      <div className='relative w-full h-60 rounded-xl overflow-hidden'>
        <Image className='object-cover' src={props.src} alt={props.name} fill />
      </div>
      <div className='p-3'>
        <div className='text-lg font-semibold'>{props.name}</div>
        <div className='flex justify-between mt-1'>
          <span>{`${props.price.toLocaleString()} VND`}</span>
          <span>{`Stock: ${props.stock}`}</span>
        </div>
      </div>
      <div className='p-3'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2 justify-center items-center'>
            <button
              onClick={plusBtnClickedHandler}
              className='h-6 w-6 rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-500 transition-all ease-out duration-200'
            >
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
                  d='M12 6v12m6-6H6'
                />
              </svg>
            </button>
            <span className='text-md'>{amount}</span>
            <button
              onClick={minusBtnClickedHandler}
              className='h-6 w-6 rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-500 transition-all ease-out duration-200'
            >
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
                  d='M18 12H6'
                />
              </svg>
            </button>
          </div>
          <button
            onClick={addToCartHandler}
            className='px-3 py-2 bg-yellow-400 rounded-full text-white text-sm font-semibold cursor-pointer border border-transparent hover:bg-white hover:border-yellow-400 hover:text-yellow-400'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
