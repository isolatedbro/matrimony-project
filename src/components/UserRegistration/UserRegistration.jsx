import { useState } from "react";
import styles from "./UserRegistration.module.css";

const UserRegistration = () => {
  const [page, setPage] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    setPage((prev) => (prev < 7 ? prev + 1 : prev));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
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
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Last Name"
            />
            <select className={styles.select}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              className={styles.input}
              type="date"
              data-placeholder="Date of Birth"
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.stepFields}>
            <input className={styles.input} type="email" placeholder="Email" />
            <input
              className={styles.input}
              type="number"
              placeholder="Phone Number"
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.stepFields}>
            <input className={styles.input} type="text" placeholder="Address" />
            <select className={styles.select}>
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
            <select className={styles.select}>
              <option value="">Select State</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamilnadu">Tamil Nadu</option>
            </select>
            <select className={styles.select}>
              <option value="">Select City</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
            </select>
            <input className={styles.input} type="text" placeholder="Pincode" />
            
          </div>
        );
      case 4:
        return (
          <div className={styles.stepFields}>
            <select className={styles.select}>
              <option value="">Select Religion</option>
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="christian">Christian</option>
            </select>
            <select className={styles.select}>
              <option value="">Select Caste</option>
              <option value="brahmin">Brahmin</option>
              <option value="kshatriya">Kshatriya</option>
              <option value="vaishya">Vaishya</option>
            </select>
            <select className={styles.select}>
              <option value="">Select Mother Tongue</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
        );
      case 5:
        return (
          <div className={styles.stepFields}>
            <select className={styles.select}>
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        );
      case 6:
        return (
          <div className={styles.stepFields}>
            <select className={styles.select}>
              <option value="">Select Education</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
            <select className={styles.select}>
              <option value="">Select Occupation</option>
              <option value="engineer">Engineer</option>
              <option value="doctor">Doctor</option>
              <option value="teacher">Teacher</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Annual Income"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Company Name"
            />
          </div>
        );
      case 7:
      default:
        return (
          <div className={styles.stepFields}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
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

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.stepPanel} key={page}>
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

            {page !== 7 ? (
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
