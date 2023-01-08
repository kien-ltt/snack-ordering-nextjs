import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CategoryItem(props) {
  const router = useRouter();

  const btnClickedHandler = () => {
    router.push(
      {
        pathname: '/',
        query: { filter: `${props.item.name.toLowerCase()}` },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <li>
      <button
        onClick={btnClickedHandler}
        className={`h-24 w-20 flex flex-col justify-center items-center p-4 space-y-2 rounded-2xl bg-gray-50 border border-gray-200 hover:border-green-600 hover:bg-green-50 focus:bg-green-50 focus:border-green-600 transition duration-200`}
      >
        <Image
          src={props.item.src}
          alt={props.item.name}
          width='20'
          height='20'
        ></Image>
        <div className='font-semibold'>{props.item.name}</div>
      </button>
    </li>
  );
}
