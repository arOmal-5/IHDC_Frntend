import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import OtpInput from 'react-otp-input';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { forgotpassword } from '../../schema/userSchema/ForgotPassword.jsx'
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('');
  const [isemail,setIsemail] = useState(false)
  
const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      new_password: '',
      otp:'',
      confirmpassword: ''
    },
    validationSchema: forgotpassword,
    onSubmit: async(values) => {
try {
  const response= await axiosInstance.post('userapp/forgot-password-email/confirm',values,)
  console.log(response.data);
  if(response.data.message==='password changed successfully'){
    toast.success(response.data.message)
    navigate('/user/login')
  }
} catch (error) {
  console.log(error);
}
    }

  })

  console.log(formik.values);


  useEffect(() => {
    formik.setFieldValue('otp', otp);
  }, [otp]);


  const handleOtpSend = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('userapp/forgot-password-email/request', { email })
      console.log('response', response.data.message);
      
      if(response.data.message ==='OTP sent successfully to your email'){
        formik.setFieldValue('email', email);
        
        
        setIsemail(true)
      }
      toast.success(response.data.message)
    } catch (errors) {
      console.log(errors);
      toast.error('Email does not exists. Enter valid email' )
    }
  }
  
  const renderInput = (input, index) => {
    return (
      <Form.Control
        key={index}
        type="text"
        {...input}
        className="otp-input"
        autoComplete="off"
      />
    );
  };

  return (
    <>
   
      {
        isemail ? (
          
          <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
              <h3 className="card-title text-center mb-4">Forgot Password</h3>
              <Form className="text-center" id='forgot' onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    inputStyle={{
                      width: '3rem',
                      height: '3rem',
                      marginRight: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                    isInputNum
                    shouldAutoFocus
                    containerStyle="d-flex justify-content-center"
                    renderInput={renderInput}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name='new_password'
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.new_password && formik.errors.new_password}

                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.new_password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  
                  <Form.Control
                    type="password"
                    name='confirmpassword'
                    placeholder="Confirm password"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.confirmpassword && formik.errors.confirmpassword}

                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmpassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" form='forgot' type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </div>
          </div >
        ) : (
          <div className="container" style={{ width: '100%', maxWidth: '850px' }}>
            <div className="row justify-content-center align-items-center vh-100">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4">Forgot Password</h3>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                      </div>
                      <button type="submit" onClick={handleOtpSend} className="btn btn-primary w-100">
                        Send OTP
                      </button>
                    </form>
                    <div className="text-start mt-3">
                      <Link to="/user/login" className="text-decoration-none text-dark">
                        Remember password? Login here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ForgotPassword;











// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import OtpInput from 'react-otp-input';
// import { Form, Button } from 'react-bootstrap';
// import { useFormik } from 'formik';
// import { forgotpassword } from '../../schema/userSchema/ForgotPassword.jsx'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('')
//   const [otp, setOtp] = useState('');
//   const [isemail, setIsemail] = useState(true)

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmpassword: ''
//     },
//     validationSchema: forgotpassword,
//     onSubmit: (values) => {

//     }

//   })

//   console.log(formik.values);





//   const handleOtpSend = async () => {
//     try {
//       const response = await axiosInstance.post('userapp/forgot-password-email/request', { email })
//       console.log('response', response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const renderInput = (input, index) => {
//     return (
//       <Form.Control
//         key={index}
//         type="text"
//         {...input}
//         className="otp-input"
//         autoComplete="off"
//       />
//     );
//   };

//   return (
//     <>
//       {
//         isemail ? (
//           <div className="container" style={{ width: '100%', maxWidth: '850px' }}>
//             <div className="row justify-content-center align-items-center vh-100">
//               <div className="col-md-6">
//                 <div className="card">
//                   <div className="card-body p-4">
//                     <h3 className="card-title text-center mb-4">Forgot Password</h3>
//                     <form>
//                       <div className="mb-3">
//                         <label htmlFor="email" className="form-label">
//                           Email address
//                         </label>
//                         <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
//                       </div>
//                       <button type="submit" onClick={handleOtpSend} className="btn btn-primary w-100">
//                         Send OTP
//                       </button>
//                     </form>
//                     <div className="text-start mt-3">
//                       <Link to="/user/login" className="text-decoration-none text-dark">
//                         Remember password? Login here
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="container d-flex justify-content-center align-items-center vh-100">
//             <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
//               <h3 className="card-title text-center mb-4">Forgot Password</h3>
//               <Form className="text-center" id='forgot' onSubmit={formik.handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <OtpInput
//                     value={otp}
//                     onChange={setOtp}
//                     numInputs={6}
//                     separator={<span>-</span>}
//                     inputStyle={{
//                       width: '3rem',
//                       height: '3rem',
//                       marginRight: '0.5rem',
//                       marginBottom: '0.5rem'
//                     }}
//                     isInputNum
//                     shouldAutoFocus
//                     containerStyle="d-flex justify-content-center"
//                     renderInput={renderInput}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   {/* <Form.Label>Password</Form.Label> */}
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     name='password'
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.password && formik.errors.password}

//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.password}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
                  
//                   <Form.Control
//                     type="password"
//                     name='confirmpassword'
//                     placeholder="Confirm password"
//                     value={formik.values.confirmpassword}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.confirmpassword && formik.errors.confirmpassword}

//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.confirmpassword}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Button variant="primary" form='forgot' type="submit" className="w-100">
//                   Submit
//                 </Button>
//               </Form>
//             </div>
//           </div >
//         )
//       }
//     </>
//   );
// };

// export default ForgotPassword;