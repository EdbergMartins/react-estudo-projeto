import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from "../layout/Container";
import Load from "../layout/Load";
import LinkButton from "../layout/LinkButton";

import styles from "./Projects.module.css";
import ProjectCards from "../project/ProjectCards";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Novo Projeto" />
      </div>
      {message && <Message type="sucess" msg="Procejo criado com sucesso" />}
      <Container className="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCards
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
            />
          ))}
        {!removeLoading && <Load />}
        {removeLoading && projects.length == 0 && (
          <p> Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
