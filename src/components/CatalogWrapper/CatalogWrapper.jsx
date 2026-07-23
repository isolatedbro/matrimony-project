import { useOutletContext } from "react-router";
import FilterBox from "../FilterBox/FilterBox";
import ProfileBox from "../ProfileBox/ProfileBox";
import styles from "./CatalogWrapper.module.css";
import { useEffect, useState } from "react";
import RequestBox from "../RequestBox/RequestBox";

const API_URL = import.meta.env.VITE_API_URL;

const CatalogWrapper = () => {
  const { token, users, userId } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [idx, setIdx] = useState([]);
  const [hide, setHide] = useState([]);
  // console.log(idx);
  // const move = {transition: "transform 0.3s ease",
  //   transform: "translateX(-100px)"
  // };
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

  setTimeout(() => {
    setHide((prev) => [...prev, ...idx]);
  }, 400);
  return (
    <div className={styles.catalogWrapper}>
      <FilterBox />
      <div className={styles.cardWrapper}>
        {users?.map(
          (profile, index) =>
            profile._id !== userId && (
              <div
                key={index}
                className={`${styles.profileBoxWrapper} ${styles.box} ${idx.includes(index) ? styles.move : ""} ${hide.includes(index) ? styles.hide : ""}`}
              >
                <ProfileBox
                  user={profile}
                  setIdx={setIdx}
                  idx={index}
                  setHide={setHide}
                />
              </div>
            ),
        )}
      </div>

      <div className={styles.sideBar}>
        <div className={styles.updateMessage}>
          <button
            className={styles.button}
            onClick={() => (window.location.href = `/update-profile/${userId}`)}
          >
            Update Your Profile
          </button>
        </div>
        <h3 className={styles.heading}>Invitations</h3>
        <div className={styles.request}>
          {Array.isArray(requests) ? (
            requests?.map((request, index) => (
              <RequestBox key={index} user={request} idx={index} />
            ))
          ) : (
            <p>No Invitaions</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CatalogWrapper;
