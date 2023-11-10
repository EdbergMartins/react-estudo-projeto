import styles from "./LoadingButton.module.css";

function LoadingButton({ handleClick, loading, text }) {

  return (
    <>
      <button onClick={handleClick} className={styles.btn}>
        {loading ? <div className={styles['c-loader']}></div> : text}
      </button>
    </>
  );
}

export default LoadingButton;
