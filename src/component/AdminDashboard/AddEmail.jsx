import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OtpInput from 'react-otp-input';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { RotatingLines } from "react-loader-spinner";
import MyContext from '../../store/MyContext';
import { useContext } from 'react';



function AddEmail({setUpdateTrigger}) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [isotp, setIsotp] = useState(false)
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const {profileTriger,setProfileTriger}=useContext(MyContext)


    const token = localStorage.getItem("usertoken");


    const formik = useFormik({
        initialValues: {
            email: '',

            // password: '',
            // confirmpassword: ''
        }
    })

    const loadingContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      };

    // console.log('formik values',formik.values);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlesubmmitOtp = async (e) => {
        e.preventDefault()
        try {
            
            setLoading(true)
          const response = await axiosInstance.post('userapp/user/email/updation/confirmation',
           {
             email : formik.values.email , otp : otp
            },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log('response', response.data.message);
          
          if(response.data.message ==='Your email updated successfully'){
            // formik.setFieldValue('email', email);
            setUpdateTrigger(Date.now())
            setProfileTriger(Date.now())
            setLoading(false)
            setIsotp(false)
            handleClose()
            toast.success(response.data.message)

          }
         
         
          
          
        } catch (errors) {
            setLoading(false)

          console.log(errors);
          toast.error(errors.response.data.message)
        //   toast.error('Error')
        }
      }


    const handleOtpSend = async (e) => {
        e.preventDefault()
        try {
            
            setLoading(true)
          const response = await axiosInstance.post('userapp/user/email/updation/request', { email : formik.values.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log('response', response.data.message);
          
          if(response.data.message ==='OTP sent successfully to your email'){
            formik.setFieldValue('email', email);
            setLoading(false)

            
            // setEmail(true)
            // setIsotp(true)
          }
         
          if ( response.data.message=== "No updation required"){
            console.log('response.data.messageNOOOOO')    
            setLoading(false)

            handleClose()
          }else{
            setLoading(false)
            setIsotp(true)
            toast.success(response.data.message)
        }
          
          
        } catch (errors) {
            setLoading(false)

          console.log(errors);
          toast.error(errors.response.data.message)
        }
      }


    const handleClose = () =>{
        setIsotp(false)
        setEmail(email)
        setShow(false);
    } 
    const handleShow = () => setShow(true);

    if (loading) {
        return (
          <div style={loadingContainerStyle}>
            <RotatingLines
              opacity
              type="RotatingLines"
              color="#6da8ba"
              height={100}
              width={100}
            />
          </div>
        );
      }
    

    return (
        <>
            <Button className="btn btn-sm text-white p-2 mb-2" onClick={handleShow} style={{ backgroundColor: '#081d29',fontSize:'10px' }}>Edit Email</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                                                    height: '50px',
                                                    textAlign: 'center',
                                                }}
                                            />
                                        )}
                                    />
                                    {/* <Form.Group controlId="formFirstName" className='mb-3 mt-4'>
                                        <Form.Label className="text-secondary">Password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formik.values.password}
                                            name="password"
                                            placeholder='Enter your password'
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </Form.Group> */}
                                    {/* <Form.Group controlId="formFirstName">
                                        <Form.Label className="text-secondary">Re-enter password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formik.values.confirmpassword}
                                            name="confirmpassword"
                                            placeholder='Re-enter your password'
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </Form.Group> */}

                                    <Button className='w-100 mt-4' style={{ backgroundColor: '#081d29', }} onClick={handlesubmmitOtp}>Verify & Update</Button>
                                </>
                            ) : (
                                <>
                                    <Form.Group controlId="formFirstName" className='mb-3'>
                                        <Form.Label className="text-secondary">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={formik.values.email}
                                            name="email"
                                            placeholder='Enter your Email address'
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <p className='text-danger text-center'>otp will send to your entered Email address </p>
                                    <Button className='w-100' style={{ backgroundColor: '#081d29' }} onClick={handleOtpSend}>Send OTP</Button>
                                </>
                            )
                        }
                    </Form>
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

export default AddEmail;




















// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import OtpInput from 'react-otp-input';
// import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { RotatingLines } from "react-loader-spinner";



// function AddEmail() {
//     const [show, setShow] = useState(false);
//     const [email, setEmail] = useState('');
//     const [isotp, setIsotp] = useState(false)
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);


//     const token = localStorage.getItem("usertoken");


//     const formik = useFormik({
//         initialValues: {
//             email: '',

//             // password: '',
//             // confirmpassword: ''
//         }
//     })

//     const loadingContainerStyle = {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "rgba(255, 255, 255, 0.7)",
//       };

//     // console.log('formik values',formik.values);

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handlesubmmitOtp = async (e) => {
//         e.preventDefault()
//         try {
            
//             setLoading(true)
//           const response = await axiosInstance.post('userapp/user/email/updation/confirmation',
//            {
//              email : formik.values.email , otp : otp
//             },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           console.log('response', response.data.message);
          
//           if(response.data.message ==='Your email updated successfully'){
//             // formik.setFieldValue('email', email);
//             setLoading(false)
//             setIsotp(false)
//             handleClose()
//             toast.success(response.data.message)

            
            
//           }
         
         
          
          
//         } catch (errors) {
//             setLoading(false)

//           console.log(errors);
//           toast.error(errors.response.data.message)
//         //   toast.error('Error')
//         }
//       }


//     const handleOtpSend = async (e) => {
//         e.preventDefault()
//         try {
            
//             setLoading(true)
//           const response = await axiosInstance.post('userapp/user/email/updation/request', { email : formik.values.email },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           console.log('response', response.data.message);
          
//           if(response.data.message ==='OTP sent successfully to your email'){
//             formik.setFieldValue('email', email);
//             setLoading(false)

            
//             // setEmail(true)
//             // setIsotp(true)
//           }
         
//           if ( response.data.message=== "No updation required"){
//             console.log('response.data.messageNOOOOO')    
//             setLoading(false)

//             handleClose()
//           }else{
//             setLoading(false)
//             setIsotp(true)
//             toast.success(response.data.message)
//         }
          
          
//         } catch (errors) {
//             setLoading(false)

//           console.log(errors);
//           toast.error(errors.response.data.message)
//         }
//       }


//     const handleClose = () =>{
//         setIsotp(false)
//         setEmail(email)
//         setShow(false);
//     } 
//     const handleShow = () => setShow(true);

//     if (loading) {
//         return (
//           <div style={loadingContainerStyle}>
//             <RotatingLines
//               opacity
//               type="RotatingLines"
//               color="#6da8ba"
//               height={100}
//               width={100}
//             />
//           </div>
//         );
//       }
    

//     return (
//         <>
//             <Button className="btn btn-sm text-white" onClick={handleShow} style={{ backgroundColor: '#081d29' }}>Update Email</Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Email</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         {
//                             isotp ? (
//                                 <>

//                                     <Form.Label className="text-secondary">Enter your OTP</Form.Label>
//                                     <OtpInput
//                                         value={otp}
//                                         onChange={setOtp}
//                                         numInputs={6}
//                                         renderSeparator={<span>-</span>}
//                                         renderInput={(props, index) => (
//                                             <input
//                                                 {...props}
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '50px',
//                                                     textAlign: 'center',
//                                                 }}
//                                             />
//                                         )}
//                                     />
//                                     {/* <Form.Group controlId="formFirstName" className='mb-3 mt-4'>
//                                         <Form.Label className="text-secondary">Password</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             value={formik.values.password}
//                                             name="password"
//                                             placeholder='Enter your password'
//                                             onChange={formik.handleChange}
//                                             required
//                                         />
//                                     </Form.Group> */}
//                                     {/* <Form.Group controlId="formFirstName">
//                                         <Form.Label className="text-secondary">Re-enter password</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             value={formik.values.confirmpassword}
//                                             name="confirmpassword"
//                                             placeholder='Re-enter your password'
//                                             onChange={formik.handleChange}
//                                             required
//                                         />
//                                     </Form.Group> */}

//                                     <Button className='w-100 mt-4' style={{ backgroundColor: '#081d29', }} onClick={handlesubmmitOtp}>Verify & Update</Button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Form.Group controlId="formFirstName" className='mb-3'>
//                                         <Form.Label className="text-secondary">Email</Form.Label>
//                                         <Form.Control
//                                             type="email"
//                                             value={formik.values.email}
//                                             name="email"
//                                             placeholder='Enter your Email address'
//                                             onChange={formik.handleChange}
//                                             required
//                                         />
//                                     </Form.Group>

//                                     <p className='text-danger text-center'>otp will send to your entered Email address </p>
//                                     <Button className='w-100' style={{ backgroundColor: '#081d29' }} onClick={handleOtpSend}>Send OTP</Button>
//                                 </>
//                             )
//                         }
//                     </Form>
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

// export default AddEmail;