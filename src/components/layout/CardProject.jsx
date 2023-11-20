import React, { useState } from 'react'
import styles from "./CardProject.module.css";
import { ModalProject } from './ModalProject';


export const CardProject = (project) => {


  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    setOpenModal(true)
  }
  console.log(openModal)
  const { name, budget, category } = project.project
  return (
    <>
      <div onClick={() => setOpenModal(true)} className={styles.cardDiv}>
        <h2>{name}</h2>
        <p>Budget: {budget}</p>
        <p>Category: {category}</p>
      </div>
      {openModal && <ModalProject project={project} isOpen={openModal} onClose={closeModal} />}
    </>
  )
}
