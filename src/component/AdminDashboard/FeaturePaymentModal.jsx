import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { useNavigate } from 'react-router-dom';
import avatar from '../../Assets/img/ihdclogo.jpg'
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
        console.log(error.response.data)
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
      <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={avatar} alt="User Avatar" />
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
                    
                    props.ProductDetails.subcription_fee  
                }
              </Card.Text>
              
              <Card.Title>Note:</Card.Title>
              <Card.Text>
                By making payment you will have exclusive access to our product community and many more...
              </Card.Text>
            </Card.Body>
          </Card>
      
        </Col>
      </Row>
      <Row>
      {/* <Card className="mt-3">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                
                Name :<span>{props.ProductDetails?.created_by?.name}</span><br/>
                Email:<span>{props.ProductDetails?.created_by?.email}</span>

              </Card.Text>
            </Card.Body>
          </Card> */}
      </Row>
    </Container>
        
      </Modal.Body>
      <Modal.Footer className='d-flex align-items-center justify-content-center justify-content-around'>
        <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
        <Button className='btn-success ' onClick={() => handlePayment(props.ProductDetails.id)}>Enroll now!</Button>
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
console.log('singleproductid',singleproductid.data);
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
      <Button className='btn  btn-sm' style={{backgroundColor:'#34786c',border:'none'}}onClick={handleFetchData}>Unlock <FaLock /></Button> 
      

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















// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React,{useState} from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { useNavigate } from 'react-router-dom';
// import avatar from '../../Assets/img/avatar.jpg'
// import { FaLock } from "react-icons/fa";

// function MyVerticallyCenteredModal(props) {
   
//     const navigate = useNavigate();

//     const token=localStorage.getItem('usertoken')
//     const complete_order = (paymentID, orderID, signature) => {
//       const url = `product/subcription/sucessfull/completed/${paymentID}/${orderID}/${signature}`
//       axiosInstance.post(
//         url,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//         .then((response) => {
            
//             navigate('/user/success/');
//             // const propsToPass = { \props };

//           // navigate(/advocate/success?message=${encodeURIComponent(message)});
//           // navigate(/user/success/${encodeURIComponent(JSON.stringify(propsToPass))});

//         })
//         .catch((error) => {
//           console.log('ooooooooooooooooooooooooooooooo')
//           console.log(error.response.data);
//         });
//     };
    
  
  
//    const handlePayment = (id) =>{
//       console.log(id,'sijuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwuu')
//       axiosInstance.post(`product/subcription/payment/intiated/${id}`,null,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log('Response:', response);
//       const redirectUrl = response.data.message;
//       window.location.href = redirectUrl;

//         // console.log(response.data,'response success')
//         // var order_id = response.data.data.id
//         // var api_key = response.data.data.notes.key1
//         // console.log(api_key, '999999999999999999999999999999999999999')
            
//         // // handle payment
//         // const options = {
          
//         //     key: api_key, // Enter the Key ID generated from the Dashboard
//         //     name: "Razorpay Gateway Corp",
//         //     description: "Membership Transaction",
//         //     image: "https://example.com/your_logo",
//         //     order_id: order_id, //This is a sample Order ID. Pass the id obtained in the response of createOrder().
//         //     handler: function (response) {
//         //       console.log('response.razorpay_payment_id :',response.razorpay_payment_id );
//         //       console.log('response.razorpay_order_id :',response.razorpay_order_id );
//         //       console.log('response.razorpay_signature :',response.razorpay_signature );
  
//         //       //complete order
//         //         complete_order(
//         //             response.razorpay_payment_id,
//         //             response.razorpay_order_id,
//         //             response.razorpay_signature
//         //         )
//         //     },
//         //     prefill: {
//         //     name: response.data.datas.name,
//         //     email: response.data.datas.email,
//         //     contact: response.data.details.phone,
//         //     },
//         //     notes: {
//         //     address: "Razorpay Corporate Office",
//         //     },
//         //     theme: {
//         //     color: "#3399cc",
//         //     },
//         // };
//         // const rzp1 = new window.Razorpay(options);
  
//         // rzp1.on("payment.failed", function (response) {
//         //   console.log(response)
//         //   alert("Something whent wrong.. Your amount didn debited from account")
//         //     // alert(response.error.code);
//         //     alert(response.error.description,'description');
//         //     // alert(response.error.source);
//         //     // alert(response.error.step);
//         //     alert(response.error.reason,'reason');
//         //     // alert(response.error.metadata.order_id);
//         //     // alert(response.error.metadata.payment_id);
//         // });
//         // rzp1.open();
  
        
//       })
//       .catch((error) => {
//         console.log(error)
//         console.log('erorrrrrr')
//         console.log(error.response.data)
//       });
  
//     }



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
//             <Card.Img variant="top" src={avatar} alt="User Avatar" />
//             <Card.Body>
//               <Card.Title className='text-center'>{props.ProductDetails.name}</Card.Title>
//               <Card.Text> </Card.Text>
//               <Card.Text></Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Premium Features</Card.Title>
//               <Card.Text>
//               <ul>
// <li>5-30% Discount on Materials</li>
// <li>0.5-1.5% Lower interest fee payments</li>
// <li>10 year interest free Payments</li>
// <li>Access to experts & Community</li>
// </ul>
//               </Card.Text>
//             </Card.Body>
//           </Card>

//           {/* Additional Sections */}
//           <Card className="mt-3">
//             <Card.Body>
//               <Card.Title>Subcription Amount</Card.Title>
//               <Card.Text className='text-danger'>
//                 ₹{
                    
//                     props.ProductDetails.subcription_fee  
//                 }
//               </Card.Text>
              
//               <Card.Title>Note:</Card.Title>
//               <Card.Text>
//                 By making payment you will have exclusive access to our product community and many more...
//               </Card.Text>
//             </Card.Body>
//           </Card>
      
//         </Col>
//       </Row>
//       <Row>
//       <Card className="mt-3">
//             <Card.Body>
//               <Card.Title>Contact Information</Card.Title>
//               <Card.Text>
                
//                 Name :<span>{props.ProductDetails?.created_by?.name}</span><br/>
//                 Email:<span>{props.ProductDetails?.created_by?.email}</span>

//               </Card.Text>
//             </Card.Body>
//           </Card>
//       </Row>
//     </Container>
        
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//         <Button className='btn-success' onClick={() => handlePayment(props.ProductDetails.id)}>Make Payment</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// function FeaturePaymentModal({productid}) {
//   const [modalShow, setModalShow] = useState(false);
//   const [ProductDetails,setProductDetails]=useState([])
//   const token=localStorage.getItem('usertoken')
// const handleFetchData=async()=>{
//   try {
//     const singleproductid=await axiosInstance.get(`product/details/${productid}`,{
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// })
// console.log('singleproductid',singleproductid.data);
//   setProductDetails(singleproductid.data)
//   setModalShow(true)
//   } catch (error) {
    
//   }
// }
//   return (
//     <>
//       {/* <Button  variant='success' onClick={handleFetchData}>
//         unlock features
//       </Button> */}
//       <Button className='btn btn-danger btn-sm'onClick={handleFetchData}>Unlock <FaLock /></Button> 
      

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         ProductDetails={ProductDetails}
//         productid={productid}
//       />
//     </>
//   );
// }

// export default FeaturePaymentModal