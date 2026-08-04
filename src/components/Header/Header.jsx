import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {
  Link,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router";
import NotificationBox from "../NotificationBox/NotificationBox";


const Header = ({theme, userId, users, name, notifications, isError }) => {
  // const {userId} = useOutletContext();
  // const user = users?.find((i) => i._id === userId);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigation();
  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.location.href = "/profile";
  // };
  // const userId = 7;

  useEffect(() => {
    const getUser = () => {
      setUser({ ...users?.find((i) => i._id === userId) });
    };
    getUser();
  }, [userId]);

  const handleActions = (e) => {
    // console.log(e.target.innerText);
    // if (e.target.innerText === "Profile") {
    //   // navigate(`/profile/${userId}`);
    //   console.log("userId",userId);
    //   // window.location.href-`/profile/${userId}`;
    // } else if (e.target.innerText === "Logout") {
    //   localStorage.clear();
    //   window.location.href = "/";
    // }
    localStorage.clear();
    window.location.href = "/";
  };
  // console.log("HEader", notifications);
  // console.log("Header user", user);
  return (
    <header style={{ backgroundColor: `${theme}` }} className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logo}>
          <img src="/logo.jpeg" alt="Logo" />
        </a>
      </div>

      {/* USer profile pics and account menu */}
      {isError.length === 0 && (
        <div
          className={styles.profilePicWrapper}
          onMouseEnter={() => setShow(!show)}
          onMouseLeave={() => setShow(!show)}
        >
          <span className={styles.name}>{name}</span>
          <img
            className={styles.profilePic}
            src="/defaultProfilePic.jpg"
            alt="profilePic"
          />
          {show && (
            <div className={styles.menu}>
              <a href={`/profile/${userId}`} className={styles.action}>
                Account
              </a>
              <a href="#" className={styles.action} onClick={handleActions}>
                Logout
              </a>
            </div>
          )}
        </div>
      )}

      {isError.length === 0 && (
        <div
          className={styles.notificationContainer}
          onMouseEnter={() => setShowNotification(true)}
          onMouseLeave={() => setShowNotification(false)}
        >
          <a className={styles.notification}>Notifcation</a>
          {showNotification && (
            <div
              className={`${styles.notificationBox} ${!showNotification ? styles.slideAway : ""}`}
            >
              <NotificationBox notifications={notifications} name={name} />
            </div>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
