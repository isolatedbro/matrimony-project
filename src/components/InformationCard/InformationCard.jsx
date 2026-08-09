import { useOutletContext } from "react-router";
import styles from "./InformationCard.module.css";

const InformationCard = ({ user }) => {
  const { userId } = useOutletContext();
  // console.log(user?.gallery);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Date of Birth</p>
          <p className={styles.value}>{user?.dateOfBirth || "--"}</p>
        </div>

        {/* <div className={styles.infoWrapper}>
          <p className={styles.attr}>Phone Number</p>
          <p className={styles.value}>{user?.phoneNumber}</p>
        </div> */}

        {/* <div className={styles.infoWrapper}>
          <p className={styles.attr}>Email</p>
          <p className={styles.value}>{user?.email}</p>
        </div> */}

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Religion</p>
          <p className={styles.value}>{user?.religion || "--"}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Caste</p>
          <p className={styles.value}>{user?.caste || "--"}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Marital Status</p>
          <p className={styles.value}>{user?.maritalStatus || "--"}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>height</p>
          <p className={styles.value}>{user?.height || "--"}</p>
        </div>

        {/* <div className={styles.infoWrapper}>
          <p className={styles.attr}>Diet</p>
          <p className={styles.value}>Ocassionally Nonvegeterian</p>
        </div> */}

        {/* <div className={styles.infoWrapper}>
          <p className={styles.attr}>Highest Qualification</p>
          <p className={styles.value}>{user?.qualification}</p>
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>College Name</p>
          <p className={styles.value}>{user?.college}</p>
        </div> */}

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Income</p>
          <p className={styles.value}>{user?.annualIncome || "--"}</p>
        </div>
      </div>
      <h4 className={styles.title}>Current Work Detail</h4>
      <div className={styles.workDetail}>
        {/* <p className={styles.workInfo}>
          <span className={styles.attr}>Working Sector :</span>
          <span className={styles.value}>Private</span>
        </p> */}
        <p className={styles.workInfo}>
          <span className={styles.attr}>Occupation :</span>
          <span className={styles.value}>{user?.occupation || "--"}</span>
        </p>

        <p className={styles.workInfo}>
          <span className={styles.attr}>Company Name :</span>
          <span className={styles.value}>{user?.companyName || "--"}</span>
        </p>
      </div>

      <h4 className={styles.title}>Educational Details</h4>
      <div className={`${styles.flexCol}`}>
        {user?.education?.map((item, idx) => (
          <div key={idx} className={styles.flexRow}>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>College/Institute :</span>
              <span className={styles.value}>{item?.college || "--"}</span>
            </p>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Qualification :</span>
              <span className={styles.value}>{item?.qualification || "--"}</span>
            </p>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Graduation Year :</span>
              <span className={styles.value}>{item?.graduationYear || "--"}</span>
            </p>
          </div>
        ))}
      </div>

      <h4 className={styles.title}>Address</h4>
      <div className={styles.section}>
        <p className={styles.infoWrapper}>
          <span className={styles.attr}>Country :</span>
          <span className={styles.value}>{user?.country || "--"}</span>
        </p>

        <p className={styles.infoWrapper}>
          <span className={styles.attr}>State :</span>
          <span className={styles.value}>{user?.state || "--"}</span>
        </p>
        <p className={styles.infoWrapper}>
          <span className={styles.attr}>City :</span>
          <span className={styles.value}>{user?.city || "--"}</span>
        </p>
      </div>

      {(userId === user?._id ||
        user?.privacy?.includes("family") === false) && (
        <>
          <h4 className={styles.title}>Family</h4>
          <div className={styles.section}>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Father's Status :</span>
              <span className={styles.value}>{user?.fathersStatus || "--"}</span>
            </p>

            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Father's Occupation :</span>
              <span className={styles.value}>{user?.fathersOccupation || "--"}</span>
            </p>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Mother's Status :</span>
              <span className={styles.value}>{user?.mothersStatus || "--"}</span>
            </p>
            <p className={styles.infoWrapper}>
              <span className={styles.attr}>Mother's Occupation :</span>
              <span className={styles.value}>{user?.mothersOccupation || "--"}</span>
            </p>
          </div>
        </>
      )}

      <h4 className={styles.title}>{`${user?.firstName}'s Pictures`}</h4>
      <div className={styles.flexRow}>
        {user?.gallery?.map((val, idx) => (
          <img
            className={styles.galleryImage}
            key={idx}
            src={`http://localhost:3000/uploads/6a5dbe98af0fb96d32ad9f51/gallery/1784611977867.png`}
          ></img>
        ))}
      </div>
    </>
  );
};

export default InformationCard;
