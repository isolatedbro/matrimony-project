import styles from "./MatchList.module.css";
import { Link, useOutletContext } from "react-router";
import ImageContainer from "../imageContainer/ImageContainer";
import ProfileSummaryCard from "../ProfileSummaryCard/ProfileSummaryCard";

const MatchList = ({ user,setHide, setUser }) => {

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <ImageContainer
          imgUrl={"/defaultProfilePic.jpg"}
          alt={"profile picture"}
        />
      </div>

      <div className={styles.infoContainer}>
        <ProfileSummaryCard user={user} />
        <a className={styles.viewProfile} onClick={()=>{setHide(true); setUser(user);}}>View Profile</a>
      </div>
    </div>
  );
};
export default MatchList;
// href={`/profile/${user?._id}?matched=${true}`}