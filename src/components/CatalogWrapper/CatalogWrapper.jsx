import { useOutletContext } from "react-router";
import FilterBox from "../FilterBox/FilterBox";
import ProfileBox from "../ProfileBox/ProfileBox";
import styles from "./CatalogWrapper.module.css";

const CatalogWrapper = () => {
    const {users} = useOutletContext();
  return (
    <div className={styles.catalogWrapper}>
      <FilterBox/>
      <div className={styles.cardWrapper}>
        {users.map((profile,index) => (
          <ProfileBox key={index} user={profile}/>
        ))}
      </div>
    </div>
  );
};
export default CatalogWrapper;
