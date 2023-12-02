import React, { useState } from 'react'
import styles from './ContactForm.module.css'
import LoadingButton from './LoadingButton'

export const ContactForm = () => {
  const [state, setState] = useState({
    email: '',
    messagem: ''
  })
  const [actived, setActived] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    console.log('Dados enviados:', state.email, state.messagem)
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }
  console.log(state.email)
  console.log(state.messagem)
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="mensagem" className={styles.label}>
          Mensagem:
        </label>
        <textarea
          id="messagem"
          name="messagem"
          value={state.messagem}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <LoadingButton isActived={actived} handleClick={handleSubmit} loading={loading} text={'Enviar'} disabled={disabled} />
    </form>
  )
}
