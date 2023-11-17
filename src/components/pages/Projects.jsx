import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import { useEffect, useState } from 'react';
import axios from '../layout/axiosConfig'
import { useSelector } from 'react-redux';
import { CardProject } from '../layout/CardProject';


function Projects() {

  const user = useSelector((state: RootState) => state);
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState()

  const idUser = user.id
  useEffect(() => {
    axios.get('/project', { params: { idUser } })
      .then(response => {
        setProjects(response.data)
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        setType('error')
        setMessage('Erro ao executar a ação.')
      })
      .finally(() =>
        setLoading(false)
      )
      ;
  }, [])



  return (
    <div>
      <h1>Meus Projetos</h1>
      {projects && projects.map((project) =>
        <CardProject project={project} />
      )}
    </div>
  );
}

export default Projects;
