import { useOutletContext } from "react-router";
import FilterBox from "../FilterBox/FilterBox";
import ProfileBox from "../ProfileBox/ProfileBox";
import styles from "./CatalogWrapper.module.css";
import { useEffect, useState } from "react";


const CatalogWrapper = () => {
  const { token,users} = useOutletContext();
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //    const res = await fetch(`${API_URL}/users/get`, {
  //      method: "GET",
  //      headers: {
  //        authorization: `Bearer ${token}`,
  //      },
  //    });
  //     const data = await res.json();
  //     console.log(data);
  //     setUsers(data);
  //   };

  //   fetchUser();
  // }, []);
  return (
    <div className={styles.catalogWrapper}>
      <FilterBox />
      <div className={styles.cardWrapper}>
        {users?.map((profile, index) => (
          <div className={styles.profileBoxWrapper}>
            <ProfileBox key={index} user={profile} />
           
          </div>
        ))}
      </div>

      <div className={styles.sideBar}>
        <div className={styles.updateMessage}>
          <p>Update your information to get better match</p>
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/update-profile")}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default CatalogWrapper;
