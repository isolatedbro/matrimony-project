import styles from "./ProfileBox.module.css";

const ProfileBox = ({user}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.profilePic}
          src="sampleWomen1.png"
          alt="women pic"
        />
      </div>

      <div className={styles.infoSection}>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Name :</span>
          <span className={styles.value}>{user.firstName}{" "}{user.lastName}</span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Age :</span>
          <span className={styles.value}>24</span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>City :</span>
          <span className={styles.value}>Pune</span>
        </p>
        <p className={styles.profileInfo}>
          <span className={styles.attr}>Occupation :</span>
          <span className={styles.value}>Unemployed</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
