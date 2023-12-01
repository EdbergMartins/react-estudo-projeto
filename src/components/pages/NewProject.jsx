import { useNavigate } from "react-router-dom";
import axios from '../layout/axiosConfig';

import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
import { useState } from 'react';
import Message from '../layout/Message';

function NewProject() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  function createPost(project) {

    axios.post('/project', project)
      .then(response => {
        setType('sucess')
        setMessage('Projecto criado com sucesso.')
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
  }

  return (
    <>
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os seviços</p>
      <ProjectForm  handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
      {message ? <Message type={type} msg={message} /> : <></>}
    </>
  );
}

export default NewProject;
