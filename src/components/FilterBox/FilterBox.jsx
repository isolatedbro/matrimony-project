import { useEffect, useRef, useState } from "react";
import styles from "./FilterBox.module.css";
import { useOutletContext } from "react-router";

import { IoIosArrowDown } from "react-icons/io";

const FilterBox = () => {
  const filter = ["income", "birthYear", "occupation"];
  const { users, setUsers, tempUsers } = useOutletContext();
  const [isFilter, setIsFilter] = useState(false);
  const [isFilterDataChanged, setIsFilterDataChanged] = useState(false);

  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  const [showOccupations, setShowOccupations] = useState(false);
  const [showMaritalStatusOptions, setShowMaritalStatusOptions] =
    useState(false);

  // console.log(showIncomeOptions);

  const occupationCategories = [
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
    "Never Married",
    "Awaitaing Divorce",
    "Divorced",
    "Widowed",
    "Annulled",
  ];
  const incomeBracket = [
    "0 to 10 Lakhs",
    "10 Lakhs to 30 Lakhs",
    "30 Lakhs to 60 Lakhs",
    "60 Lakhs to 1 Crore",
    "1 Crore+",
  ];

  const incomeFilterRef = useRef(null);
  const maritalStatusFilterRef = useRef(null);
  const occupationFilterRef = useRef(null);

  // const [currentFilter, setCurrentFilter] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        incomeFilterRef.current &&
        !incomeFilterRef.current.contains(e.target)
      ) {
        setShowIncomeOptions(false);
      }

      if (
        maritalStatusFilterRef.current &&
        !maritalStatusFilterRef.current.contains(e.target)
      ) {
        setShowMaritalStatusOptions(false);
      }

      if (
        occupationFilterRef.current &&
        !occupationFilterRef.current.contains(e.target)
      ) {
        setShowOccupations(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [filterData, setFilterData] = useState({
    annualIncome: [],
    occupationCategory: [],
    minAge: "",
    maxAge: "",
    maritalStatus: [],
  });

  // const changeButtonColor = (e) => {
  //   if(currentFilter !== null){

  //   }
  // }

  // console.log("FILTER DATA", filterData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setIsFilterDataChanged(true);

    if (e.target.checked) {
      if (name !== "minAge" && name !== "maxAge") {
        setFilterData((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setFilterData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }else{
      if (name !== "minAge" && name !== "maxAge") {
        setFilterData((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
      } else {
        setFilterData((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const date = new Date().toLocaleString().split(",")[0];
  const currentYear = date.toLocaleString().split("/")[2];

  const applyFilter = () => {
    const filteredUsers = tempUsers?.filter((user) => {
      const year = user?.dateOfBirth.split("-")[0];
      const age = Number(currentYear) - Number(year);
      return Object.entries(filterData).every(([key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          return true;
        }
        if (value === "") {
          return true;
        }

        if (key === "minAge") {
          return Number(age) >= Number(value);
        }

        if (key === "maxAge") {
          return Number(age) <= Number(value);
        }

        console.log(user[key], key, value);
        if (user[key].includes(value)) {
          return true;
        }
      });
    });
    setIsFilterDataChanged(false);
    setIsFilter(true);
    setUsers(filteredUsers);
  };

  const removeFilter = () => {
    setIsFilter(false);
    setUsers(tempUsers);

    setFilterData({
      annualIncome: [],
      occupationCategory: [],
      minAge: "",
      maxAge: "",
      maritalStatus: [],
    });
  };

  // console.log("USERS", users);

  return (
    <div className={styles.filterWrapper}>
      <div ref={incomeFilterRef} id="incomeFilter" className={styles.filter}>
        <span
          // ref={incomeFilterRef}
          className={`${styles.filterType}`}
          onClick={() => setShowIncomeOptions(!showIncomeOptions)}
        >
          Income <IoIosArrowDown />
        </span>

        <div className={`${showIncomeOptions ? styles.options : styles.hide}`}>
          {incomeBracket.map((income, index) => (
            <div key={index} className={styles.inputWrapper}>
              <input
                name="annualIncome"
                className={styles.input}
                value={income}
                type="checkbox"
                onChange={handleFilterChange}
              />
              <label className={styles.label}>{income}</label>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={occupationFilterRef}
        id="occupationFilter"
        className={styles.filter}
      >
        <span
          // ref={occupationFilterRef}
          className={`${styles.filterType}  `}
          onClick={() => setShowOccupations(!showOccupations)}
        >
          Occupation <IoIosArrowDown />
        </span>

        <div className={`${showOccupations ? styles.options : styles.hide}`}>
          {occupationCategories.map((item, index) => (
            <div key={index} className={styles.inputWrapper}>
              <input
                className={styles.input}
                name="occupationCategory"
                value={item}
                type="checkbox"
                onChange={handleFilterChange}
              />
              <label className={styles.label}>{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.birthYear}>
        <span className={styles.inputLabel}>Birth Year</span>

        <div className={styles.filterYear}>
          <div className={styles.width50pc}>
            <input
              className={styles.minYear}
              type="number"
              placeholder="Min Age"
              name="minAge"
              value={filterData.minBirthYear}
              onChange={handleFilterChange}
            />
          </div>

          <div className={styles.width50pc}>
            <input
              className={styles.maxYear}
              type="number"
              placeholder="Max Age"
              name="maxAge"
              value={filterData.maxBirthYear}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div
        ref={maritalStatusFilterRef}
        id="maritalStatusFilter"
        className={styles.filter}
      >
        <span
          // ref={maritalStatusFilterRef}
          className={`${styles.filterType}  `}
          onClick={() => setShowMaritalStatusOptions(!showMaritalStatusOptions)}
        >
          Marital Status <IoIosArrowDown />
        </span>

        <div
          className={`${showMaritalStatusOptions ? styles.options : styles.hide}`}
        >
          {maritalStatus.map((item, index) => (
            <div key={index} className={styles.inputWrapper}>
              <input
                className={styles.input}
                name="maritalStatus"
                value={item}
                type="checkbox"
                onChange={handleFilterChange}
              />
              <label className={styles.label}>{item}</label>
            </div>
          ))}
        </div>

        {/* <select
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
        </select> */}
      </div>

      <button
        style={{ backgroundColor: `${isFilterDataChanged ? "red" : ""}` }}
        className={`${styles.filterButton} ${isFilter ? styles.grey : ""}`}
        onClick={applyFilter}
      >
        Apply Filter
      </button>
      {/* <button className={styles.filterButton} onClick={removeFilter}>
        Remove Filter
      </button> */}
    </div>
  );
};

export default FilterBox;

/*
      <div className={styles.filter}>
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
      </div>

      <div className={styles.filter}>
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
        </select> */
//     <input
//       className={styles.maxYear}
//       type="number"
//       placeholder="Max Age"
//       name="maxAge"
//       value={filterData.maxBirthYear}
//       onChange={handleFilterChange}
//     />
//   </div>
// </div>

// <div className={styles.filter}>
//   <span className={styles.filterType}>Marital Status</span>
//   <select
//     className={styles.filterDrop}
//     name="maritalStatus"
//     value={filterData.maritalStatus}
//     onChange={handleFilterChange}
//   >
//     {maritalStatus.map((val, idx) => (
//       <option key={idx} value={val}>
//         {val}
//       </option>
//     ))}
//   </select>
// </div>

// <div className={styles.filter}>
//   <button
//     className={`${styles.filterButton} ${isFilter ? styles.blue : ""}`}
//     onClick={applyFilter}
//   >
//     Apply Filter
//   </button>
//   <button className={styles.filterButton} onClick={removeFilter}>
//     Remove Filter
//   </button>
// </div>

{
  /* <select
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
        </select> */
}
