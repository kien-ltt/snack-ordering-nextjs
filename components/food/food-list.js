import FoodItem from './food-item';

const DUMMY_FOODLIST = [
  {
    id: 'f1',
    src: '/images/food-item/karo.jpg',
    name: 'Banh ga Karo',
    price: 5000,
    stock: 10,
  },
  {
    id: 'f2',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
  },
  {
    id: 'f3',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
  },
  {
    id: 'f4',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
  },
  {
    id: 'f5',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
  },
  {
    id: 'f6',
    src: '/images/food-item/olong-teaplus.jpg',
    name: 'Tra olong Tea+',
    price: 5000,
    stock: 10,
  },
];

export default function FoodList(props) {
  return (
    <>
      {props.items.length > 0 && (
        <section className='mt-10'>
          <h1 className='text-3xl font-semibold tracking-wide'>
            {props.items[0].category.charAt(0).toUpperCase() +
              props.items[0].category.slice(1)}
          </h1>
          <hr />
          <div className='grid gap-10 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {props.items.map((item) => (
              <FoodItem
                key={item.id}
                id={item.id}
                src={item.src}
                name={item.name}
                price={item.price}
                stock={item.stock}
              ></FoodItem>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
