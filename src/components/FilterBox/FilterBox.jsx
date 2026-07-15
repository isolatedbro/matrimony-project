import { useState } from "react";
import styles from "./FilterBox.module.css";

const FilterBox = () => {
  const filter = ["income", "birthYear", "occupation"];
  const ocupation = [
    "Select",
    "Bussiness",
    "Freelancers",
    "Job",
    "Founder",
    "Others",
  ];
  const maritalStatus = [
    "Select",
    "Single",
    "Unmarried",
    "Divorced",
    "Widowed",
  ];
  const incomeBracket = [
    "Select",
    "0 to 10 Laksa",
    "10 Lakhs to 30 Lakhs",
    "30 Lakhs to 60 Lakhs",
    "60 Lakhs to 1 Crore",
    "1 Crore+",
  ];

  const [filterData, setFilterData] = useState({
    minIncome: 0,
    maxIncome: 0,
    ocupation: "",
    minBirthYear: 0,
    maxBirthYear: 0,
    maritalStatus: "",
  });

  const handleFilterChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles.filterWrapper}>
      <span className={styles.filterType}>Income</span>
      <select
        className={styles.filterDrop}
        name="income"
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
        name="ocupation"
        value={filterData.ocupation}
        onChange={handleFilterChange}
      >
        {ocupation.map((val, idx) => (
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
          placeholder="Min Year"
          //   value={filterData.minBirthYear}
          onChange={handleFilterChange}
        />
        <input
          className={styles.maxYear}
          type="number"
          placeholder="Max Year"
          //   value={filterData.maxBirthYear}
          onChange={handleFilterChange}
        />
      </div>
      <span className={styles.filterType}>Marital Status</span>
      <select
        className={styles.filterDrop}
        name="ocupation"
        value={filterData.maritalStatus}
        onChange={handleFilterChange}
      >
        {maritalStatus.map((val, idx) => (
          <option key={idx} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBox;
