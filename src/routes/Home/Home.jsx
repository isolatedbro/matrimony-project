import { useEffect, useState } from "react";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import ProfilePage from "../ProfilePage/ProfilePage";
import styles from "./Home.module.css";
import Authentcation from "../Auth/Authentication";
import { useOutlet, useOutletContext } from "react-router";
import CatalogWrapper from "../../components/CatalogWrapper/CatalogWrapper";

const Home = () => {
  const { isError } = useOutletContext();

  return (
    <>
      <div className={styles.container}>
        {!isError.length ? <CatalogWrapper /> : <Authentcation />}
      </div>
    </>
  );
};

export default Home;
