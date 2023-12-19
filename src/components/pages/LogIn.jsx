import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from '../layout/Message';
import axios from 'axios';
import styles from "./Home.module.css";
import LinkButton from '../layout/LinkButton';

function Login({ login }) {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loginViwer, setLoginViwer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requestBody, setRequestBody] = useState()
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [disabled, setDisabled] = useState(false)


  useEffect(() => {
    setRequestBody({ 'email': emailValue, 'password': passwordValue })
  }, [emailValue, passwordValue])


  const handleLogin = async (e) => {
    // e.preventDefault();
    setDisabled(true)
    // setEmailValue(e.target[0].value)
    // setPasswordValue(e.target[1].value)
    setLoading(true);
    axios.post(`https://app-40ea08d9-73df-4f70-b867-86e0b22eac4d.cleverapps.io/login`, requestBody)
      .then(response => {
        if (response.data === "Dados incorretos, tente novamente.") {
          setMessage(response.data)
          setType('error')
          return
        }
        setMessage('Login realizado com sucesso.')
        setType('sucess')
        delete response.data.password
        login(response.data.token, response.data.email, response.data.id); 
        window.location.href = '/home'
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao realiar login verifique as credenciais.')
      })
      .finally(() =>
      {
        setLoading(false)
        setDisabled(false)
      }
      )
      ;
  }

  const handleSingUp = (e) => {
    e.preventDefault(e);
    setEmailValue(e.target[0].value)
    setPasswordValue(e.target[1].value)
    setLoading(true);
    axios.post("https://app-40ea08d9-73df-4f70-b867-86e0b22eac4d.cleverapps.io/register", requestBody)
      .then(response => {
        if (response.data === "Usuário já cadastrado") {
          setMessage(response.data)
          setMessage('Usuário já cadastrado.')
          setType('error')
          setEmailValue('')
          setPasswordValue('')
        } else {
          setMessage('Usuário registrado com sucesso.')
          setType('sucess')
          setEmailValue('')
          setPasswordValue('')
          return
        }
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao realizar cadastro.')
        setEmailValue('')
        setPasswordValue('')
      })
      .finally(() =>
        setLoading(false)
      )
      ;
  }

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPasswordValue(e.target.value)
  }

  const handleChangeCreateAccount = () => {
    setLoginViwer(!loginViwer)
    setPasswordValue('')
    setEmailValue('')
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
            <form onSubmit={(e) => handleLogin(e)}>
              <div className={styles.form_login}>
                <div>
                  <input
                    onChange={handleChangeEmail}
                    placeholder='Email'
                    type="text"
                    id="username"
                    name="username"
                    pattern="[^@\s]+@[^@\s]+"
                    value={emailValue}
                    title="Por favor, insira um endereço de e-mail válido."
                    required
                  />

                </div>
                <div>
                  <input onChange={handleChangePassword} value={passwordValue} placeholder='Senha' type="password" id="password" name="password" required />
                </div>

                <LinkButton onClick={handleLogin} to='/home' text='Entrar' disabled={disabled} type="submit" />

                <span style={{ textAlign: 'center' }}
                  onClick={handleChangeCreateAccount}
                >
                  Criar Conta
                </span>
              </div>
            </form>
          </section >
          :
          <section className={styles.home_container} >
            <h1 className={styles.title_name}>
              Bem-vindo ao <span style={{ borderRadius: '5px' }}>Costs</span>
            </h1>
            <p>Crie sua Conta</p>
            <form onSubmit={(e) => handleSingUp(e)}>
              <div className={styles.form_login}>
                <div>
                  <input
                    onChange={handleChangeEmail}
                    placeholder='Email'
                    type="text"
                    id="username"
                    name="username"
                    pattern="[^@\s]+@[^@\s]+"
                    value={emailValue}
                    title="Por favor, insira um endereço de e-mail válido."
                    required
                  />

                </div>
                <div>
                  <input onChange={handleChangePassword} value={passwordValue} placeholder='Senha' type="password" id="password" name="password" required />
                </div>

                <button disabled={disabled} type="submit">Criar Conta</button>

                <span style={{ textAlign: 'center' }}
                  onClick={handleChangeCreateAccount}
                >
                  Login
                </span>
              </div>
            </form>
          </section >
      }
      {message && <Message type={type} msg={message} />}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  login: (token, email, id) => dispatch({
    type: 'LOGIN',
    token: token,
    email: email,
    id: id
  }),
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
