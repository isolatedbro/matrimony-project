import { useState } from "react";
import styles from "./Header.module.css";
const Header = ({ userInfo, users }) => {
  const user = users?.find((i) => i._id === userInfo);
  const [show, setShow] = useState(false);
  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.location.href = "/profile";
  // };
  const handleActions = (e) => {
    console.log(e.target.innerText);
    if(e.target.innerText === "Profile"){
      window.location.href-'/profile'
    }else if(e.target.innerText === "Logout"){
      localStorage.clear();
      window.location.href = "/";
    }
  }
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href='/' className={styles.logo}>LOGO</a>
      </div>

      <div className={styles.profilePicWrapper}>
        <span>
          {user?.firstName} {user?.lastName}
        </span>
        <img
          className={styles.profilePic}
          src="defaultProfilePic.jpg"
          alt="profilePic"
          onClick={() => setShow(!show)}
        />
        {show && (
          <div className={styles.menu}>
            <a href='/profile' className={styles.action} >Profile</a>
            <a href="#" className={styles.action} onClick={handleActions}>Logout</a>
            <p></p>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
