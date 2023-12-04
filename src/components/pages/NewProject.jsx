import { useNavigate } from "react-router-dom";
import axios from 'axios';

import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
import { useState } from 'react';
import Message from '../layout/Message';
import { useSelector } from 'react-redux';

function NewProject() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const token = useSelector((state: RootState) => state.token);

  function createPost(project) {

    axios.post(`https://app-40ea08d9-73df-4f70-b867-86e0b22eac4d.cleverapps.io/project`,
      project,
      {
        headers: token ? {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        } : {
          'Content-Type': 'application/json',
        },
      })
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
