import { useEffect, useState } from "react";
import "./App.css";
import Test from "./components/Test";

function App() {
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await fetch("http://localhost:3000/users/get/", {
  //       method: "GET",
  //     });

  //     const result = await users.json();

  //     return console.log(result);
  //   };
  //   return () => { getUsers()};
  // }, []);

  return (
    <>
      <Test />
    </>
  );
}

export default App;
