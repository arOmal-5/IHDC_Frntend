import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { useNavigate } from 'react-router-dom';
import avatar from '../../Assets/img/ihdclogo.jpg'
import site from '../../Assets/img/site-visit-payment-modal.png'
import { FaLock } from "react-icons/fa";

function MyVerticallyCenteredModal(props) {
   
    const navigate = useNavigate();

    const token=localStorage.getItem('usertoken')
    const complete_order = (paymentID, orderID, signature) => {
      const url = `product/subcription/sucessfull/completed/${paymentID}/${orderID}/${signature}`
      axiosInstance.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
            
            navigate('/user/success/');
            // const propsToPass = { \props };

          // navigate(/advocate/success?message=${encodeURIComponent(message)});
          // navigate(/user/success/${encodeURIComponent(JSON.stringify(propsToPass))});

        })
        .catch((error) => {
          // console.log('ooooooooooooooooooooooooooooooo')
        });
    };
    
  
  
   const handlePayment = (id) =>{
      axiosInstance.post(`product/service/payment/request/initiation/${id}`,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log('Response:', response);
      const redirectUrl = response.data.message;
      window.location.href = redirectUrl;

      
  
        
      })
      .catch((error) => {
        // console.log(error)
        // console.log('erorrrrrr')
        // console.log(error.response.data)
      });
  
    }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {/* <button onClick={paymentStart}> </button> */}
        <b>SITE VISIT AND SURVEY</b>
   
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={site} alt="User Avatar" />
            
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Details </Card.Title>
              <Card.Text>
              <ul>
<li>Survey team will visit the propety and document it.</li>
<li>Later, the our team of architects will come and visit your site with the drawings.</li>
<li>Based on clients requirements changes are made on the drawings</li>
</ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Amount</Card.Title>
              <Card.Text >
              <span style={{fontFamily:"arial",}} className='text-danger'>₹ </span>{
                //    <span className='text-danger fw-bold'> {props.ProductDetails.subcription_fee } </span>
                <span className='text-danger fw-bold'>20,000/- </span>

                }
              </Card.Text>
              
              {/* <Card.Title>Note:</Card.Title> */}
              <Card.Text>
              By making this payment our Community Manager will contact you and fix the survey the date.
              </Card.Text>
            </Card.Body>
          </Card>
      
        </Col>
      </Row>
      <Row>
       
      </Row>
    </Container>
        
      </Modal.Body>
      <Modal.Footer >
        <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
        <Button className='btn-success ' onClick={() => handlePayment(props.ProductDetails.id)}>Activate now</Button>
      </Modal.Footer>
    </Modal>
  );
}

function FeaturePaymentModal({productid}) {
  const [modalShow, setModalShow] = useState(false);
  const [ProductDetails,setProductDetails]=useState([])
  const token=localStorage.getItem('usertoken')
const handleFetchData=async()=>{
  try {
    
    const singleproductid=await axiosInstance.get(`product/details/${productid}`,{
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
// console.log('singleproductid',singleproductid.data);
  setProductDetails(singleproductid.data)
  setModalShow(true)
  } catch (error) {
    
  }
}
  return (
    <>
      {/* <Button  variant='success' onClick={handleFetchData}>
        unlock features
      </Button> */}
      <Button className='btn  btn-sm' style={{backgroundColor:'green',border:'none'}}onClick={handleFetchData}>Activate now</Button> 
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ProductDetails={ProductDetails}
        productid={productid}
      />
    </>
  );
}

export default FeaturePaymentModal