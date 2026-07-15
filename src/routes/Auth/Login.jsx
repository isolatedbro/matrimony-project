import { useOutletContext } from "react-router";
import UserLogin from "../../components/UserLogin/UserLogin";

const Login = () => {
    // const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    return <>
    <UserLogin />
    </>
}

export default Login;