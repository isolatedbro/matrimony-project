import { useEffect, useState } from "react";
import styles from "./AllMatch.module.css";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import { useOutletContext, useParams } from "react-router";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import InformationCard from "../../components/InformationCard/InformationCard";

const API_URL = import.meta.env.VITE_API_URL;

const AllMatch = () => {
  const { token } = useOutletContext();
  const [match, setMatch] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  //   const params = useParams();
  useEffect(() => {
    const getMatch = async () => {
      const res = await fetch(`${API_URL}/users/get-match`, {
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

  return (
    <>
      <div className={styles.container}>
        {!show && Array.isArray(match) && match?.length !== 0 ? (
          match?.map((user, index) => (
            <div
              key={index}
              className={styles.profileBoxWrapper}
              onClick={() => {
                setUser(user);
                setShow(true);
              }}
            >
              <ProfileBox user={user} />
            </div>
          ))
        ) : (
          <div className={styles.noMatch}>
            <p className={styles.noMatchMessage}>You have currently no Match</p>
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

export default AllMatch;
