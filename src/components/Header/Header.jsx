import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {
  Link,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router";
const Header = ({ userId, users, name }) => {
  // const {userId} = useOutletContext();
  // const user = users?.find((i) => i._id === userId);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
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
    console.log(e.target.innerText);
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
  // console.log("USER", user);
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logo}>
          LOGO
        </a>
      </div>

      <div className={styles.profilePicWrapper}>
        <span>
          {name}
        </span>
        <img
          className={styles.profilePic}
          src="defaultProfilePic.jpg"
          alt="profilePic"
          onClick={() => setShow(!show)}
        />
        {show && (
          <div className={styles.menu}>
            <Link to={`/profile/${userId}`} className={styles.action}>
              Profile
            </Link>
            <a href="#" className={styles.action} onClick={handleActions}>
              Logout
            </a>
            <p></p>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
