import { useState } from "react";
import styles from "./NotificationBox.module.css";
const API_URL = import.meta.env.VITE_API_URL;

const NotificationBox = ({ notifications, name }) => {
  // console.log("Notifcation", notifications)
  const token = localStorage.getItem("token");
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState(null);
  const [item, setItem] = useState(null);
  // const [count, setCount] = useState(0);

  const functionMiddleWare = (action, item) => {
    // console.log("MIDD", action)
    setAction(action);
    setItem(item);
    setShowPopup(!showPopup);
  };

  const count = Array.isArray(notifications) ? notifications.filter(
  item => item.message !== "accepted"
).length : 0;

  const handleAction = async (action, item) => {
    setShowPopup(false);
    // console.log("ACTION", action);
    let reply = "";
    let status = "";
    if (action === "Reject") {
      if (item?.message === "I just want to say hi") {
        reply = `It seems ${name} is not intrested in your hi`;
        status = "rejected";
      } else if (
        item?.message ===
        "I am interested in your profile but have some question"
      ) {
        reply = `${item?.name} doesn't want to answer your question`;
        status = "rejected";
      } else if (item?.message === "I want to chat on Linkedin") {
        reply = `${name} doesn't want to chat`;
        status = "rejected";
      } else if (
        item?.message === "I am not able to send you message on Linkedin"
      ) {
        reply = `${name} doesn't want you to send message on linked in`;
        status = "rejected";
      }
    } else if (action === "Mark as Read") {
      reply = `${name} has not decided about you yet`;
      status = "waiting";
    } else if (action === "Accept") {
      reply = `${name} seems interested and wants to connect with you on linkedin`;
      status = "accepted";
    }
    const update = { userId: item?.userId, status: status, reply: reply, readStatus: "read"};

    console.log("NOTIFICATION", update);
    const updateMessage = await fetch(`${API_URL}/users/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    });
  };
  return (
    <>
      <div className={styles.notificationContainer}>
        {Array.isArray(notifications) && notifications?.map(
          (item, idx) =>
            item?.status === "pending" && (
              <div key={idx} className={styles.notification}>
                <div className={styles.notificationContent}>
                  <p className={styles.from}>{item?.name}</p>
                  <p className={styles.message}>{item?.message}</p>
                  <p
                    className={styles.linkedin}
                    onClick={() => functionMiddleWare("Accept", item)}
                  >
                    <a href="#">{item?.linkedin || "Linkedin profile link"}</a>
                  </p>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.button} ${styles.redText}`}
                    onClick={(e) =>
                      functionMiddleWare(e.target.innerText, item)
                    }
                  >
                    Reject
                  </button>
                  <button
                    className={styles.button}
                    onClick={(e) =>
                      functionMiddleWare(e.target.innerText, item)
                    }
                  >
                    Mark as Read
                  </button>
                </div>

                {showPopup && (
                  <div className={styles.warningPopup}>
                    <p>Are you sure?</p>
                    <div className={styles.flex}>
                      <button
                        className={`${styles.button}`}
                        onClick={() => {
                          handleAction(action, item);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className={`${styles.button} ${styles.redText}`}
                        onClick={() => {
                          setShowPopup(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ),
        )}
        {count == 0 && <h3>Nothing to Show</h3>}
      </div>
    </>
  );
};
export default NotificationBox;
