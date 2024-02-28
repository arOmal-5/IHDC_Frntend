  













import React,{useEffect,useState} from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import avatar from '../../Assets/img/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import ihdclogo from '../../Assets/img/ihdclogo.jpg'




function PaymentPageAfterRegistration() {
    
    const link_data=localStorage.getItem('link_data')
    const token=localStorage.getItem('usertoken')
    const [showModal, setShowModal] = useState(false);
    const [userDetails,setUserDetails]=useState([])

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/user')
    }

    useEffect(()=>{
        const fetchData= async()=>{
            try {
             const response= await axiosInstance.get(`product/display/registred/user/details/in/payment/${link_data}`)
             console.log('response.datataaa',response.data);
             setUserDetails(response.data)
            } catch (error) {
                console.log(error);
            }

        }
        fetchData()
    },[])

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
          
              navigate('/user/success');
           
            // navigate(/advocate/success?message=${encodeURIComponent(message)});
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
        setShowModal(true);

        window.location.href = redirectUrl;
        // const redirectUrl = response.data.message;
        // window.open(redirectUrl, '_blank');
  
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
    
    
    //  const handlePayment = (id) =>{
    //     console.log(id,'sijuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwuu')
    //     axiosInstance.post(`product/subcription/payment/intiated/${id}`,null,{
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data,'response success')
    //       var order_id = response.data.data.id
    //       var api_key = response.data.data.notes.key1
    //       console.log(api_key, '999999999999999999999999999999999999999')
              
    //       // handle payment
    //       const options = {
            
    //           key: api_key, // Enter the Key ID generated from the Dashboard
    //           name: "Razorpay Gateway Corp",
    //           description: "Membership Transaction",
    //           image: "https://example.com/your_logo",
    //           order_id: order_id, //This is a sample Order ID. Pass the id obtained in the response of createOrder().
    //           handler: function (response) {
    //             console.log('response.razorpay_payment_id :',response.razorpay_payment_id );
    //             console.log('response.razorpay_order_id :',response.razorpay_order_id );
    //             console.log('response.razorpay_signature :',response.razorpay_signature );
    
    //             //complete order
    //               complete_order(
    //                   response.razorpay_payment_id,
    //                   response.razorpay_order_id,
    //                   response.razorpay_signature
    //               )
    //           },
    //           prefill: {
    //             name: response.data.datas.name,
    //             email: response.data.datas.email,
    //             contact: response.data.details.phone,
    //           },
    //           notes: {
    //           address: "Razorpay Corporate Office",
    //           },
    //           theme: {
    //           color: "#3399cc",
    //           },
    //       };
    //       const rzp1 = new window.Razorpay(options);
    
    //       rzp1.on("payment.failed", function (response) {
    //         //   alert(response.error.code);
    //         //   alert(response.error.description);
    //         //   alert(response.error.source);
    //         //   alert(response.error.step);
    //         //   alert(response.error.reason);
    //         //   alert(response.error.metadata.order_id);
    //         //   alert(response.error.metadata.payment_id);
    //         alert("Something whent wrong.. Your amount didn debited from account")
    //         // alert(response.error.code);
    //         alert(response.error.description,'description');
    //         // alert(response.error.source);
    //         // alert(response.error.step);
    //         alert(response.error.reason,'reason');
    //         // alert(response.error.metadata.order_id);
    //         // alert(response.error.metadata.payment_id);
    //       });
    //       rzp1.open();
    
          
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       console.log('erorrrrrr')
    //       console.log(error.response.data);
    //     });
    
    //   }
  
    return (


      <>
      
      
      <Container className="mt-5">
      <h2 className="text-center mb-4"><b>BECOME A MEMBER</b></h2>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Img variant="top" src={ihdclogo} alt="User Avatar" />
                  <Card.Body>
                    <Card.Title  className="d-flex justify-content-center align-items-center">{userDetails.name}</Card.Title>
                    <Card.Text> </Card.Text>
                    <p className='text-center'><strong>{userDetails?.product?.name}</strong> </p>
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
                    <Card.Title>Purchase Amount</Card.Title>
                    <Card.Text className='text-danger'>
                     <h3>
                     <span style={{fontFamily:"arial"}}>₹ </span>{
      
                          userDetails?.product?.subcription_fee   
                      }</h3> 
                    </Card.Text>
                    
                    {/* <Card.Title>Note:</Card.Title>
                    <Card.Text>
                      By making payment you will have exclusive access to our product community and many more...
                    </Card.Text> */}
                    <Row>
              <Col md={6}>
                <Button variant="primary" type="submit" className="w-100 mb-4" onClick={() => handlePayment(userDetails?.product?.id)}>
                  Enroll Now
                </Button>
              </Col>
              <Col md={6}>
                          <Button variant="secondary" className="w-100 mb-4" onClick={handleNavigate}>
                              Upgrade Later
                          </Button>
                      </Col>
            </Row>
                  </Card.Body>
                </Card>
            
              </Col>
            </Row>
            <Row>
            
            </Row>
            {/* {ModalComponent} */}
          </Container>
      
      
      
          </>
        );
      }
export default PaymentPageAfterRegistration;