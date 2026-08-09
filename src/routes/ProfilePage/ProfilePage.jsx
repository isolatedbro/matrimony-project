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
  const { token, userId, API_URL, name } = useOutletContext();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState([]);
  const [allMatch, setAllMatch] = useState([]);
  const [hide, setHide] = useState(false);
  const [tempProfile, setTempProfile] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState(["-"]);
  const [showSendButton, setShowSendButton] = useState(["-1"]); //To show the send button when user click the messaage
  const [requestFromThisUser, setRequestFromThisUser] = useState([]);
  const params = useParams();

  const messageArray = [
    // "I just want say hi",
    "I am interested in your profile but have some question",
    "I want to chat on Linkedin",
    "I am not able to send you message on Linkedin",
  ];

  // const isRequestAlreadySent =
  //   (Array.isArray(activity) &&
  //     activity?.find((obj) => obj._id === user?._id)) ||
  //   requestSentMessage?.message;
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
      // console.log(data);
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

    const getAllMatch = async () => {
      const res = await fetch(`${API_URL}/users/get-all-match`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllMatch(data);
      // console.log(data);
      let arr = [];
      // console.log(params?.userId);
      data?.requests?.map(
        (obj) => obj?.userId === params?.userId && arr.push(obj?.message),
      );
      // console.log(arr);
      setSentMessages((prev) => [...prev, ...arr]);

      // arr = [];
      const requests = data?.requests
        ?.filter(
          (obj) => obj?.userId === params?.userId && obj?.status === "pending",
        )
        .map((obj) => obj?.message);

      setRequestFromThisUser([...new Set(requests)]);

      // data?.requests?.map((obj) =>
      //   setSentMessages((prev) => [
      //     ...prev,
      //     obj?._id === params?.userId
      //   ]),
      // );

      // console.log(data);
    };
    getMatch();
    getAllMatch();
  }, []);

  // console.log("RFTU", requestFromThisUser);

  const handleMessage = (message, id) => {
    // setMessage(e.target.value);
    const isAlreadySent = sentMessages?.includes(message);

    if (!isAlreadySent) {
      setShowSendButton((prev) => [...prev, id]);
      setMessage(message);
    }
  };

  const handleCancel = (id) => {
    setShowSendButton((prev) => prev.filter((idx) => idx !== id));
    setMessage("");
  };

  const sendMessage = async (id) => {
    const reqObj = {
      from: userId,
      to: params?.userId,
      senderName: name,
      recieverName: user?.firstName + " " + user?.lastName,
      message: message,
      status: "pending",
      readStatus: "unread",
    };

    setShowSendButton((prev) => prev.filter((idx) => idx !== id));

    // const isAlreadySent = sentMessages?.includes(message);

    setSentMessages((prev) => [...prev, message]);
    setMessage("");

    const response = await fetch(`${API_URL}/users/send-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqObj),
    });

    // const data = await response.json();

    // const isRequestAlreadySent =
    //   Array.isArray(activity) && activity?.find((obj) => obj._id === user?._id);

    //   if (isRequestAlreadySent) {
    //     console.log("Request is already sent");
    //   } else {
    //     //  console.log("IBJ", reqObj);

    //
    //     setRequstSentMessage(data);
    //   }
  };

  // console.log("Activity", activity);

  const handleAction = async (action, item) => {
    // setShowPopup(false);
    // console.log("ACTION", action);
    let reply = "";
    let status = "";
    if (action === "Reject") {
      if (item === "I just want to say hi") {
        reply = `It seems ${name} is not intrested in your hi`;
        status = "rejected";
      } else if (
        item === "I am interested in your profile but have some question"
      ) {
        reply = `${name} doesn't want to answer your question`;
        status = "rejected";
      } else if (item === "I want to chat on Linkedin") {
        reply = `${name} doesn't want to chat`;
        status = "rejected";
      } else if (item === "I am not able to send you message on Linkedin") {
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
    const update = {
      userId: user?._id,
      status: status,
      reply: reply,
      readStatus: "read",
    };

    setRequestFromThisUser((prev) => prev?.filter((obj) => obj !== item));

    // console.log("NOTIFICATION", update);
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

            {params?.userId === userId && (
              <div className={styles.updateMessage}>
                <button
                  className={styles.updateButton}
                  onClick={() =>
                    (window.location.href = `/update-profile/${userId}`)
                  }
                >
                  Update Your Profile
                </button>
              </div>
            )}

            {/* Send message to another person */}
            {params?.userId !== userId && (
              <h4>Send Request to {user?.firstName}</h4>
            )}
            {userId !== user?._id && (
              <div className={styles.actionMenu}>
                {messageArray?.map((val, idx) => (
                  <div key={idx} className={styles.buttonWrapper}>
                    <button
                      className={`${sentMessages?.includes(val) ? styles.disableButton : styles.action}`}
                      onClick={() => handleMessage(val, idx)}
                    >
                      {val}
                    </button>

                    {/* This confirmation window shows when above button is clicked */}
                    {showSendButton?.includes(idx) && (
                      <div className={styles.confirmWindow}>
                        <button
                          className={styles.sendButton}
                          onClick={() => sendMessage(idx)}
                        >
                          Send
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={() => handleCancel(idx)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              // <select
              //   name="message"
              //   className={styles.actionMenu}
              //   value={message}
              //   onChange={handleMessage}
              // >
              //   {messageArray?.map((val, idx) => (
              //     <option key={idx} className={styles.action}>
              //       {val}
              //     </option>
              //   ))}
              // </select>
            )}

            {params?.userId !== userId && (
              <h4> Request from {user?.firstName}</h4>
            )}
            {Array.isArray(requestFromThisUser) &&
              requestFromThisUser?.map((obj, idx) => (
                <div key={idx} className={styles.requests}>
                  <li>{obj}</li>
                  <div className={styles.requestAction}>
                    <p onClick={() => handleAction("Accept", obj)}>linkedin</p>
                    <p
                      style={{ color: "red" }}
                      onClick={() => handleAction("Reject", obj)}
                    >
                      reject
                    </p>
                  </div>
                </div>
              ))}

            {/* {userId !== user?._id && (
              <div className={styles.buttonContainer}>
                <button
                  title={
                    isRequestAlreadySent
                      ? `You have already sent request to this user`
                      : ``
                  }
                  className={`${!isRequestAlreadySent ? styles.sendButton : styles.disableButton}`}
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            )} */}
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
