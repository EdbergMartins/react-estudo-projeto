import { useState } from 'react';
import Input from "../form/Input";
import LoadingButton from '../layout/LoadingButton';
import axios from '../layout/axiosConfig';
import styles from "./Home.module.css";

function Login() {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loginViwer, setLoginViwer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requstBody, setRequestBody] = useState({})

  const handleLogin = async () => {
    setRequestBody({ 'email': emailValue, 'password': passwordValue })
    setLoading(true);
    axios.post('/login', requstBody)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(JSON.parse(localStorage.getItem('user')));
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
      })
      .finally(() =>
        setLoading(false)
      )
      ;

  }

  const handleSingUp = () => {
    setLoading(!loading)
  }

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPasswordValue(e.target.value)
  }

  const handleChangeCreateAccount = () => {
    setLoginViwer(!loginViwer)

  }

  return (
    <>
      {
        !loginViwer ?
          <section className={styles.home_container
          } >
            <h1 className={styles.title_name}>
              Bem-vindo ao <span style={{ borderRadius: '5px' }}>Costs</span>
            </h1>
            <p>Login</p>
            <Input
              type="email"
              name="account"
              placeholder="Nome do Usuário"
              handleOnChange={handleChangeEmail}
              value={emailValue} />
            <Input
              type="password"
              name="account"
              placeholder="Password"
              handleOnChange={handleChangePassword}
              value={passwordValue} />
            <LoadingButton handleClick={handleLogin} loading={loading} text="Entrar" />
            <span
              onClick={handleChangeCreateAccount}
            >Criar Conta</span>
          </section >
          :
          <section className={styles.home_container
          } >
            <h1 className={styles.title_name}>
              Bem-vindo ao <span style={{ borderRadius: '5px' }}>Costs</span>
            </h1>
            <p>Crie sua Conta</p>
            <Input
              type="email"
              name="account"
              placeholder="Nome do Usuário"
              handleOnChange={handleChangeEmail}
              value={emailValue} />
            <Input
              type="password"
              name="account"
              placeholder="Password"
              handleOnChange={handleChangePassword}
              value={passwordValue} />

            <LoadingButton handleClick={handleSingUp} loading={loading} text="Criar Conta" />
            <span
              onClick={handleChangeCreateAccount}
            >Ir para login</span>
          </section >
      }
    </>
  );
}

export default Login;
