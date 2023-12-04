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
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()




  const idUser = user.id
  useEffect(() => {
    axios.get(`https://app-40ea08d9-73df-4f70-b867-86e0b22eac4d.cleverapps.io/project`, {
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
        logout()
      })
      .finally(() =>
        setLoading(false)
    );
  }, [])


  return (
    <div className={style.main_container} >
      <Message type={type} msg={message} />
      <div style={{ marginTop: '10px', placeContent: 'center', display: 'flex' }}>
        <LinkButton to="/newproject" text="Novo Projeto" />
      </div>
      <div className={style.title_container}>
      <h1>Meus Projetos</h1>
      </div>
      {loading ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={style.ldsHourglass}></div>
        </div>
        :
        <div className={style.card_container}>
      {projects && projects.map((project) =>
        <CardProject project={project} />
      )}
    </div>
      }

    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({
    type: 'LOGOUT',
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
