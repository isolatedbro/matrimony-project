import { useLocation, useOutlet, useOutletContext } from "react-router";
import styles from "./ProfileBox.module.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const ProfileBox = ({ user, params, setIdx, idx }) => {
  // console.log(IMAGE_URL);
  const { token, userId } = useOutletContext();
  // console.log("USERss",userId);
  const dobArray = user?.dateOfBirth?.split("-");
  // console.log(dobArray);
  const date = new Date().toLocaleString().split(",")[0];
  const dateArray = date.toLocaleString().split("/");
  // console.log(dateArray);
  const age = Number(dateArray[2]) - Number(dobArray[0]);
  const [ingnored, setIngnored] = useState(false);
  const [requested, setRequested] = useState(false);
  // const [display, setDisplay] = useState("flex");
  const [action, setAction] = useState("");

  const location = useLocation();
  const handleAction = async (e) => {
    e.target.innerText = "Cancel X";
    e.target.style = "background: red";
    const status =
      e.target.innerText.toLowerCase() === "ignore" ? "ignored" : "pending";
    // console.log("Status", status);
    const requestObj = { from: userId, to: user._id, status };
    const sendRequest = await fetch(`${API_URL}/users/send-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestObj),
    });
    if (status === "pending") {
      setAction("sent");
      setTimeout(() => {
        setIdx((prev) => [...prev, idx]);
      }, 300);
    }else{
      setIdx((prev) => [...prev, idx]);
    }
  };

  // const myFunc = (e) => {
  //   if (e.target.innerText.toLowerCase() !== "ignore") {
  //     setAction("sent");
  //   }
  // };
  // console.log(display)

  return (
    <>
      {action === "sent" ? (
        <div className={`${styles.sent} ${styles.appear}`}>Request Sent</div>
      ) : (
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            {user?._id !== userId &&
              location.pathname !== `/profile/${params?.userId}` && (
                <div className={styles.buttonWrapper}>
                  <button className={styles.ignore} onClick={handleAction}>
                    Ignore
                  </button>
                  <button className={styles.sendRequest} onClick={handleAction}>
                    Send Request
                  </button>
                </div>
              )}
            <img
              className={styles.profilePic}
              src={
                user?.profilePic.length > 0
                  ? `${IMAGE_URL}/uploads/${userId}/profilePic/${user?.profilePic[0]?.filename}`
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
      )}
    </>
  );
};

export default ProfileBox;
