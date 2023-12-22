import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

function LinkButton({ to, text, onClick, disabled }) {
  return (
    <>
      {disabled ?
        <button style={{ padding: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.ldsHourglass}></div>
          </div> </button >
        :
        <Link onClick={onClick} className={styles.btn} to={to}>
          {text}
        </Link>
      }
    </>
  );
}

export default LinkButton;
