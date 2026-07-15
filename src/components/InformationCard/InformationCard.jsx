import styles from "./InformationCard.module.css";

const InformationCard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Date of Birth</p>
          <p ClassName={styles.value}>1st January 2002</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Phone</p>
          <p ClassName={styles.value}>9999999999</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Email</p>
          <p ClassName={styles.value}>example@email.com</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Religion</p>
          <p ClassName={styles.value}>Hindu</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Cast</p>
          <p ClassName={styles.value}>Agarwal</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Marital Status</p>
          <p ClassName={styles.value}>Unmarried</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>height</p>
          <p ClassName={styles.value}>5ft 10 inch</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Diet</p>
          <p ClassName={styles.value}>Ocassionally Nonvegeterian</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Highest Qualification</p>
          <p ClassName={styles.value}>MBA</p>
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.attr}>College Name</p>
          <p ClassName={styles.value}>Harvard Business School</p>
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.attr}>Income</p>
          <p ClassName={styles.value}>5 crore per annum</p>
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
          <span className={styles.value}>ABC Multinational</span>
        </p>
      </div>
    </>
  );
};

export default InformationCard;
