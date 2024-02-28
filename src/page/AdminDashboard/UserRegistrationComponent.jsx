import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "../../component/AdminDashboard/TopNav.jsx";
import "../../style/adminDashboard/registrationform.css";
import OtpInput from "react-otp-input";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
import "react-phone-number-input/style.css"; // Import the styles
import PhoneInput from "react-phone-number-input"; // Import the PhoneInput component
import { RotatingLines } from "react-loader-spinner";

import { auth } from "../../config/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { CountrySelectDropdown } from "react-phone-number-input";
import { getCountries } from "react-phone-number-input";
import { countryOptions } from "../AdminDashboard/Countrycode.jsx";

function UserRegistrationComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let product_unique_id = "";
  let influencer_uuid = "";
  let organiser_uuid = "";
  let link_uuid = "";

  let product_unique_ids = searchParams.get("product_id");
  let influencer_uuids = searchParams.get("influ_1");
  let organiser_uuids = searchParams.get("org_2");
  let link_uuids = searchParams.get("li");

  // Conditionally get values from localStorage with default values
  let product_id = localStorage.getItem("product_id") || "";
  let influ_1 = localStorage.getItem("influ_1") || "";
  let org_2 = localStorage.getItem("org_2") || "";
  let li = localStorage.getItem("li") || "";

  // console.log("influ_1 :", influ_1);
  // console.log("org_2 : ", org_2);
  // console.log("li :", influ_1);
  // console.log("product_id :", influ_1);
  // console.log("pppppppppppppppppppppppppppppppppppppppppppppppppp");
  // console.log("influencer_uuids :", influencer_uuids);
  // console.log("organiser_uuids : ", organiser_uuids);
  // console.log("link_uuids :", link_uuids);
  // console.log("product_unique_ids :", product_unique_ids);

  //
  if (product_unique_ids !== product_id) {
    product_unique_id = searchParams.get("product_id");
    influencer_uuid = searchParams.get("influ_1");
    organiser_uuid = searchParams.get("org_2");
    link_uuid = searchParams.get("li");

    localStorage.setItem("product_id", product_unique_ids);
    localStorage.setItem("influ_1", influencer_uuids);
    localStorage.setItem("org_2", organiser_uuids);
    localStorage.setItem("li", link_uuids);
  } else if (influencer_uuids !== "None" || organiser_uuids !== "None") {
    product_unique_id = searchParams.get("product_id");
    influencer_uuid = searchParams.get("influ_1");
    organiser_uuid = searchParams.get("org_2");
    link_uuid = searchParams.get("li");

    localStorage.setItem("product_id", product_unique_ids);
    localStorage.setItem("influ_1", influencer_uuids);
    localStorage.setItem("org_2", organiser_uuids);
    localStorage.setItem("li", link_uuids);
  } else if (
    product_unique_ids == product_id &&
    (influ_1 !== "None" || org_2 !== "None")
  ) {
    console.log("influncer or organiser id not none ");

    product_unique_id = localStorage.getItem("product_id");
    influencer_uuid = localStorage.getItem("influ_1");
    organiser_uuid = localStorage.getItem("org_2");
    link_uuid = localStorage.getItem("li");

    // product_unique_id = searchParams.get('product_id');
    // influencer_uuid = searchParams.get('influ_1');
    // organiser_uuid = searchParams.get('org_2');
    // link_uuid = searchParams.get('li');
  } else {
    // console.log("PRODUCT IS different ");
    // console.log(product_unique_ids, product_id);

    product_unique_id = searchParams.get("product_id");
    influencer_uuid = searchParams.get("influ_1");
    organiser_uuid = searchParams.get("org_2");
    link_uuid = searchParams.get("li");

    localStorage.setItem("product_id", product_unique_ids);
    localStorage.setItem("influ_1", influencer_uuids);
    localStorage.setItem("org_2", organiser_uuids);
    localStorage.setItem("li", link_uuids);
  }
  const defaultCountryCode = "+91"; // Change this to the desired country code
  const defaultSelectedOption = countryOptions.find(
    (country) => country.value === defaultCountryCode
  );

  // const defaultSelectedOption = countryOptions.find(country => country.name === 'India');

  const [stateResponse, setStateResponse] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [localBodyOptions, setLocalBodyOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [clickstate, setClickstate] = useState("0");
  const [selectedState, setSelectedState] = useState("KERALA");
  const [showEmailField, setShowEmailField] = useState(true);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [userId, setUserId] = useState(0);
  const [registereduserdata, setRegistereduserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
  const [isphone, setIsphone] = useState(false);
  const [sendotp, setSendotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [resendTimer, setResendTimer] = useState(40);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    defaultSelectedOption || selectedCountry
  );

  const mergeCuntryCodeWithPhonenumber = async () => {
    let phonenumber = registrationData.phone;
    let value = "";
    // if (!phonenumber.startsWith("+")) {
    if (selectedCountry) {
      // console.log(selectedCountry);

      value = selectedCountry.value;
      // console.log("countryCode ..........", value);
      let mergedPhoneNumber = `${value}${phonenumber}`;
      // console.log("mergedPhoneNumber", mergedPhoneNumber);
      setPhoneNumberOTP(mergedPhoneNumber);
    } else {
      toast.error("Plese select country code ");
    }
  };

  const setPhoneNumberOTP = async (mergedPhoneNumber) => {
    try {
      // setLoading(true)
      setIscaptchaVerified(true);
      const response = await axiosInstance.post(
        "userapp/user/register/phonenumber/already/exists/check",
        {
          phone: mergedPhoneNumber,
          email : registrationData.email
        }
      );
      // let phonenumber = registrationData.phone;
      // if (!phonenumber.startsWith("+")) {
      //   // If not, concatenate +91 with the number
      //   phonenumber = `+91${phonenumber}`;
      // }

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      });
      // console.log("recaptchaVerifier", recaptcha);
      const confirmation = await signInWithPhoneNumber(
        auth,
        mergedPhoneNumber,
        recaptcha
      );
      setSendotp(true);
      setIscaptchaVerified(false);
      // console.log("confirmation", confirmation);

      setEnteredOtp(confirmation); // Assuming you have a state variable named enteredOtp
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/invalid-phone-number") {
        // console.log("Invalid phone number format.. Please check your number.");
        setIscaptchaVerified(false);
        toast.error("Invalid phone number format");
        setLoading(false);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "Phone number already exists..Try another one"
      ) {
        setIscaptchaVerified(false);
        toast.error("This phone number already exists..Try another one");
       } else if (
          error.response &&
          error.response.data &&
          error.response.data.message ===
            "This email already exists .Try another one"
        ) {
          setIscaptchaVerified(false);
          toast.error("This email already exists .Try another one");
      } else if (error.code === "auth/too-many-requests") {
        setIscaptchaVerified(false);

        toast.error("Too many requests. Please try after sometime.");
      } else {
        setIscaptchaVerified(false);
        // console.log('oooopp',error);
        toast.error("Something when wrong..Please try again");
      }
      setLoading(false);
      // console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await enteredOtp.confirm(otp);
      const user = data.user;
      if (user.phoneNumber) {
        // console.log("Phone number is verified:", user.phoneNumber);
      } else {
        // console.log("Phone number is not verified.");
        navigate("/user");
      }
    } catch (error) {
      if (error.code === "auth/code-expired") {
        // console.log("OTP Expired.");
        // Handle accordingly
      } else {
        // console.log("Error:", error);
      }
      // console.log("errornnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", error);
    }
  };

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address_line_1: "",
    address_line_2: "",
    land_mark: "",
    state: selectedState,
    district: "",
    sub_district: "",
    local_body: "",
    village: "",
  });

  const fetchDataForState = async (state) => {
    try {
      const clickrefresh = await axiosInstance.patch(
        `userapp/user/link/clicked/${product_unique_id}/${link_uuid}`
      );
      setClickstate(clickrefresh.data.message);

      const response = await axiosInstance.get(`userapp/state/${state}`);

      setStateResponse(response.data);

      // Extract unique districts from the response
      const uniqueDistricts = Array.from(
        new Set(response.data.map((entry) => entry.district))
      );
      setDistrictOptions(uniqueDistricts);

      // Extract sub-districts based on the selected district
      const subDistricts = fetchDataForDistrict(uniqueDistricts[0]); // Assuming the first district as default
      setSubDistrictOptions(subDistricts);

      // Extract local bodies and villages based on the selected district
      const districtData = response.data.filter(
        (entry) => entry.district === uniqueDistricts[0]
      ); // Assuming the first district as default
      const uniqueLocalBodies = Array.from(
        new Set(districtData.map((entry) => entry.local_body))
      );
      setLocalBodyOptions(uniqueLocalBodies);

      const uniqueVillages = Array.from(
        new Set(districtData.map((entry) => entry.village))
      );
      setVillageOptions(uniqueVillages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchDataForState(selectedState);
  }, [selectedState]);

  const handleStateChange = async (selectedOption) => {
    const newState = selectedOption ? selectedOption.label : "";
    setSelectedState(newState);
  };

  const fetchDataForDistrict = (district) => {
    const districtData = stateResponse.filter(
      (entry) => entry.district === district
    );
    const uniqueSubDistricts = Array.from(
      new Set(districtData.map((entry) => entry.sub_district))
    );
    return uniqueSubDistricts;
  };

  const handleDistrictChange = (selectedOption) => {
    formik.setFieldValue(
      "district",
      selectedOption ? selectedOption.label : ""
    );

    const uniqueSubDistricts = fetchDataForDistrict(selectedOption.label);
    setSubDistrictOptions(uniqueSubDistricts);
    formik.setFieldValue("sub_district", "");
    formik.setFieldValue("local_body", "");
    formik.setFieldValue("village", "");
  };

  const handleSubDistrictChange = (selectedOption) => {
    formik.setFieldValue(
      "sub_district",
      selectedOption ? selectedOption.label : ""
    );

    const subdistrictData = stateResponse.filter(
      (entry) => entry.sub_district === selectedOption.label
    );
    const uniqueLocalBodies = Array.from(
      new Set(subdistrictData.map((entry) => entry.local_body))
    );
    setLocalBodyOptions(uniqueLocalBodies);

    const uniqueVillages = Array.from(
      new Set(subdistrictData.map((entry) => entry.village))
    );
    setVillageOptions(uniqueVillages);

    formik.setFieldValue("local_body", "");
    formik.setFieldValue("village", "");
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let phonenumber = registrationData.phone;
    let value = "";
    let mergedPhoneNumber;
    // if (!phonenumber.startsWith("+")) {
      if(isphone){
        if (selectedCountry) {
          // console.log(selectedCountry);
    
          value = selectedCountry.value;
          // console.log("countryCode ..........", value);
          mergedPhoneNumber = `${value}${phonenumber}`;
          // console.log("mergedPhoneNumber",phonenumber, mergedPhoneNumber);
          // setPhoneNumberOTP(mergedPhoneNumber);
        } else {
          toast.error("Plese select country code ");
        }

      }
    
    try {
      // setLoading(true);
      // console.log("registrationData.email", registrationData.email);
      // console.log("registrationData.phone", registrationData.phone);

        const response = await axiosInstance.post(
          "userapp/user/checking/user/alredy/registred",
          {
            email: registrationData.email,
            phone: mergedPhoneNumber,
          }
        );

      if (response.data.isRegistred) {
        setUserId(response.data.user_id);

        const productCreatedResponse = await axiosInstance.post(
          `userapp/user/confirm/already/registred/and/generate/product/link/${response.data.user_id}/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
          {}
        );

        if (
          productCreatedResponse.data.message ===
          "The product added to your account successfully"
        ) {
          setEmailAlreadyRegistered(true);
          toast.success(productCreatedResponse.data.message);
          localStorage.removeItem("product_id");
          localStorage.removeItem("influ_1");
          localStorage.removeItem("org_2");
          localStorage.removeItem("li");
          navigate("/user/login");
        } else if (
          productCreatedResponse.data.message ===
          "You already enrolled for the product..Please login now for further details"
        ) {
          setEmailAlreadyRegistered(true);
          toast.success('You already enrolled for the product... Please login for more details');
          localStorage.removeItem("product_id");
          localStorage.removeItem("influ_1");
          localStorage.removeItem("org_2");
          localStorage.removeItem("li");
          setLoading(false);
          navigate("/user/login");
        } else {
          setLoading(false);
          setShowEmailField(true);
          toast.success(productCreatedResponse.data.message);
          localStorage.removeItem("product_id");
          localStorage.removeItem("influ_1");
          localStorage.removeItem("org_2");
          localStorage.removeItem("li");
          navigate("/user/login");
        }
      } else {
        setLoading(false);
        setShowEmailField(false);
        // toast.error(
        //   "It seems you don't have an account for this email...Please register"
        // );
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
      setShowEmailField(false);
      if (
        error.response.data.message ===
        "No Account found with this Email...Please register"
      ) {
        toast.error();
      } else {
        toast.error(error.response.data.message);
      }

      // console.error(error);
    } finally {
      setLoading(false);
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      address_line_1: "",
      address_line_2: "",
      land_mark: "",
      state: selectedState,
      district: "",
      sub_district: "",
      local_body: "",
      village: "",
      confirmPassword: "",
    },
    // validationSchema:registrationSchema,
    touched: {},
    errors: {},
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        
        
        setLoading(true);
        if (isphone) {
          const data = await enteredOtp.confirm(otp);
          const user = data.user;
          if (user.phoneNumber) {
            // console.log('user.phoneNumber',user.phoneNumber)
            // console.log("Phone number is verified:", user.phoneNumber);
                       // starting of phone registration ie isphone
        // setLoading(true);
        
        const response = await axiosInstance.post(
          `userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
          { ...values, email: registrationData.email,
          phone :user.phoneNumber }
        );
        
        localStorage.setItem("link_data", response?.data?.link_data?.uuid);
        // console.log("response dataa", response.data);
        setRegistereduserdata(response.data);
        // console.log("3");
        if (
          response.data.message ===
          "Your registration is successful.Please login Now"
        ) {
          
         
            // console.log('user.phoneNumber ath login/phone/api',user.phoneNumber)
            const loginresponse_p = await axiosInstance.post("userapp/api/login/phone/", {
              phone :user.phoneNumber
              
        });
          if (loginresponse_p.data.access) {
            localStorage.setItem("usertoken", loginresponse_p.data.access);
            localStorage.removeItem("product_id");
            localStorage.removeItem("influ_1");
            localStorage.removeItem("org_2");
            localStorage.removeItem("li");
            setLoading(false);
            // toast.success("Your registration is successfull");
            // resetForm();
            resetForm();
            navigate("/user/approval/pending")
            // navigate("/user/approval/pending");
            
            // navigate("/user/payment");
          }
        }

          } else {
            // console.log("Phone number is not verified.");
            toast.error('OTP verification failed..Please try again')
            setLoading(false);
           
          }
        } else {
          let phonenumber = registrationData.phone;
          let value = "";
          let mergedPhoneNumber = registrationData.phone;

          if(registrationData.phone){
            value = selectedCountry.value;
          // console.log("countryCode ..........", value);
          mergedPhoneNumber = `${value}${phonenumber}`;
          // console.log("mergedPhojjjjjjjjjjjjjjjjjneNumber",phonenumber, mergedPhoneNumber);

          }
          // For email registration
          const response = await axiosInstance.post(
            `userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
            {
              ...values,
              email: registrationData.email,
              phone : mergedPhoneNumber,
            }
          );
          
          localStorage.setItem("link_data", response?.data?.link_data?.uuid);
          setRegistereduserdata(response.data);
          if (
            response.data.message ===
            "Your registration is successful.Please login Now"
          ) {
            // console.log("emailsdsfsdf", registrationData.email);
            // console.log("passwordsdfdsdsfdsfsd", formik.values.password);

            const loginresponse = await axiosInstance.post(
              "userapp/api/login/",
              {
                email: registrationData.email,
                password: formik.values.password,
              }
            );
            if (loginresponse.data.access) {
              localStorage.setItem("usertoken", loginresponse.data.access);
              localStorage.removeItem("product_id");
              localStorage.removeItem("influ_1");
              localStorage.removeItem("org_2");
              localStorage.removeItem("li");
              setLoading(false);
              // toast.success("Your registration is successful");
              resetForm();
              // for enableing the pending by taking the location details of the user
              navigate("/user/approval/pending")
              // navigate("/user/approval/pending");
              // resetForm();
              // navigate("/user/payment");
            }
          }
        }

       

        
      } catch (error) {
        // console.log(error);
        setLoading(false);
        if (error.code === "auth/code-expired") {
          // setIscaptchaVerified(false);
          // console.log("OTP Expired.");
          toast.error("OTP Expired... Try again");
          // Handle accordingly
        }else if(error.code === "auth/invalid-verification-code"){
          setLoading(false);
          setIscaptchaVerified(false);
          toast.error("Incorrect OTP. Try again");
        }
         else if (error.code === "auth/too-many-requests") {
          setLoading(false);
          setIscaptchaVerified(false);
          toast.error("Sorry.. too many requets.Please try after sometime ");
        } else {
          // console.log("Error:", error);
        }
        // console.log("errornnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", error);
        setLoading(false);
        if (
          error.response.data.message ===
          "This email already exists .Try another one"
        ) {
          setIscaptchaVerified(false);
          toast.error('This email already exists .Try another one');
        } else if(
           error.response.data.message ==='This phone number already exists .Try another one'
        ){
          setIscaptchaVerified(false);
          toast.error('This phone number already exists .Try another one');

        }
        else {
          // console.log(error);
          setIscaptchaVerified(false);
          toast.error(error.response.data.message);
        }
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    formik.handleChange(e);

    formik.setFieldValue(name, capitalizeFirstLetter(value));
  };

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  };

  const handleInputChangeForDynamicInput = (e) => {
    const inputValue = e.target.value;
    // console.log("changing started");

    // Regular expression for checking if the input is a phone number
    // const phoneRegex = /^\d{10}$/;
    const phoneRegex = /^\d*$/;

    // Regular expression for checking if the input is an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the input matches the phone number pattern
    if (phoneRegex.test(inputValue)) {
      // console.log("changing to phone......");
      setIsphone(true);
      setRegistrationData({
        phone: inputValue,
      });
    } else if (emailRegex.test(inputValue)) {
      // console.log("changing to email......");
      setIsphone(false);
      setRegistrationData({
        email: inputValue,
      });
    } else {
      setIsphone(false);
      setRegistrationData({
        contact: inputValue, // Use a generic name in case of other input types
      });
    }
  };

  useEffect(() => {
    let timerInterval;

    if (sendotp) {
      timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [sendotp]);

  const resendOtp = async () => {
    let phonenumber = registrationData.phone;
    let value = "";
    try {
      setLoadingOtp(true);
      // Add logic to resend OTP
      // This can be similar to the logic in setPhoneNumberOTP
      
      setSendotp(false);
      
      // await setPhoneNumberOTP();
      value = selectedCountry.value;
      // console.log("countryCode ..........", value);
      let mergedPhoneNumber = `${value}${phonenumber}`;
      // console.log("mergedPhoneNumber", mergedPhoneNumber);
      await setPhoneNumberOTP(mergedPhoneNumber);
      setResendTimer(45); // Reset the timer
    } catch (error) {
      // console.error("Error resending OTP:", error);
    } finally {
      setLoadingOtp(false);
    }
  };

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <RotatingLines
          opacity
          type="RotatingLines"
          color="#6da8ba"
          height={50}
          width={50}
        />
      </div>
    );
  }

  const handlePhoneRegister = () => {
    if (isphone) {
      setIsphone(false);
    } else {
      setIsphone(true);
    }
  };

  const filteredCountryOptions = countryOptions.filter(
    (country) => !selectedCountry || country.code !== selectedCountry.code
  );

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    formik.setFieldValue("phone", {
      ...registrationData.phone,
      // country: selectedOption.value,
    });
  };

  return (
    <>
      <TopNav />
      <div className="registrtion-main-container">
        {showEmailField ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <Card
              className="email-container-checking-div"
              style={{backgroundColor: '#b3cde0'}}
            >
              <Card.Body>
                <Card.Title className="text-center mb-4">Register</Card.Title>
                {loading && (
                  <div className="text-center">
                    <p></p>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {!loading && emailAlreadyRegistered && (
                  <div>
                    <p>
                      Email is already registered.Please log in or use a
                      different email.
                    </p>
                  </div>
                )}
                <Form onSubmit={handleEmailSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className="text-secondary">
                      {/* Enter {isphone ? "Phone" : "Email"} */}
                      <strong>Enter Email or Phone</strong>
                    </Form.Label>
                    <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {isphone &&(<Select
                                  options={countryOptions.map((country) => ({
                                    value: country.value,
                                    label: ` ${country.value} ${country.label}`,
                                  }))}
                                  value={
                                    selectedCountry || defaultSelectedOption
                                  }
                                  onChange={handleCountryChange}
                                  defaultInputValue={
                                    defaultSelectedOption
                                      ? ` ${defaultSelectedOption.value} ${defaultSelectedOption.label}`
                                      : ""
                                  }
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      width: "130px", // Adjust the width as needed
                                    }),
                                  }}
                                  inputProps={{ "aria-required": true }}
                                  isSearchable
                                />)}
                              
                    <Form.Control
                    //  key={isphone ? 'tel' : 'email'}
                      type={isphone ? "tel" : "email"}
                      // type="text"
                      name="contact" // Use a consistent name attribute
                      value={registrationData.contact}
                      onChange={handleInputChangeForDynamicInput}
                      auto
                      required
                    />
                     </div>
                  </Form.Group>
                 
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#081d29" }}
                    className="w-100 mt-3"
                  >
                    Continue
                  </Button>
                  {/* <p
                    className="mt-3 text-end"
                    style={{ cursor: "pointer" }}
                    onClick={handlePhoneRegister}
                  >
                    Register with{isphone?" Email" : " Phone number"}
                  </p> */}
                </Form>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <Card className="registration-card"
          style={{backgroundColor: '#b3cde0'}}
          >
            <Card.Body>
              <Card.Title className="text-center">Registration</Card.Title>
              <Form id="register" onSubmit={formik.handleSubmit}>
                {sendotp ? (
                  <>
                    <Col md={12}>
                      <Form.Label className="text-secondary">
                        Enter OTP
                      </Form.Label>
                      <OtpInput
                        value={otp}
                        onChange={(otp) => setOtp(otp)}
                        numInputs={6}
                        renderSeparator={<span>{}</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          width: "100%",
                          height: "40px",
                          border: "none",
                          borderRadius: "5px",
                          marginRight: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                        isInputNum
                        shouldAutoFocus
                      />
                    </Col>

                    <div className="text-center">
                      <Button
                        form="register"
                        type="submit"
                        style={{ backgroundColor: "#081d29" }}
                        className="w-75 mt-4 mb-4"
                        disabled={loadingOtp}
                      >
                        {loadingOtp ? "Sending OTP..." : "Verify"}
                      </Button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <p>Resend OTP in {resendTimer} seconds</p>
                      {resendTimer > 0 || loadingOtp ? (
                        <p></p>
                      ) : (
                        <label
                          onClick={resendOtp}
                          style={{ cursor: "pointer" }}
                        >
                          Resend OTP
                        </label>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Row className="mb-2">
                      {isphone ? null : (
                        <Col md={12}>
                          <Form.Group controlId="formEmail">
                            <Form.Label className="text-secondary">
                              Email{" "}
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={registrationData.email}
                              onChange={(e) =>
                                setRegistrationData({
                                  ...registrationData,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.touched.email && formik.errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                    {!isphone ? (
                      <Row className="mb-2">
                        <Col md={12}>
                          <Form.Group controlId="formFirstName">
                            <Form.Label className="text-secondary">
                              Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={formik.values.name}
                              onChange={handleInputChange}
                              name="name"
                              isInvalid={
                                formik.touched.name && !!formik.errors.name
                              }
                              style={{ textTransform: "capitalize" }}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.touched.name && formik.errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    ) : null}

                    {isphone ? (
                      <>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Form.Group controlId="formPhone">
                              <Form.Label className="text-secondary">
                                Phone Number
                              </Form.Label>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Select
                                  options={countryOptions.map((country) => ({
                                    value: country.value,
                                    label: ` ${country.value} ${country.label}`,
                                  }))}
                                  value={
                                    selectedCountry || defaultSelectedOption
                                  }
                                  onChange={handleCountryChange}
                                  defaultInputValue={
                                    selectedCountry
                                      ? ` ${selectedCountry.value} ${selectedCountry.label}`
                                      : `${defaultSelectedOption.value} ${defaultSelectedOption.label}`
                                  }
                                  
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      width: "130px", // Adjust the width as needed
                                    }),
                                  }}
                                  inputProps={{ "aria-required": true }}
                                  isSearchable
                                />

                                <Form.Control
                                  type="tel"
                                  placeholder="Enter phone number"
                                  value={registrationData.phone}
                                  // onChange={(phone) =>
                                  //   formik.setFieldValue("phone", phone)
                                  // }
                                  onChange={(e) =>
                                    setRegistrationData({
                                      ...registrationData,
                                      phone: e.target.value,
                                    })
                                  }
                                  name="phone"
                                  isInvalid={
                                    formik.touched.phone &&
                                    !!formik.errors.phone
                                  }
                                  style={{ marginLeft: "10px" }} // Adjust margin as needed
                                  required
                                />

                                {formik.touched.phone &&
                                  formik.errors.phone && (
                                    <Form.Control.Feedback type="invalid">
                                      {formik.errors.phone}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>

                                   
                        <Row className="mb-2">
                          <Col md={12}>
                            <Form.Group controlId="formFirstName">
                              <Form.Label className="text-secondary">
                                Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={formik.values.name}
                                onChange={handleInputChange}
                                name="name"
                                isInvalid={
                                  formik.touched.name && !!formik.errors.name
                                }
                                style={{ textTransform: "capitalize" }}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.touched.name && formik.errors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Form.Group controlId="formEmail">
                              <Form.Label className="text-secondary">
                                Email
                              </Form.Label>
                              <Form.Control
                                // placeholder="Optional"
                                type="email"
                                name="email"
                                value={registrationData.email}
                                onChange={(e) =>
                                  setRegistrationData({
                                    ...registrationData,
                                    email: e.target.value,
                                  })
                                }
                                required
                                isInvalid={
                                  formik.touched.email &&
                                  !!formik.errors.email
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.touched.email && formik.errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {iscaptchaVeriffied ? (
                      <>
                        <div className="text-center d-flex align-items-center justify-content-center">
                          <div id="recaptcha" className="mb-3"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {isphone ? null : (
                          <>
                          <Row className="mb-2">
                          <Col md={12}>
                            <Form.Group controlId="formPhone">
                              <Form.Label className="text-secondary">
                                Phone Number
                              </Form.Label>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Select
                                  options={countryOptions.map((country) => ({
                                    value: country.value,
                                    label: ` ${country.value} ${country.label}`,
                                  }))}
                                  value={
                                    selectedCountry || defaultSelectedOption
                                  }
                                  onChange={handleCountryChange}
                                  defaultInputValue={
                                    selectedCountry
                                      ? `${selectedCountry.value} ${selectedCountry.label}`
                                      : `${defaultSelectedOption.value} ${defaultSelectedOption.label}`
                                  }
                                  
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      width: "130px", // Adjust the width as needed
                                    }),
                                  }}
                                  inputProps={{ "aria-required": true }}
                                  isSearchable
                                />

                                <Form.Control
                                  type="tel"
                                  placeholder="Enter phone number"
                                  value={registrationData.phone}
                                  // onChange={(phone) =>
                                  //   formik.setFieldValue("phone", phone)
                                  // }
                                  onChange={(e) =>
                                    setRegistrationData({
                                      ...registrationData,
                                      phone: e.target.value,
                                    })
                                  }
                                  name="phone"
                                  required
                                  isInvalid={
                                    formik.touched.phone &&
                                    !!formik.errors.phone
                                  }
                                  style={{ marginLeft: "10px" }} // Adjust margin as needed
                                  
                                />

                                {formik.touched.phone &&
                                  formik.errors.phone && (
                                    <Form.Control.Feedback type="invalid">
                                      {formik.errors.phone}
                                    </Form.Control.Feedback>
                                  )}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                            <Row className="mb-2">
                              <Col md={12}>
                                <Form.Group controlId="formPassword">
                                  <Form.Label className="text-secondary">
                                    Password
                                  </Form.Label>
                                  <Form.Control
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    name="password"
                                    isInvalid={
                                      formik.touched.password &&
                                      !!formik.errors.password
                                    }
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {formik.touched.password &&
                                      formik.errors.password}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-2">
                              <Col md={12}>
                                <Form.Group controlId="formConfirmPassword">
                                  <Form.Label className="text-secondary">
                                    Confirm Password
                                  </Form.Label>
                                  <Form.Control
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    name="confirmPassword"
                                    isInvalid={
                                      formik.touched.confirmPassword &&
                                      !!formik.errors.confirmPassword
                                    }
                                    required
                                    pattern={`^${formik.values.password}$`}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {formik.touched.confirmPassword &&
                                      formik.errors.confirmPassword}
                                    {!formik.touched.confirmPassword &&
                                      "Please enter the same password as above."}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        )}
                      </>
                    )}

                    <Row>
                      <Col md={12}>
                        {sendotp ? (
                          <></>
                        ) : iscaptchaVeriffied ? (
                          <>
                          <p className="mt-3 text-danger">
                            Please wait.. You will receive an otp now
                            </p>
                            <p className="text-center">
                            <RotatingLines className type="RotatingLines" color="#6da8ba" height={40} width={40} />
                        </p>
                        </>
                        ) : (
                          <>
                            {isphone ? (
                              <>
                                <Button
                                  // onClick={setPhoneNumberOTP}
                                  onClick={mergeCuntryCodeWithPhonenumber}
                                  form="register"
                                  style={{ backgroundColor: "#081d29" }}
                                  className="w-100"
                                  disabled={
                                    formik.isValidating || !formik.dirty
                                  }
                                >
                                  {formik.isValidating
                                    ? "Validating..."
                                    : "Proceed"}
                                </Button>
                                {!sendotp && (
                                  <>
                                    <h6>
                                      You will receive an OTP to the entered
                                      mobile number
                                    </h6>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <Button
                                  form="register"
                                  type="submit"
                                  style={{ backgroundColor: "#081d29" }}
                                  className="w-75 mt-4 mb-4 mx-auto d-block"
                                  disabled={loadingOtp}
                                >
                                  {loadingOtp ? "Loading..." : "Register"}
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}

export default UserRegistrationComponent;















// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import TopNav from "../../component/AdminDashboard/TopNav.jsx";
// import "../../style/adminDashboard/registrationform.css";
// import OtpInput from "react-otp-input";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import { useFormik } from "formik";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
// import "react-phone-number-input/style.css"; // Import the styles
// import PhoneInput from "react-phone-number-input"; // Import the PhoneInput component
// import { RotatingLines } from "react-loader-spinner";

// import { auth } from "../../config/firebase.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { CountrySelectDropdown } from "react-phone-number-input";
// import { getCountries } from "react-phone-number-input";
// import { countryOptions } from "../AdminDashboard/Countrycode.jsx";

// function UserRegistrationComponent() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   let product_unique_id = "";
//   let influencer_uuid = "";
//   let organiser_uuid = "";
//   let link_uuid = "";

//   let product_unique_ids = searchParams.get("product_id");
//   let influencer_uuids = searchParams.get("influ_1");
//   let organiser_uuids = searchParams.get("org_2");
//   let link_uuids = searchParams.get("li");

//   // Conditionally get values from localStorage with default values
//   let product_id = localStorage.getItem("product_id") || "";
//   let influ_1 = localStorage.getItem("influ_1") || "";
//   let org_2 = localStorage.getItem("org_2") || "";
//   let li = localStorage.getItem("li") || "";

//   // console.log("influ_1 :", influ_1);
//   // console.log("org_2 : ", org_2);
//   // console.log("li :", influ_1);
//   // console.log("product_id :", influ_1);
//   // console.log("pppppppppppppppppppppppppppppppppppppppppppppppppp");
//   // console.log("influencer_uuids :", influencer_uuids);
//   // console.log("organiser_uuids : ", organiser_uuids);
//   // console.log("link_uuids :", link_uuids);
//   // console.log("product_unique_ids :", product_unique_ids);

//   //
//   if (product_unique_ids !== product_id) {
//     product_unique_id = searchParams.get("product_id");
//     influencer_uuid = searchParams.get("influ_1");
//     organiser_uuid = searchParams.get("org_2");
//     link_uuid = searchParams.get("li");

//     localStorage.setItem("product_id", product_unique_ids);
//     localStorage.setItem("influ_1", influencer_uuids);
//     localStorage.setItem("org_2", organiser_uuids);
//     localStorage.setItem("li", link_uuids);
//   } else if (influencer_uuids !== "None" || organiser_uuids !== "None") {
//     product_unique_id = searchParams.get("product_id");
//     influencer_uuid = searchParams.get("influ_1");
//     organiser_uuid = searchParams.get("org_2");
//     link_uuid = searchParams.get("li");

//     localStorage.setItem("product_id", product_unique_ids);
//     localStorage.setItem("influ_1", influencer_uuids);
//     localStorage.setItem("org_2", organiser_uuids);
//     localStorage.setItem("li", link_uuids);
//   } else if (
//     product_unique_ids == product_id &&
//     (influ_1 !== "None" || org_2 !== "None")
//   ) {
//     console.log("influncer or organiser id not none ");

//     product_unique_id = localStorage.getItem("product_id");
//     influencer_uuid = localStorage.getItem("influ_1");
//     organiser_uuid = localStorage.getItem("org_2");
//     link_uuid = localStorage.getItem("li");

//     // product_unique_id = searchParams.get('product_id');
//     // influencer_uuid = searchParams.get('influ_1');
//     // organiser_uuid = searchParams.get('org_2');
//     // link_uuid = searchParams.get('li');
//   } else {
//     // console.log("PRODUCT IS different ");
//     // console.log(product_unique_ids, product_id);

//     product_unique_id = searchParams.get("product_id");
//     influencer_uuid = searchParams.get("influ_1");
//     organiser_uuid = searchParams.get("org_2");
//     link_uuid = searchParams.get("li");

//     localStorage.setItem("product_id", product_unique_ids);
//     localStorage.setItem("influ_1", influencer_uuids);
//     localStorage.setItem("org_2", organiser_uuids);
//     localStorage.setItem("li", link_uuids);
//   }
//   const defaultCountryCode = "+91"; // Change this to the desired country code
//   const defaultSelectedOption = countryOptions.find(
//     (country) => country.value === defaultCountryCode
//   );

//   // const defaultSelectedOption = countryOptions.find(country => country.name === 'India');

//   const [stateResponse, setStateResponse] = useState([]);
//   const [districtOptions, setDistrictOptions] = useState([]);
//   const [subDistrictOptions, setSubDistrictOptions] = useState([]);
//   const [localBodyOptions, setLocalBodyOptions] = useState([]);
//   const [villageOptions, setVillageOptions] = useState([]);
//   const [clickstate, setClickstate] = useState("0");
//   const [selectedState, setSelectedState] = useState("KERALA");
//   const [showEmailField, setShowEmailField] = useState(true);
//   const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
//   const [userId, setUserId] = useState(0);
//   const [registereduserdata, setRegistereduserdata] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
//   const [isphone, setIsphone] = useState(false);
//   const [sendotp, setSendotp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [enteredOtp, setEnteredOtp] = useState(null);
//   const [resendTimer, setResendTimer] = useState(45);
//   const [loadingOtp, setLoadingOtp] = useState(false);

//   const [selectedCountry, setSelectedCountry] = useState(
//     defaultSelectedOption || selectedCountry
//   );

//   const mergeCuntryCodeWithPhonenumber = async () => {
//     let phonenumber = registrationData.phone;
//     let value = "";
//     // if (!phonenumber.startsWith("+")) {
//     if (selectedCountry) {
//       console.log(selectedCountry);

//       value = selectedCountry.value;
//       console.log("countryCode ..........", value);
//       let mergedPhoneNumber = `${value}${phonenumber}`;
//       console.log("mergedPhoneNumber", mergedPhoneNumber);
//       setPhoneNumberOTP(mergedPhoneNumber);
//     } else {
//       toast.error("Plese select country code ");
//     }
//   };

//   const setPhoneNumberOTP = async (mergedPhoneNumber) => {
//     try {
//       // setLoading(true)
//       setIscaptchaVerified(true);
//       const response = await axiosInstance.post(
//         "userapp/user/register/phonenumber/already/exists/check",
//         {
//           phone: mergedPhoneNumber,
//           email : registrationData.email
//         }
//       );
//       // let phonenumber = registrationData.phone;
//       // if (!phonenumber.startsWith("+")) {
//       //   // If not, concatenate +91 with the number
//       //   phonenumber = `+91${phonenumber}`;
//       // }

//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           // onSignInSubmit();
//         },
//       });
//       console.log("recaptchaVerifier", recaptcha);
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         mergedPhoneNumber,
//         recaptcha
//       );
//       setSendotp(true);
//       setIscaptchaVerified(false);
//       console.log("confirmation", confirmation);

//       setEnteredOtp(confirmation); // Assuming you have a state variable named enteredOtp
//     } catch (error) {
//       setLoading(false);
//       if (error.code === "auth/invalid-phone-number") {
//         console.log("Invalid phone number format.. Please check your number.");
//         setIscaptchaVerified(false);
//         toast.error("Invalid phone number format");
//         setLoading(false);
//       } else if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message ===
//           "Phone number already exists..Try another one"
//       ) {
//         setIscaptchaVerified(false);
//         toast.error("This phone number already exists..Try another one");
//        } else if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message ===
//             "This email already exists .Try another one"
//         ) {
//           setIscaptchaVerified(false);
//           toast.error("This email already exists .Try another one");
//       } else if (error.code === "auth/too-many-requests") {
//         setIscaptchaVerified(false);

//         toast.error("Too many requests. Please try after sometime.");
//       } else {
//         setIscaptchaVerified(false);
//         console.log('oooopp',error);
//         toast.error("Something when wrong..Please try again");
//       }
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const data = await enteredOtp.confirm(otp);
//       const user = data.user;
//       if (user.phoneNumber) {
//         console.log("Phone number is verified:", user.phoneNumber);
//       } else {
//         console.log("Phone number is not verified.");
//         navigate("/user");
//       }
//     } catch (error) {
//       if (error.code === "auth/code-expired") {
//         console.log("OTP Expired.");
//         // Handle accordingly
//       } else {
//         console.log("Error:", error);
//       }
//       console.log("errornnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", error);
//     }
//   };

//   const [registrationData, setRegistrationData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     address_line_1: "",
//     address_line_2: "",
//     land_mark: "",
//     state: selectedState,
//     district: "",
//     sub_district: "",
//     local_body: "",
//     village: "",
//   });

//   const fetchDataForState = async (state) => {
//     try {
//       const clickrefresh = await axiosInstance.patch(
//         `userapp/user/link/clicked/${product_unique_id}/${link_uuid}`
//       );
//       setClickstate(clickrefresh.data.message);

//       const response = await axiosInstance.get(`userapp/state/${state}`);

//       setStateResponse(response.data);

//       // Extract unique districts from the response
//       const uniqueDistricts = Array.from(
//         new Set(response.data.map((entry) => entry.district))
//       );
//       setDistrictOptions(uniqueDistricts);

//       // Extract sub-districts based on the selected district
//       const subDistricts = fetchDataForDistrict(uniqueDistricts[0]); // Assuming the first district as default
//       setSubDistrictOptions(subDistricts);

//       // Extract local bodies and villages based on the selected district
//       const districtData = response.data.filter(
//         (entry) => entry.district === uniqueDistricts[0]
//       ); // Assuming the first district as default
//       const uniqueLocalBodies = Array.from(
//         new Set(districtData.map((entry) => entry.local_body))
//       );
//       setLocalBodyOptions(uniqueLocalBodies);

//       const uniqueVillages = Array.from(
//         new Set(districtData.map((entry) => entry.village))
//       );
//       setVillageOptions(uniqueVillages);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       // toast.error(error.response.data.message);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDataForState(selectedState);
//   }, [selectedState]);

//   const handleStateChange = async (selectedOption) => {
//     const newState = selectedOption ? selectedOption.label : "";
//     setSelectedState(newState);
//   };

//   const fetchDataForDistrict = (district) => {
//     const districtData = stateResponse.filter(
//       (entry) => entry.district === district
//     );
//     const uniqueSubDistricts = Array.from(
//       new Set(districtData.map((entry) => entry.sub_district))
//     );
//     return uniqueSubDistricts;
//   };

//   const handleDistrictChange = (selectedOption) => {
//     formik.setFieldValue(
//       "district",
//       selectedOption ? selectedOption.label : ""
//     );

//     const uniqueSubDistricts = fetchDataForDistrict(selectedOption.label);
//     setSubDistrictOptions(uniqueSubDistricts);
//     formik.setFieldValue("sub_district", "");
//     formik.setFieldValue("local_body", "");
//     formik.setFieldValue("village", "");
//   };

//   const handleSubDistrictChange = (selectedOption) => {
//     formik.setFieldValue(
//       "sub_district",
//       selectedOption ? selectedOption.label : ""
//     );

//     const subdistrictData = stateResponse.filter(
//       (entry) => entry.sub_district === selectedOption.label
//     );
//     const uniqueLocalBodies = Array.from(
//       new Set(subdistrictData.map((entry) => entry.local_body))
//     );
//     setLocalBodyOptions(uniqueLocalBodies);

//     const uniqueVillages = Array.from(
//       new Set(subdistrictData.map((entry) => entry.village))
//     );
//     setVillageOptions(uniqueVillages);

//     formik.setFieldValue("local_body", "");
//     formik.setFieldValue("village", "");
//   };

//   const handleEmailSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // setLoading(true);
//       console.log("registrationData.email", registrationData.email);
//       console.log("registrationData.phone", registrationData.phone);

//       const response = await axiosInstance.post(
//         "userapp/user/checking/user/alredy/registred",
//         {
//           email: registrationData.email,
//           phone: registrationData.phone,
//         }
//       );

//       if (response.data.isRegistred) {
//         setUserId(response.data.user_id);

//         const productCreatedResponse = await axiosInstance.post(
//           `userapp/user/confirm/already/registred/and/generate/product/link/${response.data.user_id}/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
//           {}
//         );

//         if (
//           productCreatedResponse.data.message ===
//           "The product added to your account successfully"
//         ) {
//           setEmailAlreadyRegistered(true);
//           toast.success(productCreatedResponse.data.message);
//           localStorage.removeItem("product_id");
//           localStorage.removeItem("influ_1");
//           localStorage.removeItem("org_2");
//           localStorage.removeItem("li");
//           navigate("/user/login");
//         } else if (
//           productCreatedResponse.data.message ===
//           "You already enrolled for the product..Please login now for further details"
//         ) {
//           setEmailAlreadyRegistered(true);
//           toast.success(productCreatedResponse.data.message);
//           localStorage.removeItem("product_id");
//           localStorage.removeItem("influ_1");
//           localStorage.removeItem("org_2");
//           localStorage.removeItem("li");
//           setLoading(false);
//           navigate("/user/login");
//         } else {
//           setLoading(false);
//           setShowEmailField(true);
//           toast.success(productCreatedResponse.data.message);
//           localStorage.removeItem("product_id");
//           localStorage.removeItem("influ_1");
//           localStorage.removeItem("org_2");
//           localStorage.removeItem("li");
//           navigate("/user/login");
//         }
//       } else {
//         setLoading(false);
//         setShowEmailField(false);
//         // toast.error(
//         //   "It seems you don't have an account for this email...Please register"
//         // );
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       setShowEmailField(false);
//       if (
//         error.response.data.message ===
//         "No Account found with this Email...Please register"
//       ) {
//         toast.error();
//       } else {
//         toast.error(error.response.data.message);
//       }

//       console.error(error);
//     } finally {
//       setLoading(false);
//       setLoading(false);
//     }
//   };

//   const capitalizeFirstLetter = (str) => {
//     return str.replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       address_line_1: "",
//       address_line_2: "",
//       land_mark: "",
//       state: selectedState,
//       district: "",
//       sub_district: "",
//       local_body: "",
//       village: "",
//       confirmPassword: "",
//     },
//     // validationSchema:registrationSchema,
//     touched: {},
//     errors: {},
//     onSubmit: async (values, { resetForm, setErrors }) => {
//       try {
        
//         setLoading(true);
//         if (isphone) {
//           const data = await enteredOtp.confirm(otp);
//           const user = data.user;
//           if (user.phoneNumber) {
//             console.log('user.phoneNumber',user.phoneNumber)
//             console.log("Phone number is verified:", user.phoneNumber);
//                        // starting of phone registration ie isphone
//         // setLoading(true);
        
//         const response = await axiosInstance.post(
//           `userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
//           { ...values, email: registrationData.email,
//           phone :user.phoneNumber }
//         );
        
//         localStorage.setItem("link_data", response?.data?.link_data?.uuid);
//         console.log("response dataa", response.data);
//         setRegistereduserdata(response.data);
//         console.log("3");
//         if (
//           response.data.message ===
//           "Your registration is successful.Please login Now"
//         ) {
          
//           // let loginresponse_p;
//           // if (isphone) {
//           //   console.log("123333333333llllllllllllllllllllllllllllll");
//           //   console.log(formik.values.phone, "phone number in isphone");
//           //   let phonenumber12 = registrationData.phone;
//           //   let phonenumber22;
//           //   if (!phonenumber12.startsWith("+")) {
//           //     // If not, concatenate +91 with the number
//           //     phonenumber22 = `+91${phonenumber12}`;
//           //   }
//           //   loginresponse_p = await axiosInstance.post(
//           //     "userapp/api/login/phone/",
//           //     {
//           //       phone: phonenumber22,
//           //       // password: 'None',
//           //       // email : 'ssijup@gmail.com',
//           //     }
//           //   );
//           // } else {
//             console.log('user.phoneNumber ath login/phone/api',user.phoneNumber)
//             const loginresponse_p = await axiosInstance.post("userapp/api/login/phone/", {
//               phone :user.phoneNumber
//               // email: registrationData.email,
//               // password: formik.values.password,

//               // password: formik.values.password,
//         });
//           if (loginresponse_p.data.access) {
//             localStorage.setItem("usertoken", loginresponse_p.data.access);
//             localStorage.removeItem("product_id");
//             localStorage.removeItem("influ_1");
//             localStorage.removeItem("org_2");
//             localStorage.removeItem("li");
//             setLoading(false);
//             toast.success("Your registration is successful");
//             resetForm();
//             navigate("/user/payment");
//           }
//         }

//           } else {
//             console.log("Phone number is not verified.");
//             toast.error('OTP verification failed..Please try again')
//             setLoading(false);
           
//           }
//         } else {
//           // For email registration
//           const response = await axiosInstance.post(
//             `userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
//             {
//               ...values,
//               email: registrationData.email,
//             }
//           );
          
//           localStorage.setItem("link_data", response?.data?.link_data?.uuid);
//           setRegistereduserdata(response.data);
//           if (
//             response.data.message ===
//             "Your registration is successful.Please login Now"
//           ) {
//             console.log("emailsdsfsdf", registrationData.email);
//             console.log("passwordsdfdsdsfdsfsd", formik.values.password);

//             const loginresponse = await axiosInstance.post(
//               "userapp/api/login/",
//               {
//                 email: registrationData.email,
//                 password: formik.values.password,
//               }
//             );
//             if (loginresponse.data.access) {
//               localStorage.setItem("usertoken", loginresponse.data.access);
//               localStorage.removeItem("product_id");
//               localStorage.removeItem("influ_1");
//               localStorage.removeItem("org_2");
//               localStorage.removeItem("li");
//               setLoading(false);
//               toast.success("Your registration is successful");
//               resetForm();
//               navigate("/user/payment");
//             }
//           }
//         }

       

        
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//         if (error.code === "auth/code-expired") {
//           // setIscaptchaVerified(false);
//           console.log("OTP Expired.");
//           toast.error("OTP Expired... Try again");
//           // Handle accordingly
//         }else if(error.code === "auth/invalid-verification-code"){
//           setLoading(false);
//           setIscaptchaVerified(false);
//           toast.error("Incorrect OTP. Try again");
//         }
//          else if (error.code === "auth/too-many-requests") {
//           setLoading(false);
//           setIscaptchaVerified(false);
//           toast.error("Sorry.. too many requets.Please try after sometime ");
//         } else {
//           console.log("Error:", error);
//         }
//         console.log("errornnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", error);
//         setLoading(false);
//         if (
//           error.response.data.message ===
//           "This email already exists .Try another one"
//         ) {
//           setIscaptchaVerified(false);
//           toast.error('This email already exists .Try another one');
//         } else {
//           console.log(error);
//           setIscaptchaVerified(false);
//           toast.error(error.response.data.message);
//         }
//       }
//     },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     formik.handleChange(e);

//     formik.setFieldValue(name, capitalizeFirstLetter(value));
//   };

//   const loadingContainerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   };

//   const handleInputChangeForDynamicInput = (e) => {
//     const inputValue = e.target.value;
//     console.log("changing started");

//     // Regular expression for checking if the input is a phone number
//     // const phoneRegex = /^\d{10}$/;
//     const phoneRegex = /^\d*$/;

//     // Regular expression for checking if the input is an email address
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Check if the input matches the phone number pattern
//     if (phoneRegex.test(inputValue)) {
//       console.log("changing to phone......");
//       setIsphone(true);
//       setRegistrationData({
//         phone: inputValue,
//       });
//     } else if (emailRegex.test(inputValue)) {
//       console.log("changing to email......");
//       setIsphone(false);
//       setRegistrationData({
//         email: inputValue,
//       });
//     } else {
//       setIsphone(false);
//       setRegistrationData({
//         contact: inputValue, // Use a generic name in case of other input types
//       });
//     }
//   };

//   useEffect(() => {
//     let timerInterval;

//     if (sendotp) {
//       timerInterval = setInterval(() => {
//         setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
//       }, 1000);
//     }

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [sendotp]);

//   const resendOtp = async () => {
//     let phonenumber = registrationData.phone;
//     let value = "";
//     try {
//       setLoadingOtp(true);
//       // Add logic to resend OTP
//       // This can be similar to the logic in setPhoneNumberOTP
      
//       setSendotp(false);
      
//       // await setPhoneNumberOTP();
//       value = selectedCountry.value;
//       console.log("countryCode ..........", value);
//       let mergedPhoneNumber = `${value}${phonenumber}`;
//       console.log("mergedPhoneNumber", mergedPhoneNumber);
//       await setPhoneNumberOTP(mergedPhoneNumber);
//       setResendTimer(45); // Reset the timer
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//     } finally {
//       setLoadingOtp(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={loadingContainerStyle}>
//         <RotatingLines
//           opacity
//           type="RotatingLines"
//           color="#6da8ba"
//           height={50}
//           width={50}
//         />
//       </div>
//     );
//   }

//   const handlePhoneRegister = () => {
//     if (isphone) {
//       setIsphone(false);
//     } else {
//       setIsphone(true);
//     }
//   };

//   const filteredCountryOptions = countryOptions.filter(
//     (country) => !selectedCountry || country.code !== selectedCountry.code
//   );

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//     formik.setFieldValue("phone", {
//       ...registrationData.phone,
//       // country: selectedOption.value,
//     });
//   };

//   return (
//     <>
//       <TopNav />
//       <div className="registrtion-main-container">
//         {showEmailField ? (
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{ width: "100%" }}
//           >
//             <Card
//               className="email-container-checking-div"
//               style={{ backgroundColor: "#e6e6e6" }}
//             >
//               <Card.Body>
//                 <Card.Title className="text-center mb-4">Register</Card.Title>
//                 {loading && (
//                   <div className="text-center">
//                     <p></p>
//                     <div className="spinner-border" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </div>
//                 )}
//                 {!loading && emailAlreadyRegistered && (
//                   <div>
//                     <p>
//                       Email is already registered.Please log in or use a
//                       different email.
//                     </p>
//                   </div>
//                 )}
//                 <Form onSubmit={handleEmailSubmit}>
//                   <Form.Group controlId="formEmail">
//                     <Form.Label className="text-secondary">
//                       {/* Enter {isphone ? "Phone" : "Email"} */}
//                       <strong>Enter Email or Phone</strong>
//                     </Form.Label>
//                     <Form.Control
//                     //  key={isphone ? 'tel' : 'email'}
//                       type={isphone ? "tel" : "email"}
//                       // type="text"
//                       name="contact" // Use a consistent name attribute
//                       value={registrationData.contact}
//                       onChange={handleInputChangeForDynamicInput}
//                       auto
//                       required
//                     />
//                   </Form.Group>
//                   <Button
//                     type="submit"
//                     style={{ backgroundColor: "#081d29" }}
//                     className="w-100 mt-3"
//                   >
//                     Continue
//                   </Button>
//                   {/* <p
//                     className="mt-3 text-end"
//                     style={{ cursor: "pointer" }}
//                     onClick={handlePhoneRegister}
//                   >
//                     Register with{isphone?" Email" : " Phone number"}
//                   </p> */}
//                 </Form>
//               </Card.Body>
//             </Card>
//           </div>
//         ) : (
//           <Card className="registration-card">
//             <Card.Body>
//               <Card.Title className="text-center">Registration</Card.Title>
//               <Form id="register" onSubmit={formik.handleSubmit}>
//                 {sendotp ? (
//                   <>
//                     <Col md={12}>
//                       <Form.Label className="text-secondary">
//                         Enter OTP
//                       </Form.Label>
//                       <OtpInput
//                         value={otp}
//                         onChange={(otp) => setOtp(otp)}
//                         numInputs={6}
//                         renderSeparator={<span>{}</span>}
//                         renderInput={(props) => <input {...props} />}
//                         inputStyle={{
//                           width: "100%",
//                           height: "40px",
//                           border: "none",
//                           borderRadius: "5px",
//                           marginRight: "0.5rem",
//                           marginBottom: "0.5rem",
//                         }}
//                         isInputNum
//                         shouldAutoFocus
//                       />
//                     </Col>

//                     <div className="text-center">
//                       <Button
//                         form="register"
//                         type="submit"
//                         style={{ backgroundColor: "#081d29" }}
//                         className="w-75 mt-4 mb-4"
//                         disabled={loadingOtp}
//                       >
//                         {loadingOtp ? "Sending OTP..." : "Verify"}
//                       </Button>
//                     </div>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <p>Resend OTP in {resendTimer} seconds</p>
//                       {resendTimer > 0 || loadingOtp ? (
//                         <p></p>
//                       ) : (
//                         <label
//                           onClick={resendOtp}
//                           style={{ cursor: "pointer" }}
//                         >
//                           Resend OTP
//                         </label>
//                       )}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Row className="mb-2">
//                       {isphone ? null : (
//                         <Col md={12}>
//                           <Form.Group controlId="formEmail">
//                             <Form.Label className="text-secondary">
//                               Email{" "}
//                             </Form.Label>
//                             <Form.Control
//                               type="email"
//                               name="email"
//                               value={registrationData.email}
//                               onChange={(e) =>
//                                 setRegistrationData({
//                                   ...registrationData,
//                                   email: e.target.value,
//                                 })
//                               }
//                               required
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {formik.touched.email && formik.errors.email}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col>
//                       )}
//                     </Row>
//                     {!isphone ? (
//                       <Row className="mb-2">
//                         <Col md={12}>
//                           <Form.Group controlId="formFirstName">
//                             <Form.Label className="text-secondary">
//                               Name
//                             </Form.Label>
//                             <Form.Control
//                               type="text"
//                               value={formik.values.name}
//                               onChange={handleInputChange}
//                               name="name"
//                               isInvalid={
//                                 formik.touched.name && !!formik.errors.name
//                               }
//                               style={{ textTransform: "capitalize" }}
//                               required
//                             />
//                             <Form.Control.Feedback type="invalid">
//                               {formik.touched.name && formik.errors.name}
//                             </Form.Control.Feedback>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     ) : null}

//                     {isphone ? (
//                       <>
//                         <Row className="mb-2">
//                           <Col md={12}>
//                             <Form.Group controlId="formPhone">
//                               <Form.Label className="text-secondary">
//                                 Phone Number
//                               </Form.Label>

//                               <div
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <Select
//                                   options={countryOptions.map((country) => ({
//                                     value: country.value,
//                                     label: ` ${country.value} ${country.label}`,
//                                   }))}
//                                   value={
//                                     selectedCountry || defaultSelectedOption
//                                   }
//                                   onChange={handleCountryChange}
//                                   defaultInputValue={
//                                     defaultSelectedOption
//                                       ? ` ${defaultSelectedOption.value} ${defaultSelectedOption.label}`
//                                       : ""
//                                   }
//                                   styles={{
//                                     control: (provided) => ({
//                                       ...provided,
//                                       width: "130px", // Adjust the width as needed
//                                     }),
//                                   }}
//                                   inputProps={{ "aria-required": true }}
//                                   isSearchable
//                                 />

//                                 <Form.Control
//                                   type="tel"
//                                   placeholder="Enter phone number"
//                                   value={registrationData.phone}
//                                   // onChange={(phone) =>
//                                   //   formik.setFieldValue("phone", phone)
//                                   // }
//                                   onChange={(e) =>
//                                     setRegistrationData({
//                                       ...registrationData,
//                                       phone: e.target.value,
//                                     })
//                                   }
//                                   name="phone"
//                                   isInvalid={
//                                     formik.touched.phone &&
//                                     !!formik.errors.phone
//                                   }
//                                   style={{ marginLeft: "10px" }} // Adjust margin as needed
//                                   required
//                                 />

//                                 {formik.touched.phone &&
//                                   formik.errors.phone && (
//                                     <Form.Control.Feedback type="invalid">
//                                       {formik.errors.phone}
//                                     </Form.Control.Feedback>
//                                   )}
//                               </div>
//                             </Form.Group>
//                           </Col>
//                         </Row>

                                   
//                         <Row className="mb-2">
//                           <Col md={12}>
//                             <Form.Group controlId="formFirstName">
//                               <Form.Label className="text-secondary">
//                                 Name
//                               </Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={formik.values.name}
//                                 onChange={handleInputChange}
//                                 name="name"
//                                 isInvalid={
//                                   formik.touched.name && !!formik.errors.name
//                                 }
//                                 style={{ textTransform: "capitalize" }}
//                                 required
//                               />
//                               <Form.Control.Feedback type="invalid">
//                                 {formik.touched.name && formik.errors.name}
//                               </Form.Control.Feedback>
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row className="mb-2">
//                           <Col md={12}>
//                             <Form.Group controlId="formEmail">
//                               <Form.Label className="text-secondary">
//                                 Email (optional)
//                               </Form.Label>
//                               <Form.Control
//                                 // placeholder="Optional"
//                                 type="email"
//                                 name="email"
//                                 value={registrationData.email}
//                                 onChange={(e) =>
//                                   setRegistrationData({
//                                     ...registrationData,
//                                     email: e.target.value,
//                                   })
//                                 }
//                                 required
//                               />
//                               <Form.Control.Feedback type="invalid">
//                                 {formik.touched.email && formik.errors.email}
//                               </Form.Control.Feedback>
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                       </>
//                     ) : null}

//                     {iscaptchaVeriffied ? (
//                       <>
//                         <div className="text-center d-flex align-items-center justify-content-center">
//                           <div id="recaptcha" className="mb-3"></div>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         {isphone ? null : (
//                           <>
//                             <Row className="mb-2">
//                               <Col md={12}>
//                                 <Form.Group controlId="formPassword">
//                                   <Form.Label className="text-secondary">
//                                     Password
//                                   </Form.Label>
//                                   <Form.Control
//                                     type="password"
//                                     value={formik.values.password}
//                                     onChange={formik.handleChange}
//                                     name="password"
//                                     isInvalid={
//                                       formik.touched.password &&
//                                       !!formik.errors.password
//                                     }
//                                     required
//                                   />
//                                   <Form.Control.Feedback type="invalid">
//                                     {formik.touched.password &&
//                                       formik.errors.password}
//                                   </Form.Control.Feedback>
//                                 </Form.Group>
//                               </Col>
//                             </Row>
//                             <Row className="mb-2">
//                               <Col md={12}>
//                                 <Form.Group controlId="formConfirmPassword">
//                                   <Form.Label className="text-secondary">
//                                     Confirm Password
//                                   </Form.Label>
//                                   <Form.Control
//                                     type="password"
//                                     value={formik.values.confirmPassword}
//                                     onChange={formik.handleChange}
//                                     name="confirmPassword"
//                                     isInvalid={
//                                       formik.touched.confirmPassword &&
//                                       !!formik.errors.confirmPassword
//                                     }
//                                     required
//                                     pattern={`^${formik.values.password}$`}
//                                   />
//                                   <Form.Control.Feedback type="invalid">
//                                     {formik.touched.confirmPassword &&
//                                       formik.errors.confirmPassword}
//                                     {!formik.touched.confirmPassword &&
//                                       "Please enter the same password as above."}
//                                   </Form.Control.Feedback>
//                                 </Form.Group>
//                               </Col>
//                             </Row>
//                           </>
//                         )}
//                       </>
//                     )}

//                     <Row>
//                       <Col md={12}>
//                         {sendotp ? (
//                           <></>
//                         ) : iscaptchaVeriffied ? (
//                           <>
//                           <p className="mt-3 text-danger">
//                             Please wait.. You will receive an otp now
//                             </p>
//                             <p className="text-center">
//                             <RotatingLines className type="RotatingLines" color="#6da8ba" height={40} width={40} />
//                         </p>
//                         </>
//                         ) : (
//                           <>
//                             {isphone ? (
//                               <>
//                                 <Button
//                                   // onClick={setPhoneNumberOTP}
//                                   onClick={mergeCuntryCodeWithPhonenumber}
//                                   form="register"
//                                   style={{ backgroundColor: "#081d29" }}
//                                   className="w-100"
//                                   disabled={
//                                     formik.isValidating || !formik.dirty
//                                   }
//                                 >
//                                   {formik.isValidating
//                                     ? "Validating..."
//                                     : "Proceed"}
//                                 </Button>
//                                 {!sendotp && (
//                                   <>
//                                     <h6>
//                                       You will receive an OTP to the entered
//                                       mobile number
//                                     </h6>
//                                   </>
//                                 )}
//                               </>
//                             ) : (
//                               <>
//                                 <Button
//                                   form="register"
//                                   type="submit"
//                                   style={{ backgroundColor: "#081d29" }}
//                                   className="w-75 mt-4 mb-4 mx-auto d-block"
//                                   disabled={loadingOtp}
//                                 >
//                                   {loadingOtp ? "Loading..." : "Register"}
//                                 </Button>
//                               </>
//                             )}
//                           </>
//                         )}
//                       </Col>
//                     </Row>
//                   </>
//                 )}
//               </Form>
//             </Card.Body>
//           </Card>
//         )}
//       </div>
//     </>
//   );
// }

// export default UserRegistrationComponent;