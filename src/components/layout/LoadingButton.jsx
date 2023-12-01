import { hover } from '@testing-library/user-event/dist/hover';
import styles from "./LoadingButton.module.css";

function LoadingButton({ isActived, handleClick, loading, text, disabled }) {
  return (
    <>
      <button style={isActived ? { color: '#ffbb33' } : {}} type='button' disabled={disabled} onClick={handleClick} className={!disabled ? styles.btn : styles.btn_disabled}>
        {loading ? <div className={styles['c-loader']}></div> : text}
      </button>
    </>
  );
}

export default LoadingButton;
