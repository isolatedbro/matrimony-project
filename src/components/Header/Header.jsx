import styles from "./Header.module.css";
const Header = () => {
    const handleLogout = () =>{
        localStorage.clear();
        window.location.href ="/"
    }
    return <header className = {styles.header}>
        <h3>Header</h3>
        <button onClick={handleLogout}>Logout</button>
    </header>
}
export default Header;