import React, { useEffect, useState } from 'react'
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import CopyToClipboard from 'react-copy-to-clipboard';
  // import avatar from '../../Assets/img/avatar.jpg'
  import avatar from '../../../Assets/img/avatar.jpg'
  import AffiliateLinkModal from '../../../component/AdminDashboard/AffiliateLinkModal.jsx'
  import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
  import { FaCopy } from "react-icons/fa6";
  import Col from 'react-bootstrap/Col';
  import Image from 'react-bootstrap/Image';
  import Row from 'react-bootstrap/Row';
  import Switch from '@mui/material/Switch';
  import ConfirmRegistrationAutoApproval from '../ConfirmRegistrationAutoApproval.jsx';


  function SuperAdminProductDetails() {
    

    const token = localStorage.getItem('admintoken')
    const productId=localStorage.getItem('adminproductid')
    const [copied, setCopied] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [checked, setChecked] = useState(false); // Define checked state
    const [triger,setTriger]=useState(Date.now())



    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      
    };

    
    useEffect(() => {
      const fetchData = async () => {
        const response = await axiosInstance.get(`product/details/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setProductDetails(response.data)
        // console.log(response.data);


      }
      fetchData()
    }, [])

    const handleApprovalRequestChange = () => { // Define handleChange function
      const nonPurchasedUSerResponse = axiosInstance.patch('userapp/user/approval/after/registration/5',
      {
        default_approval_status : 'Pending'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChecked((prevChecked) => !prevChecked);
    };

    return (

      <div>
        <Card>
        <ConfirmRegistrationAutoApproval/>
</Card>
        <Card>
          <Row>
          
            <Col md={4}>
              <Image src={avatar} alt="Product Image" fluid style={{ maxWidth: '100%' }} />
            </Col>

          
            <Col md={8}>
              <Card.Body>
                <Card.Title>{productDetails.name}</Card.Title>
                <Card.Text><span>Amt :</span><strong> ₹{productDetails.subcription_fee}</strong></Card.Text>
                <Card.Text>In GST : <strong>{productDetails.inclusive_GST}%</strong> </Card.Text>
                <Card.Text>Influencer comm  : <strong>{productDetails.influencer_commission_percentage}%</strong> </Card.Text>
                <Card.Text>Organiser comm  :<span style={{ fontWeight: 'bold' }}> {productDetails.organiser_commission_percentage}%</span>  </Card.Text>
                <Card.Text>Description : {productDetails.description}</Card.Text>
                <Card.Text>Product link :</Card.Text>
                <input type="text"
                  value={productDetails.product_link}
                  style={{ width: '100%', maxWidth: '350px', padding: '5px', border: '1px solid blue', }} />

                <CopyToClipboard text={productDetails.product_link} onCopy={handleCopy}>
                  <Button variant="primary btn-sm" style={{ padding: '7px' }} >
                    <FaCopy />
                  </Button>
                </CopyToClipboard>
                
                <Card.Text>Community link :</Card.Text>
                <input type="text"
                  value={productDetails.full_fillment_link}
                  style={{ width: '100%', maxWidth: '350px', padding: '5px',border: '1px solid blue', }} />

                <CopyToClipboard text={productDetails.full_fillment_link} onCopy={handleCopy}>
                  <Button variant="primary btn-sm" style={{ padding: '7px' }} >
                    <FaCopy />
                  </Button>
                </CopyToClipboard>
                
              </Card.Body>
              
              {copied && <span style={{  color: 'green' }}>Link copied!</span>}
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  export default SuperAdminProductDetails






// import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import CopyToClipboard from 'react-copy-to-clipboard';
// // import avatar from '../../Assets/img/avatar.jpg'
// import avatar from '../../../Assets/img/avatar.jpg'
// import AffiliateLinkModal from '../../../component/AdminDashboard/AffiliateLinkModal.jsx'
// import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
// import { FaCopy } from "react-icons/fa6";

// function SuperAdminProductDetails() {
//   console.log('productId',productId);

//   const token = localStorage.getItem('admintoken')
//   const [copied, setCopied] = useState(false);
//   const [productDetails, setProductDetails] = useState({});

  

//   const handleCopy = () => {
//     setCopied(true);
//     // You can customize the feedback to the user after copying if needed
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await axiosInstance.get(`product/details/${productId}`,{
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }).then((response)=>{
//         setProductDetails(response.data)
//         console.log(response.data);
//       }).catch((error)=>{
//         console.log(error);
//       })
//     }
//     fetchData()
//   },[])

//   return (
    
//     <Card style={{ width: '100%' }}>
//       <Card.Img variant="top" src={productDetails.avatar} />
//       <Card.Body>
//         <Card.Title style={{ textAlign: 'center' }}>{productDetails.name}</Card.Title>
//         {/* <Card.Text><span>Description:</span>{productDetails.name}</Card.Text> */}
//         <Card.Text><span style={{fontWeight:900}}>Description :    </span>{productDetails.description}</Card.Text>
//         <Card.Text><span style={{fontWeight:900}}>Subcription Fee :  </span>{productDetails.subcription_fee}</Card.Text>
//         {/* <Card.Text><span>Product Link:</span>{productDetails.product_link}</Card.Text> */}
//         <label style={{fontWeight:900}}>Your Product Link</label><br/>
//         <input
//         type="text"
//         value={productDetails.product_link}
//         // onChange={(e) => setProductLink(e.target.value)}
//         placeholder="Enter Product Link"
//         style={{width:'100%',maxWidth:'500px',padding:'5px'}}
//       />
//         <CopyToClipboard text={productDetails.product_link} onCopy={handleCopy}>
//           <Button variant="primary btn-sm" style={{padding:'7px'}} >
//           <FaCopy />
//           </Button>
//         </CopyToClipboard>
//         {/* <Button variant="success" onClick={handleGenerateLink}>
//           Generate Link
//         </Button> */}
//       </Card.Body>
//     </Card>
//   );
// }

// export default SuperAdminProductDetails