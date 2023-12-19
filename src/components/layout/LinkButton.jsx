import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

function LinkButton({ to, text, onClick }) {
  return (
    <Link onClick={onClick} className={styles.btn} to={to}>
      {text}
    </Link>
  );
}

export default LinkButton;
