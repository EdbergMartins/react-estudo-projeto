import { styles } from "./Home.module.css";
import savings from "../../img/savings.svg";

function Home() {
  return (
    <section>
      <h1>
        Bem-vindo ao <span>Costs</span>
        <p>Comece a gerenciar seus projetos agora mesmo!</p>
        <a href="/">Criar projeto</a>
        <img src={savings} alt="Costs" />
      </h1>
    </section>
  );
}

export default Home;
