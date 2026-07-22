import styles from "./MatchList.module.css";
import { useOutletContext } from "react-router";
import ImageContainer from "../imageContainer/ImageContainer";
import ProfileSummaryCard from "../ProfileSummaryCard/ProfileSummaryCard";

const MatchList = ({ user }) => {

  return (
    <div className={styles.container}>

      <div className={styles.imageContainer}>
        <ImageContainer
          imgUrl={"defaultProfilePic.jpg"}
          alt={"profile picture"}
        />
      </div>

      <div className={styles.infoContainer}>
        <ProfileSummaryCard user={user} />
      </div>
    </div>
  );
};
export default MatchList;
