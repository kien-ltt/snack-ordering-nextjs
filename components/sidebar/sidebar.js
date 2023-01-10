import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SidebarItem from './sidebar-item';

const Sidebar = (props) => {
  const [currentPathname, setCurrentPathname] = useState();
  const router = useRouter();

  useEffect(() => {
    setCurrentPathname(router.pathname);
  }, [router.pathname]);

  return (
    <div className='flex-col p-8 rounded-xl border border-zinc-200'>
      <ul className='space-y-2'>
        {props.content.map((item) => {
          return (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              sectionName={item.sectionName}
              href={item.href}
              currentPathname={currentPathname}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
