import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.heartRing}>
        <div className="heart">❤️</div>
      </div>

      <h2>Finding your perfect match...</h2>

      <p>Please wait while we search suitable profiles.</p>

      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loading;
