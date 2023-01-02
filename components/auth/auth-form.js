import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function AuthForm() {
  const [emailEntered, setEmailEntered] = useState(false);
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();

  useEffect(() => {
    enteredEmailRef.current.focus();
  }, []);

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      setEmailEntered(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, []);

  const btnClickedHandler = (e) => {
    if (emailEntered === false) {
      setEmailEntered(true);
    } else {
      e.preventDefault();
      console.log('Submit!');
    }
  };

  return (
    <section className='flex items-center justify-center min-h-full '>
      <div className='relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl overflow-hidden md:flex-row md:space-y-0 md:m-0'>
        <form className='p-6 md:p-20'>
          <h2 className='font-mono mb-5 text-3xl font-bold'>Login</h2>
          <p className='maw-w-sm mb-12 font-sans font-light text-gray-600'>
            Sign in to your account to purchase items or check balance.
          </p>
          <input
            type='text'
            name='username'
            placeholder='Enter your username'
            ref={enteredEmailRef}
            required
            className={`${
              emailEntered && 'hidden'
            } w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light`}
          />
          {emailEntered && (
            <>
              <p className='mb-4 pl-6'>{enteredEmailRef.current.value}</p>
              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                ref={enteredPasswordRef}
                autoFocus
                required
                className={`w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light`}
              />
            </>
          )}

          <div className='flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0'>
            <div className='font-thin text-cyan-700'>Forgot password</div>
            <button
              type={emailEntered ? 'submit' : 'button'}
              onClick={btnClickedHandler}
              onKeyUp={keyPressHandler}
              className='w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150'
            >
              <span>{emailEntered ? 'Log in' : 'Next'}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-7'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#ffffff'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <line x1='5' y1='12' x2='19' y2='12' />
                <line x1='13' y1='18' x2='19' y2='12' />
                <line x1='13' y1='6' x2='19' y2='12' />
              </svg>
            </button>
          </div>
        </form>

        <div className='relative w-96 hidden md:block'>
          <Image
            className='object-contain'
            src='/images/store-illustration.webp'
            alt='store-illustration'
            fill
          ></Image>
        </div>
      </div>
    </section>
  );
}

{
  /* <h1 className='text-xl font-bold text-white'>Login</h1>
        <form className='mt-4 w-full'>
          <div>
            <label
              className='block text-center text-white font-semibold'
              htmlFor='email'
            >
              Your Email
            </label>
            <input
              className='w-full rounded-md'
              type='email'
              id='email'
              required
            />
          </div>
          <div>
            <label
              className='block text-center text-white font-semibold'
              htmlFor='password'
            >
              Your Password
            </label>
            <input
              className='w-full rounded-md'
              type='password'
              id='password'
              required
            />
          </div>
          <div>
            <button>Login</button>
            <button>Create new account</button>
          </div>
        </form> */
}
