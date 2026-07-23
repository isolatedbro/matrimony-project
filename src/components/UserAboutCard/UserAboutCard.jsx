import styles from './UserAboutCard.module.css';

const UserAboutCard = ({user}) => {

    return (
      <>
        <h3>About Me :</h3>
        <div className={styles.textBox}>
          <p>{user?.aboutMe}</p>
        </div>
      </>
    );
}
export default UserAboutCard;