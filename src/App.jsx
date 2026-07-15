import { useEffect, useState } from "react";
import "./App.css";
import Test from "./components/Test";
import Home from "./routes/Home/Home";
import Registration from "./routes/Auth/Registration";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";

// "https://server-mat.onrender.com/"

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState("");
  const [isError, setIsError] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const users = await fetch(`${API_URL}/users/profile/`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const result = await users.json();
      if (result?.error) {
        setIsError("Authentication Failed");
        localStorage.clear();
      } else {
        setUserInfo(result?.user);
      }
    };
    getUsers();
  }, [token]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${API_URL}/users/get`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result?.error) {
        setIsError("Authentication Failed");
      } else {
        setUsers([...result]);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      {isError.length === 0 && <Header />}
      <Outlet
        context={{ userInfo, setUserInfo, isError, setIsError, users, API_URL }}
      />
    </>
  );
}

export default App;
