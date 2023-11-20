import React, { useEffect, useRef } from 'react';
import style from './ModalProject.module.css';
import LinkButton from './LinkButton';
import LoadingButton from './LoadingButton';

export const ModalProject = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  const { name, budget, category } = project.project


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
          <div className={style.displayModal}>
            <span className={style.closeBtn} onClick={onClose}>&times;</span>
            <h2>{name}</h2>
            <h3>Valor Inicial: {budget}</h3>
            <h3>Valor Atual: {budget}</h3>
            <h3>Category: {category}</h3>
            <LoadingButton text='Adicionar Receita' />
            <LoadingButton text='Adicionar Gasto' />
          </div>
          <div className={style.modalTable}>
            <div className={style.celModalTable}>
              <h4>Despesas</h4>
              <span>1</span>
            </div>
            <div className={style.celModalTable}>
              <h4>Receitas</h4>
              <span>1</span>
            </div>
            <div className={style.celModalTable}>
              <h4>Data</h4>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
