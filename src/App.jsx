import { useEffect, useState } from "react";
import "./App.css";
import Test from "./components/Test";
import Home from "./routes/Home/Home";
import Registration from "./routes/Auth/Registration";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";
// import DropDownList from "./components/DropDownList/DropDownList";
import data from "./data/usStatesCities.json";
import { Country, State, City } from "country-state-city";
import NotificationBox from "./components/NotificationBox/NotificationBox";
import Footer from "./components/Footer/Footer";
import UpdateProfile from "./routes/UpdateProfile/UpdateProfile";
// import { getAllStates } from "country-state-city/lib/state";

// "https://server-mat.onrender.com/"

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const colorArray = ["#0967c2", "#1a74e8", "#0273b2", "#f3f2f0", "#f1ece5"];
  const [theme, setTheme] = useState("#0273b2");
  const [secTheme, setSecTheme] = useState("#f3f2f0");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState("");
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);
  const [name, setName] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [allMatch, setAllMatch] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // const userId = params.get("userId");
    const newUser = params.get("newUser");
    const linkedLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userId = params.get("userId");
      const newUser = params.get("newUser");

      // console.log("LINKEDIN LOGIN", token, userId, newUser);

      if (token && userId) {
        localStorage.setItem("token", token);
        setUserId(userId);
        console.log("USER ID", userId);
        return token;
      }
      return localStorage.getItem("token");
    };

    const getUserProfile = async () => {
      // console.log("GET USER PROFILE");
      const users = await fetch(`${API_URL}/users/profile/`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await users.json();

      // console.log("USER PROFILE", result);
      if (result?.error) {
        setIsError("Authentication Failed");
        localStorage.clear();
      } else {
        setUser(result);
        setUserId(result?._id);
        setName(result?.firstName + " " + result?.lastName);
      }
    };

    const getUsers = async () => {
      // console.log("GET USERS");
      const response = await fetch(`${API_URL}/users/get`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      // console.log("GET USERS RESULT", result);
      if (result?.error) {
        setIsError("Authentication Failed");
      } else {
        setUsers([...result]);
        setTempUsers([...result]);
      }
    };

    const getAllMatch = async ()=> {
      const response = await fetch(`${API_URL}/users/get-all-match`, {
        method: "GET",
        headers : {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const matchResult = await response.json();

      if(matchResult?.error){
        console.log(matchResult?.error);
      }else if (matchResult?.requests){
        setAllMatch([...matchResult.requests])
      }
    }

    const init = async () => {
      linkedLogin();

      await getUserProfile();
      await getUsers();
      await getAllMatch();
    };

    init();
  }, []);

  // console.log("APP", {
  //   userId,
  //   isError,
  //   users,
  //   tempUsers,
  //   name,
  //   notifications,
  // });

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await fetch(`${API_URL}/users/profile/`, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const result = await users.json();
  //     if (result?.error) {
  //       setIsError("Authentication Failed");
  //       localStorage.clear();
  //     } else {
  //       setUserId(result?.userId);
  //       setName(result?.name);
  //     }
  //   };
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const response = await fetch(`${API_URL}/users/get`, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const result = await response.json();
  //     if (result?.error) {
  //       setIsError("Authentication Failed");
  //     } else {
  //       setUsers([...result]);
  //       setTempUsers([...result]);
  //     }
  //   };
  //   getUsers();
  // }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await fetch(`${API_URL}/users/get-notifications`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setNotifications(data);
    };

    getNotifications();
  }, []);

  // const date = new Date().toLocaleString().split(',');
  // const x = date.split(',')
  // console.log(date);

  // const list = DropDownList();

  // console.log("APP", notifications)

  // const updateProfileMessage = () => {
  //   return (
  //     <>
  //       <div
  //         className={
  //           "displayFlex flexDirectionColumn justifyContentCenter alignItemsCenter gap20px width100pc height600pc"
  //         }
  //       >
  //         <div className="displayFlex flexDirectionColumn justifyContentCenter alignItemsCenter gap20px">
  //           <h1>Update your profile</h1>
  //           <p>
  //             We need some information about you before we can recommend you
  //             profiles
  //           </p>
  //           <button
  //             className={"updateProfileButton"}
  //             onClick={() => (window.location.href = "/profile")}
  //           >
  //             Update Profile
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  const widthInPx  = [];
  const widthInPc = [];
  const widthInVw = [];
  const widthInVmin = [];
  const widthInVmax = [];
  const minWidthInPx = [];
  const maxWidthInPx = [];
  const minWidthInPc = [];
  const maxWidthInPc = [];
  const minWidthInVw = [];
  const maxWidthInVw = [];
  const minWidthInVmin = [];
  const maxWidthInVmin = [];
  const minWidthInVmax = [];
  const maxWidthInVmax = [];

  // const heightInPx = [];
  // const heightInPc = [];
  // const heightInVh = [];
  // const heightInVmin = [];
  // const heightInVmax = [];
  // const minHeightInPx = [];
  // const maxHeightInPx = [];
  // const minHeightInPc = [];
  // const maxHeightInPc = [];
  // const minHeightInVh = [];
  // const maxHeightInVh = [];
  // const minHeightInVmin = [];
  // const maxHeightInVmin = [];
  // const minHeightInVmax = [];
  // const maxhHeightInVmax = [];

  // const fontSizeInPx = [];
  // const fontSizeInEm = [];
  // const fontSizeInRem = [];
  // const styles = () => {
  //   for(let i = 0; i<2001; i++){
  //     widthInPx.push(`.width${i}px{ width : ${i}px}`);
  //     minWidthInPx.push(`.minWidth${i}px{ min-width : ${i}px}`);
  //     maxWidthInPx.push(`.maxWidth${i}px{ max-width : ${i}px}`);
  //   }

  //   for(let i = 0; i<101; i++){
  //     widthInPc.push(`.width${i}percent{ width : ${i}%`);
  //   }

  //   for(let i = 0; i<101; i++){
  //     widthInVw?.push(`.width${i}vw{ width : ${i}vw`);
  //   }
  // }


  
  function camelToKebab(str) {
    return str.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  }

  function parseCSSClass(str) {
    const separatorIndex = str.indexOf("_");

    

    const property = str.slice(0, separatorIndex);
    if (separatorIndex === -1) {
      return {
        property: camelToKebab(str),
        value: "",
      };
    }
    const value = str.slice(separatorIndex + 1);

    return {
      property: camelToKebab(property),
      value: value,
    };
  }

  function generateCSS(str) {
    const separatorIndex = str.indexOf("_");

    if (separatorIndex === -1) {
      throw new Error("Invalid format");
    }

    const propertyCamel = str.slice(0, separatorIndex);
    const value = str.slice(separatorIndex + 1);

    const property = camelToKebab(propertyCamel);

    // const classValue = value.replace(/(^|-)([a-z])/g, (_, separator, char) =>
    //   char.toUpperCase(),
    // );

    // const className = propertyCamel + classValue;

    return `.${str} {\n    ${property}: ${value};\n}`;
  }

  // console.log(generateCSS("justifyContent_space-between"));
  // styles();

  return (
    <div className={`appContainer`}>
      {
        <Header
          secTheme={secTheme}
          theme={theme}
          userId={userId}
          users={users}
          name={name}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          notifications={notifications}
          isError={isError}
        />
      }

      {/* <div> 
        {arr?.map((obj,idx)=> <p key={idx}>{obj}</p>)}
      </div> */}
      <main className={`main`}>
        <Outlet
          context={{
            secTheme,
            userId,
            setUserId,
            isError,
            setIsError,
            users,
            setUsers,
            tempUsers,
            API_URL,
            token,
            user,
            name,
            allMatch,
            setAllMatch,
          }}
        />
      </main>

      <Footer theme={theme} />
      {/* {showNotification && <div className={`${'notificationBox'} ${'move'} ${'transition'}`}> <NotificationBox setShowNotification={setShowNotification} /> </div>} */}
    </div>
  );
}

export default App;
