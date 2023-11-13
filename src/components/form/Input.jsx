import styles from "./Input.module.css";

function Imput({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type === "email" ? "email" : "text"}
        pattern={type === "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" : undefined}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={type === "email"}
      />

    </div>
  );
}

export default Imput;
