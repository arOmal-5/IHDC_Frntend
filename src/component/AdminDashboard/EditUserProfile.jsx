import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import Select from 'react-select';
import {useState} from 'react';
import AxiosConfiguration from '../../config/axios/AxiosConfiguration.jsx';

function MyVerticallyCenteredModal(props) {
    const DistrictOptions = [
        { value: 'thonnakkal', label: 'Kochi' },
        { value: 'thonnakkal', label: 'alapuzha' },
        { value: 'thonnakkal', label: 'kollam' },
        
      ];
    
      const localBody=[
        { value: 'thonnakkal', label: 'thonnakkal' },
        { value: 'Ponmudi', label: 'ponmudi' },
        { value: 'kakanad', label: 'kakanad' },
    
      ]
    
      const villageoptions=[
        { value: 'kakanad', label: 'kakanad' },
        { value: 'kadamakudi', label: 'kadamakudi' },
        { value: 'thrikakara', label: 'thrikakara' },
    
      ]
    
      const [selectedOption, setSelectedOption] = useState(null);
      const [districtvalue,setDistrictValue]=useState(null)
      const [localbodyValue,setLocalbodyValue]=useState(null)
      const [villagevalue,setVillageValue]=useState(null)
      const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
      };
    
      const handleDistrictChange = (selectedOption) => {
        setDistrictValue(selectedOption)
        formik.setFieldValue('district', selectedOption ? selectedOption.label : '');
      };
    
      const handleLocalbodyChange=(selectedOption)=>{
        setLocalbodyValue(selectedOption)
        formik.setFieldValue('local_body', selectedOption ? selectedOption.label : '');
    
    
      }
    
      const handletVillageChange=(selectedOption)=>{
        setVillageValue(selectedOption)
      formik.setFieldValue('village',selectedOption ? selectedOption.label : '')
      }
    
     
    
      const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          house_number: '',
          land_mark: '',
          state: '',
          district: '',
          local_body: '',
          sub_district: '',
          village: ''
    
        },
        onSubmit: async(values,{resetForm})=>{
          // console.log(values);
             await AxiosConfiguration.post('url',values).then((response)=>{
              // console.log(response.data);
              resetForm()
             }).catch((error)=>{
              // console.log(error);
             })
        }
      })
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container mt-4 container d-flex justify-content-center align-items-center ">
        <Card style={{width: '100%' }} className="border-0">
          <Card.Body>
            
            <Form id='register' onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label className='text-secondary'>Name</Form.Label>
                    <Form.Control type="text" value={formik.values.name} onChange={formik.handleChange}  name="name" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName">
                    <Form.Label  className='text-secondary'>Email</Form.Label>
                    <Form.Control type="email"  name="email" value={formik.values.email} onChange={formik.handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label  className='text-secondary'>Phone</Form.Label>
                    <Form.Control type="text" value={formik.values.phone} onChange={formik.handleChange} name="phone" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAffiliatedId">
                    <Form.Label  className='text-secondary'>House number</Form.Label>
                    <Form.Control type="text" value={formik.values.house_number} onChange={formik.handleChange}  name="house_number" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCompanyName">
                    <Form.Label  className='text-secondary'>Land mark</Form.Label>
                    <Form.Control type="text" value={formik.values.land_mark} onChange={formik.handleChange} name="land_mark" required />
                  </Form.Group>
                </Col>
                {/* Additional input fields */}
                <Col md={6}>
                  <Form.Group controlId="formField1">
                    <Form.Label  className='text-secondary'>State</Form.Label>
                    <Form.Control type="text" value={formik.values.state} name="state" onChange={formik.handleChange} required />
                    
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formField2">
                    <Form.Label  className='text-secondary'>District</Form.Label>
                    {/* <Form.Control type="text" name="field2" required /> */}
                    <Select
                      value={districtvalue}
                      onChange={handleDistrictChange}
                      options={DistrictOptions}
                      getOptionValue={(option) => option.label}
                      isSearchable
                      placeholder="Search State..."
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formField3">
                    <Form.Label  className='text-secondary'>Local body</Form.Label>
                    {/* <Form.Control type="text" name="field3" required /> */}
                    <Select
                      value={localbodyValue}
                      onChange={handleLocalbodyChange}
                      options={localBody}
                      isSearchable
                      placeholder="Search Panchayath..."
                    />
                  </Form.Group>
                </Col>
              </Row>
 
              <Row>
                <Col md={6} >
                  <Form.Group controlId="formField4">
                    <Form.Label  className='text-secondary'>Sub District</Form.Label>
                    <Form.Control type="text" value={formik.values.sub_district} name="sub_district" onChange={formik.handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6} >
                  <Form.Group controlId="formField4">
                    <Form.Label  className='text-secondary'>Village</Form.Label>
                    {/* <Form.Control type="text" name="field4" required /> */}
                    <Select
                      value={villagevalue}
                      onChange={handletVillageChange}
                      options={villageoptions}
                      isSearchable
                      placeholder="Search Village..."
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* <Button variant="primary"  form='register' type="submit" className="w-100 mt-3">
                Edit
              </Button> */}
            </Form>
          </Card.Body>
        </Card>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"  form='register' type="submit" className="btn-primary">
                Edit
              </Button>
        <Button onClick={props.onHide} className='btn-danger'>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditUserProfile() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" className='btn btn-primary btn-sm' onClick={() => setModalShow(true)}>
        Edit Profile
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default EditUserProfile
