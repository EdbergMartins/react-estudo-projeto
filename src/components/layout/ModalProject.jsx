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
  const [valueDescription, setValueDescription] = useState()
  const [typeOfAdd, setTypeOfAdd] = useState('')
  const [debits, setDebits] = useState()
  const [credits, setCredits] = useState()
  const [isActived, setIsActived] = useState(true)
  const [totalBudget, setTotalBudget] = useState(0)
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
    setValueDescription('')
  }

  const handleAdd = (value, description) => {
    setLoading(true)
    axios.post(`/transaction/${typeOfAdd === "Receita" ? "credit" : "debit"}`, { params: { "idProject": project.project.id, "value": valorChanger, "description": valueDescription } })
      .then(response => {
        console.log(response)
        if (typeOfAdd === "Receita") {
          credits.unshift(response.data[0])
          const value = credits[credits.length - 1]
          const responseValue = parseFloat(response.data[0].value)
          credits[credits.length - 1] = value + responseValue
        } else {
          debits.unshift(response.data[0])
          const value = debits[debits.length - 1]
          const responseValue = parseFloat(response.data[0].value)
          debits[debits.length - 1] = value + responseValue
        }
        setTotalBudget(credits[credits.length - 1] - debits[debits.length - 1])
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao executar a ação.')
      })
      .finally(() => {
        setLoading(false)
        setModifyModal(false)
        setValueDescription('')
        setValorChanger('')
      }
      )
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (secondModalRef.current && !secondModalRef.current.contains(event.target)) {
        setModifyModal(false)
        setValueDescription('')
        setValorChanger('')
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
        const returnCredits = Object.values(response.data.returnCredits)
        const returnDebits = Object.values(response.data.returnDebits)
        const total = response.data.returnCredits.totalCredits - response.data.returnDebits.totalDebits
        setDebits(returnDebits)
        setCredits(returnCredits)
        setTotalBudget(total)
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao executar a ação.')
      })
      .finally(() =>

        setLoading(false)
      )
  }, []);

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
  console.log(isOpen)

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
                  <input
                    onChange={(e) => setValueDescription(e.target.value)}
                    placeholder='Desrição'
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={valueDescription}
                    title="."
                    required
                  />

                </div>
                <LoadingButton disabled={!valueDescription || !valorChanger && true} loading={false} handleClick={() => handleAdd()} text='Adicionar' />
              </dvi>
            </form>
          </div>
        </div>
      }
      <div className={`${style.darken}`} />
      <div ref={modalRef} className={`${style.modal} ${isOpen ? style.show : ''}`}>

        <div className={style.modalContent}>
          <div className={style.displayModal}>
            <span className={style.closeBtn} onClick={onClose}>&times;</span>
            <h2>{name}</h2>
            <h3>Valor Inicial: {budget && budget.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
            <h3 style={{ color: (budget + totalBudget) <= 0 && "red" }}>Valor Atual: {budget && (budget + totalBudget).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
            <h3>Categoria: {category}</h3>
            <LoadingButton handleClick={() => handleClick(1)} text='Adicionar Receita' />
            <LoadingButton handleClick={() => handleClick(2)} text='Adicionar Gasto' />
          </div>
          <div className={style.modalTable}>
            <div className={style.celModalTable}>
              <LoadingButton isActived={isActived} handleClick={() => setIsActived(true)} text='Despesas' />
              <LoadingButton isActived={!isActived} handleClick={() => setIsActived(false)} text='Receitas' />
            </div>

            {isActived && debits ?
                <TableContainer>
                  <Table >
                  <TableHead >
                      <TableRow>
                      <TableCell align="center">Valor(R$)</TableCell>
                      <TableCell align="center">Descrição</TableCell>
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
                          <TableCell align="center" component="th" scope="row">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">
                            {row.data_transaction}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
                :
              !isActived && credits ?
                < TableContainer >
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Valor(R$)</TableCell>
                        <TableCell align="center">Descrição</TableCell>
                        <TableCell align="center">Data</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {credits.map((row) => (
                        row.id &&
                        <TableRow
                          key={row.id}

                        >
                            <TableCell align="center" component="th" scope="row">
                            {row.value}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {row.description}
                            </TableCell>
                            <TableCell align="center">{row.data_transaction}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                "Nenhum dado informado"
            }
          </div>
        </div>
      </div>
    </div >
  );
};
