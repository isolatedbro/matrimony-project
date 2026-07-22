import { useOutlet, useOutletContext } from "react-router";
import styles from "./ProfileBox.module.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const ProfileBox = ({ user}) => {
  // console.log(IMAGE_URL);
  const { userInfo,token } = useOutletContext();
  // console.log(user);
  const dobArray = user?.dateOfBirth?.split("-");
  // console.log(dobArray);
  const date = new Date().toLocaleString().split(",")[0];
  const dateArray = date.toLocaleString().split("/");
  // console.log(dateArray);
  const age =  Number(dateArray[2]) - Number(dobArray[0]);
  const [ingnored, setIngnored] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleAction = async (e) => {
    e.target.innerText = "Cancel X";
    e.target.style = "background: red";
    const requestObj = {from: userInfo,to: user._id};
    const sendRequest = await fetch(`${API_URL}/users/send-request`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(requestObj)
    })

  }
  
  
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {user?._id !== userInfo && <div className={styles.buttonWrapper}>
         <button className={styles.ignore}>Ignore</button>
          <button className={styles.sendRequest} onClick={handleAction}>Send Request</button>
        </div>}
        <img
          className={styles.profilePic}
          src={
            user?.profilePic.length > 0
              ? `${IMAGE_URL}/uploads/${userInfo}/profilePic/${user?.profilePic[0]?.filename}`
              : `defaultProfilePic.jpg`
          }
          alt="profilePic"
        />
      </div>

      <div className={styles.infoSection}>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Name :</span>
          <span className={styles.value}>
            {user.firstName} {user.lastName}
          </span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Age :</span>
          <span className={styles.value}>{age}</span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>City :</span>
          <span className={styles.value}>{user?.city}</span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Occupation :</span>
          <span className={styles.value}>{user?.occupation}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
