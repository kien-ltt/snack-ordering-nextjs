import { useEffect, useRef, useState } from 'react';

const EditableField = (props) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();

  const editBtnHandler = () => {
    setIsEditing(true);
  };

  const confirmHandler = () => {
    setIsEditing(false);
  };

  const cancelHandler = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className='flex items-center space-x-6 w-full justify-between pb-8 mt-2 border-b border-zinc-100'>
      <div className='relative flex justify-between items-center w-full'>
        <label htmlFor={props.name} className='font-semibold text-md'>
          {props.label}
        </label>
        <input
          name={props.name}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={!isEditing}
          ref={inputRef}
          className={`w-3/5 px-4 py-1 leading-8 font-medium border border-zinc-200 rounded-lg text-neutral-700 ${
            isEditing ? 'bg-white' : 'bg-neutral-50'
          }`}
        />
        {isEditing && (
          <div className='absolute flex items-center space-x-2 bottom-0 right-0 translate-y-7'>
            <button
              onClick={confirmHandler}
              className='p-1 rounded-md ring-1 ring-yellow-400 bg-orange-100 text-yellow-600 hover:bg-yellow-400 hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12.75l6 6 9-13.5'
                />
              </svg>
            </button>
            <button
              onClick={cancelHandler}
              className='p-1 rounded-md ring-1 ring-yellow-400 bg-orange-100 text-yellow-600 hover:bg-yellow-400 hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <button
        onClick={editBtnHandler}
        className={`p-1 rounded-md ring-2 ring-yellow-400 ${
          isEditing
            ? 'opacity-50 cursor-default'
            : 'hover:bg-yellow-400 hover:text-white'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
          />
        </svg>
      </button>
    </div>
  );
};

export default EditableField;
