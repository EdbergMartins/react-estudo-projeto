import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { CardProject } from '../layout/CardProject';
import style from './Projects.module.css'
import LinkButton from '../layout/LinkButton';
import axios from 'axios';


function Projects({ logout, token }) {

  const user = useSelector((state: RootState) => state);
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState()




  const idUser = user.id
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/project`, {
      params: { idUser },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    }).then(response => {
        setProjects(response.data)
      })
      .catch(error => {
        console.error('Erro na solicitação:', error.response.status);
        setType('error')
        setMessage('Erro na verificação do usuário, fala o login novamente.')
      })
      .finally(() =>
        setLoading(false)
    );
  }, [])


  return (
    <div className={style.main_container} >
      <Message type={type} msg={message} />
      <div style={{ position: "relative", top: "65px", left: "60px" }}>
        <LinkButton to="/newproject" text="Novo Projeto" />
      </div>

      <div className={style.title_container}>
      <h1>Meus Projetos</h1>
      </div>
      <div className={style.card_container}>
      {projects && projects.map((project) =>
        <CardProject project={project} />
      )}
    </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({
    type: '',
    token: '',
    email: '',
    id: ''
  }),
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  token: state.token
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
