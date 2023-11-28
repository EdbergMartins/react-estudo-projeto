import React, { useEffect, useRef, useState } from 'react';
import style from './ModalProject.module.css';
import LinkButton from './LinkButton';
import LoadingButton from './LoadingButton';
import Input from '../form/Input'
import axios from '../layout/axiosConfig'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

export const ModalProject = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const secondModalRef = useRef(null);

  const { name, budget, category } = project.project
  const [modifyModal, setModifyModal] = useState(false)
  const [valorChanger, setValorChanger] = useState()
  const [typeOfAdd, setTypeOfAdd] = useState('')
  const [debits, setDebits] = useState()
  const [credits, setCredits] = useState()
  const [isActived, setIsActived] = useState(false)

  const handleClick = (type) => {
    if (type === 1) {
      setTypeOfAdd('Receita')
    } else {
      setTypeOfAdd('Gasto')
    }
    setModifyModal(true)
  }

  const onCloseModifyModal = () => {
    setModifyModal(false)
    setValorChanger('')
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
    axios.get('/transactions', { params: { "id": project.project.id } })
      .then(response => {
        setDebits(Object.values(response.data.returnDebits))
        setCredits(Object.values(response.data.returnCredits))

      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao executar a ação.')
      })
      .finally(() =>
        console.log('fim')
        // setLoading(false)
      )
      ;
  }, [])
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

  console.log(isActived)

  console.log(debits)
  console.log(credits)

  return (
    <div>
      {modifyModal &&
        <div style={{ zIndex: 1 }} className={style.darken}>
          <div ref={secondModalRef} className={style.modalSecondary}>
            <span className={style.closeBtn} onClick={() => onCloseModifyModal()}>&times;</span>
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
              <LoadingButton isActived={isActived} handleClick={() => setIsActived(true)} text='Despesas' />
              <LoadingButton isActived={!isActived} handleClick={() => setIsActived(false)} text='Receitas' />
            </div>


            {/* {debits && credits ?
                <TableContainer>
                  <Table >
                    <TableHead sx={{ border: 1, borderRadius: " 5px" }}>
                      <TableRow>
                        <TableCell align="center">Valor(R$)</TableCell>
                        <TableCell align="center">Data</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {debits.map((row) => (
                        row.id &&
                        <TableRow
                          key={row.id}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {row.value}
                          </TableCell>
                          <TableCell align="right">{row.data_transaction}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                :

                "nada"}
            </div>
            <div >

              {debits && credits ?
                <TableContainer>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell>Valor</TableCell>
                        <TableCell align="center">Data</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {credits.map((row) => (
                        row.id &&
                        <TableRow
                          key={row.id}

                        >
                          <TableCell component="th" scope="row">
                            {row.value}
                          </TableCell>
                          <TableCell align="right">{row.data_transaction}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                :

                "nada"} */}

          </div>
        </div>
      </div>
    </div >
  );
};
