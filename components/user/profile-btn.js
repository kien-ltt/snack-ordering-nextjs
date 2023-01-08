import { useState } from 'react';

const ProfileBtn = (props) => {
  const [animateProfileBtn, setAnimateProfileBtn] = useState(false);

  const profileBtnClickedHandler = () => {
    setAnimateProfileBtn(true);
  };

  return (
    <button
      onClick={profileBtnClickedHandler}
      onAnimationEnd={() => {
        setAnimateProfileBtn(false);
      }}
      className={`relative group p-3 bg-orange-100 rounded-xl shadow-sm hover:bg-yellow-400 hover:shadow-md transition-all duration-200 ${
        animateProfileBtn && 'animate-bump'
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 text-yellow-500 group-hover:text-white'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
        />
      </svg>
    </button>
  );
};

export default ProfileBtn;
