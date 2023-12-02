import styles from "./Input.module.css";

function Imput({ pattern, type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        pattern={pattern}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={type === "email"}
        min="0"
      />

    </div>
  );
}

export default Imput;
