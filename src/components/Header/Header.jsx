import styles from "./Header.module.css";
const Header = ({userInfo}) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <header className={styles.header}>
      <button onClick={handleLogout}>Logout</button>
      <div className={styles.profilePicWrapper}>
        <img
          className={styles.profilePic}
          src="defaultProfilePic.jpg"
          alt="profilePic"
        />
        <span>{userInfo}</span>
      </div>
    </header>
  );
};
export default Header;
