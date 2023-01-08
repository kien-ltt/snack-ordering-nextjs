export default function SidebarLayout(props) {
  return (
    <>
      <div className='fixed -z-10 top-28 left-[10%] bottom-0 right-[10%] bg-red-200'>
        <h1 className='text-2xl'>Page Name</h1>
        <div className='mt-4 flex-col h-2/3 w-1/4 bg-slate-300'></div>
      </div>
      <div className='relative w-full mt-28'>
        <div className='absolute top-12 right-0 w-2/3 bg-yellow-400'>
          {props.children}
        </div>
      </div>
    </>
  );
}
