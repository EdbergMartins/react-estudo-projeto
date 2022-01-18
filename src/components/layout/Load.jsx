import styles from "./Load.module.css";
import loading from "../../img/loading.svg";

function Load() {
  return (
    <div className={styles.loader_conatiner}>
      <img className={styles.loader} src={loading} alt="Loading" />
    </div>
  );
}

export default Load;
