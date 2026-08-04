import { useLocation, useOutletContext } from "react-router";
import FilterBox from "../FilterBox/FilterBox";
import ProfileBox from "../ProfileBox/ProfileBox";
import styles from "./CatalogWrapper.module.css";
import { useEffect, useState } from "react";
import RequestBox from "../RequestBox/RequestBox";
import Loading from "../Loading/Loading";
import NotificationBox from "../NotificationBox/NotificationBox";
import UpdateProfile from "../../routes/UpdateProfile/UpdateProfile";

const API_URL = import.meta.env.VITE_API_URL;

const CatalogWrapper = () => {
  const { secTheme, token, users, userId, isError, user } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [idx, setIdx] = useState([]);
  const [hide, setHide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false); // used for small screens
  const [showActionMenu, setShowActionMenu] = useState();
  const [tempProfile, setTempProfile] = useState(null);

  // const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  // const [showOccupations, setShowOccupations] = useState(false);
  // const [showMaritalStatusOptions, setShowMaritalStatusOptions] =
  //   useState(false);

  const location = useLocation();
  // console.log(idx);
  // const move = {transition: "transform 0.3s ease",
  //   transform: "translateX(-100px)"
  // };

  console.log("USERID ====", userId);
  useEffect(() => {
    const needUpdate = () => {
      window.location.href = `/update-profile/${userId}`;

      // window.location.href = `/update-profile/${user?._id}`;
    };

    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/get-requests`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setLoading(data ? false : true);
      // console.log(data);
      setRequests(data);
    };

    if (
      user?.gender === "" ||
      user?.gender === undefined ||
      user?.dateOfBirth === "" ||
      user?.dateOfBirth == undefined ||
      user?.occupation === ""
    ) {
      if (userId && userId.length > 0) needUpdate();
    } else {
      fetchUser();
    }
  }, [userId]);

  const actionMenu = () => {
    setShowActionMenu(!showActionMenu);
  };

  // setTimeout(() => {
  //   setHide((prev) => [...prev, ...idx]);
  // }, 400);

  // console.log("Hello")

  // console.log("USER ", user?.dateOfBirth);

  return (
    <div className={styles.catalogWrapper}>
      {/* {"For small screens"} */}

      <div className={styles.dropMenu}>
        <button className={styles.button} onClick={() => setShow(!show)}>
          Filters
        </button>
        <button
          className={styles.button}
          onClick={() => (window.location.href = `/update-profile/${userId}`)}
        >
          Update Your Profile
        </button>

        <button
          className={styles.button}
          onClick={() => (window.location.href = `/all-match/`)}
        >
          Your Matches
        </button>
      </div>

      <div
        style={{ backgroundColor: `${secTheme}` }}
        className={`${styles.filterContainer} ${styles.filterMove} ${show ? styles.show : ""}`}
      >
        <FilterBox
          show={show}
          // showIncomeOptions={showIncomeOptions}
          // showOccupations={showOccupations}
          // showMaritalStatusOptions ={showMaritalStatusOptions}
          // setShowIncomeOptions={setShowIncomeOptions}
          // setShowMaritalStatusOptions={setShowMaritalStatusOptions}
          // setShowOccupations={setShowOccupations}
        />
      </div>

      <div className={styles.cardWrapper}>
        {users?.map(
          (profile, index) =>
            profile._id !== userId && (
              <div
                key={index}
                className={`${styles.profileBoxWrapper} ${styles.box} ${idx.includes(index) ? styles.move : ""} ${hide.includes(index) ? styles.hide : ""}`}
                onMouseEnter={() => setShowActionMenu(index)}
                onMouseLeave={() => setShowActionMenu(null)}
              >
                <ProfileBox
                  user={profile}
                  setIdx={setIdx}
                  idx={index}
                  setHide={setHide}
                />

                {/* {location.pathname === '/' && <div
                  className={`${showActionMenu === index ? styles.actionMenu : styles.hide}`}
                >
                  <ul>
                    <li>Just want to say hi</li>
                    <li>Lets chat in Linkedin</li>
                    <li>Not able to message in LinkedIn</li>
                  </ul>
                </div>} */}
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
          {/* 
          <button
            className={styles.button}
            onClick={() => (window.location.href = `/all-match/`)}
          >
            Your Matches
          </button> */}
        </div>
        {/* <h3 className={styles.heading}>Your Activity</h3> */}
        {/* <div className={styles.request}> */}
        {/* {Array.isArray(requests) && requests?.length !== 0 ? (
            requests?.map((request, index) => (
              <RequestBox key={index} user={request} idx={index} />
            ))
          ) : (
            <p style={{ width: "100%", textAlign: "center" }}>No Invitaions</p>
          )} */}
        {/* {Array.isArray(requests) && requests?.length !== 0 && (
            <button
              className={styles.allRequests}
              onClick={() => (window.location.href = `/all-requests/`)}
            >
              See all invititaions
            </button>
          )} */}
        {/* <NotificationBox/> */}

        {/* </div> */}
      </div>
    </div>
  );
};
export default CatalogWrapper;
