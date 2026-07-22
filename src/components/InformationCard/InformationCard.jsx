import styles from "./InformationCard.module.css";

const InformationCard = ({user}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Date of Birth</p>
          <p className={styles.value}>{user?.dateOfBirth}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Phone Number</p>
          <p className={styles.value}>{user?.phoneNumber}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Email</p>
          <p className={styles.value}>{user?.email}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Religion</p>
          <p className={styles.value}>{user?.religion}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Caste</p>
          <p className={styles.value}>{user?.caste}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Marital Status</p>
          <p className={styles.value}>{user?.maritalStatus}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>height</p>
          <p className={styles.value}>{user?.height}</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Diet</p>
          <p className={styles.value}>Ocassionally Nonvegeterian</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Highest Qualification</p>
          <p className={styles.value}>{user?.qualification}</p>
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>College Name</p>
          <p className={styles.value}>Harvard Business School</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Income</p>
          <p className={styles.value}>{user?.annualIncome}</p>
        </div>
      </div>
      <h4 className={styles.title}>Current Work Detail</h4>
      <div className={styles.workDetail}>
        <p className={styles.workInfo}>
          <span className={styles.attr}>Working Sector :</span>
          <span className={styles.value}>Private</span>
        </p>
        <p className={styles.workInfo}>
          <span className={styles.attr}>Working as :</span>
          <span className={styles.value}>SoftWare Engineer</span>
        </p>

        <p className={styles.workInfo}>
          <span className={styles.attr}>Company Name :</span>
          <span className={styles.value}>{user?.companyName}</span>
        </p>
      </div>
    </>
  );
};

export default InformationCard;
