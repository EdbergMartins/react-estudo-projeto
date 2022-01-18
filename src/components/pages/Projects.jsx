import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

import styles from "./Projects.module.css";

function Projects() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state;
  }
  console.log({ message });

  return (
    <div>
      <h1>Meus Projetos</h1>
      {message && <Message type="sucess" msg= {message} />}
    </div>
  );
}

export default Projects;
