import { useOutletContext } from "react-router";
import InformationCard from "../../components/InformationCard/InformationCard";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import styles from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
const ProfilePage = () => {
  const {token,userInfo, API_URL} = useOutletContext();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${API_URL}/users/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {user._id === userInfo ? (
          <h2>Your's Profile</h2>
        ) : (
          <h2>{`${user.firstName}'s Profile`}</h2>
        )}
        <div className={styles.flexRow}>
          <div className={styles.profileBoxWrapper}>
            {user && <ProfileBox user={user} />}
          </div>
          <div className={styles.infoCardWrapper}>
            {user && <InformationCard user={user} />}
          </div>
          <div className={styles.match}>Your's Match</div>
        </div>

        <div className={styles.aboutCardWrapper}>
          <UserAboutCard />
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
