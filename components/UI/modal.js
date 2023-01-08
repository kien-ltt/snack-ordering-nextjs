import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ClientOnlyPortal from './client-only-portal';
import { useCallbackWhenClickOutside } from '../../hooks/useCallbackWhenClickOutside';

const BackDrop = (props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen z-40 bg-black opacity-20'></div>
  );
};

const ModalOverlay = (props) => {
  const modalRef = useRef(null);

  useCallbackWhenClickOutside(modalRef, props.onClose);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div
        ref={modalRef}
        className='bg-white p-10 rounded-2xl shadow-md animate-slideDown'
      >
        {props.children}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <ClientOnlyPortal selector='#overlays'>
      <BackDrop />
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
    </ClientOnlyPortal>
  );
};

export default Modal;
