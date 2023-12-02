import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span style={{ borderRadius: '5px' }}>Costs</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Novo Projeto" />
      <img style={{ width: '100%' }} src={savings} alt="Costs" />
    </section>
  );
}

export default Home;
