import { Row, Button, Form, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import React, { useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "../../../config/axios/AxiosConfiguration";
import { countryOptions } from "../../../page/AdminDashboard/Countrycode";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import '../../../style/adminDashboard/AddUserByAdmin.css'

function MyVerticallyCenteredModal(props) {
  const admintoken = localStorage.getItem("admintoken");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      amount_paid: "",
      transaction_id: "",
      product_unique_id: "",
      payment_mode: "",
      payment_method: "",
      payment_date: "",
      payment_time: "", 
      product_service : "",
    },
    onSubmit: async (values, {resetForm}) => {
       
        try {
            // console.log("uuuuuuuuuuuuuuuuuuuuuu");
            let phonenumber = formik.values.phone;
            let value = "";
            let mergedPhoneNumber = formik.values.phone;
          
            if (formik.values.phone) {
              value = selectedCountry.value;
              // console.log("countryCode ..........", value);
              mergedPhoneNumber = `${value}${phonenumber}`;
              // console.log("mergedPhoneNumber", phonenumber, mergedPhoneNumber);
            }
            // console.log("values", values);
            // console.log('hhhh',mergedPhoneNumber)
            setLoading(true)
          const response = await axiosInstance.post(
            "userapp/add/user/by/admin",
            { ...values, phone: mergedPhoneNumber },
            {
              headers: {
                Authorization: `Bearer ${admintoken}`,
              },
            }
          );
      
        //   console.log(response.data);
        //   console.log("values", values);
          
          resetForm()
          setLoading(false)
          props.setModalShow(false);
          toast.success('User added successfully')
        } catch (error) {
          setLoading(false)
          // console.log(error)
          if(error.response.data.message=== "The user didn't exists to add the the site visit payment.. Please add the membership details"){
            toast.error("The user didn't exist. Take membership first.");
          }
            if (error.response.data.message === "This phone number already exists .Try another one") {
                toast.error(error.response.data.message);
                // console.log('kkkkkkkkkkkkkkkk', error);
                // console.log('kkkkkkkkkkkkkkkk', error.response.data.message);
              } else if (error.response.data.message === 'This email already exists .Try another one') {
                toast.error(error.response.data.message);              }
                 else if(error.response.data.message === 'This transaction id already exists.The transaction id should be unique') {
                  toast.error(error.response.data.message)
              }else if(error.response.data.message === 'The user already taken membership'){
                toast.error(error.response.data.message)
                console.log()
              }else if(error.response.data.message==='The user already activated the site survey by making the payment'){
                toast.error(error.response.data.message)
             
            }else if(error.response.data.message==='The user with this email id already taken membership'){
              toast.error(error.response.data.message)
            }else if(error.response.data.message==='The user with this phone number already taken membership'){
              toast.error(error.response.data.message)
            }
         else if(error.response.data.message==='No memebership found for the user .. Please add the membership details then site visit'){
            toast.error('Please add the membership details first for the user')
          }
          else if(error.response.data.message==="The user with this email id doesn't have membership.Take membership first"){
            toast.error('Please add the membership details of the user first')
          }
              console.log(error)
              
              
            }}
      
  });

  // console.log('formik values', formik.values);

  const selectoptions = props.product.map((product) => ({
    value: product.unique_id,
    label: product.name,
  }));

  const handleProductSelect = (selectoptions) => {
    // console.log("Selected Product ID:", selectoptions.value);
    formik.setFieldValue("product_unique_id", selectoptions.value);
  };

  const paymentmode = [
    { value: "Offline", label: "Offline" },
    // { value: "Online", label: "Online" },
  ];

  const paymentgateway = [
    { value: "Googlepay", label: "GOOGLE PAY" },
    // { value: "phonepe", label: "PHONE PAY" },
    { value: "Neft", label: "NEFT" },
    { value: "Bank Transfer", label: "BANK TRANSFER" },
    { value: "Paytm", label: "PAYTM" },
    { value: "PhonePe", label: "PHONEPE" },
  ];

  
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const handlePaymentGatewaySelect = (selectedOption) => {
    formik.setFieldValue("payment_method", selectedOption.value);
  };
  const prodcuctService = [
    { value: "Membership", label: "Membership" },
    { value: "Site Visit", label: "Site Visit" },
  ];
  const handlePaymentproductService = (selectedOption) => {
    formik.setFieldValue("product_service", selectedOption.value);
  };

  const handlePaymentModeSelect = (selectedOption) => {
    formik.setFieldValue("payment_mode", selectedOption.value);
  };

  const defaultCountryCode = "+91"; // Change this to the desired country code
  const defaultSelectedOption = countryOptions.find(
    (country) => country.value === defaultCountryCode
  );

  const [selectedCountry, setSelectedCountry] = useState(
    defaultSelectedOption || selectedCountry
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    formik.handleChange(e);

    formik.setFieldValue(name, capitalizeFirstLetter(value));
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    // formik.setFieldValue("phone", {
    //   ...registrationData.phone,
    //   // country: selectedOption.value,
    // });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add user 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="adduser" onSubmit={formik.handleSubmit}>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={handleInputChange}
                //   onChange={formik.handleChange}
                  style={{ textTransform: "capitalize" }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Country Select */}
                <Form.Group>
                <Form.Label>Country Code</Form.Label>
                <Select
                  options={countryOptions.map((country) => ({
                    value: country.value,
                    label: `${country.value} ${country.label}`,
                  }))}
                  value={selectedCountry || defaultSelectedOption}
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
                      marginRight: "10px", // Add right margin for separation
                    }),
                  }}
                  inputProps={{ "aria-required": true }}
                  isSearchable
                />
                </Form.Group>

                {/* Phone Form Control */}
                {/* <Form.Label>choose product</Form.Label> */}
                <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                placeholder="Phone number"
                  type="number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                 </Form.Group>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>choose product</Form.Label>
              <Select
                options={selectoptions}
                isSearchable
                onChange={handleProductSelect}
              />
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="payment_date"
                  value={formik.values.payment_date}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Payment time</Form.Label>
                <Form.Control
                  type="time"
                  name="payment_time"
                  value={formik.values.payment_time}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
          </Row> 
        <Row className="mb-4">
        <Col md={6}>
              <Form.Group>
                <Form.Label>Amount Paid</Form.Label>
                <Form.Control
                  type="number"
                  name="amount_paid"
                  value={formik.values.amount_paid}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Label>Payment For</Form.Label>
              <Select
                options={prodcuctService}
                value={prodcuctService.find(
                  (option) => option.value === formik.values.product_service
                )}
                onChange={handlePaymentproductService}
                isSearchable
                required
              />
            
            </Col>
            </Row>   
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Payment Mode</Form.Label>
              <Select
                options={paymentmode}
                value={paymentmode.find(
                  (option) => option.value === 'Offline'
                )}
                onChange={handlePaymentModeSelect}
                isSearchable
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Payment Gateway</Form.Label>
              <Select
                options={paymentgateway}
                name="payment_method"
                value={paymentgateway.find(
                  (option) => option.value === formik.values.payment_method
                )}
                onChange={handlePaymentGatewaySelect}
                isSearchable
                required
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Form.Group>
              <Form.Label>Transaction id</Form.Label>
              <Form.Control
                type="text"
                name="transaction_id"
                value={formik.values.transaction_id}
                onChange={formik.handleChange}
                required
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
  <Button style={{ backgroundColor: 'red' }} onClick={props.onHide}>Close</Button>
 {loading?(
      // <span>processing..</span>
      <span class="loader"></span>

 ):(
  <Button style={{ backgroundColor: 'green' }} type="submit" form="adduser">
  Add
</Button>
 )}
    
  
</Modal.Footer>

    </Modal>
  );
}

function AddUser() {
  const [modalShow, setModalShow] = React.useState(false);
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("admintoken");
  const handleFetch = async () => {
    console.log("1");
    try {
      console.log("2");
      const response = await axiosInstance.get("product/list/all/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("product response", response.data);
      setProduct(response.data);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ backgroundColor: "#081d29" }}
        onClick={handleFetch}
      >
       Add User <span>+</span>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        setModalShow={setModalShow}
      />
    </>
  );
}

export default AddUser;
