import { Link } from "react-router-dom";

import Container from "./Container";

import logo from "../../img/costs_logo.png";
import styles from "./Navbar.module.css";
import { useSelector } from 'react-redux';

function Navbar() {
  const token = useSelector((state: RootState) => state.token);
  return (

    <nav className={styles.navbar}>
      <Container>
        <Link to="/home">
          <img src={logo} alt="Costs" />
        </Link>
        {token ? 
        <ul className={styles.list}>
          <li className={styles.item}></li>
          <li className={styles.item}>
            {" "}
            <Link to="/home">Home</Link>
          </li>
          <li className={styles.item}>
            {" "}
            <Link to="/project">Projetos</Link>
          </li>
          <li className={styles.item}>
            {" "}
            <Link to="/company">Empresa</Link>
          </li>
          <li className={styles.item}>
            {" "}
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
          :
          <> </>}
      </Container>
    </nav>
  );
}

export default Navbar;
