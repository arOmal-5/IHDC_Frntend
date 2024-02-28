import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Changed to clock icon for pending status
import Button from 'react-bootstrap/Button';
import TopNav from '../../component/AdminDashboard/TopNav';
// import { Link } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/AxiosConfiguration";
import { Container, Row, Col, Form,Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import Select from 'react-select';
import AxiosConfiguration from '../../config/axios/AxiosConfiguration.jsx';
import { color, motion } from 'framer-motion';
import logo from '../../Assets/img/ihdclogo.jpg'
import ihdc_image from '../../Assets/img/ihdc_image.jpg'

function RequestPendingPage() {
  const token = localStorage.getItem('usertoken')
  const [userdetails, setuserDetails] = useState({});
  const [stateResponse, setStateResponse] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [localBodyOptions, setLocalBodyOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('KERALA');
  const [setuserdata,setUserData]=useState([])
  const [isSubmit,setIsSubmit]=useState(false)
  const [subDistrict,setSubDistrict] = useState([])
  
// const token = localStorage.getItem('usertoken')
  
  const fetchDataForState = async (state) => {
    try {
      const response = await AxiosConfiguration.get(`userapp/state/${state}`);
      console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyy', response);

      setStateResponse(response.data);

      // Extract unique districts from the response
      const uniqueDistricts = Array.from(new Set(response.data.map(entry => entry.district)));
      console.log('uniqueDistricts',uniqueDistricts);
      setDistrictOptions(uniqueDistricts);

      // Extract sub-districts based on the selected district
      const subDistricts = fetchDataForDistrict(uniqueDistricts[0]); // Assuming the first district as default
      setSubDistrictOptions(subDistricts);

      // Extract local bodies and villages based on the selected district
      const districtData = response.data.filter(entry => entry.district === uniqueDistricts[0]); // Assuming the first district as default
      const uniqueLocalBodies = Array.from(new Set(districtData.map(entry => entry.local_body)));
      // setLocalBodyOptions(uniqueLocalBodies);

      const uniqueVillages = Array.from(new Set(districtData.map(entry => entry.village)));
      // setVillageOptions(uniqueVillages);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    // console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
  
    const fetchData = async () => {
      try {
        const responseUser = await AxiosConfiguration.get('userapp/single/user/dashboard/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuu',responseUser.data)
        if (responseUser.data && responseUser.data.user) {
          setUserData(responseUser.data);
        } else {
          // console.error('Unexpected response format:', responseUser.data);
        }
      } catch (error) {
        // console.log(error);
      }
    };
  
    fetchData();
    fetchDataForState(selectedState);
  }, [selectedState]);
  



  const handleStateChange = async (selectedOption) => {
    const newState = selectedOption ? selectedOption.label : '';
    setSelectedState(newState);
  };

  const fetchDataForDistrict = (district) => {
    // Fetch data based on the selected district
    const districtData = stateResponse.filter(entry => entry.district === district);
    const uniqueSubDistricts = Array.from(new Set(districtData.map(entry => entry.sub_district)));
    return uniqueSubDistricts;
  };

  const handleDistrictChange = (selectedOption) => {
    // console.log('Selected District:', selectedOption);
    formik.setFieldValue('district', selectedOption ? selectedOption.label : '');

    // Extract sub-districts based on the selected district
    const uniqueSubDistricts = fetchDataForDistrict(selectedOption.label);
    setSubDistrictOptions(uniqueSubDistricts);

    // Clear sub_district, local_body, and village values when district changes
    formik.setFieldValue('sub_district', '');
    formik.setFieldValue('local_body', '');
    formik.setFieldValue('village', '');
  };

  const handleSubDistrictChange = (selectedOption) => {
    // console.log('Selected Sub District:', selectedOption);
    formik.setFieldValue('sub_district', selectedOption ? selectedOption.label : '');

    setSubDistrict(selectedOption.value)

    // Extract local bodies and villages based on the selected sub_district
    const subdistrictData = stateResponse.filter(entry => entry.sub_district === selectedOption.label);
    const uniqueLocalBodies = Array.from(new Set(subdistrictData.map(entry => entry.local_body)));
    setLocalBodyOptions(uniqueLocalBodies);

    const uniqueVillages = Array.from(new Set(subdistrictData.map(entry => entry.village)));
    setVillageOptions(uniqueVillages);

    // Clear local_body and village values when sub_district changes
    formik.setFieldValue('local_body', '');
    formik.setFieldValue('village', '');
  };
  // console.log('setuserdata.user?.name',setuserdata.user?.name)
  const formik = useFormik({
    initialValues: {
        name: setuserdata.user?.name || 'soi',
        email: setuserdata.user?.email || null,
        phone: setuserdata.phone || '',
    //   password: '',
    address_line_1: '',
    address_line_2: '',
    //   house_number: '',
      land_mark: '',
      state: selectedState,
      district: '',
      sub_district: '',
      local_body: '',
      village: '',
      pincode: '',
    },

    onSubmit: async (values, { resetForm, setErrors }) => {
        try {
            // setLoading(false);
           const response= await  AxiosConfiguration.patch('userapp/edit/user/profile',
           { ...values, 
            name: setuserdata.user?.name ,
        email: setuserdata.user?.email || null,
        phone: setuserdata.phone  || '',
            }
           ,{
            headers: {
                'Authorization': `Bearer ${token}`
            } 
           })

           console.log('response',response.data);
        // setLoading(false);
        // setModalShow(false)
        // props.onProfileUpdate();
        // props.setUpdateTrigger(Date.now());
        // toast.success("Your profile updated successfully");



        
        resetForm();
        // toast.success("Your registration is successful.. Please wait for the approval");
        setIsSubmit(true)
        // navigate("/user/approval/pending");
        // props.onHide();
        
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        
    },

    // onSubmit: async (values, { resetForm }) => {
    //   console.log(values);

    //   try {
    //     const response = await AxiosConfiguration.post(
    //       `userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid}`,
    //       values
    //     );

    //     console.log(response.data);
    //     navigate('/user/login');
    //     resetForm();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    
    const fetchData = async () => {
      try {
        const userStatusResponse = await axiosInstance.get(
          "userapp/user/approval/and/payment/status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('vaaaaaa', userStatusResponse.data);
        setuserDetails((prevUserDetails) => {
          // console.log('1vaaaaaa', prevUserDetails);
          return userStatusResponse.data;
        });
        // console.log('1vaaaaaa', userdetails);
  
        if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Approved") {
          if (userStatusResponse.data.message.user_details.user_paid_for_membership === false) {
            localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
            // console.log('Logged in successfully');
            toast.success("Your registration is successfull ");
            // setLoading(false);
            navigate("/user/payment");
            // resetForm();
          } else {
            if (userStatusResponse.data.message.user_details.user_paid_for_membership === true){
              // toast.success("Logged in successfully");
              // setLoading(false);
              navigate("/user");
              // resetForm();
            }
          }
        } else if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Pending" || userStatusResponse.data.message.user_details.user_approved_by_admin === "Rejected") {
          // setLoading(false);
          navigate("/user/approval/pending");
          // resetForm();
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        // Handle error here
      }
    };  
  
    fetchData();
    // fetchDataForState(selectedState);
  }, [ axiosInstance]);

  const SuccessPage = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{backgroundColor: '#b3cde0'}} className=" text-white py-5">
      <div className= "container text-center">
        <h1 className="display-4 mb-4 text-dark" style={{fontFamily: 'Arial, sans-serif' }}>Submission Successful!</h1>
        <p className="lead mb-4 text-red" style={{color: 'red', fontFamily: 'Arial, sans-serif' }}>Thank you for your submission. Your request has been successfully submitted and is awaiting approval.</p>

        {/*Additional elements for illustration*/}
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-3">
            {/* <img src="/success-icon.png" alt="Success Icon" className="img-fluid mb-3" />*/}
            <p className="text-dark">We appreciate your contribution to IHDC HOMES. Our team will review your submission and get back to you soon.</p>
          </div>
        </div>

        {/* YouTube box with embedded video */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6 mb-3">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="card-link">
              <div className="card bg-light mb-3 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">Watch Our Latest Video</h5>
                  <div className="embed-responsive embed-responsive-16by9">
                    {/* Replace 'VIDEO_ID' with the actual YouTube video ID */}
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/aQTvacx7v0M" title="YouTube Video" allowFullScreen></iframe>
                  </div>
                  <div>
                 
                   
                  </div>
                </div>
              </div>
            </a> 
          </div>

          {/* Your Site box */}
          <div className="col-md-6 mb-3">
            <a href="https://en.ihdc.in/" target="_blank" rel="noopener noreferrer" className="card-link">
              <div className="card bg-light mb-3 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">Explore Our Site</h5>
                  
                  <img src={ihdc_image}alt="Your Image" className="img-fluid mb-3 " />
                  {/* <p className="card-text">Visit our official website for more information and updates.</p> */}
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* You can add more elements, such as buttons or links, as needed */}
        {/* <div className="mt-4">
          <a href="/" className="btn btn-light">Go Back Home</a>
        </div> */}
      </div>
    </motion.div>
    );
  };
  



  return (

  <>
  <TopNav/>
  {
    isSubmit?( <SuccessPage />):(
  
    <Container fluid className=" d-flex justify-content-center align-items-center overflow-hidden">
      <Row className=" d-flex align-items-center">
        {/* Welcome Section */}
        <Col md={6} className="h-auto bg-cover bg-center position-relative d-md-block">
          {/* Show only on medium screens and larger */}
          <div className="overlay"></div>
          <div className="absolute inset-0 d-flex flex-column justify-content-center text-white text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#081d29' }}>Welcome to IHDC HOMES.</h1>
            <p className="text-lg text-dark" style={{ color: '#b3cde0', fontWeight: '300' }}>
              Your request is awaiting approval. Upon completion, the admin will review and approve it. This process ensures a meticulous examination, guaranteeing compliance with established criteria before granting approval.
            </p>
          </div>
        </Col>

        {/* Form Section */}
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-8 " style={{ backgroundColor: '#b3cde0' }}>
          <Card style={{ width: '100%', backgroundColor: '#b3cde0', border: 'none' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Tell us more...</Card.Title>
              <Form id="register" onSubmit={formik.handleSubmit}>

                {/* Address Lines */}
                <Row className="mb-4">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formAddressLine1">
                      <Form.Label className="text-secondary">Address Line 1</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formik.values.address_line_1}
                        onChange={formik.handleChange}
                        name="address_line_1"
                        isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.touched.address_line_1 && formik.errors.address_line_1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formAddressLine2">
                      <Form.Label className="text-secondary">Address Line 2</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formik.values.address_line_2}
                        onChange={formik.handleChange}
                        name="address_line_2"
                        isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.touched.address_line_1 && formik.errors.address_line_1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* State and District */}
                <Row className="mb-4">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formState">
                      <Form.Label className="text-secondary">State</Form.Label>
                      <Select
                        value={{ label: selectedState, value: selectedState }}
                        onChange={handleStateChange}
                        options={[{ label: 'Kerala', value: 'KERALA' }]}
                        isSearchable={false}
                        isDisabled
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formDistrict">
                      <Form.Label className="text-secondary">District </Form.Label>
                      <Select
                        value={{ label: formik.values.district, value: formik.values.district }}
                        onChange={handleDistrictChange}
                        options={districtOptions.map((district) => ({ label: district, value: district }))}
                        isSearchable
                        placeholder="Search District..."
                        name="district"
                        onInvalid={() => this.setCustomValidity('Please select a district.')}
                        onInput={() => this.setCustomValidity('')}
                        required
                        aria-required="true"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Sub-district, Local Body, and Village */}
                <Row className="mb-4">
                <Col md={4}>
                  <Form.Group controlId="formSubDistrict">
                    <Form.Label className="text-secondary">Sub District </Form.Label>
                    <Select
                      value={{ label: formik.values.sub_district, value: formik.values.sub_district }}
                      onChange={handleSubDistrictChange}
                      options={subDistrictOptions.map((subDistrict) => ({ label: subDistrict, value: subDistrict }))}
                      isSearchable
                      name="sub_district"
                      placeholder="Search Sub District..."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.touched.sub_district && formik.errors.sub_district}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formLocalBody">
                    <Form.Label className="text-secondary">Local Body</Form.Label>
                    <Select
                      value={{ label: formik.values.local_body, value: formik.values.local_body }}
                      onChange={(selectedOption) => {
                        formik.setFieldValue('local_body', selectedOption ? selectedOption.label : '');
                        const localBodyData = stateResponse.filter((entry) => entry.local_body === selectedOption.label && entry.sub_district === subDistrict);
                        const uniqueVillages = Array.from(new Set(localBodyData.map((entry) => entry.village)));
                        setVillageOptions(uniqueVillages);
                        formik.setFieldValue('village', '');
                      }}
                      options={localBodyOptions.map((localBody) => ({ label: localBody, value: localBody }))}
                      isSearchable
                      placeholder="Search Local Body..."
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formVillage">
                    <Form.Label className="text-secondary">Village</Form.Label>
                    <Select
                      value={{ label: formik.values.village, value: formik.values.village }}
                      onChange={(selectedOption) => {
                        formik.setFieldValue('village', selectedOption ? selectedOption.label : '');
                      }}
                      options={villageOptions.map((village) => ({ label: village, value: village }))}
                      isSearchable
                      placeholder="Search Village..."
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

                <Row className="mb-4">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formLandmark">
                      <Form.Label className="text-secondary">Landmark </Form.Label>
                      <Form.Control
                        type="text"
                        value={formik.values.land_mark}
                        onChange={formik.handleChange}
                        name="land_mark"
                        isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.touched.land_mark && formik.errors.land_mark}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="formLandmark">
                      <Form.Label className="text-secondary">Pincode </Form.Label>
                      <Form.Control
                        type="text"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        name="pincode"
                        isInvalid={formik.touched.pincode && !!formik.errors.pincode}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.touched.pincode && formik.errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Continue Button */}
                <Button style={{ backgroundColor: "#081d29" }} className="w-100 mt-3" form='register' type="submit">
                  Continue
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
    )
  }
  

   
    </>
    
  );
}


export default RequestPendingPage;























// import React, { useEffect, useState, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock } from '@fortawesome/free-solid-svg-icons'; // Changed to clock icon for pending status
// import Button from 'react-bootstrap/Button';
// import TopNav from '../../component/AdminDashboard/TopNav';
// // import { Link } from 'react-router-dom';
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../../config/axios/AxiosConfiguration";
// import { Container, Row, Col, Form,Card } from 'react-bootstrap';
// import { useFormik } from 'formik';
// import Select from 'react-select';
// import AxiosConfiguration from '../../config/axios/AxiosConfiguration.jsx';
// import { motion } from 'framer-motion';
// import logo from '../../Assets/img/ihdclogo.jpg'

// function RequestPendingPage() {
//   const token = localStorage.getItem('usertoken')
//   const [userdetails, setuserDetails] = useState({});
//   const [stateResponse, setStateResponse] = useState([]);
//   const [districtOptions, setDistrictOptions] = useState([]);
//   const [subDistrictOptions, setSubDistrictOptions] = useState([]);
//   const [localBodyOptions, setLocalBodyOptions] = useState([]);
//   const [villageOptions, setVillageOptions] = useState([]);
//   const [selectedState, setSelectedState] = useState('KERALA');
//   const [setuserdata,setUserData]=useState([])
//   const [isSubmit,setIsSubmit]=useState(false)
  
// // const token = localStorage.getItem('usertoken')
  
//   const fetchDataForState = async (state) => {
//     try {
//       const response = await AxiosConfiguration.get(`userapp/state/${state}`);
//       console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyy', response);

//       setStateResponse(response.data);

//       // Extract unique districts from the response
//       const uniqueDistricts = Array.from(new Set(response.data.map(entry => entry.district)));
//       console.log('uniqueDistricts',uniqueDistricts);
//       setDistrictOptions(uniqueDistricts);

//       // Extract sub-districts based on the selected district
//       const subDistricts = fetchDataForDistrict(uniqueDistricts[0]); // Assuming the first district as default
//       setSubDistrictOptions(subDistricts);

//       // Extract local bodies and villages based on the selected district
//       const districtData = response.data.filter(entry => entry.district === uniqueDistricts[0]); // Assuming the first district as default
//       const uniqueLocalBodies = Array.from(new Set(districtData.map(entry => entry.local_body)));
//       setLocalBodyOptions(uniqueLocalBodies);

//       const uniqueVillages = Array.from(new Set(districtData.map(entry => entry.village)));
//       setVillageOptions(uniqueVillages);
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   useEffect(() => {
//     // console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
  
//     const fetchData = async () => {
//       try {
//         const responseUser = await AxiosConfiguration.get('userapp/single/user/dashboard/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuu',responseUser.data)
//         if (responseUser.data && responseUser.data.user) {
//           setUserData(responseUser.data);
//         } else {
//           // console.error('Unexpected response format:', responseUser.data);
//         }
//       } catch (error) {
//         // console.log(error);
//       }
//     };
  
//     fetchData();
//     fetchDataForState(selectedState);
//   }, [selectedState]);
  



//   const handleStateChange = async (selectedOption) => {
//     const newState = selectedOption ? selectedOption.label : '';
//     setSelectedState(newState);
//   };

//   const fetchDataForDistrict = (district) => {
//     // Fetch data based on the selected district
//     const districtData = stateResponse.filter(entry => entry.district === district);
//     const uniqueSubDistricts = Array.from(new Set(districtData.map(entry => entry.sub_district)));
//     return uniqueSubDistricts;
//   };

//   const handleDistrictChange = (selectedOption) => {
//     // console.log('Selected District:', selectedOption);
//     formik.setFieldValue('district', selectedOption ? selectedOption.label : '');

//     // Extract sub-districts based on the selected district
//     const uniqueSubDistricts = fetchDataForDistrict(selectedOption.label);
//     setSubDistrictOptions(uniqueSubDistricts);

//     // Clear sub_district, local_body, and village values when district changes
//     formik.setFieldValue('sub_district', '');
//     formik.setFieldValue('local_body', '');
//     formik.setFieldValue('village', '');
//   };

//   const handleSubDistrictChange = (selectedOption) => {
//     // console.log('Selected Sub District:', selectedOption);
//     formik.setFieldValue('sub_district', selectedOption ? selectedOption.label : '');

//     // Extract local bodies and villages based on the selected sub_district
//     const subdistrictData = stateResponse.filter(entry => entry.sub_district === selectedOption.label);
//     const uniqueLocalBodies = Array.from(new Set(subdistrictData.map(entry => entry.local_body)));
//     setLocalBodyOptions(uniqueLocalBodies);

//     const uniqueVillages = Array.from(new Set(subdistrictData.map(entry => entry.village)));
//     setVillageOptions(uniqueVillages);

//     // Clear local_body and village values when sub_district changes
//     formik.setFieldValue('local_body', '');
//     formik.setFieldValue('village', '');
//   };
//   // console.log('setuserdata.user?.name',setuserdata.user?.name)
//   const formik = useFormik({
//     initialValues: {
//         name: setuserdata.user?.name || 'soi',
//         email: setuserdata.user?.email || null,
//         phone: setuserdata.phone || '',
//     //   password: '',
//     address_line_1: '',
//     address_line_2: '',
//     //   house_number: '',
//       land_mark: '',
//       state: selectedState,
//       district: '',
//       sub_district: '',
//       local_body: '',
//       village: '',
//       pincode: '',
//     },

//     onSubmit: async (values, { resetForm, setErrors }) => {
//         try {
//             // setLoading(false);
//            const response= await  AxiosConfiguration.patch('userapp/edit/user/profile',
//            { ...values, 
//             name: setuserdata.user?.name ,
//         email: setuserdata.user?.email || null,
//         phone: setuserdata.phone  || '',
//             }
//            ,{
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             } 
//            })

//            console.log('response',response.data);
//         // setLoading(false);
//         // setModalShow(false)
//         // props.onProfileUpdate();
//         // props.setUpdateTrigger(Date.now());
//         // toast.success("Your profile updated successfully");



        
//         resetForm();
//         toast.success("Your registration is successful.. Please wait for the approval");
//         setIsSubmit(true)
//         // navigate("/user/approval/pending");
//         // props.onHide();
        
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
        
//     },

//     // onSubmit: async (values, { resetForm }) => {
//     //   console.log(values);

//     //   try {
//     //     const response = await AxiosConfiguration.post(
//     //       userapp/user/registration/${product_unique_id}/${influencer_uuid}/${organiser_uuid},
//     //       values
//     //     );

//     //     console.log(response.data);
//     //     navigate('/user/login');
//     //     resetForm();
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     // },
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    
//     const fetchData = async () => {
//       try {
//         const userStatusResponse = await axiosInstance.get(
//           "userapp/user/approval/and/payment/status",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         // console.log('vaaaaaa', userStatusResponse.data);
//         setuserDetails((prevUserDetails) => {
//           // console.log('1vaaaaaa', prevUserDetails);
//           return userStatusResponse.data;
//         });
//         // console.log('1vaaaaaa', userdetails);
  
//         if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Approved") {
//           if (userStatusResponse.data.message.user_details.user_paid_for_membership === false) {
//             localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
//             // console.log('Logged in successfully');
//             toast.success("Your registration is successfull ");
//             // setLoading(false);
//             navigate("/user/payment");
//             // resetForm();
//           } else {
//             if (userStatusResponse.data.message.user_details.user_paid_for_membership === true){
//               // toast.success("Logged in successfully");
//               // setLoading(false);
//               navigate("/user");
//               // resetForm();
//             }
//           }
//         } else if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Pending" || userStatusResponse.data.message.user_details.user_approved_by_admin === "Rejected") {
//           // setLoading(false);
//           navigate("/user/approval/pending");
//           // resetForm();
//         }
//       } catch (error) {
//         // console.error("Error fetching data:", error);
//         // Handle error here
//       }
//     };  
  
//     fetchData();
//     // fetchDataForState(selectedState);
//   }, [ axiosInstance]);

//   const SuccessPage = () => {
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{backgroundColor:'#CFFFF6'}} className=" text-white py-5">
//       <div className= "container text-center">
//         <h1 className="display-4 mb-4 text-dark">Submission Successful!</h1>
//         <p className="lead mb-4 text-dark">Thank you for your submission. Your request has been successfully submitted and is awaiting approval.</p>

//         {/Additional elements for illustration/}
//         <div className="row justify-content-center align-items-center">
//           <div className="col-md-6 mb-3">
//             {/* <img src="/success-icon.png" alt="Success Icon" className="img-fluid mb-3" />*/}
//             <p className="text-dark">We appreciate your contribution to IHDC HOMES. Our team will review your submission and get back to you soon.</p>
//           </div>
//         </div>

//         {/* YouTube box with embedded video */}
//         <div className="row justify-content-center mb-4">
//           <div className="col-md-6 mb-3">
//             <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="card-link">
//               <div className="card bg-light mb-3 h-100">
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <h5 className="card-title">Watch Our Latest Video</h5>
//                   <div className="embed-responsive embed-responsive-16by9">
//                     {/* Replace 'VIDEO_ID' with the actual YouTube video ID */}
//                     <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/aQTvacx7v0M" title="YouTube Video" allowFullScreen></iframe>
//                   </div>
//                   <div>
                 
                   
//                   </div>
//                 </div>
//               </div>
//             </a>
//           </div>

//           {/* Your Site box */}
//           <div className="col-md-6 mb-3">
//             <a href="https://en.ihdc.in/" target="_blank" rel="noopener noreferrer" className="card-link">
//               <div className="card bg-light mb-3 h-100">
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <h5 className="card-title">Explore Our Site</h5>
                  
//                   <img src="/your-image.jpg" alt="Your Image" className="img-fluid mb-3 " />
//                   {/* <p className="card-text">Visit our official website for more information and updates.</p> */}
//                 </div>
//               </div>
//             </a>
//           </div>
//         </div>

//         {/* You can add more elements, such as buttons or links, as needed */}
//         {/* <div className="mt-4">
//           <a href="/" className="btn btn-light">Go Back Home</a>
//         </div> */}
//       </div>
//     </motion.div>
//     );
//   };
  



//   return (

//   <>
//   <TopNav/>
//   {
//     isSubmit?( <SuccessPage />):(
//     //   <Container fluid className="vh-100 d-flex justify-content-center align-items-center overflow-hidden">
//     //   <Row className="d-flex align-items-center">

        
//     //     <Col md={6} className="h-auto bg-cover bg-center position-relative">
//     //       <div className="overlay"></div>
//     //       <div className="absolute inset-0 d-flex flex-column justify-content-center text-white text-center">
//     //         <h1 className="text-4xl font-bold mb-4" style={{ color: '#081d29' }}>Welcome to IHDC HOMES.</h1>
//     //         <p className="text-lg text-dark" style={{ color: '#b3cde0', fontWeight: '300' }}>
//     //         Your request is awaiting approval. Upon completion, the admin will review and approve it. This process ensures a meticulous examination, guaranteeing compliance with established criteria before granting approval.
//     //         </p>
//     //       </div>
//     //     </Col>

//     //     {/* Form Section */}
//     //     <Col md={6} className="d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-8" style={{ backgroundColor: '#b3cde0' }}>
//     //       <Card style={{ width: '100%', backgroundColor: '#b3cde0', border: 'none' }}>
//     //         <Card.Body>
//     //           <Card.Title className="text-center mb-4">Tell us more...</Card.Title>
//     //           <Form id="register" onSubmit={formik.handleSubmit}>

//     //             {/* Address Lines */}
//     //             <Row className="mb-4">
//     //               <Col md={6}>
//     //                 <Form.Group controlId="formAddressLine1">
//     //                   <Form.Label className="text-secondary">Address Line 1</Form.Label>
//     //                   <Form.Control
//     //                     as="textarea"
//     //                     rows={2}
//     //                     value={formik.values.address_line_1}
//     //                     onChange={formik.handleChange}
//     //                     name="address_line_1"
//     //                     isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//     //                     required
//     //                   />
//     //                   <Form.Control.Feedback type="invalid">
//     //                     {formik.touched.address_line_1 && formik.errors.address_line_1}
//     //                   </Form.Control.Feedback>
//     //                 </Form.Group>
//     //               </Col>
//     //               <Col md={6}>
//     //                 <Form.Group controlId="formAddressLine2">
//     //                   <Form.Label className="text-secondary">Address Line 2</Form.Label>
//     //                   <Form.Control
//     //                     as="textarea"
//     //                     rows={2}
//     //                     value={formik.values.address_line_2}
//     //                     onChange={formik.handleChange}
//     //                     name="address_line_2"
//     //                     isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//     //                     required
//     //                   />
//     //                   <Form.Control.Feedback type="invalid">
//     //                     {formik.touched.address_line_1 && formik.errors.address_line_1}
//     //                   </Form.Control.Feedback>
//     //                 </Form.Group>
//     //               </Col>
//     //             </Row>

//     //             {/* State and District */}
//     //             <Row className="mb-4">
//     //             <Col md={6}>
//     //               <Form.Group controlId="formState">
//     //                 <Form.Label className="text-secondary">State</Form.Label>
//     //                 <Select
//     //                   value={{ label: selectedState, value: selectedState }}
//     //                   onChange={handleStateChange}
//     //                   options={[{ label: 'Kerala', value: 'KERALA' }]}
//     //                   isSearchable={false}
//     //                   isDisabled
//     //                   required
//     //                 />
//     //               </Form.Group>
//     //             </Col>
//     //             <Col md={6}>
//     //               <Form.Group controlId="formDistrict">
//     //                 <Form.Label className="text-secondary">District </Form.Label>
//     //                 <Select
//     //                   value={{ label: formik.values.district, value: formik.values.district }}
//     //                   onChange={handleDistrictChange}
//     //                   options={districtOptions.map((district) => ({ label: district, value: district }))}
//     //                   isSearchable
//     //                   placeholder="Search District..."
//     //                   name="district"
//     //                   onInvalid={() => this.setCustomValidity('Please select a district.')}
//     //                   onInput={() => this.setCustomValidity('')}
//     //                   required
//     //                   aria-required="true"
//     //                 />
//     //               </Form.Group>
//     //             </Col>
//     //             </Row>

//     //             <Row className="mb-4">
//     //             <Col md={4}>
//     //               <Form.Group controlId="formSubDistrict">
//     //                 <Form.Label className="text-secondary">Sub District </Form.Label>
//     //                 <Select
//     //                   value={{ label: formik.values.sub_district, value: formik.values.sub_district }}
//     //                   onChange={handleSubDistrictChange}
//     //                   options={subDistrictOptions.map((subDistrict) => ({ label: subDistrict, value: subDistrict }))}
//     //                   isSearchable
//     //                   name="sub_district"
//     //                   placeholder="Search Sub District..."
//     //                   required
//     //                 />
//     //                 <Form.Control.Feedback type="invalid">
//     //                   {formik.touched.sub_district && formik.errors.sub_district}
//     //                 </Form.Control.Feedback>
//     //               </Form.Group>
//     //             </Col>
//     //             <Col md={4}>
//     //               <Form.Group controlId="formLocalBody">
//     //                 <Form.Label className="text-secondary">Local Body</Form.Label>
//     //                 <Select
//     //                   value={{ label: formik.values.local_body, value: formik.values.local_body }}
//     //                   onChange={(selectedOption) => {
//     //                     formik.setFieldValue('local_body', selectedOption ? selectedOption.label : '');
//     //                     const localBodyData = stateResponse.filter((entry) => entry.local_body === selectedOption.label);
//     //                     const uniqueVillages = Array.from(new Set(localBodyData.map((entry) => entry.village)));
//     //                     setVillageOptions(uniqueVillages);
//     //                     formik.setFieldValue('village', '');
//     //                   }}
//     //                   options={localBodyOptions.map((localBody) => ({ label: localBody, value: localBody }))}
//     //                   isSearchable
//     //                   placeholder="Search Local Body..."
//     //                   required
//     //                 />
//     //               </Form.Group>
//     //             </Col>
//     //             <Col md={4}>
//     //               <Form.Group controlId="formVillage">
//     //                 <Form.Label className="text-secondary">Village</Form.Label>
//     //                 <Select
//     //                   value={{ label: formik.values.village, value: formik.values.village }}
//     //                   onChange={(selectedOption) => {
//     //                     formik.setFieldValue('village', selectedOption ? selectedOption.label : '');
//     //                   }}
//     //                   options={villageOptions.map((village) => ({ label: village, value: village }))}
//     //                   isSearchable
//     //                   placeholder="Search Village..."
//     //                   required
//     //                 />
//     //               </Form.Group>
//     //             </Col>
//     //           </Row>

//     //           <Row className="mb-4">
//     //           <Col md={6}>
//     //           <Form.Group controlId="formLandmark">
//     //             <Form.Label className="text-secondary">Landmark </Form.Label>
//     //             <Form.Control
//     //               type="text"
//     //               value={formik.values.land_mark}
//     //               onChange={formik.handleChange}
//     //               name="land_mark"
//     //               isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//     //               required
//     //             />
//     //             <Form.Control.Feedback type="invalid">
//     //               {formik.touched.land_mark && formik.errors.land_mark}
//     //             </Form.Control.Feedback>
//     //           </Form.Group>
//     //           </Col>

//     //           <Col md={6}>
//     //           <Form.Group controlId="formLandmark">
//     //             <Form.Label className="text-secondary">Pincode </Form.Label>
//     //             <Form.Control
//     //               type="text"
//     //               value={formik.values.pincode}
//     //               onChange={formik.handleChange}
//     //               name="pincode"
//     //               isInvalid={formik.touched.pincode && !!formik.errors.pincode}
//     //               required
//     //             />
//     //             <Form.Control.Feedback type="invalid">
//     //               {formik.touched.pincode && formik.errors.pincode}
//     //             </Form.Control.Feedback>
//     //           </Form.Group>
//     //           </Col>
//     //           </Row>

                
//     //             <Button style={{ backgroundColor: "#081d29" }} className="w-100 mt-3" form='register' type="submit">
//     //               Continue
//     //             </Button>

//     //           </Form>
//     //         </Card.Body>
//     //       </Card>
//     //     </Col>
//     //   </Row>
//     // </Container>
//     <Container fluid className=" d-flex justify-content-center align-items-center overflow-hidden">
//       <Row className=" d-flex align-items-center">
//         {/* Welcome Section */}
//         <Col md={6} className="h-auto bg-cover bg-center position-relative d-md-block">
//           {/* Show only on medium screens and larger */}
//           <div className="overlay"></div>
//           <div className="absolute inset-0 d-flex flex-column justify-content-center text-white text-center">
//             <h1 className="text-4xl font-bold mb-4" style={{ color: '#081d29' }}>Welcome to IHDC HOMES.</h1>
//             <p className="text-lg text-dark" style={{ color: '#b3cde0', fontWeight: '300' }}>
//               Your request is awaiting approval. Upon completion, the admin will review and approve it. This process ensures a meticulous examination, guaranteeing compliance with established criteria before granting approval.
//             </p>
//           </div>
//         </Col>

//         {/* Form Section */}
//         <Col xs={12} md={6} className="d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-8 " style={{ backgroundColor: '#b3cde0' }}>
//           <Card style={{ width: '100%', backgroundColor: '#b3cde0', border: 'none' }}>
//             <Card.Body>
//               <Card.Title className="text-center mb-4">Tell us more...</Card.Title>
//               <Form id="register" onSubmit={formik.handleSubmit}>

//                 {/* Address Lines */}
//                 <Row className="mb-4">
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formAddressLine1">
//                       <Form.Label className="text-secondary">Address Line 1</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={2}
//                         value={formik.values.address_line_1}
//                         onChange={formik.handleChange}
//                         name="address_line_1"
//                         isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {formik.touched.address_line_1 && formik.errors.address_line_1}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formAddressLine2">
//                       <Form.Label className="text-secondary">Address Line 2</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={2}
//                         value={formik.values.address_line_2}
//                         onChange={formik.handleChange}
//                         name="address_line_2"
//                         isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {formik.touched.address_line_1 && formik.errors.address_line_1}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* State and District */}
//                 <Row className="mb-4">
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formState">
//                       <Form.Label className="text-secondary">State</Form.Label>
//                       <Select
//                         value={{ label: selectedState, value: selectedState }}
//                         onChange={handleStateChange}
//                         options={[{ label: 'Kerala', value: 'KERALA' }]}
//                         isSearchable={false}
//                         isDisabled
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formDistrict">
//                       <Form.Label className="text-secondary">District </Form.Label>
//                       <Select
//                         value={{ label: formik.values.district, value: formik.values.district }}
//                         onChange={handleDistrictChange}
//                         options={districtOptions.map((district) => ({ label: district, value: district }))}
//                         isSearchable
//                         placeholder="Search District..."
//                         name="district"
//                         onInvalid={() => this.setCustomValidity('Please select a district.')}
//                         onInput={() => this.setCustomValidity('')}
//                         required
//                         aria-required="true"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Sub-district, Local Body, and Village */}
//                 <Row className="mb-4">
//                 <Col md={4}>
//                   <Form.Group controlId="formSubDistrict">
//                     <Form.Label className="text-secondary">Sub District </Form.Label>
//                     <Select
//                       value={{ label: formik.values.sub_district, value: formik.values.sub_district }}
//                       onChange={handleSubDistrictChange}
//                       options={subDistrictOptions.map((subDistrict) => ({ label: subDistrict, value: subDistrict }))}
//                       isSearchable
//                       name="sub_district"
//                       placeholder="Search Sub District..."
//                       required
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {formik.touched.sub_district && formik.errors.sub_district}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="formLocalBody">
//                     <Form.Label className="text-secondary">Local Body</Form.Label>
//                     <Select
//                       value={{ label: formik.values.local_body, value: formik.values.local_body }}
//                       onChange={(selectedOption) => {
//                         formik.setFieldValue('local_body', selectedOption ? selectedOption.label : '');
//                         const localBodyData = stateResponse.filter((entry) => entry.local_body === selectedOption.label);
//                         const uniqueVillages = Array.from(new Set(localBodyData.map((entry) => entry.village)));
//                         setVillageOptions(uniqueVillages);
//                         formik.setFieldValue('village', '');
//                       }}
//                       options={localBodyOptions.map((localBody) => ({ label: localBody, value: localBody }))}
//                       isSearchable
//                       placeholder="Search Local Body..."
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group controlId="formVillage">
//                     <Form.Label className="text-secondary">Village</Form.Label>
//                     <Select
//                       value={{ label: formik.values.village, value: formik.values.village }}
//                       onChange={(selectedOption) => {
//                         formik.setFieldValue('village', selectedOption ? selectedOption.label : '');
//                       }}
//                       options={villageOptions.map((village) => ({ label: village, value: village }))}
//                       isSearchable
//                       placeholder="Search Village..."
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//                 <Row className="mb-4">
//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formLandmark">
//                       <Form.Label className="text-secondary">Landmark </Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formik.values.land_mark}
//                         onChange={formik.handleChange}
//                         name="land_mark"
//                         isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {formik.touched.land_mark && formik.errors.land_mark}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                   <Col xs={12} md={6}>
//                     <Form.Group controlId="formLandmark">
//                       <Form.Label className="text-secondary">Pincode </Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={formik.values.pincode}
//                         onChange={formik.handleChange}
//                         name="pincode"
//                         isInvalid={formik.touched.pincode && !!formik.errors.pincode}
//                         required
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {formik.touched.pincode && formik.errors.pincode}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Continue Button */}
//                 <Button style={{ backgroundColor: "#081d29" }} className="w-100 mt-3" form='register' type="submit">
//                   Continue
//                 </Button>

//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
    
//     )
//   }
  

   
//     </>
    
//   );
// }


// export default RequestPendingPage;






// import React, { useEffect, useState, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock } from '@fortawesome/free-solid-svg-icons'; // Changed to clock icon for pending status
// import Button from 'react-bootstrap/Button';
// import TopNav from '../../component/AdminDashboard/TopNav';
// // import { Link } from 'react-router-dom';
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../../config/axios/AxiosConfiguration";



// function RequestPendingPage() {
//   const token = localStorage.getItem('usertoken')
//   const [userdetails, setuserDetails] = useState({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     // console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    
//     const fetchData = async () => {
//       try {
//         const userStatusResponse = await axiosInstance.get(
//           "userapp/user/approval/and/payment/status",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         // console.log('vaaaaaa', userStatusResponse.data);
//         setuserDetails((prevUserDetails) => {
//           // console.log('1vaaaaaa', prevUserDetails);
//           return userStatusResponse.data;
//         });
//         // console.log('1vaaaaaa', userdetails);
  
//         if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Approved") {
//           if (userStatusResponse.data.message.user_details.user_paid_for_membership === false) {
//             localStorage.setItem("link_data", userStatusResponse?.data?.message?.uuid);
//             // console.log('Logged in successfully');
//             toast.success("Your registration is successfull ");
//             // setLoading(false);
//             navigate("/user/payment");
//             // resetForm();
//           } else {
//             if (userStatusResponse.data.message.user_details.user_paid_for_membership === true){
//               // toast.success("Logged in successfully");
//               // setLoading(false);
//               navigate("/user");
//               // resetForm();
//             }
//           }
//         } else if (userStatusResponse.data.message.user_details.user_approved_by_admin === "Pending" || userStatusResponse.data.message.user_details.user_approved_by_admin === "Rejected") {
//           // setLoading(false);
//           navigate("/user/approval/pending");
//           // resetForm();
//         }
//       } catch (error) {
//         // console.error("Error fetching data:", error);
//         // Handle error here
//       }
//     };  
  
//     fetchData();
//     // fetchDataForState(selectedState);
//   }, [ axiosInstance]);
  


//   const fadeIn = useSpring({
//     opacity: 1,
//     from: { opacity: 0 },
//     config: { duration: 1000 },
//   });

//   return (
//     <>
//     <TopNav />
//     <div style={pageContainerStyle}>
//     {/* <h1 style={headingStyle}>You registration is completed success</h1> */}
//       <animated.div style={{ ...fadeIn, ...pageStyle }}>
//         <>
//           <FontAwesomeIcon icon={faClock} style={iconStyle}/>
//           <h5 style={headingStyle}>Invitation Request Pending</h5>
//           <p style={textStyle}>
//            Your request to invite is pending. Please wait until it is verified by the admin.

//           </p>
//           <p style={textStyle}>
//             Please come back later...

//           </p>
//           {/* <p>Please 
//             <Link to="/user/login" style={{ color: 'red' }}>
//           {' '}
//           login
//         </Link>{' '} to know your status... </p> */}

//           {/* <Button variant="primary" style={buttonStyle}>
//             Resend Invitation
//           </Button>
//           <Button variant="danger" className='ml-3' style={buttonStyle}>
//             Cancel Invitation
//           </Button> */}
//         </>
//       </animated.div>
//     </div>
//     </>
//   );
// }

// const pageContainerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
// };

// const pageStyle = {
//   textAlign: 'center',
//   paddingTop: '50px',
// };

// const headingStyle = {
//   fontSize: '2em',
//   color: '#ffc107', // Changed color for pending status
// };

// const textStyle = {
//   fontSize: '1.2em',
//   color: '#333',
//   marginTop: '20px',
// };

// const additionalInfoStyle = {
//   marginTop: '20px',
// };

// const iconStyle = {
//   fontSize: '4em',
//   color: '#ffc107', // Changed color for pending status
// };

// const buttonStyle = {
//   marginTop: '20px',
// };

// export default RequestPendingPage;