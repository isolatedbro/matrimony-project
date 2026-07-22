import styles from "./ImageContainer.module.css";
const ImageContainer = ({ imgUrl, alt }) => {
  return <img className={styles.profilePic} src={imgUrl} alt={alt} />;
};

export default ImageContainer;
