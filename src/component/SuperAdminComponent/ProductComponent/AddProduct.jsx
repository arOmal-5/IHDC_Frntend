import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useFormik } from 'formik'
// import AxiosConfiguration from '../../../config/axios/AxiosConfiguration.jsx'
import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productSchema } from '../../../schema/adminSchema/ProductSchema.jsx'

function MyVerticallyCenteredModal(props) {
  const token = localStorage.getItem('admintoken');
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      subcription_fee: '',
      inclusive_GST: '',
      influencer_commission_percentage: '',
      organiser_commission_percentage: '',
      full_fillment_link: ''

    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {

      await axiosInstance.post('product/create', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      }).then((response) => {
        console.log('response', response.data);
        toast.success(response.data.message)
        
        resetForm()
        props.onHide()
      }).catch((errors) => {
        console.log(errors);
        toast.error(errors.message)

      })
    }
  })

const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Store the original input value in formik or state
    formik.handleChange(e);
    // Apply capitalization for display
    formik.setFieldValue(name, capitalizeFirstLetter(value));
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
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="product" onSubmit={formik.handleSubmit}>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group >
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name='name' value={formik.values.name} onChange={handleInputChange} />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{color:'red'}}>{formik.errors.name}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productCategory">
                <Form.Label>Subcription Fee(Inclusive of GST)</Form.Label>
                <Form.Control type="text" name='subcription_fee' value={formik.values.subcription_fee} onChange={formik.handleChange} />
                {formik.touched.subcription_fee && formik.errors.subcription_fee ? (
                  <div style={{color:'red'}}>{formik.errors.subcription_fee}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={4}>
              <Form.Group controlId="price">
                <Form.Label>Gst Percentage</Form.Label>
                <Form.Control type="number" name='inclusive_GST' value={formik.values.inclusive_GST} onChange={formik.handleChange} />
                {formik.touched.inclusive_GST && formik.errors.inclusive_GST ? (
                  <div style={{color:'red'}}>{formik.errors.inclusive_GST}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="quantity">
                <Form.Label>influencer percentage</Form.Label>
                <Form.Control type="number" name='influencer_commission_percentage' value={formik.values.influencer_commission_percentage} onChange={formik.handleChange} />
                {formik.touched.influencer_commission_percentage && formik.errors.influencer_commission_percentage ? (
                  <div style={{color:'red'}}>{formik.errors.influencer_commission_percentage}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="manufacturer">
                <Form.Label>Organiser percentage</Form.Label>
                <Form.Control type="text" name='organiser_commission_percentage' value={formik.values.organiser_commission_percentage} onChange={formik.handleChange} />
                {formik.touched.organiser_commission_percentage && formik.errors.organiser_commission_percentage ? (
                  <div style={{color:'red'}}>{formik.errors.organiser_commission_percentage}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Full fillment link</Form.Label>
                <Form.Control type="text" name='full_fillment_link' value={formik.values.full_fillment_link} onChange={formik.handleChange} />
                {formik.touched.full_fillment_link && formik.errors.full_fillment_link ? (
                  <div style={{color:'red'}}>{formik.errors.full_fillment_link}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name='description' value={formik.values.description} onChange={formik.handleChange} />
                {formik.touched.description && formik.errors.description ? (
                  <div style={{color:'red'}}>{formik.errors.description}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button type='submit'  form='product'>Add</Button>
        {/* <button type='submit'  form='product'>Add</button> */}
      </Modal.Footer>
    </Modal>
  );
}

function AddProduct() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" style={{ backgroundColor: '#081d29', color: '#ffffff' }} onClick={() => setModalShow(true)}>
        Product <span>+</span>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AddProduct;











// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React from 'react';
// import {  Row, Col, Form } from 'react-bootstrap';
// import {useFormik} from 'formik'
// // import AxiosConfiguration from '../../../config/axios/AxiosConfiguration.jsx'
// import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
// import {  toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// function MyVerticallyCenteredModal(props) {
//   const token=localStorage.getItem('admintoken');
//   const formik=useFormik({
//     initialValues:{
//       name:'',
//       description:'',
//       subcription_fee:'',
//       inclusive_GST:'',
//       influencer_commission_percentage:'',
//       organiser_commission_percentage:'',
//       full_fillment_link:''

//     },
//     onSubmit: async(values,{resetForm})=>{
      
//       await axiosInstance.post('product/create',values,{
//         headers: {
//           'Authorization': `Bearer ${token}`
//       }

//       }).then((response)=>{
//         console.log('response',response.data);
//         toast.success(response.data.message)
//         resetForm()
//       }).catch((errors)=>{
//         console.log(errors);
//         toast.error(errors.message)
        
//       })
//     }
//   })

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Add Product
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//       <Form id="product" onSubmit={formik.handleSubmit}>
//           <Row className='mb-3'>
//             <Col md={6}>
//               <Form.Group >
//                 <Form.Label>Product Name</Form.Label>
//                 <Form.Control type="text" name='name' value={formik.values.name} onChange={formik.handleChange}  />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group controlId="productCategory">
//                 <Form.Label>Subcription Fee(Inclusive of GST)</Form.Label>
//                 <Form.Control type="text"  name='subcription_fee' value={formik.values.subcription_fee} onChange={formik.handleChange} />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className='mb-3'>
//             <Col md={4}>
//               <Form.Group controlId="price">
//                 <Form.Label>Gst Percentage</Form.Label>
//                 <Form.Control type="number" name='inclusive_GST' value={formik.values.inclusive_GST} onChange={formik.handleChange}/>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId="quantity">
//                 <Form.Label>influencer percentage</Form.Label>
//                 <Form.Control type="number" name='influencer_commission_percentage' value={formik.values.influencer_commission_percentage} onChange={formik.handleChange} />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group controlId="manufacturer">
//                 <Form.Label>Organiser percentage</Form.Label>
//                 <Form.Control type="text" name='organiser_commission_percentage' value={formik.values.organiser_commission_percentage} onChange={formik.handleChange}  />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row className='mb-3'>
//             <Col md={12}>
//               <Form.Group controlId="description">
//                 <Form.Label>Full fillment link</Form.Label>
//                 <Form.Control type="text"  name='full_fillment_link' value={formik.values.full_fillment_link} onChange={formik.handleChange} />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className='mb-3'>
//             <Col md={12}>
//               <Form.Group controlId="description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control as="textarea" rows={3} name='description' value={formik.values.description} onChange={formik.handleChange} />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
        
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//         <Button type='submit' onClick={props.onHide} form='product'>Add</Button>
//         {/* <button type='submit'  form='product'>Add</button> */}
//       </Modal.Footer>
//     </Modal>
//   );
// }

// function AddProduct() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" style={{backgroundColor:'#081d29',color:'#ffffff'}} onClick={() => setModalShow(true)}>
//         Product <span>+</span>
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// export default AddProduct;
