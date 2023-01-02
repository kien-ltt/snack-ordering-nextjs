import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Category from '../components/category/category';
import FoodList from '../components/food/food-list';

export default function Home(props) {
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  let foodItems;

  useEffect(() => {
    router.push({ pathname: '/', query: { filter: 'all' } }, undefined, {
      shallow: true,
    });
  }, []);

  useEffect(() => {
    setFilter(router.query.filter);
  }, [router.query.filter]);

  if (filter === 'all') {
    foodItems = (
      <>
        <FoodList
          items={props.foodItems.filter((item) => item.category === 'snack')}
        />
        <FoodList
          items={props.foodItems.filter((item) => item.category === 'drink')}
        />
        <FoodList
          items={props.foodItems.filter((item) => item.category === 'cake')}
        />
      </>
    );
  } else {
    foodItems = (
      <FoodList
        items={props.foodItems.filter((item) => item.category === filter)}
      />
    );
  }

  return (
    <div className='relative'>
      <Category categories={props.categories} />
      {foodItems}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      categories: [
        {
          id: 'c0',
          src: '/images/food-icon/green-salad.png',
          name: 'All',
        },
        {
          id: 'c1',
          src: '/images/food-icon/bubble-tea.png',
          name: 'Drink',
        },
        {
          id: 'c2',
          src: '/images/food-icon/cookie.png',
          name: 'Snack',
        },
        {
          id: 'c3',
          src: '/images/food-icon/hamburger.png',
          name: 'Cake',
        },
      ],
      foodItems: [
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
        {
          id: 'f4',
          src: '/images/food-item/olong-teaplus.jpg',
          name: 'Tra olong Tea+',
          price: 5000,
          stock: 10,
          category: 'drink',
        },
        {
          id: 'f5',
          src: '/images/food-item/olong-teaplus.jpg',
          name: 'Tra olong Tea+',
          price: 5000,
          stock: 10,
          category: 'drink',
        },
        {
          id: 'f6',
          src: '/images/food-item/olong-teaplus.jpg',
          name: 'Tra olong Tea+',
          price: 5000,
          stock: 10,
          category: 'drink',
        },
      ],
    },
  };
}
