import CategoryItem from './category-item';

export default function Category(props) {
  return (
    <div className=''>
      <ul className='flex space-x-10'>
        {props.categories.map((category) => (
          <CategoryItem key={category.id} item={category}></CategoryItem>
        ))}
      </ul>
    </div>
  );
}
