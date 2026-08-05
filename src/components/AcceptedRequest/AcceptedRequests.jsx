import styles from "./AcceptedRequests.module.css";

const AcceptedRequests = ({allMatch}) => {

  console.log("ALL MATCH", allMatch)
  const arr = Array.isArray(allMatch?.requests) ? allMatch?.requests?.filter((obj,idx) => obj?.role === 'reciever' && obj?.status === 'accepted') : [];
  return (
    <>
      <div
        className={`${styles.displayFlex} ${styles.flexDirectionColumn} ${styles.gap10px} ${styles.width100pc} ${styles.maxHeight250px} ${styles.overFlowYAuto}`}
      >
        {Array.isArray(arr) && arr?.map((obj, idx) => (
          <div key={idx} className={`${styles.displayFlex} ${styles.gap5px} ${styles.boxShadow}`}>
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
                  <span className={`${styles.fontStyleItalic} ${styles.fontSize11px}`}>{obj?.reply}</span>
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
        ))}

        {/* <div className={`${styles.displayFlex} ${styles.gap5px}`}>
          <div
            className={`${styles.width10pc} ${styles.borderRadius50pc} ${styles.overFlowHidden} ${styles.height40px}`}
          >
            <img
              className={`${styles.width100pc} ${styles.objectFitCover}`}
              src="/sampleWomen1.png"
              alt=""
            />
          </div>

          <div
            className={`${styles.displayFlex} ${styles.flexDirectionColumn}`}
          >
            <div className={`${styles.displayFlex} ${styles.gap5px}`}>
              <p className={`${styles.fontSize12px} ${styles.colorBlack}`}>
                <span>Natasha Roy</span>
              </p>
              <p
                className={`${styles.fontSize12px} ${styles.colorGrey} ${styles.fontStyleItalic}`}
              >
                <span className={`${styles.fontStyleItalic}`}>26 years</span>
              </p>
              <p className={`${styles.fontSize12px} ${styles.colorBlack}`}>
                <span>Delhi, India</span>
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
        </div>*/}
      </div>
    </>
  );
};

export default AcceptedRequests;
