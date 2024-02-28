import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from '../../component/AdminDashboard/TopNav.jsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import Select from 'react-select';
import AxiosConfiguration from '../../config/axios/AxiosConfiguration.jsx';
import { toast } from 'react-toastify';


function UserExtraDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const product_unique_id = searchParams.get('product_id');
  const influencer_uuid = searchParams.get('influ_1');
  const organiser_uuid = searchParams.get('org_2');

  const [stateResponse, setStateResponse] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);
  const [localBodyOptions, setLocalBodyOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('KERALA');
  const [setuserdata,setUserData]=useState([])
  const [subDistrict,setSubDistrict] = useState([])

  const token = localStorage.getItem('usertoken')

  const fetchDataForState = async (state) => {
    try {
      const response = await AxiosConfiguration.get(`userapp/state/${state}`);
      // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyy', response);

      setStateResponse(response.data);

      // Extract unique districts from the response
      const uniqueDistricts = Array.from(new Set(response.data.map(entry => entry.district)));
      setDistrictOptions(uniqueDistricts);

      // Extract sub-districts based on the selected district
      const subDistricts = fetchDataForDistrict(uniqueDistricts[0]); // Assuming the first district as default
      setSubDistrictOptions(subDistricts);

      // Extract local bodies and villages based on the selected district
      const districtData = response.data.filter(entry => entry.district === uniqueDistricts[0]); // Assuming the first district as default
      const uniqueLocalBodies = Array.from(new Set(districtData.map(entry => entry.local_body)));
      setLocalBodyOptions(uniqueLocalBodies);

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
    // setVillageOptions(uniqueVillages);

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

          //  console.log('response',response.data);
        // setLoading(false);
        // setModalShow(false)
        // props.onProfileUpdate();
        // props.setUpdateTrigger(Date.now());
        // toast.success("Your profile updated successfully");



        
        resetForm();
        // toast.success("Your registration is successful.. Please wait for the approval");
        navigate("/user/approval/pending");
        // props.onHide();
        
        } catch (error) {
            // console.log(error);
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

  return (
    <>
      <TopNav />
      <div className="container mt-4 container d-flex justify-content-center align-items-center">
        <Card style={{ maxWidth: '550px', width: '100%' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Tells us more...</Card.Title>
  
            <Form id="register" onSubmit={formik.handleSubmit}>
              <Row className="mb-4">
                <Col md={6}>
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
                <Col md={6}>
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
  
              <Row className="mb-4">
                <Col md={6}>
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
  
                <Col md={6}>
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
              <Col md={6}>
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

              <Col md={6}>
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
              <Button style={{ backgroundColor: "#081d29" }} className="w-100 mt-3" form='register' type="submit">
                Continue
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
  
  
}

export default UserExtraDetails;
  