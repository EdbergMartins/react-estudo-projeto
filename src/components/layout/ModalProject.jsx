// ModalProject.jsx

import React, { useEffect, useRef } from 'react';
import style from './ModalProject.module.css';

export const ModalProject = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div>
      <div className={`${style.overlay} ${isOpen ? style.show : ''}`} onClick={onClose}></div>
      <div className={`${style.darken} ${isOpen ? style.show : ''}`} />
      <div ref={modalRef} className={`${style.modal} ${isOpen ? style.show : ''}`}>
        <div className={style.modalContent}>
          <span className={style.closeBtn} onClick={onClose}>&times;</span>
          <h2>Modal Title</h2>
          <p>Modal content goes here.</p>
        </div>
      </div>
    </div >
  );
};
