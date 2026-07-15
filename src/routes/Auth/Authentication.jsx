import { useNavigate } from "react-router";
import styles from "./Authentication.module.css";

const Authentcation = () => {
  const navigate = useNavigate();
  const handleButtonClick = (e) => {
    if (e.target.textContent.toLowerCase() === "login") {
      window.location.href ="/auth/login";
      // navigate("/auth/login");
    } else if (e.target.textContent.toLowerCase() === "register") {
      // navigate("/auth/registration");
      window.location.href = "/auth/registration";
    }
  };
  return (
    <>
      <img
        className={styles.backgroundImage}
        src="matrimony-project/weddingpic.png"
        alt="india bride and groom"
      />
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <h1 className={styles.welcomeMessage}>LinkedIn Matrimony</h1>
          <p className={styles.message}>
            Create a profile that reflects your values, culture, and dreams of a
            lifelong partnership.
          </p>
        </div>
        <div className={styles.rightBox}>
          <button className={styles.authButton} onClick={handleButtonClick}>
            Login
          </button>
          <button className={styles.authButton} onClick={handleButtonClick}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Authentcation;
