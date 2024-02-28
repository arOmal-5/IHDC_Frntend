import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import FeaturePaymentModal from './FeaturePaymentModal';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { FaLockOpen } from "react-icons/fa";
function MyVerticallyCenteredModal(props, productid) {

  

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        {/* Box 1 */}
                        <div className="col-12 mb-4">
                            <div className="border p-3">
                                <h5>5-30% Discount on Materials</h5>
                                <p>Through member only store of Building Materials, we pass through the discounts to our prestigious members to the tune of 5-30%</p>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="col-12 mb-4">
                            <div className="border p-3">
                                <h5>0.5-1.5% Lower Interest Rates</h5>
                                <p>We have negotiated better interest rates for personal as well as home loans from various main stream banks for you to avail, again, subjected to your eligibility.</p>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="col-12 mb-4">
                            <div className="border p-3">
                                <h5>10 Year Interest free Payments</h5>
                                <p>Interest Free, Installment plans for upto 120 months for you to realise your DREAM HOME - *Coming Soon in April 2024</p>
                            </div>
                        </div>

                        {/* Box 4 */}
                        <div className="col-12 mb-4">
                            <div className="border p-3">
                                <h5>Access to Experts & Community</h5>
                                <p>Who doesn't like to be surrounded by lovely people who wish to see others succeed in their home construction endeavour ?
                                    Come Join us and experience it

                                </p>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <div className="border p-3">
                                <h5>AI Visualization Platform</h5>
                                <p>Generating dream rooms using AI for everyone

                                </p>
                            </div>
                            </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>


                {
                    props.productid ? (

                    <FeaturePaymentModal productid={props.productid} />

                    ) : (
                       <Button className='btn btn-success'>claimed <FaLockOpen/></Button>
                        
                    )
                }
                

                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function FeaturedModal({ productid,userproduct}) {
    const token = localStorage.getItem('usertoken')
    const [modalShow, setModalShow] = React.useState(false);

//   console.log('userproduct',userproduct);

  const linkOwnerPurchasedProducts = productid;

// const linkOwnerPurchasedProducts = userproduct && userproduct.length > 0
//     ? userproduct.map(item => item.link_owner_purchased_product)
//     : [];

//   console.log('linkOwnerPurchasedProducts',linkOwnerPurchasedProducts);

    return (
        <>
       
            <Button className='btn  btn-sm' style={{backgroundColor:'grey',border:'none'}} onClick={() => setModalShow(true)} >Details</Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                productid={productid}
                linkOwnerPurchasedProducts={linkOwnerPurchasedProducts}
             

            />
        </>
    );
}

export default FeaturedModal 















// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React,{useState} from 'react';
// import FeaturePaymentModal from './FeaturePaymentModal';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// function MyVerticallyCenteredModal(props) {

    

//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Details
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="container">
//                     <div className="row">
//                         {/* Box 1 */}
//                         <div className="col-12 mb-4">
//                             <div className="border p-3">
//                                 <h5>5-30% Discount on Materials</h5>
//                                 <p>Through member only store of Building Materials, we pass through the discounts to our prestigious members to the tune of 5-30%</p>
//                             </div>
//                         </div>

//                         {/* Box 2 */}
//                         <div className="col-12 mb-4">
//                             <div className="border p-3">
//                                 <h5>0.5-1.5% Lower Interest Rates</h5>
//                                 <p>We have negotiated better interest rates for personal as well as home loans from various main stream banks for you to avail, again, subjected to your eligibility.</p>
//                             </div>
//                         </div>

//                         {/* Box 3 */}
//                         <div className="col-12 mb-4">
//                             <div className="border p-3">
//                                 <h5>10 Year Interest free Payments</h5>
//                                 <p>Interest Free, Installment plans for upto 120 months for you to realise your DREAM HOME - *Coming Soon in April 2024</p>
//                             </div>
//                         </div>

//                         {/* Box 4 */}
//                         <div className="col-12 mb-4">
//                             <div className="border p-3">
//                                 <h5>Access to Experts & Community</h5>
//                                 <p>Who doesn't like to be surrounded by lovely people who wish to see others succeed in their home construction endeavour ?
//                                     Come Join us and experience it

//                                 </p>
//                             </div>
//                         </div>
//                     </div>
                    
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                {
//                 props.purchasedProducts ?(
//                     null
//                 ):(
// <FeaturePaymentModal productid={props.productid}/>
//                 )
//                }

//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// function FeaturedModal({productid,purchasedProducts}) {
//     const token=localStorage.getItem('usertoken')
//     const [modalShow, setModalShow] = React.useState(false);
//     const [userproduct,setUserproduct]=useState([])
    
  
   
 
//     console.log('purchasedProducts',purchasedProducts);
//     return (
//         <>
//             {/* <Button variant="primary" className='ml-3' onClick={() => setModalShow(true)}>
//                 More Details
//             </Button> */}
            
//             <Button className='btn btn-primary btn-sm' onClick={() => setModalShow(true)} >Details</Button>

//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//                 productid={productid}
//                 purchasedProducts={purchasedProducts}
                
//             />
//         </>
//     );
// }

// export default FeaturedModal