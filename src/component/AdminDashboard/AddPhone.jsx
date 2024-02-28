import { useState , useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OtpInput from 'react-otp-input';
import { countryOptions } from '../../page/AdminDashboard/Countrycode';
import Select from "react-select";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
import { auth } from "../../config/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { XlviLoaderComponent } from '../../config/loading2.jsx';
import MyContext from '../../store/MyContext.jsx';

function AddPhone({currentPhone,setUpdateTrigger}) {
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState(currentPhone);
    const [isotp, setIsotp  ] = useState(false)
    const [otp, setOtp] = useState('');
    const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState(null);
    const [sendotp, setSendotp] = useState(false);
    const [resendTimer, setResendTimer] = useState(40);
    const [loadingOtp, setLoadingOtp] = useState(false);
    const{profileTriger,setProfileTriger}=useContext(MyContext)
    const token = localStorage.getItem("usertoken");



    const defaultCountryCode = "+91"; // Change this to the desired country code
    const defaultSelectedOption = countryOptions.find(
      (country) => country.value === defaultCountryCode
    );
    const [selectedCountry, setSelectedCountry] = useState(
        defaultSelectedOption || selectedCountry
      );
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
   
  };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handlesendOtp = async() => {
        try {
            // console.log(otp, 'CURRENT OTP')
            const data = await enteredOtp.confirm(otp);
            const user = data.user;
            if (user.phoneNumber) {
              // console.log('user.phoneNumber', user.phoneNumber);
              // console.log("Phone number is verified:", user.phoneNumber);
          
            //   let phoneUpdationResponse; // Declare the variable here
              const phoneUpdationResponse = await axiosInstance.patch(
                'userapp/user/phone/number/updation',
                {
                  phone: user.phoneNumber,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log(phoneUpdationResponse); // Fix the variable name here
              if (phoneUpdationResponse.data.message === 'Your phone number updated successfully') {
                // formik.setFieldValue('email', email);
                setUpdateTrigger(Date.now())
                setProfileTriger(Date.now())
                setLoading(false);
                setIsotp(false);
                handleClose();
                toast.success(phoneUpdationResponse.data.message); // Fix the variable name here
              }
            }
          
           
             
        } catch (error) {
            console.log(error);
        setLoading(false);
        if (error.code === "auth/code-expired") {
          // setIscaptchaVerified(false);
          console.log("OTP Expired.");
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
        }
        
         else if(error.code === "auth/network-request-failed") {
            setLoading(false);
            setIscaptchaVerified(false);
            toast.error("Request failed.. Check your network connection");
        }
        else {
            console.log()
        }
            
        }
        
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        setPhone(currentPhone);
      }, [currentPhone]);

      const mergeCuntryCodeWithPhonenumber = async () => {
        setLoading(true)
        let phonenumber = phone;
        let value = "";
        // if (!phonenumber.startsWith("+")) {
        if (selectedCountry) {
          console.log(selectedCountry);
    
          value = selectedCountry.value;
          console.log("countryCode ..........", value);
          let mergedPhoneNumber = `${value}${phonenumber}`;
          console.log("mergedPhoneNumber", mergedPhoneNumber);
          setPhoneNumberOTP(mergedPhoneNumber);
        } else {
          toast.error("Plese select country code ");
        }
      };

      const setPhoneNumberOTP = async (mergedPhoneNumber) => {
        try {
          setLoading(true)
          setIscaptchaVerified(true);
          
          const response = await axiosInstance.post(
            "userapp/user/register/phonenumber/already/exists/check",
            {
              phone: mergedPhoneNumber,
              email : null
            }
          );
          // let phonenumber = registrationData.phone;
          // if (!phonenumber.startsWith("+")) {
          //   // If not, concatenate +91 with the number
          //   phonenumber = +91${phonenumber};
          // }
            console.log('hot merge',mergedPhoneNumber)
          const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // onSignInSubmit();
            },
          });
          console.log("rexcaptchaVerifier", recaptcha);
          const confirmation = await signInWithPhoneNumber(
            auth,
            mergedPhoneNumber,
            recaptcha
          );
          setSendotp(true);
          setIscaptchaVerified(false);
          console.log("confirmation", confirmation);
          setLoading(false);
          setEnteredOtp(confirmation);
          setIsotp(true)
          

          // Assuming you have a state variable named enteredOtp
        } catch (error) {
          setLoading(false);
          if (error.code === "auth/invalid-phone-number") {
            console.log("Invalid phone number format.. Please check your number.");
            setIscaptchaVerified(false);
            toast.error("Invalid phone number format");
            setLoading(false);
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.message ===
              "Phone number already exists..Try another one"
          ) {
            console.log('error.response.data.message', error.response.data.message)
            setIscaptchaVerified(false);
            toast.error("This phone number already exists..Try another one");
            setLoading(false);   
        } else if (
              error.response &&
              error.response.data &&
              error.response.data.message ===
                "This email already exists .Try another one"
            ) {
                setLoading(false);
                setIscaptchaVerified(false);
              toast.error("This email already exists .Try another one");
          } else if (error.code === "auth/too-many-requests") {
            setIscaptchaVerified(false);
            setLoading(false);
            toast.error("Too many requests. Please try after sometime.");
          } else {
            setIscaptchaVerified(false);
            setLoading(false);           
             toast.error("Something when wrong..Please try again");
          }
          setLoading(false);

          console.log(error);
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
        let phonenumber = phone;
        let value = "";
        
        let mergedPhoneNumber;
        try {
            setIsotp(false)
          setLoadingOtp(true);
          // Add logic to resend OTP
          // This can be similar to the logic in setPhoneNumberOTP
          
          setSendotp(false);
          
          // await setPhoneNumberOTP();
          value = selectedCountry.value;
          // console.log("countryCode ..........", value);
          if(phonenumber.startsWith("+")){
             mergedPhoneNumber = phonenumber;
          }else {
             mergedPhoneNumber = `${value}${phonenumber}`;
          }
        //   if (!phonenumber.startsWith())
          
          // console.log("mergedPhoneNumber", mergedPhoneNumber);
        //   await setPhoneNumberOTP(mergedPhoneNumber);
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // onSignInSubmit();
            },
          });
          console.log("rexcaptchaVerifier", recaptcha);
          const confirmation = await signInWithPhoneNumber(
            auth,
            mergedPhoneNumber,
            recaptcha
          );
          setSendotp(true);
          setIscaptchaVerified(false);
          console.log("confirmation", confirmation);
          setLoading(false);
          setEnteredOtp(confirmation);
          setIsotp(true)
          setResendTimer(40); // Reset the timer
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/invalid-phone-number") {
              console.log("Invalid phone number format.. Please check your number.");
              setIscaptchaVerified(false);
              toast.error("Invalid phone number format");
              setLoading(false);
            } else if (
              error.response &&
              error.response.data &&
              error.response.data.message ===
                "Phone number already exists..Try another one"
            ) {
              console.log('error.response.data.message', error.response.data.message)
              setIscaptchaVerified(false);
              toast.error("This phone number already exists..Try another one");
              setLoading(false);   
          } else if (
                error.response &&
                error.response.data &&
                error.response.data.message ===
                  "This email already exists .Try another one"
              ) {
                  setLoading(false);
                  setIscaptchaVerified(false);
                toast.error("This email already exists .Try another one");
            } else if (error.code === "auth/too-many-requests") {
              setIscaptchaVerified(false);
              setLoading(false);
              toast.error("Too many requests. Please try after sometime.");
            } else {
              setIscaptchaVerified(false);
              setLoading(false);           
               toast.error("Something when wrong..Please try again");
            }
            setLoading(false);
            console.log(error);
         
        } finally {
          setLoadingOtp(false);
        }
      };

    return (
        <>
            <Button className="btn btn-sm text-white p-2" onClick={handleShow} style={{ backgroundColor: '#081d29',fontSize:'10px' }}>Edit phone</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Phone {currentPhone}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isotp ? (
                            <>
                            <Form.Label className="text-secondary">Enter your OTP</Form.Label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props, index) => (
                                        <input
                                            {...props}
                                            style={{
                                                width: '100%',
                                                height:'50px',
                                                textAlign: 'center',
                                            }}
                                        />
                                    )}
                                />
                                
                                <Button
  className='w-100 mt-4 mb-4'
  style={{ backgroundColor: '#081d29' }}
  onClick={handlesendOtp}
  disabled={loading}  // Disable the button when loading is true
>
  {loading ? (
    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
  ) : (
    <p>Verify OTP</p>
  )}
</Button>
<div className="d-flex align-items-center justify-content-between">
  {resendTimer > 1 || loadingOtp ? (
    <p>Resend OTP in {resendTimer} seconds</p>
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
                                />
                                <Form.Group controlId="formFirstName" className='mb-3'>
                                    <Form.Label className="text-secondary">Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={phone}
                                        name="phone"
                                        placeholder='Enter your phone number'
                                        onChange={handlePhoneChange}
                                        required
                                    />
                                </Form.Group>
                                {/* <p className='text-danger text-center'>otp will send to your entered phone number</p> */}
                                {/* <Button className='w-100' style={{ backgroundColor: '#081d29' }} onClick={handlesendOtp}>Send OTP</Button> */}
                                <>
                                <Button
  onClick={mergeCuntryCodeWithPhonenumber}
  form="register"
  style={{ backgroundColor: "#081d29" }}
  className="w-100"
  disabled={loading}  // Disable the button when loading is true
>
  {loading ? (
    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
  ) : (
    <h6>Proceed</h6>
  )}
</Button>

                                {!sendotp && (
                                  <>
                                    <div id="recaptcha" className="mb-3"></div>

                                    <h6 className='text-primary text-center'>
                                      You will receive an OTP to the entered
                                      mobile number
                                    </h6>
                                  </>
                                )}
                              </>
                            </>
                        )
                    }

                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default AddPhone;
















// import { useState , useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import OtpInput from 'react-otp-input';
// import { countryOptions } from '../../page/AdminDashboard/Countrycode';
// import Select from "react-select";
// import { toast } from "react-toastify";
// import { RotatingLines } from "react-loader-spinner";
// import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
// import { auth } from "../../config/firebase.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// // import { XlviLoaderComponent } from '../../config/loading2.jsx';


// function AddPhone({currentPhone}) {
//     const [show, setShow] = useState(false);
//     const [phone, setPhone] = useState(currentPhone);
//     const [isotp, setIsotp  ] = useState(false)
//     const [otp, setOtp] = useState('');
//     const [iscaptchaVeriffied, setIscaptchaVerified] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [enteredOtp, setEnteredOtp] = useState(null);
//     const [sendotp, setSendotp] = useState(false);
//     const [resendTimer, setResendTimer] = useState(40);
//     const [loadingOtp, setLoadingOtp] = useState(false);

//     const token = localStorage.getItem("usertoken");



//     const defaultCountryCode = "+91"; // Change this to the desired country code
//     const defaultSelectedOption = countryOptions.find(
//       (country) => country.value === defaultCountryCode
//     );
//     const [selectedCountry, setSelectedCountry] = useState(
//         defaultSelectedOption || selectedCountry
//       );
//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
   
//   };

//     const handlePhoneChange = (e) => {
//         setPhone(e.target.value);
//     };
//     const handlesendOtp = async() => {
//         try {
//             console.log(otp, 'CURRENT OTP')
//             const data = await enteredOtp.confirm(otp);
//             const user = data.user;
//             if (user.phoneNumber) {
//               console.log('user.phoneNumber', user.phoneNumber);
//               console.log("Phone number is verified:", user.phoneNumber);
          
//             //   let phoneUpdationResponse; // Declare the variable here
//               const phoneUpdationResponse = await axiosInstance.patch(
//                 'userapp/user/phone/number/updation',
//                 {
//                   phone: user.phoneNumber,
//                 },
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );
//               console.log(phoneUpdationResponse); // Fix the variable name here
//               if (phoneUpdationResponse.data.message === 'Your phone number updated successfully') {
//                 // formik.setFieldValue('email', email);
//                 setLoading(false);
//                 setIsotp(false);
//                 handleClose();
//                 toast.success(phoneUpdationResponse.data.message); // Fix the variable name here
//               }
//             }
          
           
             
//         } catch (error) {
//             console.log(error);
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
//         }
        
//          else if(error.code === "auth/network-request-failed") {
//             setLoading(false);
//             setIscaptchaVerified(false);
//             toast.error("Request failed.. Check your network connection");
//         }
//         else {
//             console.log()
//         }
            
//         }
        
//     }
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     useEffect(() => {
//         setPhone(currentPhone);
//       }, [currentPhone]);

//       const mergeCuntryCodeWithPhonenumber = async () => {
//         setLoading(true)
//         let phonenumber = phone;
//         let value = "";
//         // if (!phonenumber.startsWith("+")) {
//         if (selectedCountry) {
//           console.log(selectedCountry);
    
//           value = selectedCountry.value;
//           console.log("countryCode ..........", value);
//           let mergedPhoneNumber = `${value}${phonenumber}`;
//           console.log("mergedPhoneNumber", mergedPhoneNumber);
//           setPhoneNumberOTP(mergedPhoneNumber);
//         } else {
//           toast.error("Plese select country code ");
//         }
//       };

//       const setPhoneNumberOTP = async (mergedPhoneNumber) => {
//         try {
//           setLoading(true)
//           setIscaptchaVerified(true);
          
//           const response = await axiosInstance.post(
//             "userapp/user/register/phonenumber/already/exists/check",
//             {
//               phone: mergedPhoneNumber,
//               email : null
//             }
//           );
//           // let phonenumber = registrationData.phone;
//           // if (!phonenumber.startsWith("+")) {
//           //   // If not, concatenate +91 with the number
//           //   phonenumber = `+91${phonenumber}`;
//           // }
//             console.log('hot merge',mergedPhoneNumber)
//           const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
//             size: "invisible",
//             callback: (response) => {
//               // reCAPTCHA solved, allow signInWithPhoneNumber.
//               // onSignInSubmit();
//             },
//           });
//           console.log("rexcaptchaVerifier", recaptcha);
//           const confirmation = await signInWithPhoneNumber(
//             auth,
//             mergedPhoneNumber,
//             recaptcha
//           );
//           setSendotp(true);
//           setIscaptchaVerified(false);
//           console.log("confirmation", confirmation);
//           setLoading(false);
//           setEnteredOtp(confirmation);
//           setIsotp(true)
          

//           // Assuming you have a state variable named enteredOtp
//         } catch (error) {
//           setLoading(false);
//           if (error.code === "auth/invalid-phone-number") {
//             console.log("Invalid phone number format.. Please check your number.");
//             setIscaptchaVerified(false);
//             toast.error("Invalid phone number format");
//             setLoading(false);
//           } else if (
//             error.response &&
//             error.response.data &&
//             error.response.data.message ===
//               "Phone number already exists..Try another one"
//           ) {
//             console.log('error.response.data.message', error.response.data.message)
//             setIscaptchaVerified(false);
//             toast.error("This phone number already exists..Try another one");
//             setLoading(false);   
//         } else if (
//               error.response &&
//               error.response.data &&
//               error.response.data.message ===
//                 "This email already exists .Try another one"
//             ) {
//                 setLoading(false);
//                 setIscaptchaVerified(false);
//               toast.error("This email already exists .Try another one");
//           } else if (error.code === "auth/too-many-requests") {
//             setIscaptchaVerified(false);
//             setLoading(false);
//             toast.error("Too many requests. Please try after sometime.");
//           } else {
//             setIscaptchaVerified(false);
//             setLoading(false);           
//              toast.error("Something when wrong..Please try again");
//           }
//           setLoading(false);

//           console.log(error);
//         }
//       };


//       useEffect(() => {
//         let timerInterval;
    
//         if (sendotp) {
//           timerInterval = setInterval(() => {
//             setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
//           }, 1000);
//         }
    
//         return () => {
//           clearInterval(timerInterval);
//         };
//       }, [sendotp]);
    
//       const resendOtp = async () => {
//         let phonenumber = phone;
//         let value = "";
        
//         let mergedPhoneNumber;
//         try {
//             setIsotp(false)
//           setLoadingOtp(true);
//           // Add logic to resend OTP
//           // This can be similar to the logic in setPhoneNumberOTP
          
//           setSendotp(false);
          
//           // await setPhoneNumberOTP();
//           value = selectedCountry.value;
//           // console.log("countryCode ..........", value);
//           if(phonenumber.startsWith("+")){
//              mergedPhoneNumber = phonenumber;
//           }else {
//              mergedPhoneNumber = `${value}${phonenumber}`;
//           }
//         //   if (!phonenumber.startsWith())
          
//           // console.log("mergedPhoneNumber", mergedPhoneNumber);
//         //   await setPhoneNumberOTP(mergedPhoneNumber);
//         const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
//             size: "invisible",
//             callback: (response) => {
//               // reCAPTCHA solved, allow signInWithPhoneNumber.
//               // onSignInSubmit();
//             },
//           });
//           console.log("rexcaptchaVerifier", recaptcha);
//           const confirmation = await signInWithPhoneNumber(
//             auth,
//             mergedPhoneNumber,
//             recaptcha
//           );
//           setSendotp(true);
//           setIscaptchaVerified(false);
//           console.log("confirmation", confirmation);
//           setLoading(false);
//           setEnteredOtp(confirmation);
//           setIsotp(true)
//           setResendTimer(40); // Reset the timer
//         } catch (error) {
//             setLoading(false);
//             if (error.code === "auth/invalid-phone-number") {
//               console.log("Invalid phone number format.. Please check your number.");
//               setIscaptchaVerified(false);
//               toast.error("Invalid phone number format");
//               setLoading(false);
//             } else if (
//               error.response &&
//               error.response.data &&
//               error.response.data.message ===
//                 "Phone number already exists..Try another one"
//             ) {
//               console.log('error.response.data.message', error.response.data.message)
//               setIscaptchaVerified(false);
//               toast.error("This phone number already exists..Try another one");
//               setLoading(false);   
//           } else if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message ===
//                   "This email already exists .Try another one"
//               ) {
//                   setLoading(false);
//                   setIscaptchaVerified(false);
//                 toast.error("This email already exists .Try another one");
//             } else if (error.code === "auth/too-many-requests") {
//               setIscaptchaVerified(false);
//               setLoading(false);
//               toast.error("Too many requests. Please try after sometime.");
//             } else {
//               setIscaptchaVerified(false);
//               setLoading(false);           
//                toast.error("Something when wrong..Please try again");
//             }
//             setLoading(false);
//             console.log(error);
         
//         } finally {
//           setLoadingOtp(false);
//         }
//       };

//     return (
//         <>
//             <Button className="btn btn-sm text-white" onClick={handleShow} style={{ backgroundColor: '#081d29' }}>Update phone</Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Phone {currentPhone}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {
//                         isotp ? (
//                             <>
//                             <Form.Label className="text-secondary">Enter your OTP</Form.Label>
//                                 <OtpInput
//                                     value={otp}
//                                     onChange={setOtp}
//                                     numInputs={6}
//                                     renderSeparator={<span>-</span>}
//                                     renderInput={(props, index) => (
//                                         <input
//                                             {...props}
//                                             style={{
//                                                 width: '100%',
//                                                 height:'50px',
//                                                 textAlign: 'center',
//                                             }}
//                                         />
//                                     )}
//                                 />
                                
//                                 <Button
//   className='w-75 mt-4 mb-4'
//   style={{ backgroundColor: '#081d29' }}
//   onClick={handlesendOtp}
//   disabled={loading}  // Disable the button when loading is true
// >
//   {loading ? (
//     <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//   ) : (
//     <p>Verify OTP</p>
//   )}
// </Button>
// <div className="d-flex align-items-center justify-content-between">
//   {resendTimer > 1 || loadingOtp ? (
//     <p>Resend OTP in {resendTimer} seconds</p>
//   ) : (
//     <label
//       onClick={resendOtp}
//       style={{ cursor: "pointer" }}
//     >
//       Resend OTP
//     </label>
//   )}
// </div>


//                             </>
//                         ) : (
//                             <>
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
//                                 <Form.Group controlId="formFirstName" className='mb-3'>
//                                     <Form.Label className="text-secondary">Phone</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         value={phone}
//                                         name="phone"
//                                         placeholder='Enter your phone number'
//                                         onChange={handlePhoneChange}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 {/* <p className='text-danger text-center'>otp will send to your entered phone number</p> */}
//                                 {/* <Button className='w-100' style={{ backgroundColor: '#081d29' }} onClick={handlesendOtp}>Send OTP</Button> */}
//                                 <>
//                                 <Button
//   onClick={mergeCuntryCodeWithPhonenumber}
//   form="register"
//   style={{ backgroundColor: "#081d29" }}
//   className="w-100"
//   disabled={loading}  // Disable the button when loading is true
// >
//   {loading ? (
//     <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//   ) : (
//     <h6>Proceed</h6>
//   )}
// </Button>

//                                 {!sendotp && (
//                                   <>
//                                     <div id="recaptcha" className="mb-3"></div>

//                                     <h6 className='text-primary text-center'>
//                                       You will receive an OTP to the entered
//                                       mobile number
//                                     </h6>
//                                   </>
//                                 )}
//                               </>
//                             </>
//                         )
//                     }

//                 </Modal.Body>
//                 {/* <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary">Understood</Button>
//         </Modal.Footer> */}
//             </Modal>
//         </>
//     );
// }

// export default AddPhone;