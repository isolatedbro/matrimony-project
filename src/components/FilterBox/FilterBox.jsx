import { useState } from "react";
import styles from "./FilterBox.module.css";
import { useOutletContext } from "react-router";

const FilterBox = () => {
  const filter = ["income", "birthYear", "occupation"];
  const { users, setUsers, tempUsers } = useOutletContext();
  const [isFilter, setIsFilter] = useState(false);

  const occupationCategories = [
    "",
    "Information Technology",
    "Engineering",
    "Healthcare & Medical",
    "Education & Research",
    "Finance & Accounting",
    "Business & Entrepreneurship",
    "Government & Public Services",
    "Defence & Aviation",
    "Legal",
    "Sales, Marketing & Management",
    "Arts, Media & Design",
    "Hospitality & Tourism",
    "Manufacturing & Industrial",
    "Agriculture",
    "Social Services",
    "Sports",
    "Student",
    "Retired",
    "Unemployed",
    "Others",
  ];
  const maritalStatus = [
    "",
    "Never Married",
    "Awaitaing Divorce",
    "Divorced",
    "Widowed",
    "Annulled",
  ];
  const incomeBracket = [
    "",
    "0 to 10 Lakhs",
    "10 Lakhs to 30 Lakhs",
    "30 Lakhs to 60 Lakhs",
    "60 Lakhs to 1 Crore",
    "1 Crore+",
  ];

  const [filterData, setFilterData] = useState({
    annualIncome: "",
    occupationCategory: "",
    minAge: "",
    maxAge: "",
    maritalStatus: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const date = new Date().toLocaleString().split(",")[0];
  const currentYear = date.toLocaleString().split("/")[2];

  const applyFilter = () => {
    const filteredUsers = tempUsers?.filter((user) => {
      const year = user?.dateOfBirth.split("-")[0];
      const age = Number(currentYear) - Number(year);
      return Object.entries(filterData).every(([key, value]) => {
        if (value === "") return true;

        if (key === "minAge") {
          return Number(age) >= Number(value);
        }

        if (key === "maxAge") {
          return Number(age) <= Number(value);
        }

        console.log(user[key],key, value);
        return user[key] === value;
      });
    });
    setIsFilter(true);
    setUsers(filteredUsers);
  };

  const removeFilter = () => {
    setIsFilter(false);
    setUsers(tempUsers);
  }

  // console.log("USERS", users);

  return (
    <div className={styles.filterWrapper}>
      <span className={styles.filterType}>Income</span>
      <select
        className={styles.filterDrop}
        name="annualIncome"
        value={filterData.income}
        onChange={handleFilterChange}
      >
        {incomeBracket.map((income, index) => (
          <option key={index} value={income}>
            {income}
          </option>
        ))}
      </select>
      <span className={styles.filterType}>Occupation</span>
      <select
        className={styles.filterDrop}
        name="occupationCategory"
        value={filterData.occupationCategory}
        onChange={handleFilterChange}
      >
        {occupationCategories.map((val, idx) => (
          <option key={idx} value={val}>
            {val}
          </option>
        ))}
      </select>
      <span className={styles.filterType}>Birth Year</span>
      <div className={styles.filterYear}>
        <input
          className={styles.minYear}
          type="number"
          placeholder="Min Age"
          name="minAge"
          value={filterData.minBirthYear}
          onChange={handleFilterChange}
        />
        {/* <select
          className={styles.filterDrop}
          name="minBirthYear"
          value={filterData.minBirthYear}
          onChange={handleFilterChange}
        >
          <option value=""></option>
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          className={styles.filterDrop}
          name="maxBirthYear"
          value={filterData.maxBirthYear}
          onChange={handleFilterChange}
        >
          <option value=""></option>
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select> */}
        <input
          className={styles.maxYear}
          type="number"
          placeholder="Max Age"
          name="maxAge"
          value={filterData.maxBirthYear}
          onChange={handleFilterChange}
        />
      </div>
      <span className={styles.filterType}>Marital Status</span>
      <select
        className={styles.filterDrop}
        name="maritalStatus"
        value={filterData.maritalStatus}
        onChange={handleFilterChange}
      >
        {maritalStatus.map((val, idx) => (
          <option key={idx} value={val}>
            {val}
          </option>
        ))}
      </select>

      <button className={`${styles.filterButton} ${isFilter ? styles.red : ""}`} onClick={applyFilter}>
        Apply Filter
      </button>
      <button className={styles.filterButton} onClick={removeFilter}>
        Remove Filter
      </button>
    </div>
  );
};

export default FilterBox;
