import styles from "./LandingPage.module.css";

const LandingPage = () => {

  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  console.log(`${REDIRECT_URI}/auth/linkedin/callback`);

  const handleGetStarted = () => {
   window.location.href = `https://www.linkedin.com/oauth/v2/authorization
?response_type=code
&client_id=77jgvxd9i1dsg7
&redirect_uri=${REDIRECT_URI}/auth/linkedin/callback
&scope=openid profile email
&state=randomString`;
  }
  return (
    <div className={styles.landingPage}>
      <div className={styles.backgroundImageContainer}>
        <img
          className={styles.backgroundImage}
          src="LandingPageBackground.png"
          alt="backgroundImage"
        />
      </div>

      <div className={styles.content}>
        <h1>Find Your Life Partner</h1>
        <p>Find your perfect match today!</p>
        <button className={styles.getStartedButton} onClick={handleGetStarted}>
          Get Started with LinkedIn
        </button>{" "}
      </div>
    </div>
  );
};

export default LandingPage;
