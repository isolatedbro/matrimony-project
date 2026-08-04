import { useEffect, useState } from "react";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import ProfilePage from "../ProfilePage/ProfilePage";
import styles from "./Home.module.css";
import Authentcation from "../Auth/Authentication";
import { useOutlet, useOutletContext } from "react-router";
import CatalogWrapper from "../../components/CatalogWrapper/CatalogWrapper";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import NotificationBox from "../../components/NotificationBox/NotificationBox";
import LandingPage from "../LandingPage/LandingPage";

const Home = () => {
  const { isError} = useOutletContext();

  // console.log("HOME", isError);

  // console.log("HOME", showNotification);
  return (
    <>
      <div className={styles.container}>
        {!isError?.length ? <CatalogWrapper /> : <LandingPage/>}
      </div>
    </>
  );
};

export default Home;
