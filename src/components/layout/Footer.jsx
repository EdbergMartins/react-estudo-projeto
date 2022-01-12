import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <ul className={styles.footer}>
      <li >
        <FaFacebook />
      </li>
      <li >
        <FaInstagram />
      </li>
      <li >
        <FaLinkedin />
      </li>
    </ul>
  );
}

export default Footer;
