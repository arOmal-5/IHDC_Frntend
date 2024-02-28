import React, { useState, useEffect } from "react";
import TopNav from "../../component/AdminDashboard/TopNav";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../config/axios/AxiosConfiguration";
// import defaultResgitration from '../../config/axios/AxiosConfiguration.jsx'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css"; // Import the styles
import PhoneInput from "react-phone-number-input"; // Import the PhoneInput component
import { auth } from "../../config/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import { RotatingLines } from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import { countryOptions } from "../AdminDashboard/Countrycode.jsx";
import Select from "react-select";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UserLogin() {
  const defaultCountryCode = "+91"; // Change this to the desired country code
  const defaultSelectedOption = countryOptions.find(
    (country) => country.value === defaultCountryCode
  );

  const navigate = useNavigate();
  const [isphone, setIsphone] = useState(false);
  const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
  const [sendotp, setSendotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(40);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [phoneNumberOTPCalled, setPhoneNumberOTPCalled] = useState(false);
  const [resendotpClicked, setresendotpClicked] = useState(false)
  const [secondrecaptchaResend,setsecondrecaptchaResend] = useState(false)
  const [thirdrecaptchaResend,setthirdrecaptchaResend] = useState(false)
  const [gotoRegistration,setgotoRegistration] = useState(false)


  const [selectedCountry, setSelectedCountry] = useState(
    defaultSelectedOption || selectedCountry
  );

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    // formik.setFieldValue("phone", {
    //   ...loginData.phone,
    //   // country: selectedOption.value,
    // });
  };
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
   
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      // console.log("entered");
      let loginResponse;
      try {
        if (isphone) {
          setLoading(true)
          const data = await enteredOtp.confirm(otp);
          // console.log("2");
          // console.log("dataaaaaaaa", data);
          const user = data.user;
          if (user.phoneNumber) {
            // setLoading(true);
            loginResponse = await axiosInstance.post(
              "userapp/api/login/phone/",
              {
                phone: user.phoneNumber,
                // password: 'None',
                // email : 'ssijup@gmail.com',
              }
            );
            if (loginResponse.data.access) {
              localStorage.setItem("usertoken", loginResponse.data.access);
              const userStatusResponse = await axiosInstance.get(
                "userapp/user/approval/and/payment/status",
                {
                  headers: {
                    Authorization: `Bearer ${loginResponse.data.access}`,
                  },
                }
              );
              console.log('vaaaaaa',userStatusResponse.data)
              console.log('1vaaaaaa',userStatusResponse.data.message.user_details.user_paid_for_membership)
              if (userStatusResponse.data.message.user_details.user_approved_by_admin=== "Approved"){
                if (userStatusResponse.data.message.user_details.user_paid_for_membership=== false){
                  localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
                  console.log('Logged in successfully')
                toast.success("Logged in successfully");
                setLoading(false);
                navigate("/user/payment");
                resetForm();
                }else {
                  if(userStatusResponse.data.message.user_details.user_paid_for_membership === true){
                    // localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
                  toast.success("Logged in successfully");
                  setLoading(false);
                  navigate("/user");
                  resetForm();

                }
              }
              }
                else if (userStatusResponse.data.message.user_details.user_approved_by_admin=== "Pending" || "Rejected"){
              setLoading(false);
              navigate("/user/approval/pending");
              resetForm();

              }
              // setLoading(false);
              // navigate("/user");
            }
          } else {
            setLoading(false);
            setIscaptchaVerified(false);
            setSendotp(false);
            toast.error("Invaid credentials");
          }
        } else {
          const validationResponse = await axiosInstance.post(
            "userapp/user/login",
            values
          );
          
          setLoading(true);

          if (validationResponse.data.message === "User verified") {
            loginResponse = await axiosInstance.post(
              "userapp/api/login/",
              values
            );
            // console.log(loginResponse.data);
            setLoading(true);
            if (loginResponse.data.access) {
              localStorage.setItem("usertoken", loginResponse.data.access);
              console.log('userapp/api/login')
              const userStatusResponse = await axiosInstance.get(
                "userapp/user/approval/and/payment/status",
                {
                  headers: {
                    Authorization: `Bearer ${loginResponse.data.access}`,
                  },
                }
              );
              console.log('vaaaaaa',userStatusResponse.data)
              console.log('1vaaaaaa',userStatusResponse.data.message.user_details.user_paid_for_membership)
              if (userStatusResponse.data.message.user_details.user_approved_by_admin=== "Approved"){
                if (userStatusResponse.data.message.user_details.user_paid_for_membership=== false){
                  localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
                  console.log('Logged in successfully')
                toast.success("Logged in successfully");
                setLoading(false);
                navigate("/user/payment");
                resetForm();
                }else {
                  if(userStatusResponse.data.message.user_details.user_paid_for_membership === true){
                    // localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
                  toast.success("Logged in successfully");
                  setLoading(false);
                  navigate("/user");
                  resetForm();

                }
              }
              }
                else if (userStatusResponse.data.message.user_details.user_approved_by_admin=== "Pending" || "Rejected"){
              setLoading(false);
              navigate("/user/approval/pending");
              resetForm();

              }
            } else {
              // Handle the case where the user is not valid
              // setIscaptchaVerified(false);
              setIscaptchaVerified(false);
              setLoading(false)
              setgotoRegistration(true)
              toast.error("Invalid credentials");
            }
          } else {
            // Handle the case where the user is not valid
            setIscaptchaVerified(false);
              setLoading(false)
              setgotoRegistration(true)
            toast.error("Invalid number");
          }
        }
      } catch (error) {
        if (error.code === "auth/code-expired") {
          setIscaptchaVerified(false);
          setLoading(false)
          toast.error("OTP Expired");
          // Handle accordingly
        } else if (error.code === "auth/invalid-verification-code") {
          setIscaptchaVerified(false);
          setLoading(false)
          // setSendotp(false);
          setgotoRegistration(true)
          toast.error("Invalid OTP");
        } else if (error.code === "auth/invalid-phone-number") {
          setIscaptchaVerified(false);
          setLoading(false)
          toast.error("Invalid phone number format");
          
        } else {
          setLoading(false);
          setIscaptchaVerified(false);
          setSendotp(false);
          setgotoRegistration(true)
          toast.error("Invalid credentials");
          
        }
      }
    },
  });

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      email: loginData.email,
      phone: loginData.phone,
    });
  }, [loginData]);

  const [inputLenth, setinputLength] = useState(0);

  const handleInputChangeForDynamicInput = (e) => {
    const inputValue = e.target.value;
    if (!isphone) {
      const inputLength = inputValue.length;
      setinputLength(inputLength);
      // console.log("nnnnnnnnninputValue", inputLength, inputValue);
    }

    const phoneRegex = /^\+?\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (phoneRegex.test(inputValue)) {
      setIsphone(true);
      setLoginData({
        phone: inputValue,
      });
      setEnteredPhoneNumber(inputValue);
    } else if (emailRegex.test(inputValue)) {
      setIsphone(false);
      setLoginData({
        email: inputValue,
      });
    } else {
      setIsphone(false);
      setLoginData({
        contact: inputValue,
      });
    }
  };

  const mergeCountryCodeWithPhonenumber = async () => {


    let phonenumber = loginData.phone;
    let value = "";
    try {
      if (selectedCountry) {

        value = selectedCountry.value;
        let mergedPhoneNumber = `${value}${phonenumber}`;

        const response = await axiosInstance.post(
          "userapp/user/login",
          {
            email: loginData.email,
            phone: mergedPhoneNumber,
          }
        );
        
         setPhoneNumberOTP(mergedPhoneNumber);
      } else {
        toast.error();
      }
      
    } catch (error) {
      console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooo',error.response.data.message)
      if(
        error.response.data.message ==='Invalid credentials'
     ){
      console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',)
      setIscaptchaVerified(false);
      setgotoRegistration(true)
      setLoading(false)
       toast.error("No user found with this number...Please register...");

     }
      
    }
    
  };

  const setPhoneNumberOTP = async (mergedPhoneNumber) => {
    setIscaptchaVerified(true);
    console.log('hhhhhhhhhhhhhhhhhhhhhlllllllllllllllllllllllllllllllllllllllllllllll')

    try {
      const phonenumber = mergedPhoneNumber
      
      // console.log(phonenumber);
      // console.log('1')
      let recaptcha ;
      if(thirdrecaptchaResend){
        window.location.reload()
        
      }
      else if(secondrecaptchaResend){
        setthirdrecaptchaResend(true)
        recaptcha = new RecaptchaVerifier(auth, "secondrecaptchaResend", {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          },
        });
      }
      else if(resendotpClicked){
        setsecondrecaptchaResend(true)
         recaptcha = new RecaptchaVerifier(auth, "recaptchaResend", {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          },
        });
      }else{
         recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          },
        });
      }
      
      // console.log('3')
      // console.log("recaptchaVerifier wewe", recaptcha);
      const confirmation = await signInWithPhoneNumber(
        auth,
        phonenumber,
        recaptcha
      );
      setSendotp(true);
      setIscaptchaVerified(false);
      // console.log("confirmation", confirmation);
      setEnteredOtp(confirmation);
    } catch (error) {
      // let phonenumber1 = enteredPhoneNumber;
      // if (!phonenumber1.startsWith("+")) {
      //   // If not, concatenate +91 with the number
      //   // phonenumber = `+91${phonenumber}`;
      //   setIscaptchaVerified(false);
      //   toast.error("Please select the country code ");
        if (error.code === "auth/too-many-requests") {
          setIscaptchaVerified(false);
          // console.log(error);
          toast.error("Sorry.. too many requets.Please try after sometime ");
        } else if (
          error.code === "reCAPTCHA has already been rendered in this element"
        ) {
          setIscaptchaVerified(false);
          toast.error('Multiple requests at a time')
          // setPhoneNumberOTP()
        } else if (error.code === "auth/argument-error") {
          if (!phoneNumberOTPCalled) {
            setPhoneNumberOTPCalled(true);
            // await setPhoneNumberOTP();  // Only call it once
          }
          // setPhoneNumberOTP()
        } else if (error.code === "auth/invalid-phone-number") {
          setIscaptchaVerified(false);
          toast.error("Invaid number..Check the number you entered");
        } else if (
          error.code === "reCAPTCHA has already been rendered in this element"
        ) {
          setIscaptchaVerified(false);
          toast.error();
          // console.log(error);
        } else {
          setIscaptchaVerified(false);
          // toast.error("Error");
          // console.log(error);
        }
        // console.log('sendotperror','auth/argument-error',error)
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

  // const resendOtp = async () => {
  //   try {
  //     setLoadingOtp(true);
  //     // Add logic to resend OTP
  //     // This can be similar to the logic in setPhoneNumberOTP
  //     setSendotp(false);
  //     console.log('enteredPhoneNumber', enteredPhoneNumber)
  //     await setPhoneNumberOTP(enteredPhoneNumber);
  //     setResendTimer(45); // Reset the timer
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //   } finally {
  //     setLoadingOtp(false);
  //   }
  // };

  const resendOtp = async () => {
    // document.getElementById("recaptcha").innerHTML = "";
    // console.log('resend cli')
    let phonenumber = loginData.phone;
    let value = "";
    try {
      // setIscaptchaVerified(false)
      setresendotpClicked(true)
      setLoadingOtp(true);
      setSendotp(false);

      // Resend OTP using the current phone number from formik values
      // const phonenumber = formik.values.phone;
      console.log("enteredPhoneNumber", phonenumber);
      value = selectedCountry.value;
      let mergedPhoneNumber = `${value}${phonenumber}`;
      // setPhoneNumberOTP(mergedPhoneNumber);
      await setPhoneNumberOTP(mergedPhoneNumber);

      setResendTimer(40); // Reset the timer
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setLoadingOtp(false);
    }
  };

  // const resendOtp = async () => {
  //   try {
  //     setLoadingOtp(true);
  //     setSendotp(false);
  //     console.log('enteredPhoneNumber', enteredPhoneNumber);

  //     // Resend OTP using the existing enteredOtp
  //     await enteredOtp.confirm(otp);

  //     setResendTimer(45); // Reset the timer
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //   } finally {
  //     setLoadingOtp(false);
  //   }
  // };

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

  return (
    <>
      <TopNav />
      <div className="container-fluid">
      <div id="recaptcha" className="mb-3"></div>
      <div id="recaptchaResend" className="mb-3"></div>
      <div id="secondrecaptchaResend" className="mb-3"></div>

      
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Login</h3>
                <form id="userlogin" onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    {sendotp ? null : (
                      <label className="form-label">Email or Phone</label>
                    )}

                    {sendotp ? (
                      <>
                        <label className="mb-3">Enter your OTP</label>
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={<span></span>}
                          renderInput={(props) => <input {...props} />}
                          inputStyle={{
                            width: "100%",
                            height: "40px",
                            borderRadius: "5px",
                            marginRight: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                          isInputNum
                          shouldAutoFocus
                        />
                        <div className="text-center">
                        <Button
  form="userlogin"
  type="submit"
  style={{ backgroundColor: "#081d29" }}
  className="w-75 mt-4 mb-4"
  disabled={loadingOtp}
>
  {loadingOtp ? "Sending OTP..." : "Verify & login"}
</Button>
{gotoRegistration && (
  <Link
    to='https://www.ihdc.in/user/register?li=0a7cb794-e18e-42b3-8799-4e583d3c4d6b&product_id=qzDJydB9hiC2&influ_1=None&org_2=None'
    style={{ color: 'red', textDecoration: 'underline', fontSize: 'smaller', display: 'block', textAlign: 'center' }}
  >
    <span style={{ color: 'black', textDecoration: 'none', fontSize: 'smaller' }}>New member?</span> Register
  </Link>
)}

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
                    ) : null}
                    {isphone ? (
                      sendotp ? null : (
                        <>
                        <Row className="mb-2">
                          <Col md={12}>
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
                            value={selectedCountry || defaultSelectedOption}
                            onChange={handleCountryChange}
                            defaultInputValue={
                              defaultSelectedOption
                                ? ` ${defaultSelectedOption.value} ${defaultSelectedOption.label}`
                                : ""
                            }
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                width: "130px",
                              }),
                            }}
                            inputProps={{ "aria-required": true }}
                            isSearchable
                          />

                          <Form.Control
                            type="tel"
                            placeholder="Enter phone number"
                            autoFocus
                            value={enteredPhoneNumber}
                         
                            onChange={handleInputChangeForDynamicInput}
                            name="phone"
                            isInvalid={
                              formik.touched.phone && !!formik.errors.phone
                            }
                            style={{ marginLeft: "10px" }} 
                            required
                          />

                      </div>
                          </Col>
                        </Row>
                        </>
                      )
                    ) : (
                      <input
                        type="text"
                        name="contact"
                        value={loginData.contact}
                        onChange={handleInputChangeForDynamicInput}
                        className="form-control"
                        placeholder="Enter email or phone"
                        autoFocus
                        required
                      />
                    )}
                    <div
                      style={{ display: "none" }}
                      id="emailHelp"
                      className="form-text"
                    >
                      {/* We'll never share your email with anyone else. */}
                    </div>
                  </div>

                  {isphone ? (
                    <>
                      {sendotp ? null : (
                        <> 
                        {iscaptchaVeriffied ? (
                          <>
                          <p className="mt-3 text-primary" style={{fontSize: 'smaller'}}>
                            Please wait.. You will receive an otp now
                            </p>
                            <p className="text-center">
                            <RotatingLines className type="RotatingLines" color="#6da8ba" height={40} width={40} />
                        </p>
                        </>
                        ) : (
                          <>
                          <p className="mt-3 text-primary" style={{fontSize: 'smaller'}}>
                            You will receive an OTP to the entered mobile number
                          </p>

                          <Button
                            onClick={mergeCountryCodeWithPhonenumber}
                            form="userlogin"
                            style={{ backgroundColor: "#081d29" }}
                            className="w-100 mb-3"
                          >
                            {formik.isValidating ? "Validating..." : "Send OTP"}
                          </Button>
                          {gotoRegistration && (
  <Link
    to='https://www.ihdc.in/user/register?li=0a7cb794-e18e-42b3-8799-4e583d3c4d6b&product_id=qzDJydB9hiC2&influ_1=None&org_2=None'
    style={{ color: 'red', textDecoration: 'underline', fontSize: 'smaller', display: 'block', textAlign: 'center' }}
  >
    <span style={{ color: 'black', textDecoration: 'none', fontSize: 'smaller' }}>New member?</span> Register
  </Link>
)}
                          </>
                        ) }
                          
                          

                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {inputLenth > 2 && (
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter password"
                          />
                        </div>
                      )}

                      <button
                        form="userlogin"
                        type="submit"
                        style={{ backgroundColor: "#081d29" }}
                        className="btn text-white w-100"
                      >
                        Login
                      </button>
                      

                    </>
                  )}

                  {sendotp ? null : (
                    <>
                      {/* <Link to='/user/forgotpassword' style={{color:'black',textDecoration:'none',textAlign:'end',marginTop:'10px'}}>Forgot password ?</Link> */}
                      {/* <Link
                        to="/user/forgotpassword"
                        style={{
                          color: "black",
                          textDecoration: "none",
                          textAlign: "end",
                          marginTop: "10px",
                        }}
                      >
                        {inputLenth > 2 && !isphone  "Forgot password"}
                       
                      </Link> */}
                      {inputLenth > 2 && !isphone && (
                        <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to="/user/forgotpassword"
                          style={{
                            color: "black",
                            textDecoration: "none",
                            marginRight: "auto",  // Pushes "Forgot password" to the left
                            fontSize: "small",   // Makes the text smaller
                          }}
                        >
                          Forgot password
                        </Link>
                        {gotoRegistration && (
                          <Link
                          to='https://www.ihdc.in/user/register?li=0a7cb794-e18e-42b3-8799-4e583d3c4d6b&product_id=qzDJydB9hiC2&influ_1=None&org_2=None'
                          style={{ color: 'red', textDecoration: 'underline', fontSize: 'smaller' }}
                        >
                          <span style={{ color: 'black',textDecoration: 'none' , fontSize: 'smaller' }}>New member?</span> Register
                        </Link>
                        
                        )}
                      </div>
                      
                      
                      )}
                    </>
                  )}
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {iscaptchaVeriffied ? ( */}
                  {/* <div className="text-center d-flex align-items-center justify-content-center"> */}
                    {/* <p className="text-warning">hai</p> */}
                    {/* <div id="recaptcha" className="mb-3"></div> */}
                  {/* </div> */}
                {/* ) : null} */}
    </>
  );
}

export default UserLogin;
















// import React, { useState, useEffect } from "react";
// import TopNav from "../../component/AdminDashboard/TopNav";
// import { useFormik } from "formik";
// import { useNavigate, Link } from "react-router-dom";
// import axiosInstance from "../../config/axios/AxiosConfiguration";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-phone-number-input/style.css"; // Import the styles
// import PhoneInput from "react-phone-number-input"; // Import the PhoneInput component
// import { auth } from "../../config/firebase.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import Button from "react-bootstrap/Button";
// import OtpInput from "react-otp-input";
// import { RotatingLines } from "react-loader-spinner";
// import Form from "react-bootstrap/Form";
// import { countryOptions } from "../AdminDashboard/Countrycode.jsx";
// import Select from "react-select";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

// function UserLogin() {
//   const defaultCountryCode = "+91"; // Change this to the desired country code
//   const defaultSelectedOption = countryOptions.find(
//     (country) => country.value === defaultCountryCode
//   );

//   const navigate = useNavigate();
//   const [isphone, setIsphone] = useState(false);
//   const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
//   const [sendotp, setSendotp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [loadingOtp, setLoadingOtp] = useState(false);
//   const [enteredOtp, setEnteredOtp] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(40);
//   const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
//   const [phoneNumberOTPCalled, setPhoneNumberOTPCalled] = useState(false);
//   const [resendotpClicked, setresendotpClicked] = useState(false)
//   const [secondrecaptchaResend,setsecondrecaptchaResend] = useState(false)
//   const [thirdrecaptchaResend,setthirdrecaptchaResend] = useState(false)


//   const [selectedCountry, setSelectedCountry] = useState(
//     defaultSelectedOption || selectedCountry
//   );

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//     // formik.setFieldValue("phone", {
//     //   ...loginData.phone,
//     //   // country: selectedOption.value,
//     // });
//   };
//   const [loginData, setLoginData] = useState({
//     name: "",
//     email: "",
   
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       phone: "",
//       password: "",
//     },

//     onSubmit: async (values, { resetForm }) => {
//       // console.log("entered");
//       let loginResponse;
//       try {
//         if (isphone) {
//           setLoading(true)
//           const data = await enteredOtp.confirm(otp);
//           // console.log("2");
//           // console.log("dataaaaaaaa", data);
//           const user = data.user;
//           if (user.phoneNumber) {
//             // setLoading(true);
//             loginResponse = await axiosInstance.post(
//               "userapp/api/login/phone/",
//               {
//                 phone: user.phoneNumber,
//                 // password: 'None',
//                 // email : 'ssijup@gmail.com',
//               }
//             );
//             if (loginResponse.data.access) {
//               localStorage.setItem("usertoken", loginResponse.data.access);
//               // localStorage.removeItem("product_id");
//               // localStorage.removeItem("influ_1");
//               // localStorage.removeItem("org_2");
//               // localStorage.removeItem("li");
//               // setLoading(false);
//               setLoading(false);
//               navigate("/user");
//             }
//           } else {
//             setLoading(false);
//             setIscaptchaVerified(false);
//             setSendotp(false);
//             toast.error("Invaid credentials");
//           }
//         } else {
//           const validationResponse = await axiosInstance.post(
//             "userapp/user/login",
//             values
//           );
          
//           setLoading(true);

//           if (validationResponse.data.message === "User verified") {
//             loginResponse = await axiosInstance.post(
//               "userapp/api/login/",
//               values
//             );
//             // console.log(loginResponse.data);
//             setLoading(true);
//             if (loginResponse.data.access) {
//               localStorage.setItem("usertoken", loginResponse.data.access);
//               toast.success("Logged in successfully");
//               setLoading(false);
//               navigate("/user");
//               resetForm();
//             } else {
//               // Handle the case where the user is not valid
//               // setIscaptchaVerified(false);
//               setIscaptchaVerified(false);
//               setLoading(false)
//               toast.error("Invalid credentials");
//             }
//           } else {
//             // Handle the case where the user is not valid
//             setLoading(false)
//             toast.error("Invalid number");
//           }
//         }
//       } catch (error) {
//         if (error.code === "auth/code-expired") {
//           setIscaptchaVerified(false);
//           setLoading(false)
//           toast.error("OTP Expired");
//           // Handle accordingly
//         } else if (error.code === "auth/invalid-verification-code") {
//           setIscaptchaVerified(false);
//           setLoading(false)
//           // setSendotp(false);
//           toast.error("Invalid OTP");
//         } else if (error.code === "auth/invalid-phone-number") {
//           setIscaptchaVerified(false);
//           setLoading(false)
//           toast.error("Invalid phone number format");
          
//         } else {
//           setLoading(false);
//           setIscaptchaVerified(false);
//           setSendotp(false);
//           toast.error("Invalid credentials");
          
//         }
//       }
//     },
//   });

//   const loadingContainerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//   };

//   useEffect(() => {
//     formik.setValues({
//       ...formik.values,
//       email: loginData.email,
//       phone: loginData.phone,
//     });
//   }, [loginData]);

//   const [inputLenth, setinputLength] = useState(0);

//   const handleInputChangeForDynamicInput = (e) => {
//     const inputValue = e.target.value;
//     if (!isphone) {
//       const inputLength = inputValue.length;
//       setinputLength(inputLength);
//       // console.log("nnnnnnnnninputValue", inputLength, inputValue);
//     }

//     const phoneRegex = /^\+?\d+$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (phoneRegex.test(inputValue)) {
//       setIsphone(true);
//       setLoginData({
//         phone: inputValue,
//       });
//       setEnteredPhoneNumber(inputValue);
//     } else if (emailRegex.test(inputValue)) {
//       setIsphone(false);
//       setLoginData({
//         email: inputValue,
//       });
//     } else {
//       setIsphone(false);
//       setLoginData({
//         contact: inputValue,
//       });
//     }
//   };

//   const mergeCountryCodeWithPhonenumber = async () => {
//   // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
//     let phonenumber = loginData.phone;
//     let value = "";
//     // if (!phonenumber.startsWith("+")) {
//     if (selectedCountry) {
//       // console.log(selectedCountry);

//       value = selectedCountry.value;
//       // console.log("countryCode ..........", value);
//       let mergedPhoneNumber = `${value}${phonenumber}`;
//       // console.log("mergedPhoneNumber", mergedPhoneNumber);
      
//        setPhoneNumberOTP(mergedPhoneNumber);
//     } else {
//       toast.error("Plese select country code ");
//     }
//   };

//   const setPhoneNumberOTP = async (mergedPhoneNumber) => {
//     setIscaptchaVerified(true);

//     try {
//       const phonenumber = mergedPhoneNumber
      
//       // console.log(phonenumber);
//       // console.log('1')
//       let recaptcha ;
//       if(thirdrecaptchaResend){
//         window.location.reload()
        
//       }
//       else if(secondrecaptchaResend){
//         setthirdrecaptchaResend(true)
//         recaptcha = new RecaptchaVerifier(auth, "secondrecaptchaResend", {
//           size: "invisible",
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             // onSignInSubmit();
//           },
//         });
//       }
//       else if(resendotpClicked){
//         setsecondrecaptchaResend(true)
//          recaptcha = new RecaptchaVerifier(auth, "recaptchaResend", {
//           size: "invisible",
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             // onSignInSubmit();
//           },
//         });
//       }else{
//          recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
//           size: "invisible",
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             // onSignInSubmit();
//           },
//         });
//       }
      
//       // console.log('3')
//       // console.log("recaptchaVerifier wewe", recaptcha);
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         phonenumber,
//         recaptcha
//       );
//       setSendotp(true);
//       setIscaptchaVerified(false);
//       // console.log("confirmation", confirmation);
//       setEnteredOtp(confirmation);
//     } catch (error) {
//       // let phonenumber1 = enteredPhoneNumber;
//       // if (!phonenumber1.startsWith("+")) {
//       //   // If not, concatenate +91 with the number
//       //   // phonenumber = `+91${phonenumber}`;
//       //   setIscaptchaVerified(false);
//       //   toast.error("Please select the country code ");
//         if (error.code === "auth/too-many-requests") {
//           setIscaptchaVerified(false);
//           // console.log(error);
//           toast.error("Sorry.. too many requets.Please try after sometime ");
//         } else if (
//           error.code === "reCAPTCHA has already been rendered in this element"
//         ) {
//           setIscaptchaVerified(false);
//           toast.error('Multiple requests at a time')
//           // setPhoneNumberOTP()
//         } else if (error.code === "auth/argument-error") {
//           if (!phoneNumberOTPCalled) {
//             setPhoneNumberOTPCalled(true);
//             // await setPhoneNumberOTP();  // Only call it once
//           }
//           // setPhoneNumberOTP()
//         } else if (error.code === "auth/invalid-phone-number") {
//           setIscaptchaVerified(false);
//           toast.error("Invaid number..Check the number you entered");
//         } else if (
//           error.code === "reCAPTCHA has already been rendered in this element"
//         ) {
//           setIscaptchaVerified(false);
//           toast.error();
//           // console.log(error);
//         } else {
//           setIscaptchaVerified(false);
//           // toast.error("Error");
//           // console.log(error);
//         }
//         // console.log('sendotperror','auth/argument-error',error)
//       }
//     };
 
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

//   // const resendOtp = async () => {
//   //   try {
//   //     setLoadingOtp(true);
//   //     // Add logic to resend OTP
//   //     // This can be similar to the logic in setPhoneNumberOTP
//   //     setSendotp(false);
//   //     console.log('enteredPhoneNumber', enteredPhoneNumber)
//   //     await setPhoneNumberOTP(enteredPhoneNumber);
//   //     setResendTimer(45); // Reset the timer
//   //   } catch (error) {
//   //     console.error("Error resending OTP:", error);
//   //   } finally {
//   //     setLoadingOtp(false);
//   //   }
//   // };

//   const resendOtp = async () => {
//     // document.getElementById("recaptcha").innerHTML = "";
//     // console.log('resend cli')
//     let phonenumber = loginData.phone;
//     let value = "";
//     try {
//       // setIscaptchaVerified(false)
//       setresendotpClicked(true)
//       setLoadingOtp(true);
//       setSendotp(false);

//       // Resend OTP using the current phone number from formik values
//       // const phonenumber = formik.values.phone;
//       console.log("enteredPhoneNumber", phonenumber);
//       value = selectedCountry.value;
//       let mergedPhoneNumber = `${value}${phonenumber}`;
//       // setPhoneNumberOTP(mergedPhoneNumber);
//       await setPhoneNumberOTP(mergedPhoneNumber);

//       setResendTimer(40); // Reset the timer
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//     } finally {
//       setLoadingOtp(false);
//     }
//   };

//   // const resendOtp = async () => {
//   //   try {
//   //     setLoadingOtp(true);
//   //     setSendotp(false);
//   //     console.log('enteredPhoneNumber', enteredPhoneNumber);

//   //     // Resend OTP using the existing enteredOtp
//   //     await enteredOtp.confirm(otp);

//   //     setResendTimer(45); // Reset the timer
//   //   } catch (error) {
//   //     console.error("Error resending OTP:", error);
//   //   } finally {
//   //     setLoadingOtp(false);
//   //   }
//   // };

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

//   return (
//     <>
//       <TopNav />
//       <div className="container-fluid">
//       <div id="recaptcha" className="mb-3"></div>
//       <div id="recaptchaResend" className="mb-3"></div>
//       <div id="secondrecaptchaResend" className="mb-3"></div>

      
//         <div className="row justify-content-center align-items-center vh-100">
//           <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h3 className="card-title text-center mb-4">Login</h3>
//                 <form id="userlogin" onSubmit={formik.handleSubmit}>
//                   <div className="mb-3">
//                     {sendotp ? null : (
//                       <label className="form-label">Email or Phone</label>
//                     )}

//                     {sendotp ? (
//                       <>
//                         <label className="mb-3">Enter your OTP</label>
//                         <OtpInput
//                           value={otp}
//                           onChange={setOtp}
//                           numInputs={6}
//                           renderSeparator={<span></span>}
//                           renderInput={(props) => <input {...props} />}
//                           inputStyle={{
//                             width: "100%",
//                             height: "40px",
//                             borderRadius: "5px",
//                             marginRight: "0.5rem",
//                             marginBottom: "0.5rem",
//                           }}
//                           isInputNum
//                           shouldAutoFocus
//                         />
//                         <div className="text-center">
//                           <Button
//                             form="userlogin"
//                             type="submit"
//                             style={{ backgroundColor: "#081d29" }}
//                             className="w-75 mt-4 mb-4"
//                             disabled={loadingOtp}
//                           >
//                             {loadingOtp ? "Sending OTP..." : "Verify & login"}
//                           </Button>
//                         </div>
//                         <div className="d-flex align-items-center justify-content-between">
//                           <p>Resend OTP in {resendTimer} seconds</p>
//                           {resendTimer > 0 || loadingOtp ? (
//                             <p></p>
//                           ) : (
//                             <label
//                               onClick={resendOtp}
//                               style={{ cursor: "pointer" }}
//                             >
//                               Resend OTP
//                             </label>
//                           )}
//                         </div>
//                       </>
//                     ) : null}
//                     {isphone ? (
//                       sendotp ? null : (
//                         <>
//                         <Row className="mb-2">
//                           <Col md={12}>
//                           <div
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                 }}
//                               >
//                           <Select
//                             options={countryOptions.map((country) => ({
//                               value: country.value,
//                               label: ` ${country.value} ${country.label}`,
//                             }))}
//                             value={selectedCountry || defaultSelectedOption}
//                             onChange={handleCountryChange}
//                             defaultInputValue={
//                               defaultSelectedOption
//                                 ? ` ${defaultSelectedOption.value} ${defaultSelectedOption.label}`
//                                 : ""
//                             }
//                             styles={{
//                               control: (provided) => ({
//                                 ...provided,
//                                 width: "130px",
//                               }),
//                             }}
//                             inputProps={{ "aria-required": true }}
//                             isSearchable
//                           />

//                           <Form.Control
//                             type="tel"
//                             placeholder="Enter phone number"
//                             autoFocus
//                             value={enteredPhoneNumber}
                         
//                             onChange={handleInputChangeForDynamicInput}
//                             name="phone"
//                             isInvalid={
//                               formik.touched.phone && !!formik.errors.phone
//                             }
//                             style={{ marginLeft: "10px" }} 
//                             required
//                           />

//                       </div>
//                           </Col>
//                         </Row>
//                         </>
//                       )
//                     ) : (
//                       <input
//                         type="text"
//                         name="contact"
//                         value={loginData.contact}
//                         onChange={handleInputChangeForDynamicInput}
//                         className="form-control"
//                         placeholder="Enter email or phone"
//                         autoFocus
//                         required
//                       />
//                     )}
//                     <div
//                       style={{ display: "none" }}
//                       id="emailHelp"
//                       className="form-text"
//                     >
//                       {/* We'll never share your email with anyone else. */}
//                     </div>
//                   </div>

//                   {isphone ? (
//                     <>
//                       {sendotp ? null : (
//                         <>
//                         {iscaptchaVeriffied ? (
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
//                           <p className="mt-3 text-danger">
//                             You will receive an OTP to the entered mobile number
//                           </p>

//                           <Button
//                             onClick={mergeCountryCodeWithPhonenumber}
//                             form="userlogin"
//                             style={{ backgroundColor: "#081d29" }}
//                             className="w-100 mb-3"
//                           >
//                             {formik.isValidating ? "Validating..." : "Send OTP"}
//                           </Button>
//                           </>
//                         ) }
                          
                          

//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       {inputLenth > 2 && (
//                         <div className="mb-3">
//                           <label
//                             htmlFor="exampleInputPassword1"
//                             className="form-label"
//                           >
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             name="password"
//                             value={formik.values.password}
//                             onChange={formik.handleChange}
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             placeholder="Enter password"
//                           />
//                         </div>
//                       )}

//                       <button
//                         form="userlogin"
//                         type="submit"
//                         style={{ backgroundColor: "#081d29" }}
//                         className="btn text-white w-100"
//                       >
//                         Login
//                       </button>
//                     </>
//                   )}

//                   {sendotp ? null : (
//                     <>
//                       {/* <Link to='/user/forgotpassword' style={{color:'black',textDecoration:'none',textAlign:'end',marginTop:'10px'}}>Forgot password ?</Link> */}
//                       {/* <Link
//                         to="/user/forgotpassword"
//                         style={{
//                           color: "black",
//                           textDecoration: "none",
//                           textAlign: "end",
//                           marginTop: "10px",
//                         }}
//                       >
//                         {inputLenth > 2 && !isphone  "Forgot password"}
                       
//                       </Link> */}
//                       {inputLenth > 2 && !isphone && (
//                         <Link
//                           to="/user/forgotpassword"
//                           style={{
//                             color: "black",
//                             textDecoration: "none",
//                             textAlign: "end",
//                             marginTop: "10px",
//                           }}
//                         >
//                           Forgot password
//                         </Link>
//                       )}
//                     </>
//                   )}
//                 </form>
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* {iscaptchaVeriffied ? ( */}
//                   {/* <div className="text-center d-flex align-items-center justify-content-center"> */}
//                     {/* <p className="text-warning">hai</p> */}
//                     {/* <div id="recaptcha" className="mb-3"></div> */}
//                   {/* </div> */}
//                 {/* ) : null} */}
//     </>
//   );
// }

// export default UserLogin;


