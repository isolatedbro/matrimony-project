import { useOutletContext } from "react-router";
import InformationCard from "../../components/InformationCard/InformationCard";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import styles from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import MatchList from "../../components/MatchList/MatchList";
const ProfilePage = () => {
  const { token, userInfo, API_URL } = useOutletContext();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API_URL}/users/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      setUser(data);
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
      console.log(data);
      setMatch(data);
    };
    getMatch();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {user?._id === userInfo ? (
          <h2>Your's Profile</h2>
        ) : (
          <h2>{`${user?.firstName}'s Profile`}</h2>
        )}
        <div className={styles.flexRow}>
          <div className={styles.profileBoxWrapper}>
            {user && <ProfileBox user={user} />}
          </div>
          <div className={styles.infoCardWrapper}>
            {user && <InformationCard user={user} />}
            <div className={styles.aboutCardWrapper}>
              <UserAboutCard />
            </div>
          </div>
          {user?._id === userInfo && (
            <div className={styles.match}>
              {Array.isArray(match) &&
                match?.length !== 0 &&
                match?.map((user, index) => (
                  <MatchList key={index} user={user} />
                ))}
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
