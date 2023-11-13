import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from '../layout/Message';
import axios from '../layout/axiosConfig';
import styles from "./Home.module.css";

function Login({ login }) {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loginViwer, setLoginViwer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requestBody, setRequestBody] = useState()
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [disabled, setDisabled] = useState(true)


  useEffect(() => {
    setRequestBody({ 'email': emailValue, 'password': passwordValue })
  }, [emailValue, passwordValue])


  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailValue(e.target[0].value)
    setPasswordValue(e.target[1].value)
    setLoading(true);
    axios.post('/login', requestBody)
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
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao realiar login verifique as credenciais.')
      })
      .finally(() =>
        setLoading(false)
      )
      ;
  }

  const handleSingUp = (e) => {
    e.preventDefault(e);
    setEmailValue(e.target[0].value)
    setPasswordValue(e.target[1].value)
    setLoading(true);
    axios.post('/register', requestBody)
      .then(response => {
        if (response.data === "Usuário já cadastrado") {
          setMessage(response.data)
          setMessage('Usuário já cadastrado.')
          setType('error')
        } else {
          setMessage('Usuário registrado com sucesso.')
          setType('sucess')
          return
        }
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao realizar cadastro.')
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
            {/* <Input
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
            <LoadingButton disabled={disabled} handleClick={handleLogin} loading={loading} text="Entrar" />
            <span
              onClick={handleChangeCreateAccount}
            >Criar Conta</span> */}
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

                <button type="submit">Entrar</button>

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
            {/* <Input
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
            >Ir para login</span> */}
            <form onSubmit={(e) => handleSingUp(e)}>
              <dvi className={styles.form_login}>
                <div>
                  <input
                    onChange={handleChangeEmail}
                    placeholder='Email'
                    type="text"
                    id="username"
                    name="username"
                    value={emailValue}
                    pattern="[^@\s]+@[^@\s]+"
                    title="Por favor, insira um endereço de e-mail válido."
                    required
                  />

                </div>
                <div>
                  <input onChange={handleChangePassword} value={passwordValue} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" title="Minimo oito caracteres, pelo menos uma letra e um numero" placeholder='Senha' type="password" id="password" name="password" required />
                </div>

                <button type="submit">Criar</button>

                <span style={{ textAlign: 'center' }}
                  onClick={handleChangeCreateAccount}
                >
                  Entrar em uma conta
                </span>
              </dvi>
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
