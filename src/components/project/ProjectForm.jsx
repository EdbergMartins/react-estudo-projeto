import { useEffect, useState } from "react";

import styles from "./ProjectForm.module.css";
import Input from "../form/Input.jsx";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useDispatch, useSelector } from 'react-redux';

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {});
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state);

  const submit = (e) => {
    setDisabled(true)
    e.preventDefault();
    const projectWithId = { ...project, idUser: user.id };
    handleSubmit(projectWithId);
    setProject({})
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }
  useEffect(() => {
    if (
      project &&
      (project.name === undefined || project.name.length === 0) ||
      (project.budget === undefined || project.budget <= 0) ||
      (project.category === undefined || project.category.length === 0)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [project]);

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <div>
        <Input
          type="number"
          text="Orçamento do projeto"
          name="budget"
          placeholder="Insira o orçamento total do projeto"
          handleOnChange={handleChange}
          value={project.budget ? project.budget : ""}
        />
      </div>
      <Input
        name="category"
        text="Categoria do projeto"
        placeholder="Insira a categoria do projeto"
        handleOnChange={handleChange}
        value={project.category ? project.category : ""}
      />
      <SubmitButton disabled={disabled} text={btnText} />
    </form>
  );
}

export default ProjectForm;
