import React, { useEffect, useRef, useState } from 'react';
import style from './ModalProject.module.css';
import LinkButton from './LinkButton';
import LoadingButton from './LoadingButton';
import Input from '../form/Input'

export const ModalProject = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);

  const { name, budget, category } = project.project
  const [modifyModal, setModifyModal] = useState(false)
  const [valorChanger, setValorChanger] = useState()
  const [typeOfAdd, setTypeOfAdd] = useState('')

  const handleClick = (type) => {
    if (type === 1) {
      setTypeOfAdd('Receita')
    } else {
      setTypeOfAdd('Gasto')
    }
    setModifyModal(true)
  }

  const handleAdd = () => {
    console.log(valorChanger)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (secondModalRef.current && !secondModalRef.current.contains(event.target)) {
        setModifyModal(false)
        setValorChanger()
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (secondModalRef) {
        if (modalRef.current && !modalRef.current.contains(event.target) && !secondModalRef.current && !secondModalRef.current.contains(event.target)) {
          onClose();
          setValorChanger()
        }
      } else {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
          setValorChanger()
        }
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
      {modifyModal &&
        <div style={{ zIndex: 1 }} className={style.darken}>
          <div ref={secondModalRef} className={style.modalSecondary}>
            <span className={style.closeBtn} onClick={() => setModifyModal(false)}>&times;</span>
            <h4> Adicionar {typeOfAdd} </h4>
            <form onSubmit={(e) => console.log(e)}>
              <dvi className={style.form}>
                <div>
                  <input
                    onChange={(e) => setValorChanger(e.target.value)}
                    placeholder='Valor'
                    type="number"
                    id="Valor"
                    name="Valor"
                    value={valorChanger}
                    pattern="/^\d+$/"
                    title="Por favor, insira apenas numeros positivos."
                    required
                  />

                </div>
                <LoadingButton handleClick={handleAdd} text='Adicionar' />
              </dvi>
            </form>
          </div>
        </div>
      }
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
            <LoadingButton handleClick={() => handleClick(1)} text='Adicionar Receita' />
            <LoadingButton handleClick={() => handleClick(2)} text='Adicionar Gasto' />
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
