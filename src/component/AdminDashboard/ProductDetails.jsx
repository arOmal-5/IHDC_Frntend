import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import avatar from '../../Assets/img/avatar.jpg'
import AffiliateLinkModal from '../../component/AdminDashboard/AffiliateLinkModal.jsx'
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
import Image from 'react-bootstrap/Image';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCopy } from "react-icons/fa6";
import PaymentModal from './PaymentModal.jsx';
import FeaturedModal from './FeaturedModal.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function  ProductDetails() {
  const productId=localStorage.getItem('productId')
  const [ProductDetails,setProductDetails]=useState([])
  const [affiliate,setAffiliate]=useState('')
  const [copied, setCopied] = useState(false);
  const [copiedCommunity, setCopiedCommunity] = useState(false);

  
  const token=localStorage.getItem('usertoken')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response=await axiosInstance.get(`product/details/${productId}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          setProductDetails(response.data)
       const affiliatelink=await axiosInstance.get(`product/user/product/link/${productId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
       })
      //  console.log('affiliatelink.data',affiliatelink.data);
       setAffiliate(affiliatelink.data)   
      } catch (error) {

        
      }
      
       
      
    }
    fetchData()
  },[])
 
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    // You can customize the feedback to the user after copying if needed
  };
  const handleCopyCommunity = () => {
    setCopiedCommunity(true);
    setTimeout(() => {
      setCopiedCommunity(false);
    }, 2000);
    // You can customize the feedback to the user after copying if needed
  };
  return (
    // <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
    //   <Card.Img variant="top" src={avatar} />
    //   <Card.Body>
    //     <Card.Title style={{ textAlign: 'center' }}>YouTube{productId}</Card.Title>
    //     <Card.Text>
    //       Nandu Krishnan
    //     </Card.Text>
        
    //     <AffiliateLinkModal/>
    //   </Card.Body>
    // </Card>
    <div>
        <Card>
      <Row>
        {/* Product Image */}
        <Col md={4}>
          <Image src={avatar} alt="Product Image" fluid style={{ maxWidth: '100%' }} />
        </Col>

        {/* Display Product Details */}
        <Col md={8}>
          <Card.Body>
            <Card.Title>Name:  {ProductDetails.name}</Card.Title>
            <Card.Text>Description:  {ProductDetails.description? ProductDetails.description :'------' }</Card.Text>
            <Card.Text><span>₹</span>{ProductDetails.subcription_fee}</Card.Text>
            <Card.Text>Product Link :</Card.Text>
            <input type="text"
            value={affiliate.user_refferal_link}
            style={{width:'100%',maxWidth:'350px',padding:'5px'}}/>
            
            <CopyToClipboard text={affiliate.user_refferal_link} onCopy={handleCopy}>
          <Button variant="primary btn-sm" style={{padding:'7px'}} >
          <FaCopy />
          </Button>
        </CopyToClipboard>
            {/* Add other product details here */}
          </Card.Body>
          {copied && <span style={{  color: 'green' }}>Link copied!</span>}
          {/* Buttons */}
          <Card.Footer>
            {/* <Button variant="primary" onClick={handleCopyLink}>
              Copy Link
            </Button>{' '} */}
            {/* <Button variant="success" onClick={handleGenerateLink}>
              Generate Link
            </Button>{' '} */}
            {/* <Button variant="info" onClick={handlePayment}>
              Check out
            </Button>  */}
            {affiliate.link_owner_purchased_product? (
              <div>
              {/* <p>Join {affiliate?.product?.name} community :</p> */}
              <p>Fullfillment Link</p>

              <input
                type="text"
                value={affiliate.product?.full_fillment_link}
                style={{ width: '100%', maxWidth: '350px', padding: '5px' }}
              />
              <CopyToClipboard text={affiliate.product?.full_fillment_link} onCopy={handleCopyCommunity}>
                <Button variant="primary btn-sm" style={{ padding: '7px' }}>
                  <FaCopy />
                </Button>
              </CopyToClipboard>
              {copiedCommunity && <span style={{ color: 'green' }}>Link copied!</span>}
            </div>
                ) : (
                  <PaymentModal ProductDetails={ProductDetails} />

                    )}

          </Card.Footer>
        </Col>  
      </Row>
    </Card>
  </div>
  );
}

export default ProductDetails;










// import React, { useState,useEffect } from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import avatar from '../../Assets/img/avatar.jpg'
// import AffiliateLinkModal from '../../component/AdminDashboard/AffiliateLinkModal.jsx'
// import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
// import Image from 'react-bootstrap/Image';
// import CopyToClipboard from 'react-copy-to-clipboard';
// import { FaCopy } from "react-icons/fa6";
// import PaymentModal from './PaymentModal.jsx';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';


// function ProductDetails({productId}) {
//   const [ProductDetails,setProductDetails]=useState([])
//   const [affiliate,setAffiliate]=useState('')
//   const [copied, setCopied] = useState(false);
//   const token=localStorage.getItem('usertoken')
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response=await axiosInstance.get(`product/details/${productId}`,{
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//           setProductDetails(response.data)
//        const affiliatelink=await axiosInstance.get(`product/user/product/link/${productId}`,{
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//        })
//        console.log('affiliatelink.data',affiliatelink.data);
//        setAffiliate(affiliatelink.data)   
//       } catch (error) {

        
//       }
      
       
      
//     }
//     fetchData()
//   },[])
//   // const ShowAffiliateLink=()=>{
//   //   <ShowAffiliateLink/>
//   // }
//   // const handleCopyLink = () => {
//   //   // Implement copy link functionality
//   //   console.log('Copy Link clicked');
//   // };

//   // Placeholder function for Generate Link button
//   // const handleGenerateLink = () => {
//   //   // Implement generate link functionality
//   //   console.log('Generate Link clicked');
//   // };

//   // Placeholder function for Payment button
//   // const handlePayment = () => {
//   //   // Implement payment functionality
//   //   console.log('Payment clicked');
//   // };
//   const handleCopy = () => {
//     setCopied(true);
//     // You can customize the feedback to the user after copying if needed
//   };
//   return (
//     // <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
//     //   <Card.Img variant="top" src={avatar} />
//     //   <Card.Body>
//     //     <Card.Title style={{ textAlign: 'center' }}>YouTube{productId}</Card.Title>
//     //     <Card.Text>
//     //       Nandu Krishnan
//     //     </Card.Text>
        
//     //     <AffiliateLinkModal/>
//     //   </Card.Body>
//     // </Card>
//     <div>
//         <Card>
//       <Row>
//         {/* Product Image */}
//         <Col md={4}>
//           <Image src={avatar} alt="Product Image" fluid style={{ maxWidth: '100%' }} />
//         </Col>

//         {/* Display Product Details */}
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>Name:  {ProductDetails.name}</Card.Title>
//             <Card.Text>Description:  {ProductDetails.description}</Card.Text>
//             <Card.Text>{ProductDetails.subcription_fee}<span>₹</span></Card.Text>
//             {/* <Card.Text>Product Link: {ProductDetails.product_link}</Card.Text> */}
//             <input type="text"
//             value={affiliate.user_refferal_link}
//             style={{width:'100%',maxWidth:'350px',padding:'5px'}}/>
            
//             <CopyToClipboard text={affiliate.user_refferal_link} onCopy={handleCopy}>
//           <Button variant="primary btn-sm" style={{padding:'7px'}} >
//           <FaCopy />
//           </Button>
//         </CopyToClipboard>
//             {/* Add other product details here */}
//           </Card.Body>

//           {/* Buttons */}
//           <Card.Footer>
//             {/* <Button variant="primary" onClick={handleCopyLink}>
//               Copy Link
//             </Button>{' '} */}
//             {/* <Button variant="success" onClick={handleGenerateLink}>
//               Generate Link
//             </Button>{' '} */}
//             {/* <Button variant="info" onClick={handlePayment}>
//               Check out
//             </Button>  */}
//             <PaymentModal ProductDetails={ProductDetails}/>
//           </Card.Footer>
//         </Col>  
//       </Row>
//     </Card>
//   </div>
//   );
// }

// export default ProductDetails;

