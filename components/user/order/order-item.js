import Image from 'next/image';

const DUMMY_FOODLIST = [
  {
    id: 'f1',
    src: '/images/food-item/karo.jpg',
    name: 'Banh ga Karo',
    price: 5000,
    stock: 10,
    category: 'cake',
  },
  {
    id: 'f2',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
    category: 'drink',
  },
  {
    id: 'f3',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
    category: 'drink',
  },
];
const OrderItem = (props) => {
  return (
    <div className='flex flex-col w-full py-4 px-8 space-y-4 mb-4'>
      <div className='flex justify-between items-start'>
        <div className='flex h-32 space-x-4'>
          {DUMMY_FOODLIST.map((item) => {
            return (
              <div
                key={item.id}
                className='relative h-full w-32 rounded-md overflow-hidden brightness-95'
              >
                <Image
                  className='object-cover'
                  src={item.src}
                  fill
                  sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 10vw'
                  quality={90}
                />
              </div>
            );
          })}
        </div>
        <button className='px-4 py-2 border-2 border-stone-400 rounded-md font-semibold tracking-tight hover:bg-stone-400 hover:text-white'>
          VIEW ORDER
        </button>
      </div>
      <div className='flex space-x-24'>
        <div className='flex flex-col'>
          <div className='font-semibold tracking-tight'>Order number</div>
          <div className=''>1</div>
        </div>
        <div className='flex flex-col'>
          <div className='font-semibold tracking-tight'>Purchased date</div>
          <div className=''>{new Date(props.purchasedAt).toLocaleString()}</div>
        </div>
        <div className='flex flex-col'>
          <div className='font-semibold tracking-tight'>Total amount</div>
          <div className=''>{`${props.totalAmount.toLocaleString()} VND`}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
