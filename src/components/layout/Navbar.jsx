import { Link } from "react-router-dom";

import Container from "./Container";

import logo from "../../img/costs_logo.png";
import styles from "./Navbar.module.css";
import { connect, useSelector } from 'react-redux';
import LoadingButton from './LoadingButton';

function Navbar({ logout }) {
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
            {/* <li className={styles.item}>
            {" "}
              <Link to="/contact">Contato</Link>
            </li> */}
            <li className={styles.item}>
            {" "}
              <span onClick={logout} style={{ color: 'white', cursor: 'pointer' }}>Sair</span>
          </li>
        </ul>
          :
          <> </>}
      </Container>
    </nav>
  );
}


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({
    type: 'LOGOUT',
    token: '',
    email: '',
    id: ''
  }),
});

export default connect(null, mapDispatchToProps)(Navbar);
