import { useState } from "react";
import styles from "./UserLogin.module.css";
import { useNavigate, useOutletContext } from "react-router";

const UserLogin = () => {
  const [loginData, setLoginData] = useState([]);
  const {API_URL } = useOutletContext();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginUser = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const result = await response.json();
    if (result?.error) {
      setErrors([...result.error]);
    }

    localStorage.setItem("token", result.token);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    await loginUser();
    window.location.href = "/matrimony-project";
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.hero}>
            <p className={styles.eyebrow}>Matrimony</p>
            <h1>Begin Your Beautiful Journey</h1>
            <p>
              Create a profile that reflects your values, culture, and dreams of
              a lifelong partnership.
            </p>
          </div>
          <div className={styles.stepPanel}>
            <div className={styles.errorBox}>
              <ul>
                {errors.length !== 0 &&
                  errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
            <div className={styles.stepFields}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                name="email"
              />
              <p>Or</p>
              <input
                className={styles.input}
                type="number"
                placeholder="Phone Number"
                value={loginData.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                name="password"
              />

              <button
                className={styles.nextButton}
                type="submit"
                onClick={handleLoginButton}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLogin;
