import styles from "./SubmitButton.module.css";

function SubmitButton({ disabled, text }) {
  return (
    <div>
      <button disabled={disabled} className={disabled ? styles['btn-disabled'] : styles.btn}>{text}</button>
    </div>
  );
}

export default SubmitButton;
