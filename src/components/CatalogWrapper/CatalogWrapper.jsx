import { useOutletContext } from "react-router";
import FilterBox from "../FilterBox/FilterBox";
import ProfileBox from "../ProfileBox/ProfileBox";
import styles from "./CatalogWrapper.module.css";
import { useEffect, useState } from "react";
import RequestBox from "../RequestBox/RequestBox";

const API_URL = import.meta.env.VITE_API_URL;

const CatalogWrapper = () => {
  const { token, users, userInfo } = useOutletContext();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/get-requests`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setRequests(data);
    };

    fetchUser();
  }, []);
  return (
    <div className={styles.catalogWrapper}>
      <FilterBox />
      <div className={styles.cardWrapper}>
        {users?.map(
          (profile, index) =>
            profile._id !== userInfo && (
              <div key={index} className={styles.profileBoxWrapper}>
                <ProfileBox user={profile} />
              </div>
            ),
        )}
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
        <h3>Invitations</h3>
        <div className={styles.request}>
          {!requests?.message ? requests?.map((request, index) => (
            <RequestBox key={index} user={request} />
          )) : <p>No Invitaions</p>}
        </div>
      </div>
    </div>
  );
};
export default CatalogWrapper;
