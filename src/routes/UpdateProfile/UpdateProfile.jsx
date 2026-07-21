import { useEffect, useState } from "react";
import styles from "./UpdateProfile.module.css";
import { City, Country, State } from "country-state-city";
import { useOutletContext } from "react-router";
const IMAGE_URL = import.meta.env.IMAGE_URL;

const UpdateProfile = () => {
  const { users, userInfo,API_URL } = useOutletContext();
  const { token } = useOutletContext();
  const [page, setPage] = useState(1);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [existingProfilePic, setExistingProfilePic] = useState([]);
  const [newProfilePic, setNewProfilePic] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
  const [profileData, setProfileData] = useState({});
  // const [state,setStateCode] = useState("");
  // const user = users.find((user) => user._id === userInfo);

  // if (user) {
  //   // setCountryCode(user.countryCode);
  //   // console.log("Use found", user);
  //   if (user?.countryCode) {
  //     const states = State.getStatesOfCountry(user.countryCode);
  //     setStateList([...states]);
  //   }
  //   if (user?.stateCode) {
  //     const cities = City.getCitiesOfState(user.countryCode, user.stateCode);

  //     setCityList([...cities]);
  //   }
  // }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      // console.log(data);
      
      setCountryCode(data?.countryCode);
      setStateCode(data?.stateCode);
      const states = State.getStatesOfCountry(data?.countryCode);
      const cities = City.getCitiesOfState(data?.countryCode, data?.stateCode);
      setStateList([...states]);
      setCityList([...cities]);
      setExistingProfilePic(data?.profilePic);
      setExistingGallery(data?.gallery);
      delete data?.profilePic;
      delete data?.gallery;
      setProfileData(data);
    };

    fetchUser();

    // for (const key in user) {
    //   if (key === "gallery" || key === "profilePic") {
    //     localStorage.setItem([key], JSON.stringify(user[key]));
    //   } else {
    //     localStorage.setItem([key], user[key]);
    //   }
    // }
  }, []);

  // console.log(profileData);

  // const [profileData, setProfileData] = useState({
  //   religion: localStorage.getItem("religion") || "",
  //   caste: localStorage.getItem("caste") || "",
  //   motherTongue: localStorage.getItem("motherTongue") || "",
  //   maritalStatus: localStorage.getItem("maritalStatus") || "",
  //   height: localStorage.getItem("height") || "",
  //   manglikStatus: localStorage.getItem("manglikStatus") || "",
  //   qualification: localStorage.getItem("qualification") || "",
  //   occupation: localStorage.getItem("occupation") || "",
  //   annualIncome: localStorage.getItem("annualIncome") || "",
  //   companyName: localStorage.getItem("companyName") || "",
  //   fathersStatus: localStorage.getItem("fathersStatus") || "",
  //   fathersOccupation:
  //     localStorage.getItem("fathersOccupation") || "",
  //   mothersStatus: localStorage.getItem("mothersStatus") || "",
  //   mothersOccupation:
  //     localStorage.getItem("mothersOccupation") || "",
  //   country: localStorage.getItem("country") || "",
  //   countryCode: localStorage.getItem("countryCode") || "",
  //   state: localStorage.getItem("state") || "",
  //   stateCode: localStorage.getItem("stateCode") || "",
  //   city: localStorage.getItem("city") || "",
  //   profilePic: localStorage.getItem("profilePic") || "",
  //   gallery: localStorage.getItem("gallery") || "",
  // });

  const countriesArray = [
    { country: "", code: "" },
    { country: "India", code: "IN" },
    { country: "United States", code: "US" },
    { country: "United Arab Emirates", code: "AE" },
    { country: "Malaysia", code: "MY" },
    { country: "Saudi Arabia", code: "SA" },
    { country: "Myanmar", code: "MM" },
    { country: "United Kingdom", code: "GB" },
    { country: "South Africa", code: "ZA" },
    { country: "Canada", code: "CA" },
    { country: "Sri Lanka", code: "LK" },
    { country: "Kuwait", code: "KW" },
    { country: "Oman", code: "OM" },
    { country: "Singapore", code: "SG" },
    { country: "Qatar", code: "QA" },
    { country: "Nepal", code: "NP" },
    { country: "Australia", code: "AU" },
    { country: "Mauritius", code: "MU" },
    { country: "Trinidad and Tobago", code: "TT" },
    { country: "Fiji", code: "FJ" },
    { country: "New Zealand", code: "NZ" },
    { country: "Bahrain", code: "BH" },
  ];

  const religionArray = [
    "",
    "Hindu",
    "Muslim",
    "Chirstian",
    "Sikh",
    "Jain",
    "Buddhist",
    "Parsi",
    "Jewish",
    "Bahai",
    "Non Religious",
  ];

  const casteArray = [
    "",
    "Agarwal",
    "Arora",
    "Baidya",
    "Bania",
    "Bengali",
    "Bhandari",
    "Bhatia",
    "Brahmin",
    "Bhumihar",
    "Bishnoi",
    "Chambhar",
    "Chamar",
    "Chettiar",
    "Christian",
    "CKP",
    "Devanga",
    "Dhobi",
    "Ezhava",
    "Gounder",
    "Gowda",
    "Gujjar",
    "Jain",
    "Jat",
    "Jatav",
    "Kamma",
    "Kapu",
    "Kasar",
    "Khandelwal",
    "Khatri",
    "Koeri",
    "Koli",
    "Konkani",
    "Kori",
    "Kurmi",
    "Kuruba",
    "Kushwaha",
    "Leva Patil",
    "Lingayat",
    "Lohar",
    "Lohana",
    "Madiga",
    "Mahar",
    "Maheshwari",
    "Mali",
    "Mallah",
    "Maratha",
    "Marwari",
    "Meena",
    "Mehra",
    "Mochi",
    "Mudiraj",
    "Mukkulathor",
    "Mudiraj",
    "Munda",
    "Muslim",
    "Nadar",
    "Nair",
    "Naidu",
    "Namasudra",
    "Napit",
    "Nayak",
    "OBC",
    "Oraon",
    "Padmashali",
    "Patel",
    "Patidar",
    "Pillai",
    "Prajapati",
    "Rajbhar",
    "Rajput",
    "Ravidasia",
    "Reddy",
    "Sahu",
    "Santhal",
    "Saraswat Brahmin",
    "Scheduled Caste",
    "Scheduled Tribe",
    "Sharma",
    "Sindhi",
    "Sonar",
    "Sunni",
    "Syed",
    "Tanti",
    "Teli",
    "Thakur",
    "Thevar",
    "Tyagi",
    "Vaish",
    "Vaishnav",
    "Valmiki",
    "Vanniyar",
    "Veerashaiva",
    "Velama",
    "Vishwakarma",
    "Vokkaliga",
    "Yadav",
  ];

  const motherTongueArray = [
    "",
    "Assamese",
    "Awadhi",
    "Bengali",
    "Bhojpuri",
    "Bodo",
    "Chhattisgarhi",
    "Dogri",
    "English",
    "Garhwali",
    "Gujarati",
    "Haryanvi",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Kumaoni",
    "Kurukh",
    "Magahi",
    "Maithili",
    "Malayalam",
    "Marathi",
    "Marwari",
    "Mizo",
    "Nepali",
    "Odia",
    "Punjabi",
    "Rajasthani",
    "Sambalpuri",
    "Santhali",
    "Sindhi",
    "Tamil",
    "Telugu",
    "Tulu",
    "Urdu",
  ];

  const maritalStatusArray = [
    "",
    "Never Married",
    "Awaitaing Divorce",
    "Divorced",
    "Widowed",
    "Annulled",
  ];

  const qualificationArray = [
    "",
    "Doctorate",
    "Post Graduate/Naster's",
    "Graduate/Bachelors",
    "Diploma/Certifications",
    "Class XII",
    "Class X or below",
  ];

  const occupationArray = [
    "",
    "Accountant",
    "Actor",
    "Administration Professional",
    "Advertising Professional",
    "Air Hostess / Flight Attendant",
    "Architect",
    "Army Personnel",
    "Artist",
    "Auditor",
    "Banking Professional",
    "Beautician",
    "Biotechnologist",
    "Business Analyst",
    "Business Owner",
    "CA / Chartered Accountant",
    "Cashier",
    "Chef",
    "Civil Engineer",
    "Clerk",
    "Company Secretary",
    "Computer Operator",
    "Consultant",
    "Content Writer",
    "Contractor",
    "Customer Support Professional",
    "Data Analyst",
    "Data Scientist",
    "Dentist",
    "Designer",
    "Doctor",
    "Driver",
    "Electrical Engineer",
    "Electronics Engineer",
    "Entrepreneur",
    "Event Manager",
    "Executive",
    "Farmer",
    "Fashion Designer",
    "Finance Professional",
    "Government Employee",
    "Graphic Designer",
    "Hardware Engineer",
    "Hotel & Hospitality Professional",
    "HR Professional",
    "Interior Designer",
    "Insurance Professional",
    "Journalist",
    "Judge",
    "Lawyer",
    "Lecturer",
    "Legal Professional",
    "Machine Operator",
    "Management Professional",
    "Marketing Professional",
    "Mechanical Engineer",
    "Merchant Navy",
    "Military Personnel",
    "Model",
    "Navy Personnel",
    "Nurse",
    "Operations Professional",
    "Pharmacist",
    "Photographer",
    "Physician",
    "Pilot",
    "Police Officer",
    "Politician",
    "Professor",
    "Project Manager",
    "Psychologist",
    "Public Relations Professional",
    "Quality Assurance Engineer",
    "Railway Employee",
    "Receptionist",
    "Research Scholar",
    "Research Scientist",
    "Retired",
    "Sales Professional",
    "Scientist",
    "Self Employed",
    "Shop Owner",
    "Social Worker",
    "Software Developer",
    "Software Engineer",
    "Sports Person",
    "Student",
    "Teacher",
    "Technician",
    "Textile Professional",
    "Trader",
    "UI/UX Designer",
    "Unemployed",
    "Veterinarian",
    "Video Editor",
    "Web Designer",
    "Web Developer",
    "Writer",
    "Other",
  ];

  const incomeBracket = [
    "",
    "0 to 10 Lakhs",
    "10 Lakhs to 30 Lakhs",
    "30 Lakhs to 60 Lakhs",
    "60 Lakhs to 1 Crore",
    "1 Crore+",
  ];

  const manglikArray = [
    ``,
    `I'm Manglik`,
    `I'm not Manglik`,
    `I'm Angshik (partial Manglk)`,
    `Don't know`,
  ];

  const fathersOcupationArray = [
    "",
    "Bussiness/Entrepreneur",
    "Private Employee",
    "Govt/PSU Employee",
    "Armed Forces",
    "Civil Servant",
    "Teacher",
    "Home Maker",
    "Others",
  ];
  const mothersOcupationArray = [
    "",
    "Bussiness/Entrepreneur",
    "Private Employee",
    "Govt/PSU Employee",
    "Armed Forces",
    "Civil Servant",
    "Teacher",
    "Home Maker",
    "Others",
  ];

  const fathersProfessionalStatusArray = [
    ``,
    "Currently Working",
    "Retired",
    "Passed Away",
  ];
  const mothersStatusArray = [
    ``,
    "Currently Working",
    "Retired",
    "Passed Away",
  ];

  const heightArray = [
    "",
    "4 ft. 0 inch",
    "4 ft. 1 inch",
    "4 ft. 2 inch",
    "4 ft. 3 inch",
    "4 ft. 4 inch",
    "4 ft. 5 inch",
    "4 ft. 6 inch",
    "4 ft. 7 inch",
    "4 ft. 8 inch",
    "4 ft. 9 inch",
    "4 ft. 10 inch",
    "4 ft. 11 inch",
    "4 ft. 12 inch",
    "5 ft. 0 inch",
    "5 ft. 1 inch",
    "5 ft. 2 inch",
    "5 ft. 3 inch",
    "5 ft. 4 inch",
    "5 ft. 5 inch",
    "5 ft. 6 inch",
    "5 ft. 7 inch",
    "5 ft. 8 inch",
    "5 ft. 9 inch",
    "5 ft. 10 inch",
    "5 ft. 11 inch",
    "6 ft. 0 inch",
    "6 ft. 1 inch",
    "6 ft. 2 inch",
    "6 ft. 3 inch",
    "6 ft. 4 inch",
    "6 ft. 5 inch",
    "6 ft. 6 inch",
    "6 ft. 7 inch",
    "6 ft. 8 inch",
    "6 ft. 9 inch",
    "6 ft. 10 inch",
    "6 ft. 11 inch",
    "6 ft. 12 inch",
    "7 ft. 0 inch",
    "7 ft and more",
  ];
  //   const createHieghtAray = () => {
  //     let lastFt = 0;
  //     let lastInch = 0;
  //     for (let i = 122; i <= 220; i++) {
  //       const arr = height(i);
  //       lastFt = arr[0];
  //       lastInch = arr[1];

  //       if (i !== 122) {
  //         const str = `${arr[0]} ft. ${arr[1]} inch`;
  //         heightArray.push(str);
  //       } else if (i > 122) {
  //         const arr = height(i);
  //         if (lastFt === arr[0]) {
  //           if (lastInch === arr[1]) continue;
  //           else {
  //             const str = `${arr[0]} ft. ${arr[1]} inch`;
  //             heightArray.push(str);
  //           }
  //         } else if (lastFt !== arr[0]) {
  //           const str = `${arr[0]} ft. ${arr[1]} inch`;
  //           heightArray.push(str);
  //         }
  //       }
  //     }
  //   };

  const handleNext = (e) => {
    e.preventDefault();
    setPage((prev) => (prev < 8 ? prev + 1 : prev));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleCountryChange = (e) => {
    // console.log("hello",e.target.value)
    const { name, value } = e.target;
    const option = e.target.selectedOptions[0];
    setCountryCode(option.dataset.code);
    const states = State.getStatesOfCountry(option.dataset.code);
    setStateList([...states]);
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
      countryCode: option.dataset.code,
      state: "",
      stateCode: "",
      city: "",
    }));

    // localStorage.setItem(name, value);
    // localStorage.setItem("countryCode", option.dataset.code);
    // localStorage.setItem("state", "");
    // localStorage.setItem("stateCode", "");
    // localStorage.setItem("city", "");

    // else {
    //   formData.append(`${name}`, value);
    // }
    // if (value === "") {
    //   setProfileData((prevData) => ({
    //     ...prevData,
    //     state: "",
    //     city: "",
    //   }));
    // }
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    const option = e.target.selectedOptions[0];
    // setStateCode(option.dataset.code);
    // console.log(countryCode,option.dataset.code,countryCode);
    const cities = City.getCitiesOfState(countryCode, option.dataset.code);
    setCityList([...cities]);
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
      stateCode: option.dataset.code,
      city: "",
    }));

    // localStorage.setItem(name, value);
    // localStorage.setItem("stateCode", option.dataset.code);
    // localStorage.setItem("city", "");

    // else{
    //   formData.append(`${name}`, value);
    // }
    // if (value === "") {
    //   setProfileData((prevData) => ({
    //     ...prevData,
    //     city: "",
    //   }));
    // }
  };

  //   console.log(fathersStatus, mothersStatus);
  //   console.log("Just Testing",Country.getCountryByCode(""))
  // console.log("Nation",nation)

  const [galleryPreview, setGalleryPreview] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.files) {
      // setProfilePic(e.target.files[0]);
      if (name === "profilePic") {
        console.log(e.target.files[0]);
        // setProfileData((prevData) => ({
        //   ...prevData,
        //   [name]: e.target.files[0],
        // }));
        setNewProfilePic(e.target.files[0]);
        setExistingProfilePic([]);
        // localStorage.setItem(name, JSON.stringify(e.target.files[0]));
      } else {
        // console.log(Array.from(e.target.files));
        // setProfileData((prevData) => ({
        //   ...prevData,
        //   [name]: [...e.target.files],
        // }));
        setNewGallery((prev) => [...prev, ...e.target.files]);
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => ({
          preview: URL.createObjectURL(file),
        }));
        setGalleryPreview((prev) => [...prev, ...imageUrls]);
        // localStorage.setItem(name, JSON.stringify(e.target.files));
      }
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // localStorage.setItem(name, value);
    }
  };
  // console.log(newProfilePic);

  const handleUpdate = async (e) => {
    const formData = new FormData();
    //  formData.append("profilePic", profilePic);

    for (const key in profileData) {
      formData.append([key], profileData[key]);

      // if (key === "gallery") {
      //   console.log(profileData.gallery);
      //   newGallery.forEach((element) => {
      //     formData.append([key], element);
      //   });
      // } else if (key === "profilePic") {
      //   formData.append([key], newProfilePic);
      // } else {
      //   formData.append([key], profileData[key]);
      // }
    }

    formData.append("profilePic", newProfilePic);
      newGallery.forEach((element) => {
        formData.append("gallery", element);
      });

    // const keepKeys = ["token"];
    // Object.keys(localStorage).forEach((key) => {
    //   if (!keepKeys.includes(key)) {
    //     localStorage.removeItem(key);
    //   }
    // });
    // const token = localStorage.getItem("token");
    // localStorage.clear();
    // localStorage.setItem("token", token);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, ":", value);
    // }
    // const uploadProflePic = await fetch(
    //   "http://localhost:3000/upload/profile-picture",
    //   {
    //     method: "POST",
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //     body: formData,
    //   },
    // );

    const updatedUserProfile = await fetch(
      `${API_URL}/users/update`,
      {
        method: "POST",
        headers: {
          // "Content-Type" : "application/json",
          authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const response = await updatedUserProfile.json();
    if (!response.error) {
      window.location.href = "/";
    }
    // console.log(await response.json());
  };

  const removeGalleryImage = async (e,file) => {
    console.log(file);
    if(file.name){
      const newItem = newGallery.filter(item => item.name !== file.name)
      setNewGallery(newItem);
    }else{
      const deleteImage = await fetch(
        `${API_URL}/users/delete/gallery`,
        {
          method: "PUT",
          headers: {
            "Content-Type" : "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(file),
        },
      );

      const res = await deleteImage.json();
      if(!res?.error){
        setExistingGallery(prev=> prev.filter(image=> image.filename !== file.filename));
      }
    }
  }

  // console.log(profileData);

  const render = () => {
    switch (page) {
      case 1:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>What is your Religion?</p>
            <select
              className={styles.select}
              value={profileData?.religion}
              defaultValue={localStorage.getItem("religion")}
              onChange={handleChange}
              name="religion"
            >
              {religionArray.map((religion, index) => (
                <option key={index} value={religion}>
                  {religion}
                </option>
              ))}
            </select>

            <p className={styles.question}>Which Caste do you belong?</p>
            <select
              className={styles.select}
              value={profileData.caste}
              onChange={handleChange}
              name="caste"
            >
              {casteArray.map((caste, index) => (
                <option key={index} value={caste}>
                  {caste}
                </option>
              ))}
            </select>
            <p className={styles.question}>
              Which language do you speak at home?
            </p>
            <select
              className={styles.select}
              value={profileData.motherTongue}
              onChange={handleChange}
              name="motherTongue"
            >
              {motherTongueArray.map((motherTongue, index) => (
                <option key={index} value={motherTongue}>
                  {motherTongue}
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>What is your marital status?</p>
            <select
              className={styles.select}
              value={profileData.maritalStatus}
              onChange={handleChange}
              name="maritalStatus"
            >
              {maritalStatusArray.map((maritalStatus, index) => (
                <option key={index} value={maritalStatus}>
                  {maritalStatus}
                </option>
              ))}
            </select>
            <p className={styles.question}>How tall are you?</p>
            <select
              className={styles.select}
              value={profileData.height}
              onChange={handleChange}
              name="height"
            >
              {heightArray.map((height, index) => (
                <option key={index} value={height}>
                  {height}
                </option>
              ))}
            </select>

            <p className={styles.question}>What is your manglik status?</p>
            <select
              className={styles.select}
              value={profileData.manglikStatus}
              onChange={handleChange}
              name="manglikStatus"
            >
              {manglikArray.map((manglik, index) => (
                <option key={index} value={manglik}>
                  {manglik}
                </option>
              ))}
            </select>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>In which country do you live?</p>
            <select
              className={styles.select}
              value={profileData.country}
              onChange={handleCountryChange}
              name="country"
            >
              {countriesArray.map((val, index) => (
                <option key={index} data-code={val.code} value={val.country}>
                  {val.country}
                </option>
              ))}
            </select>

            {profileData.country.length !== 0 && (
              <p className={styles.question}>
                Where do you live in {profileData.country}?
              </p>
            )}
            {profileData.country.length !== 0 && (
              <select
                className={styles.select}
                value={profileData.state}
                onChange={handleStateChange}
                name="state"
              >
                <option value=""></option>
                {stateList.map((val, idx) => (
                  <option key={idx} data-code={val.isoCode} value={val.name}>
                    {val.name}
                  </option>
                ))}
              </select>
            )}

            {profileData.state.length !== 0 && (
              <p className={styles.question}>
                In Which city of {profileData.state} {profileData.country} do
                you live?
              </p>
            )}
            {profileData.state.length !== 0 && (
              <select
                className={styles.select}
                value={profileData.city}
                onChange={handleChange}
                name="city"
              >
                <option value=""></option>
                {cityList.map((val, idx) => (
                  <option key={idx} value={val.name}>
                    {val.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        );

      case 4:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>
              What is your highest qualification?
            </p>
            <select
              className={styles.select}
              value={profileData.qualification}
              onChange={handleChange}
              name="qualification"
            >
              {qualificationArray.map((qualification, index) => (
                <option key={index} value={qualification}>
                  {qualification}
                </option>
              ))}
            </select>

            <p className={styles.question}>What is your occupation?</p>
            <select
              className={styles.select}
              value={profileData.occupation}
              onChange={handleChange}
              name="occupation"
            >
              {occupationArray.map((val, idx) => (
                <option key={idx} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <p className={styles.question}>What is your annual income?</p>
            <select
              className={styles.select}
              value={profileData.annualIncome}
              onChange={handleChange}
              name="annualIncome"
            >
              {incomeBracket.map((income, index) => (
                <option key={index} value={income}>
                  {income}
                </option>
              ))}
            </select>
            <p className={styles.question}>
              In Which company/organisation do you work?
            </p>
            <input
              className={styles.input}
              type="text"
              placeholder="Company Name"
              value={profileData.companyName}
              onChange={handleChange}
              name="companyName"
            />
          </div>
        );

      case 5:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>
              What is the status of your father?
            </p>
            <select
              className={styles.select}
              value={profileData.fathersStatus}
              onChange={handleChange}
              name="fathersStatus"
            >
              {fathersProfessionalStatusArray.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {profileData.fathersStatus?.length !== 0 &&
              profileData.fathersStatus !== "Retired" &&
              profileData.fathersStatus !== "Passed Away" &&
              profileData.fathersStatus !== `Select Father's status` && (
                <p className={styles.question}>
                  What is your father's occupation?
                </p>
              )}

            {profileData.fathersStatus.length !== 0 &&
              profileData.fathersStatus !== "Retired" &&
              profileData.fathersStatus !== "Passed Away" &&
              profileData.fathersStatus !== `Select Father's status` && (
                <select
                  className={styles.select}
                  value={profileData.fathersOccupation}
                  onChange={handleChange}
                  name="fathersOccupation"
                >
                  {fathersOcupationArray.map((occupation, index) => (
                    <option key={index} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              )}
          </div>
        );

      case 6:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>
              What is the status of your mother?
            </p>
            <select
              className={styles.select}
              value={profileData.mothersStatus}
              onChange={handleChange}
              name="mothersStatus"
            >
              {mothersStatusArray.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {profileData.mothersStatus.length !== 0 &&
              profileData.mothersStatus !== "Retired" &&
              profileData.mothersStatus !== "Passed Away" &&
              profileData.mothersStatus !== `Select Mother's status` && (
                <p className={styles.question}>
                  What is the status of your mother?
                </p>
              )}
            {profileData.mothersStatus.length !== 0 &&
              profileData.mothersStatus !== "Retired" &&
              profileData.mothersStatus !== "Passed Away" &&
              profileData.mothersStatus !== `Select Mother's status` && (
                <select
                  className={styles.select}
                  value={profileData.mothersOccupation}
                  onChange={handleChange}
                  name="mothersOccupation"
                >
                  {mothersOcupationArray.map((occupation, index) => (
                    <option key={index} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              )}
          </div>
        );

      case 7:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>
              Want to upload your profile picture?
            </p>
            <input
              className={styles.select}
              key="profile"
              type="file"
              accept="image/*"
              name="profilePic"
              onChange={handleChange}
            />
            {existingProfilePic && (
              <img
                key="prifilePicPreview"
                // src={URL.createObjectURL(profileData.profilePic) || ""}
                src={
                  existingProfilePic.length > 0
                    ? `${IMAGE_URL}/uploads/${userInfo}/profilePic/${existingProfilePic[0].filename}`
                    : URL.createObjectURL(newProfilePic)
                }
                alt="Preview"
                width={400}
              />
            )}
          </div>
        );

      case 8:
        return (
          <div className={styles.stepFields}>
            <p className={styles.question}>
              Want to upload some more picture of you?
            </p>
            <input
              className={styles.select}
              key="gallery"
              type="file"
              accept="image/*"
              multiple
              name="gallery"
              onChange={handleChange}
            />

            <div className={styles.preview}>
              {existingGallery?.map((file, index) => (
                <div key={index} className={styles.previewImage}>
                  <img
                    key={index}
                    // src={URL.createObjectURL(file) || ""}
                    src={`${IMAGE_URL}/uploads/${userInfo}/gallery/${file.filename}`}
                    alt={`Preview ${index}`}
                    width={150}
                  />
                  <button
                    className={styles.delete}
                    onClick={(e) => removeGalleryImage(e, file)}
                  >
                    X
                  </button>
                </div>
              ))}

              {newGallery?.map((file, index) => (
                <div className={styles.previewImage}>
                  <img
                    className={styles.select}
                    key={index}
                    src={URL.createObjectURL(file)}
                    // src={file.preview}
                    // src={`http://localhost:3000/uploads/${userInfo}/gallery/${file.filename}`}
                    alt={`Preview ${index}`}
                    width={150}
                  />
                  <button
                    className={styles.delete}
                    onClick={(e) => removeGalleryImage(e, file)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };
  return (
    <div className={styles.stepPanel}>
      {render()}
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

        {page !== 8 ? (
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
          <button
            className={styles.nextButton}
            type="button"
            onClick={handleUpdate}
          >
            Update
            <span className={styles.arrow} aria-hidden="true">
              ✓
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
