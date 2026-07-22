import styles from "./ProfileSummaryCard.module.css";

const ProfileSummaryCard = ({ user }) => {
//   const { token } = useOutletContext();
  const dobArray = user?.dateOfBirth?.split("-");
  const date = new Date().toLocaleString().split(",")[0];
  const dateArray = date.toLocaleString().split("/");
  const age = Number(dateArray[2]) - Number(dobArray[0]);
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.info}>
        <span className={styles.attr}>Name : </span>
        <span className={styles.value}> {user?.firstName}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.attr}>Age : </span>
        <span className={styles.value}> {age}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.attr}>Caste : </span>
        <span className={styles.value}> {user?.caste}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.attr}>City : </span>
        <span className={styles.value}> {user?.city}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.attr}>Income : </span>
        <span className={styles.value}> {user?.annualIncome}</span>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
