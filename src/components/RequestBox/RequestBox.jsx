import { useOutletContext } from "react-router";
import styles from "./RequestBox.module.css";
import ImageContainer from "../imageContainer/ImageContainer";
import ProfileSummaryCard from "../ProfileSummaryCard/ProfileSummaryCard";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const RequestBox = ({ user, idx }) => {
  const { token } = useOutletContext();
  const dobArray = user?.dateOfBirth?.split("-");
  const date = new Date().toLocaleString().split(",")[0];
  const dateArray = date.toLocaleString().split("/");
  const age = Number(dateArray[2]) - Number(dobArray[0]);

  const [hide, setHide] = useState(false);
  const [move, setMove] = useState(false);

  const handleAction = async (e) => {
    let requestObj = {};
    if (e.target.innerText === "Accept") {
      requestObj = { status: "accepted", userId: user?._id };
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

    setMove(true);
    setTimeout(() => {
      setHide(true);
    }, 300);
  };
  // const myFunc = () => {
  //   setMove(true);
  //   setTimeout(() => {
  //     setHide(true);
  //   }, 300);
  // };

  return (
    <>
      <div
        className={`${styles.container} ${styles.box} ${move ? styles.move : ""} ${hide ? styles.hide : ""}`}
      >
        <div className={styles.imageContainer}>
          <ImageContainer
            imgUrl={"defaultProfilePic.jpg"}
            alt={"profile picture"}
          />
        </div>

        <div className={styles.infoContainer}>
          <ProfileSummaryCard user={user} />
          <div className={styles.actions}>
            <button className={styles.ignore} onClick={handleAction}>
              Reject
            </button>
            <button className={styles.accept} onClick={handleAction}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestBox;
