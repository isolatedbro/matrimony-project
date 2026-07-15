import InformationCard from "../../components/InformationCard/InformationCard";
import ProfileBox from "../../components/ProfileBox/ProfileBox";
import UserAboutCard from "../../components/UserAboutCard/UserAboutCard";
import styles from "./ProfilePage.module.css";
const ProfilePage = () => {

    return (
      <>
        <div className={styles.container}>
          <div className={styles.flexRow}>
            <div className={styles.profileBoxWrapper}>
              <ProfileBox />
            </div>
            <div className={styles.infoCardWrapper}>
              <InformationCard />
            </div>
          </div>

          <div className={styles.aboutCardWrapper}>
            <UserAboutCard />
          </div>
        </div>
      </>
    );
}
export default ProfilePage;