import Link from 'next/link';

const SidebarItem = (props) => {
  const isHighlighted = props.currentPathname === props.href;
  return (
    <li>
      <Link
        href={props.href}
        className={`flex justify-between items-center w-full py-4 px-6 font-semibold ${
          isHighlighted && 'bg-stone-200'
        } rounded-xl space-x-6 hover:bg-stone-100 transition`}
      >
        {props.icon}
        <div className='w-full'>{props.sectionName}</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8 opacity-40'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </Link>
    </li>
  );
};

export default SidebarItem;
