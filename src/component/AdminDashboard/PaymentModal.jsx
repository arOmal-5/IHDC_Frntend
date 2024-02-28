import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { useNavigate } from 'react-router-dom';
import avatar from '../../Assets/img/avatar.jpg'
import ihdclogo from '../../Assets/img/ihdclogo.jpg'


function MyVerticallyCenteredModal(props) {
    // const token=localStorage.getItem('usertoken')
    // const handlePayment=async()=>{
    //     try {
        //  const response = await axiosInstance.post('url',{},{
    //             headers:{
    //                 'Authorization': Bearer ${token}
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
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
          // navigate(`/user/success/${encodeURIComponent(JSON.stringify(propsToPass))}`);

        })
        .catch((error) => {
          console.log('ooooooooooooooooooooooooooooooo')
          console.log(error.response.data);
        });
    };
    
  
  
   const handlePayment = (id) =>{
      console.log(id,'sijuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwuu')
      axiosInstance.post(`product/subcription/payment/intiated/${id}`,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Response:', response);
      const redirectUrl = response.data.message;
      window.location.href = redirectUrl;

        // console.log(response.data,'response success')
        // var order_id = response.data.data.id
        // var api_key = response.data.data.notes.key1
        // console.log(api_key, '999999999999999999999999999999999999999')
            
        // // handle payment
        // const options = {
          
        //     key: api_key, // Enter the Key ID generated from the Dashboard
        //     name: "Razorpay Gateway Corp",
        //     description: "Membership Transaction",
        //     image: "https://example.com/your_logo",
        //     order_id: order_id, //This is a sample Order ID. Pass the id obtained in the response of createOrder().
        //     handler: function (response) {
        //       console.log('response.razorpay_payment_id :',response.razorpay_payment_id );
        //       console.log('response.razorpay_order_id :',response.razorpay_order_id );
        //       console.log('response.razorpay_signature :',response.razorpay_signature );
  
        //       //complete order
        //         complete_order(
        //             response.razorpay_payment_id,
        //             response.razorpay_order_id,
        //             response.razorpay_signature
        //         )
        //     },
        //     prefill: {
        //     name: response.data.datas.name,
        //     email: response.data.datas.email,
        //     contact: response.data.details.phone,
        //     },
        //     notes: {
        //     address: "Razorpay Corporate Office",
        //     },
        //     theme: {
        //     color: "#3399cc",
        //     },
        // };
        // const rzp1 = new window.Razorpay(options);
  
        // rzp1.on("payment.failed", function (response) {
        //   console.log(response)
        //   alert("Something whent wrong.. Your amount didn debited from account")
        //     // alert(response.error.code);
        //     alert(response.error.description,'description');
        //     // alert(response.error.source);
        //     // alert(response.error.step);
        //     alert(response.error.reason,'reason');
        //     // alert(response.error.metadata.order_id);
        //     // alert(response.error.metadata.payment_id);
        // });
        // rzp1.open();
  
        
      })
      .catch((error) => {
        console.log(error)
        console.log('erorrrrrr')
        console.log(error.response.data);
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
        <b>BECOME A MEMBER</b>
   
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container >
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={ihdclogo} alt="User Avatar" />
            <Card.Body>
              <Card.Title className='text-center'>{props.ProductDetails.name}</Card.Title>
              <Card.Text> </Card.Text>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
        <Card>
                  <Card.Body>
                    <Card.Title>Premium Features</Card.Title>
                    <Card.Text>
                    <ul>
      <li>5-30% Discount on Materials</li>
      <li>0.5-1.5% Lower interest fee payments</li>
      <li>10 year interest free Payments</li>
      <li>Access to experts & Community</li>
      
      <li>You will have access to our AI-generated room visualization platform</li>
      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>

          {/* Additional Sections */}
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Subcription Amount</Card.Title>
              <Card.Text className='text-danger'>
              <span style={{fontFamily:"arial"}}>₹ </span>{
                    // props.ProductDetails.influencer_commission_percentage
                    props.ProductDetails.subcription_fee  


                }<span></span>
              {/* </Card.Text> */}
               {/* <hr style={{width:'100%',height:'2px',backgroundColor:'red'}}/> */}
               {/* <hr class="my-4 border-top border-2 border-dashed"></hr> */}
              {/* <Card.Title>Note:</Card.Title> */}
              {/* <Card.Text> */}
                {/* By making payment you will have exclusive access to our product community and many more... */}
              {/* {
                    props.ProductDetails.organiser_commission_percentage

                }<span>%</span> */}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* <Card className="mt-3"> */}
            {/* <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                Phone: +123 456 789<br />
                Social Media: @username
              </Card.Text>
            </Card.Body> */}
          {/* </Card> */}
        </Col>
      </Row>
    </Container>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button className='btn-success' onClick={() => handlePayment(props.ProductDetails.id)}>Enroll Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

function PaymentModal({ProductDetails}) {
  const [modalShow, setModalShow] = React.useState(false);
// console.log('ProductDetails',ProductDetails);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {/* checkout  */}
        Buy Now 
      </Button>
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ProductDetails={ProductDetails}
      />
    </>
  );
}

export default PaymentModal










// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { useNavigate } from 'react-router-dom';

// function MyVerticallyCenteredModal(props) {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [redirectUrl, setRedirectUrl] = useState('');
//   const token = localStorage.getItem('usertoken');

//   const idGetting = () => {
//     const uniqueTransactionId = localStorage.getItem('unique_transaction_id');
//     console.log('unique_transaction_id:', uniqueTransactionId);
//     navigate(`/user/success?id=${uniqueTransactionId}`);
//   };

//   const handleMessageFromIframe = (event) => {
//     if (event.origin !== 'https://mercury-uat.phonepe.com') {
//       return;
//     }

//     const dataFromIframe = event.data;
//     console.log('Received from iframe:', dataFromIframe);
//     idGetting();
//   };

//   useEffect(() => {
//     console.log('Modal is mounted and visible');
//     return () => {
//       console.log('Modal is unmounting');
//     };
//   }, [showModal]);

//   useEffect(() => {
//     console.log('Iframe is mounted and visible');
//     return () => {
//       console.log('Iframe is unmounting');
//     };
//   }, [redirectUrl]);

//   useEffect(() => {
//     window.addEventListener('message', handleMessageFromIframe);

//     // const fetchData = async () => {
//     //   try {
//     //     const response = await axiosInstance.get(`product/display/registred/user/details/in/payment/${link_data}`);
//     //     setUserDetails(response.data);

//     //     // Set the unique_transaction_id in local storage
//     //   } catch (error) {
//     //     console.log('Fetch Data Error:', error);
//     //   }
//     // };
//     // fetchData();

//     return () => {
//       window.removeEventListener('message', handleMessageFromIframe);
//     };
//   }, []);

//   const handlePayment = (id) => {
//     axiosInstance
//       .post(`product/subcription/payment/intiated/${id}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log('API Response:', response.data);
//         const redirectUrl = response.data.message;
//         localStorage.setItem('unique_transaction_id', response.data.unique_transaction_id);
//         setRedirectUrl(redirectUrl);
//         setShowModal(true);
//       })
//       .catch((error) => {
//         console.log('API Error:', error);
//       });
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const ModalComponent = (
//     <Modal show={showModal} onHide={handleCloseModal} size="lg">
//       <Modal.Body className="d-flex justify-content-center align-items-center">
//         <iframe src={redirectUrl || 'about:blank'} width="100%" height="600px" title="PhonePe Payment"></iframe>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleCloseModal}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   return (
//     <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">Make Payment</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Container className="mt-5">
//           <Row>
//             <Col md={4}>
//               <Card>
//                 <Card.Img variant="top" src="https://via.placeholder.com/150" alt="User Avatar" />
//                 <Card.Body>
//                   <Card.Title>{props.ProductDetails.name}</Card.Title>
//                   <Card.Text></Card.Text>
//                   <Card.Text></Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={8}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>Confirm Your payment</Card.Title>
//                   <Card.Text>{/* props.ProductDetails.subcription_fee */}</Card.Text>
//                 </Card.Body>
//               </Card>

//               <Card className="mt-3">
//                 <Card.Body>
//                   <Card.Title>Subcription Amount</Card.Title>
//                   <Card.Text>₹{props.ProductDetails.subcription_fee}<span></span></Card.Text>
//                   <hr class="my-4 border-top border-2 border-dashed"></hr>
//                   <Card.Title>Note:</Card.Title>
//                   <Card.Text>
//                     By making payment, you will have exclusive access to our product community and many more...
//                   </Card.Text>
//                 </Card.Body>
//               </Card>

//               <Card className="mt-3"></Card>
//             </Col>
//           </Row>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//         <Button className='btn-success' onClick={() => handlePayment(props.ProductDetails.id)}>
//           Make Payment
//         </Button>
//       </Modal.Footer>
//       {ModalComponent}
//     </Modal>
//   );
// }

// function PaymentModal({ ProductDetails }) {
//   const [modalShow, setModalShow] = React.useState(false);
//   console.log('ProductDetails', ProductDetails);
//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Buy Now
//       </Button>

//       <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} ProductDetails={ProductDetails} />
//     </>
//   );
// }

// export default PaymentModal;



















// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { useNavigate } from 'react-router-dom';


// function MyVerticallyCenteredModal(props) {

//     const navigate = useNavigate();
//     const [showModal, setShowModal] = useState(false); 
//     const [redirectUrl, setRedirectUrl] = useState('');

//     const token=localStorage.getItem('usertoken')

//     const idGetting = () => {
//       const uniqueTransactionId = localStorage.getItem('unique_transaction_id');
  
//       console.log('unique_transaction_id:', uniqueTransactionId);
//       navigate(`/user/success?id=${uniqueTransactionId}`);
//     };
  
//     const handleMessageFromIframe = (event) => {
//       if (event.origin !== 'https://mercury-uat.phonepe.com') {
//         return;
//       }
  
//       const dataFromIframe = event.data;
//       console.log('Received from iframe:', dataFromIframe);
//       idGetting();
//     };
    
  
//     const handlePayment = (id) => {
//       axiosInstance.post(`product/subcription/payment/intiated/${id}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((response) => {
//         console.log('API Response:', response.data);
//         const redirectUrl = response.data.message;
//         localStorage.setItem('unique_transaction_id', response.data.unique_transaction_id);
  
//         setRedirectUrl(redirectUrl);
  
//         // Show the modal
//         setShowModal(true);
//       }).catch((error) => {
//         console.log('API Error:', error);
//       });
//     };
  
//     const handleCloseModal = () => {
//       setShowModal(false);
//     };
  
//     const ModalComponent = (
//       <Modal show={showModal} onHide={handleCloseModal} size="lg">
//         {/* <Modal.Header closeButton>
//           <Modal.Title>Payment Page</Modal.Title>
//         </Modal.Header> */}
//         <Modal.Body className="d-flex justify-content-center align-items-center">
//           {/* Add console log to check unique_transaction_id */}
//           {/* {console.log('unique_transaction_id in ModalComponent:', uniqueTransactionId)} */}
//           {/* Embed the iframe directly */}
//           <iframe
//             src={redirectUrl || 'about:blank'}
//             width="100%"
//             height="600px"
//             title="PhonePe Payment"
//           ></iframe>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
          
//         </Modal.Footer>
//       </Modal>
//     );



//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//         {/* <button onClick={paymentStart}> </button> */}
//         Make Payment
   
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//       <Container className="mt-5">
//       <Row>
//         <Col md={4}>
//           <Card>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" alt="User Avatar" />
//             <Card.Body>
//               <Card.Title>{props.ProductDetails.name}</Card.Title>
//               <Card.Text> </Card.Text>
//               <Card.Text></Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Confirm Your payment</Card.Title>
//               <Card.Text>
//                 {
//                     // props.ProductDetails.subcription_fee  
//                 }
//               </Card.Text>
//             </Card.Body>
//           </Card>

//           {/* Additional Sections */}
//           <Card className="mt-3">
//             <Card.Body>
//               <Card.Title>Subcription Amount</Card.Title>
//               <Card.Text>
//                 ₹{
//                     // props.ProductDetails.influencer_commission_percentage
//                     props.ProductDetails.subcription_fee  


//                 }<span></span>
//               </Card.Text>
//                {/* <hr style={{width:'100%',height:'2px',backgroundColor:'red'}}/> */}
//                <hr class="my-4 border-top border-2 border-dashed"></hr>
//               <Card.Title>Note:</Card.Title>
//               <Card.Text>
//                 By making payment you will have exclusive access to our product community and many more...
//               {/* {
//                     props.ProductDetails.organiser_commission_percentage

//                 }<span>%</span> */}
//               </Card.Text>
//             </Card.Body>
//           </Card>

//           <Card className="mt-3">
//             {/* <Card.Body>
//               <Card.Title>Contact Information</Card.Title>
//               <Card.Text>
//                 Phone: +123 456 789<br />
//                 Social Media: @username
//               </Card.Text>
//             </Card.Body> */}
//           </Card>
//         </Col>
//       </Row>
//     </Container>
        
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//         <Button className='btn-success' onClick={() => handlePayment(props.ProductDetails.id)}>Make Payment</Button>
//       </Modal.Footer>
//       {ModalComponent}
//     </Modal>
//   );
// }

// function PaymentModal({ProductDetails}) {
//   const [modalShow, setModalShow] = React.useState(false);
// console.log('ProductDetails',ProductDetails);
//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         {/* checkout  */}
//         Buy Now 
//       </Button>
      

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         ProductDetails={ProductDetails}
//       />
//     </>
//   );
// }

// export default PaymentModal


