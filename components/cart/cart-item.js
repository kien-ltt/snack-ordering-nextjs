import Image from 'next/image';
import vndIcon from '../../public/images/other-icon/vnd1.png';

export default function CartItem(props) {
  return (
    <li className='flex justify-between items-center'>
      <div className='flex space-x-5 items-center'>
        <div className='relative flex justify-center items-center h-16 w-20 overflow-hidden rounded-xl'>
          <Image
            className='object-cover'
            src={props.src}
            alt={props.name}
            fill
          />
        </div>
        <div className='h-14 flex flex-col justify-between'>
          <div className='flex items-center space-x-1'>
            <h3>{props.amount}</h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 text-gray-400 scale-75'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
            <h3>{props.name}</h3>
          </div>
          <div className='flex space-x-3'>
            <button
              onClick={props.onPlusItem}
              className='h-6 w-6 rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-500 transition-all ease-out duration-200 scale-90'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 scale-75'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v12m6-6H6'
                />
              </svg>
            </button>
            <button
              onClick={props.onMinusItem}
              className='h-6 w-6 rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-500 transition-all ease-out duration-200 scale-90'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 scale-75'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M18 12H6'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center space-x-2 mr-2'>
        <h3 className='text-gray-400'>{props.totalPrice.toLocaleString()}</h3>
        <div className='relative w-6 h-6 brightness-125'>
          <Image className='object-contain' src={vndIcon} fill />
        </div>
      </div>
    </li>
  );
}
