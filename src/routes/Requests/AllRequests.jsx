import { useOutletContext } from "react-router";
import InformationCard from "../../components/InformationCard/InformationCard";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import styles from "./AllRequests.module.css";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AllRequests = () => {
  const { token } = useOutletContext();
  const [match, setMatch] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState([]);
  const [move, setMove] = useState([]);
  const [action, setAction] = useState("none");
  //   const params = useParams();
  useEffect(() => {
    const getMatch = async () => {
      const res = await fetch(`${API_URL}/users/get-requests`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      setMatch(data);
    };
    getMatch();
  }, []);
  // console.log(move,hide)

  const handleAction = async (e,index,user) => {
    console.log(e.target.innerText);
    let requestObj = {};
    if (e.target.innerText === "Accept") {
      requestObj = { status: "accepted", userId: user?._id };
      setAction("accepted");
    } else {
      requestObj = { status: "rejected", userId: user?._id };
    }
    const updateStatus = await fetch(`${API_URL}/users/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestObj),
    });

    console.log(await updateStatus.json());

    if (action !== "accepted") {
      setMove((prev) => [...prev, index]);
      setTimeout(() => {
        setHide((prev)=> [...prev, index]);
      }, 300);
    } else {
      setMove((prev) => [...prev, index]);
      setTimeout(() => {
        setHide((prev) => [...prev, index]);
      }, 300);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {!show && Array.isArray(match) && match?.length !== 0 ? (
          match?.map((user, index) => (
            
            <div
              key={index}
              className={`${styles.profileBoxWrapper} ${styles.box} ${move?.includes(index) ? styles.move : ""} ${hide?.includes(index) ? styles.hide : ""}`}
              //   onClick={() => {
              //     setUser(user);
              //     setShow(true);
              //   }}
            >
              <ProfileBox user={user} hide={hide} />

              <div
                className={`${styles.actions} ${styles.box} ${move?.includes(index) ? styles.move : ""} ${hide?.includes(index) ? styles.hide : ""}`}
              >
                <button
                  className={styles.ignore}
                  onClick={(e) => handleAction(e, index,user)}
                >
                  Reject
                </button>
                <button
                  className={styles.accept}
                  onClick={(e) => handleAction(e, index,user)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noMatch}>
            <p className={styles.noMatchMessage}>
              You have currently no Invitation
            </p>
          </div>
        )}

        {/* {Array.isArray(match) && match?.length !==0 && match?.map((user,index)=><div className={styles.profileBoxWrapper}>
        <ProfileBox user={user} params={params} />)
          </div>} */}
        {show && (
          <div className={`${styles.profileWindow} ${styles.move}`}>
            <div className={styles.profileBoxWrapper}>
              {user && <ProfileBox user={user} />}
            </div>
            <div className={styles.infoCardWrapper}>
              {user && <InformationCard user={user} />}
              <div className={styles.aboutCardWrapper}>
                <UserAboutCard user={user} />
              </div>
            </div>
            {/* {params?.userId === userId && (
            <div className={styles.match}>
              <h3>Your Match</h3>
              {Array.isArray(match) &&
                match?.length !== 0 &&
                match?.map((user, index) => (
                  <MatchList key={index} user={user} />
                ))}
            </div>
          )} */}
            <div>
              <button
                className={`${styles.backButton}`}
                onClick={() => setShow(!show)}
              >
                Go Back
              </button>
              <button className={`${styles.backButton}`}>Chat</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllRequests;
