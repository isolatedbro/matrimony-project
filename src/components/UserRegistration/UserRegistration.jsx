import { useState } from "react";
import styles from "./UserRegistration.module.css";
import { useOutletContext } from "react-router";

const UserRegistration = () => {
  const {API_URL} = useOutletContext();
  const [page, setPage] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    setPage((prev) => (prev < 7 ? prev + 1 : prev));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [errors, setErrors] = useState([]);

  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(registrationData);
   
    const res = await fetch(`${API_URL}/auth/new-registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    const x = await res.json();

    if (x.error) {
      setErrors([...x.error]);
    } else {
      localStorage.setItem('token',x.token);
      window.location.href = "/update-profile";
    }
  };

 

  const renderStep = () => {
    switch (page) {
      case 1:
        return (
          <div className={styles.stepFields}>
            <input
              className={styles.input}
              type="text"
              placeholder="First Name"
              value={registrationData.firstName}
              onChange={handleChange}
              name="firstName"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Last Name"
              value={registrationData.lastName}
              onChange={handleChange}
              name="lastName"
            />
            <select
              className={styles.select}
              value={registrationData.gender}
              onChange={handleChange}
              name="gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              className={styles.input}
              type="date"
              value={registrationData.dateOfBirth}
              onChange={handleChange}
              name="dateOfBirth"
              data-placeholder="Date of Birth"
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.stepFields}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={registrationData.email}
              onChange={handleChange}
              name="email"
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Phone Number"
              value={registrationData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
          </div>
        );

      case 3:
      default:
        return (
          <div className={styles.stepFields}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={registrationData.password}
              onChange={handleChange}
              name="password"
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={registrationData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
        );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Matrimony</p>
          <h1>Begin Your Beautiful Journey</h1>
          <p>
            Create a profile that reflects your values, culture, and dreams of a
            lifelong partnership.
          </p>
          <div className={styles.progressWrap}>
            <span className={styles.progressLabel}>Step {page} of 7</span>
            <div className={styles.progressBar}>
              <span
                className={styles.progressFill}
                style={{ width: `${(page / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.stepPanel} key={page}>
            <div className={styles.errorBox}>
              <ul>
                {errors.length !== 0 &&
                  errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
            {renderStep()}
          </div>

          <div className={styles.actions}>
            {page > 1 && (
              <button
                className={styles.backButton}
                type="button"
                onClick={handlePrev}
              >
                <span className={styles.arrow} aria-hidden="true">
                  ←
                </span>
                Back
              </button>
            )}

            {page !== 3 ? (
              <button
                className={styles.nextButton}
                type="button"
                onClick={handleNext}
              >
                Next
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </button>
            ) : (
              <button className={styles.nextButton} type="submit">
                Register Now
                <span className={styles.arrow} aria-hidden="true">
                  ✓
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;

// const [address, setAddress] = useState("");
// const [country, setCountry] = useState("");
// const [state, setState] = useState("");
// const [city, setCity] = useState("");
// const [pincode, setPincode] = useState("");
// const [religion, setReligion] = useState("");
// const [caste, setCaste] = useState("");
// const [motherTongue, setMotherTongue] = useState("");
// const [maritalStatus, setMaritalStatus] = useState("");
// const [education, setEducation] = useState("");
// const [occupation, setOccupation] = useState("");
// const [annualIncome, setAnnualIncome] = useState("");
// const [companyName, setCompanyName] = useState("");

// case 4:
//   return (
//     <div className={styles.stepFields}>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <select
//         className={styles.select}
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//       >
//         <option value="">Select Country</option>
//         <option value="india">India</option>
//         <option value="usa">USA</option>
//         <option value="uk">UK</option>
//       </select>
//       <select
//         className={styles.select}
//         value={state}
//         onChange={(e) => setState(e.target.value)}
//       >
//         <option value="">Select State</option>
//         <option value="maharashtra">Maharashtra</option>
//         <option value="karnataka">Karnataka</option>
//         <option value="tamilnadu">Tamil Nadu</option>
//       </select>
//       <select
//         className={styles.select}
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       >
//         <option value="">Select City</option>
//         <option value="mumbai">Mumbai</option>
//         <option value="bangalore">Bangalore</option>
//         <option value="chennai">Chennai</option>
//       </select>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Pincode"
//         value={pincode}
//         onChange={(e) => setPincode(e.target.value)}
//       />
//     </div>
//   );
// case 5:
//   return (
//     <div className={styles.stepFields}>
//       <select
//         className={styles.select}
//         value={religion}
//         onChange={(e) => setReligion(e.target.value)}
//       >
//         <option value="">Select Religion</option>
//         <option value="hindu">Hindu</option>
//         <option value="muslim">Muslim</option>
//         <option value="christian">Christian</option>
//       </select>
//       <select
//         className={styles.select}
//         value={caste}
//         onChange={(e) => setCaste(e.target.value)}
//       >
//         <option value="">Select Caste</option>
//         <option value="brahmin">Brahmin</option>
//         <option value="kshatriya">Kshatriya</option>
//         <option value="vaishya">Vaishya</option>
//       </select>
//       <select
//         className={styles.select}
//         value={motherTongue}
//         onChange={(e) => setMotherTongue(e.target.value)}
//       >
//         <option value="">Select Mother Tongue</option>
//         <option value="hindi">Hindi</option>
//         <option value="english">English</option>
//         <option value="tamil">Tamil</option>
//       </select>
//     </div>
//   );
// case 6:
//   return (
//     <div className={styles.stepFields}>
//       <select
//         className={styles.select}
//         value={maritalStatus}
//         onChange={(e) => setMaritalStatus(e.target.value)}
//       >
//         <option value="">Select Marital Status</option>
//         <option value="single">Single</option>
//         <option value="married">Married</option>
//         <option value="divorced">Divorced</option>
//       </select>
//     </div>
//   );
// case 7:
//   return (
//     <div className={styles.stepFields}>
//       <select
//         className={styles.select}
//         value={education}
//         onChange={(e) => setEducation(e.target.value)}
//       >
//         <option value="">Select Education</option>
//         <option value="bachelor">Bachelor's Degree</option>
//         <option value="master">Master's Degree</option>
//         <option value="phd">PhD</option>
//       </select>
//       <select
//         className={styles.select}
//         value={occupation}
//         onChange={(e) => setOccupation(e.target.value)}
//       >
//         <option value="">Select Occupation</option>
//         <option value="engineer">Engineer</option>
//         <option value="doctor">Doctor</option>
//         <option value="teacher">Teacher</option>
//       </select>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Annual Income"
//         value={annualIncome}
//         onChange={(e) => setAnnualIncome(e.target.value)}
//       />
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Company Name"
//         value={companyName}
//         onChange={(e) => setCompanyName(e.target.value)}
//       />
//     </div>
//   );
