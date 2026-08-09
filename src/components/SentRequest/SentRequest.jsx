import styles from "./SentRequest.module.css";

const SentRequest = ({ allMatch }) => {
  console.log(allMatch);
  const arr = Array.isArray(allMatch)
    ? allMatch?.filter((obj) => obj?.role === "reciever")
    : [];
  const sortedArray = arr.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  // const arr2 = Array.isArray(allMatch?.requests)
  //   ? allMatch?.requests?.filter(
  //       (obj) => obj?.role === "reciever" && obj?.status === "accepted",
  //     )
  //   : [];
  return (
    <>
      <div className={`${styles.container}`}>
        {Array.isArray(arr) &&
          arr?.map((obj, idx) => (
            <div key={idx} className={`${styles.wrapper}`}>
              <div className={`${styles.imageContainer}`}>
                <img
                  className={`${styles.image}`}
                  src="/sampleWomen1.png"
                  alt=""
                />
              </div>

              <div className={`${styles.subWrapper}`}>
                <div className={styles.nameWrapper}>
                  <p className={styles.name}>{obj?.name}</p>
                </div>

                <div className={`${styles.replyWrapper}`}>
                  <p className={`${styles.reply}`}>
                    <span className={`${styles.replySpan}`}>
                      {obj?.reply || "No reply yet"}
                    </span>
                  </p>
                  {/* <p
                  className={`${styles.fontSize12px} ${styles.colorGrey} ${styles.fontStyleItalic}`}
                >
                  <span className={`${styles.fontStyleItalic}`}>26 years</span>
                </p>
                <p className={`${styles.fontSize12px} ${styles.colorBlack}`}>
                  <span>Delhi, India</span>
                </p> */}
                </div>
              </div>

              <div className={`${styles.actionWrapper}`}>
                <p className={`${styles.linkedinProfile}`}>
                  <a href="#">linkedIn</a>
                </p>

                <p className={`${styles.remove}`}>
                  <span>Remove</span>
                </p>
              </div>
            </div>
          ))}

        {/* <p>Pending Requests</p>
        {Array.isArray(arr) &&
          arr2?.map((obj, idx) => (
            <div
              key={idx}
              className={`${styles.displayFlex} ${styles.gap5px} ${styles.boxShadow}`}
            >
              <div
                className={`${styles.width90px} ${styles.borderRadius50pc} ${styles.overFlowHidden} ${styles.height40px} ${styles.cursorPointer}`}
              >
                <img
                  className={`${styles.height100pc} ${styles.objectFitCover}`}
                  src="/sampleWomen1.png"
                  alt=""
                />
              </div>

              <div
                className={`${styles.displayFlex} ${styles.flexDirectionColumn}`}
              >
                <div className={`${styles.displayFlex} ${styles.gap5px}`}>
                  <p className={`${styles.fontSize12px} ${styles.colorBlack}`}>
                    <span
                      className={`${styles.fontStyleItalic} ${styles.fontSize11px}`}
                    >
                      {obj?.reply}
                    </span>
                  </p>
                </div>

                <div className={`${styles.displayFlex} ${styles.gap5px}`}>
                  <p className={`${styles.fontSize12px}`}>
                    <a href="#">linkedIn</a>
                  </p>

                  <p
                    className={`${styles.fontSize12px} ${styles.colorRed} ${styles.cursorPointer}`}
                  >
                    <span>Remove</span>
                  </p>
                </div>
              </div>
            </div>
          ))} */}
      </div>
    </>
  );
};

export default SentRequest;
