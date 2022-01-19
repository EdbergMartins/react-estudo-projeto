import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Project.module.css";
import Load from "../layout/Load";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function editPost(project) {
    //budget validation
    if (project.budget < project.cost) {
      setMessage("O custo do proejto ultrapassou o valor do orçamento!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setMessage("Projeto atualizado!");
        setType("sucess");
        setShowProjectForm(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_detailes}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Load />
      )}
    </>
  );
}

export default Project;
