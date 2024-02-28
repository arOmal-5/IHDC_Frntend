import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';

function AddBankAccountComponent() {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem('usertoken');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      account_holder_name: '',
      account_number: '',
      confirm_account_number: '',
      bank_name: '',
      ifsc_code: '',
      confirm_ifsc_code: '',
      pan_number: '',
      branch_name: '',
      check_or_passbook_photo: '',
      pancard_photo: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // Check if account number and confirm account number match
        if (values.account_number !== values.confirm_account_number) {
          formik.setFieldError('confirm_account_number', 'Account Numbers must match');
          return;
        }

        // Check if IFSC code and confirm IFSC code match
        if (values.ifsc_code !== values.confirm_ifsc_code) {
          formik.setFieldError('confirm_ifsc_code', 'IFSC Codes must match');
          return;
        }

        const response = await axiosInstance.post('userapp/user/add/bank/account', values, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        resetForm();
        handleClose();
        console.log('bank account response', response.data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const handleFileChange = (event, fieldName) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue(fieldName, file);
  };

  return (
    <>
      <Button variant="primary" className='btn btn-success ' onClick={handleShow}>
        Add Bank
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} id='addbank'>
            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group controlId="accountHolderName">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control type="text" value={formik.values.account_holder_name} name='account_holder_name' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.account_holder_name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="bankName">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control type="text" value={formik.values.bank_name} name='bank_name' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.bank_name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group controlId="accountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text" value={formik.values.account_number} name='account_number' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.account_number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="confirmAccountNumber">
                  <Form.Label>Confirm Account Number</Form.Label>
                  <Form.Control type="text" name='confirm_account_number' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.confirm_account_number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group controlId="ifscCode">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control type="text" value={formik.values.ifsc_code} name='ifsc_code' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.ifsc_code}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="confirmIfscCode">
                  <Form.Label>Confirm IFSC Code</Form.Label>
                  <Form.Control type="text" name='confirm_ifsc_code' onChange={formik.handleChange} required/>
                  <Form.Control.Feedback type="invalid">{formik.errors.confirm_ifsc_code}</Form.Control.Feedback>
                  
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group controlId="branchName">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control type="text" value={formik.values.branch_name} name='branch_name' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.branch_name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="panNumber">
                  <Form.Label>PAN Number</Form.Label>
                  <Form.Control type="text" value={formik.values.pan_number} name='pan_number' onChange={formik.handleChange} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.pan_number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="panCardUpload">
                  <Form.Label>PAN Card Upload</Form.Label>
                  <Form.Control type="file" onChange={(e) => handleFileChange(e, 'pancard_photo')} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.pancard_photo}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="checkUpload">
                  <Form.Label>Upload Check/Passbook</Form.Label>
                  <Form.Control type="file" onChange={(e) => handleFileChange(e, 'check_or_passbook_photo')} required />
                  <Form.Control.Feedback type="invalid">{formik.errors.check_or_passbook_photo}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button  varient='primary'  className='btn btn-primary' type='submit' form='addbank'>Add</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBankAccountComponent;















// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { Row, Col } from 'react-bootstrap';
// import { useFormik } from 'formik';
// import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';

// function AddBankAccountComponent() {
//   const [show, setShow] = useState(false);
//   const token = localStorage.getItem('usertoken');
// // 
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const formik = useFormik({
//     initialValues: {
//       account_holder_name: '',
//       account_number: '',
//       confirm_account_number: '',
//       bank_name: '',
//       ifsc_code: '',
//       confirm_ifsc_code: '',
//       pan_number: '',
//       branch_name: '',
//       check_or_passbook_photo: '',
//       pancard_photo: '',
//     },
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // Check if account number and confirm account number match
//         if (values.account_number !== values.confirm_account_number) {
//           formik.setFieldError('confirm_account_number', 'Account Numbers must match');
//           return;
//         }

//         // Check if IFSC code and confirm IFSC code match
//         if (values.ifsc_code !== values.confirm_ifsc_code) {
//           formik.setFieldError('confirm_ifsc_code', 'IFSC Codes must match');
//           return;
//         }

//         const response = await axiosInstance.post(`userapp/user/add/bank/account`, values, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           }
//         });
//         resetForm();
//         handleClose();
//         console.log('bank account response', response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });

//   const handleFileChange = (event, fieldName) => {
//     const file = event.currentTarget.files[0];
//     formik.setFieldValue(fieldName, file);
//   };

//   return (
//     <>
//       <Button variant="primary" className='btn btn-success btn-sm' onClick={handleShow}>
//         Add Bank
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add Bank</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={formik.handleSubmit} id='addbank'>
//             <Row className='mb-4'>
//               <Col md={6}>
//                 <Form.Group controlId="accountHolderName">
//                   <Form.Label>Account Holder Name</Form.Label>
//                   <Form.Control type="text" value={formik.values.account_holder_name} name='account_holder_name' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.account_holder_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="bankName">
//                   <Form.Label>Bank Name</Form.Label>
//                   <Form.Control type="text" value={formik.values.bank_name} name='bank_name' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.bank_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className='mb-4'>
//               <Col md={6}>
//                 <Form.Group controlId="accountNumber">
//                   <Form.Label>Account Number</Form.Label>
//                   <Form.Control type="text" value={formik.values.account_number} name='account_number' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.account_number}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="confirmAccountNumber">
//                   <Form.Label>Confirm Account Number</Form.Label>
//                   <Form.Control type="text" name='confirm_account_number' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.confirm_account_number}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className='mb-4'>
//               <Col md={6}>
//                 <Form.Group controlId="ifscCode">
//                   <Form.Label>IFSC Code</Form.Label>
//                   <Form.Control type="text" value={formik.values.ifsc_code} name='ifsc_code' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.ifsc_code}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="confirmIfscCode">
//                   <Form.Label>Confirm IFSC Code</Form.Label>
//                   <Form.Control type="text" name='confirm_ifsc_code' onChange={formik.handleChange} required/>
//                   <Form.Control.Feedback type="invalid">{formik.errors.confirm_ifsc_code}</Form.Control.Feedback>
                  
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className='mb-4'>
//               <Col md={6}>
//                 <Form.Group controlId="branchName">
//                   <Form.Label>Branch Name</Form.Label>
//                   <Form.Control type="text" value={formik.values.branch_name} name='branch_name' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.branch_name}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="panNumber">
//                   <Form.Label>PAN Number</Form.Label>
//                   <Form.Control type="text" value={formik.values.pan_number} name='pan_number' onChange={formik.handleChange} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.pan_number}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="panCardUpload">
//                   <Form.Label>PAN Card Upload</Form.Label>
//                   <Form.Control type="file" onChange={(e) => handleFileChange(e, 'pancard_photo')} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.pancard_photo}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="checkUpload">
//                   <Form.Label>Upload Check/Passbook</Form.Label>
//                   <Form.Control type="file" onChange={(e) => handleFileChange(e, 'check_or_passbook_photo')} required />
//                   <Form.Control.Feedback type="invalid">{formik.errors.check_or_passbook_photo}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" type='submit' form='addbank'>Add</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddBankAccountComponent;








// // import React,{ useState } from 'react';
// // import Button from 'react-bootstrap/Button';
// // import Modal from 'react-bootstrap/Modal';
// // import Form from 'react-bootstrap/Form';
// // import {  Row, Col } from 'react-bootstrap';
// // import {useFormik} from 'formik'

// // import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';



// // function AddBankAccountComponent() {
// //   const [show, setShow] = useState(false);
// //   const token=localStorage.getItem('usertoken')

// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);

// //   const formik=useFormik({
// //     initialValues:{
// //       account_holder_name:'',
// //       account_number:'',
// //       bank_name:'',
// //       ifsc_code:'',
// //       pan_number:'',
// //       branch_name:'',
// //       check_or_passbook_photo:'',
// //       pancard_photo:''
// //     },
// //     onSubmit:async(values,{resetForm})=>{
// //       try {
// //         const response=await axiosInstance.post(`userapp/user/add/bank/account`,values,{
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data',
          
// //         }
// //         })
// //         resetForm()
// //         handleClose()
// //         console.log('bank account response',response.data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     }
// //   })

// //   const handleFileChange = (event, fieldName) => {
// //     const file = event.currentTarget.files[0];
// //     formik.setFieldValue(fieldName, file);
// //   };

// //   console.log(formik.values);
// //   return (
// //     <>
// //       <Button variant="primary" className='btn btn-success btn-sm' onClick={handleShow}>
// //         Add Bank
// //       </Button>

// //       <Modal
// //         show={show}
// //         onHide={handleClose}
// //         backdrop="static"
// //         keyboard={false}
// //       >
// //         <Modal.Header closeButton>
// //           <Modal.Title>Add Bank</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //       <Form onSubmit={formik.handleSubmit} id='addbank'>
// //         <Row className='mb-4'>
// //           <Col md={6}>
// //             <Form.Group controlId="accountHolderName">
// //               <Form.Label>Account Holder Name</Form.Label>
// //               <Form.Control type="text" value={formik.values.account_holder_name} name='account_holder_name' onChange={formik.handleChange}  required />
// //             </Form.Group>
// //           </Col>
// //           <Col md={6}>
// //             <Form.Group controlId="bankName">
// //               <Form.Label>Bank Name</Form.Label>
// //               <Form.Control type="text" value={formik.values.bank_name} name='bank_name' onChange={formik.handleChange}  required/>
// //             </Form.Group>
// //           </Col>

          
// //         </Row>

// //         <Row className='mb-4'>

// //         <Col md={6}>
// //             <Form.Group controlId="accountNumber">
// //               <Form.Label>Account Number</Form.Label>
// //               <Form.Control type="text" value={formik.values.account_number} name='account_number' onChange={formik.handleChange} required />
// //             </Form.Group>
// //           </Col>
          
// //           <Col md={6}>
// //             <Form.Group controlId="accountNumber">
// //               <Form.Label>confirm Account Number</Form.Label>
// //               <Form.Control type="text" name='account_number' onChange={formik.handleChange} required/>
// //             </Form.Group>
// //           </Col>

// //           {/* <Col md={6}>
// //             <Form.Group controlId="accountType">
// //               <Form.Label>Account Type</Form.Label>
// //               <Form.Control as="select" >
// //                 <option value="savings">Savings</option>
// //                 <option value="checking">Checking</option>
// //               </Form.Control>
// //             </Form.Group>
// //           </Col> */}
// //         </Row>

// //         <Row className='mb-4'>
         
// //             <Col md={6}>
// //             <Form.Group controlId="ifscCode">
// //               <Form.Label>IFSC Code</Form.Label>
// //               <Form.Control type="text" value={formik.values.ifsc_code} name='ifsc_code' onChange={formik.handleChange} required/>
// //             </Form.Group>
// //           </Col>

// //           <Col md={6}>
// //             <Form.Group controlId="ifscCode">
// //               <Form.Label>Confirm IFSC Code</Form.Label>
// //               <Form.Control type="text"  name='ifsc_code' onChange={formik.handleChange} required />
// //             </Form.Group>
// //           </Col>
// //         </Row>

// //         <Row className='mb-4'>
// //         <Col md={6}>
// //             <Form.Group controlId="branchName">
// //               <Form.Label>Branch Name</Form.Label>
// //               <Form.Control type="text" value={formik.values.branch_name} name='branch_name' onChange={formik.handleChange} required/>
// //             </Form.Group>
// //           </Col>

// //           <Col md={6}>
// //             <Form.Group controlId="branchName">
// //               <Form.Label>Pan Number</Form.Label>
// //               <Form.Control type="text" value={formik.values.pan_number} name='pan_number' onChange={formik.handleChange} required />
// //             </Form.Group>
// //           </Col>

// //           {/* <Col md={6}>
// //             <Form.Group controlId="ifscCode">
// //               <Form.Label>IFSC Code</Form.Label>
// //               <Form.Control type="text" value={formik.values.ifsc_code} name='ifsc_code' onChange={formik.handleChange}  />
// //             </Form.Group>
// //           </Col> */}
// //         </Row>

// //         {/* <Row className='mb-4'>
// //           <Col md={6}>
// //             <Form.Group controlId="panCardUpload">
// //               <Form.Label>PAN Card Upload</Form.Label>
// //               <Form.Control type="file" />
// //             </Form.Group>
// //           </Col>

// //           <Col md={6}>
// //             <Form.Group controlId="checkUpload">
// //               <Form.Label>Check Upload</Form.Label>
// //               <Form.Control type="file" />
// //             </Form.Group>
// //           </Col>
// //         </Row> */}
// //          <Row className="mb-4">
// //         <Col md={6}>
// //           <Form.Group controlId="panCardUpload">
// //             <Form.Label>PAN Card Upload</Form.Label>
// //             <Form.Control
// //               type="file"
// //               onChange={(e) => handleFileChange(e, 'pancard_photo')}
// //             />
// //           </Form.Group>
// //         </Col>

// //         <Col md={6}>
// //           <Form.Group controlId="checkUpload">
// //             <Form.Label>Upload Check/Passbook</Form.Label>
// //             <Form.Control
// //               type="file"
// //               onChange={(e) => handleFileChange(e, 'check_or_passbook_photo')}
// //             />
// //           </Form.Group>
// //         </Col>
// //       </Row>

// //         {/* Add other fields here using the same Row and Col structure */}

// //       </Form>
// //     </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleClose}>
// //             Close
// //           </Button>
// //           <Button variant="primary" type='submit' form='addbank'>Add</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </>
// //   );
// // }

// // export default AddBankAccountComponent;