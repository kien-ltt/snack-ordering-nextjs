import Sidebar from '../sidebar/sidebar';

export default function SidebarLayout(props) {
  return (
    <>
      <div className='fixed flex flex-col -z-10 top-28 left-[10%] bottom-0 right-[10%]'>
        <h1 className='text-3xl font-semibold'>My account</h1>
        <div className='flex justify-between items-start w-full mt-6 space-x-12'>
          <section className='h-2/3 w-5/12'>
            <Sidebar content={props.sidebarContent} />
          </section>
          <section className='w-full'>{props.children}</section>
        </div>
      </div>
    </>
  );
}
