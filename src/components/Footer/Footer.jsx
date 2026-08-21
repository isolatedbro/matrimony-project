import styles from "./Footer.module.css";

const Footer = ({ theme }) => {
  return (
    <footer style={{ backgroundColor: `${theme}` }} className={styles.footer}>
      <p>&copy; 2026 Matrimony Platform. All rights reserved.</p>
    </footer>
  );
}   

export default Footer;