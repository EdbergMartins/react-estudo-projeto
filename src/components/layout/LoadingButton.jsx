import styles from "./LoadingButton.module.css";

function LoadingButton({ handleClick, loading, text, disabled }) {
  return (
    <>
      <button type='button' disabled={disabled} onClick={handleClick} className={styles.btn}>
        {loading ? <div className={styles['c-loader']}></div> : text}
      </button>
    </>
  );
}

export default LoadingButton;
