import {
  useLocation,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router";
import InformationCard from "../../components/InformationCard/InformationCard";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import styles from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import MatchList from "../../components/MatchList/MatchList";
const ProfilePage = () => {
  const { token, userId, API_URL } = useOutletContext();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState([]);
  const [hide, setHide] = useState(false);
  const [tempProfile, setTempProfile] = useState([]);
  const [message, setMessage] = useState("I just want to say hi");
  const params = useParams();

  const messageArray = [
    "I just want say hi",
    "I am interested in your profile but have some question",
    "I want to chat on Linkedin",
    "I am not able to send you message on Linkedin",
  ];
  // console.log("PARAMS", params);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API_URL}/users/user/${params?.userId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
      setTempProfile(data);
    };
    getUser();
  }, []);

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

  const handleMessage = (e) => {
    setMessage(e.target.value);
    // console.log(e.target.value);
  };

  const sendMessage = async () => {
    const reqObj = {
      from: userId,
      to: params?.userId,
      status: message,
      readStatus: "unread",
    };
    console.log("IBJ", reqObj);
    const response = await fetch(`${API_URL}/users/send-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqObj),
    });
  };

  return (
    <>
      <div className={styles.container}>
        {params?.userId === userId && user?._id === userId ? (
          <h2>Your Profile</h2>
        ) : (
          <h2>{`${user?.firstName}'s Profile`}</h2>
        )}
        <div className={styles.flexRow}>
          {/**For small devices max-width 500px */}
          <div className={styles.responsive}>
            <div className={styles.profileBoxWrapper}>
              {user && <ProfileBox user={user} params={params} />}
            </div>
            {!hide && params?.userId === userId && (
              <div className={styles.match}>
                <h3>Your Match</h3>
                {Array.isArray(match) &&
                  match?.length !== 0 &&
                  match?.map((user, index) => (
                    <MatchList
                      key={index}
                      user={user}
                      setHide={setHide}
                      setUser={setUser}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* For Screen width more than 500px*/}
          <div className={`${styles.profileBoxWrapper} ${styles.hideInMobile}`}>
            {user && <ProfileBox user={user} params={params} />}
            {userId !== user?._id && (
              <select
                className={styles.actionMenu}
                value={message}
                onChange={handleMessage}
              >
                {messageArray?.map((val, idx) => (
                  <option key={idx} className={styles.action}>
                    {val}
                  </option>
                ))}
              </select>
            )}
            {userId !== user?._id && <div className={styles.buttonContainer}>
              <button className={styles.sendButton} onClick={sendMessage}>
                Send
              </button>
            </div>}
          </div>
          <div className={styles.infoCardWrapper}>
            {user && <InformationCard user={user} />}
            <div className={styles.aboutCardWrapper}>
              <UserAboutCard user={user} />
            </div>
          </div>
          {!hide && params?.userId === userId && (
            <div className={`${styles.match} ${styles.hideInMobile}`}>
              <h3>Your Match</h3>
              {Array.isArray(match) &&
                match?.length !== 0 &&
                match?.map((user, index) => (
                  <MatchList
                    key={index}
                    user={user}
                    setHide={setHide}
                    setUser={setUser}
                  />
                ))}
            </div>
          )}
          {hide && (
            <div>
              {" "}
              <button
                className={`${styles.backButton}`}
                onClick={() => {
                  setHide(!hide);
                  setUser(tempProfile);
                }}
              >
                Go Back
              </button>{" "}
              <button className={`${styles.backButton}`}>Chat</button>
            </div>
          )}
        </div>

        {/* <div className={styles.aboutCardWrapper}>
          <UserAboutCard />
        </div> */}
      </div>
    </>
  );
};
export default ProfilePage;
