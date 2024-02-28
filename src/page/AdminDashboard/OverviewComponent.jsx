
// import React,{useEffect, useState,useRef,  useContext} from 'react'
// import '../../style/adminDashboard/OverviewComponent.css'
// import communitymember from '../../Assets/img/ihdccommunity.jpg'
// import avatar from '../../Assets/img/avatar.jpg'
// import AI from '../../Assets/img/AI.png'
// import Expert from '../../Assets/img/testcommunity.png'
// import membercommunity from '../../Assets/img/member-community-new.png'
// import sitevisit from '../../Assets/img/sitevisit.png'
// import unlockai from '../../Assets/img/unlockai.png'
// import unlockexpert from '../../Assets/img/unlockexpert.png'
// import unlockmaterial from '../../Assets/img/unlockmaterial.png'
// import visitactivated from '../../Assets/img/site-visit-activataded.png'
// import unlocksite from '../../Assets/img/unlocksite.png'
// import unlockinterest from '../../Assets/img/unlockinterest.png'
// import unlocklower from '../../Assets/img/unlocklower.png'
// // import lock from '../../Assets/img/test.jpg'
// import feature from '../../Assets/img/feature-discount.png'
// import interest from '../../Assets/img/interest-free.png'
// import { FaUnlockKeyhole } from "react-icons/fa6";
// import { GiClick } from "react-icons/gi";
// import { CiCreditCard2 } from "react-icons/ci";
// import { MdLock } from "react-icons/md";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { RiExchangeFundsFill } from "react-icons/ri";
// import { HiOutlineReceiptRefund } from "react-icons/hi2";
// import { FcSalesPerformance } from "react-icons/fc";
// import { GoGraph } from "react-icons/go";
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import FeaturedModal from '../../component/AdminDashboard/FeaturedModal';
// import {RotatingLines} from 'react-loader-spinner';
// import FeaturePaymentModal from '../../component/AdminDashboard/FeaturePaymentModal';
// import Alert from 'react-bootstrap/Alert';
// import { FaLock } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
// import  { Pagination, Navigation,Autoplay} from 'swiper/modules';
// import { FaLockOpen } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLock,faHandHoldingDollar,faPercent,faMicrochip,faFolderTree } from '@fortawesome/free-solid-svg-icons'; // or '@fortawesome/free-duotone-svg-icons' for duotone icons
// // import ProductServicePayment from '..'
// import ProductServicePayment from '../../component/AdminDashboard/ProductServicePayment';
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
// import ProfileStatusChart from '../../component/AdminDashboard/ProfileStatusChart'
// import MyContext from '../../store/MyContext'


// function OverviewComponent() {
//   const [setuserdata,setUserData]=useState([])
//   const [netCommission , setNetCommission] = useState(0)
//   const [grossSale , setGrossSale] = useState(0)
//   const [totalClicks , setTotalClicks] = useState(0)
//   const [transactioncount,setTransactioncount]=useState(0)
//   const [loading, setLoading] = useState(true);
//   const [userproduct,setUserproduct]=useState([])
//   const [productid,setProductid]=useState(null)
//   const [affiliate,setAffiliate]=useState('')
//   const [swiperRef, setSwiperRef] = useState(null);
//   const[passid, setPassid] = useState(null)
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const{profilePercentage,setProfilePercentage}=useContext(MyContext)
  
//   const token = localStorage.getItem('usertoken');
//   console.log('purchasedProducts',purchasedProducts);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const responseSale = await axiosInstance.get('userapp/user/total/gross/sale', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
      
//         // console.log(responseSale.data);
//         setGrossSale(responseSale.data.message);
//         setLoading(false)
       
//       const responseClicks = await axiosInstance.get('userapp/user/total/clicks', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//         // console.log('message',responseClicks.data);
//         setTotalClicks(responseClicks.data.message);
//         setLoading(false)

//         const responseNetCommission= await axiosInstance.get('userapp/user/total/commission',{
//           headers: {
//               'Authorization': `Bearer ${token}`
//           }
//          }) 
//          setLoading(false)
//          console.log('responsecommission',responseNetCommission.data.message);
//          setNetCommission(responseNetCommission.data.message)
    
//          const responsetransactioncount= await axiosInstance.get('userapp/user/overall/transaction/for/all/link',{
//           headers: {
//               'Authorization': `Bearer ${token}`
//           }
//          })
//          setLoading(false)
//          console.log('responsetransactioncount',responsetransactioncount.data.message);
//          setTransactioncount(responsetransactioncount.data.message)
         
//       } catch (error) {
//         // console.log(error);
//       }
//         };

//     fetchData();
//   }, []);

//   useEffect(()=>{
//     const fetchData=async()=>{
//       try {
//         const productdata = await axiosInstance.get('userapp/single/user/all/product/details',{
//           headers:{
//             'Authorization': `Bearer ${token}`
//           }
//         }) 

//         // console.log('user product dataaaaaaasdfsffssdaaaaa',productdata?.data[0]?.link_owner_purchased_product);
        
//         // console.log('1');
//         setUserproduct(productdata.data)
//         // console.log('2');
//         setPurchasedProducts(productdata?.data[0]?.link_owner_purchased_product)
//         // console.log('4');
//         // console.log('productdata?.data[0]?.link_owner_purchased_product',productdata?.data[0]?.link_owner_purchased_product);
//         const responseUser = await axiosInstance.get('userapp/single/user/dashboard/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//         if (responseUser.data && responseUser.data.user) {
//           setUserData(responseUser.data);
//         } else {
//           // console.error('Unexpected response format:', responseUser.data);
//         }
//         // console.log('responseUser.data',responseUser.data);
//         // setUserData(responseUser.data);
//       }
        
//       catch (error) {
//         // console.log(error);
//       }
//     }
//     fetchData()
//   },[])

  
// // console.log('userproduct',userproduct);
// localStorage.setItem('ispurchase',purchasedProducts)
// const [swiper, setSwiper] = useState(null);
// const [autoplay, setAutoplay] = useState(true);

// useEffect(() => {
//   if (swiper) {
//     swiper.autoplay.start();
//   }
// }, [swiper, autoplay]);

// const handleMouseEnter = () => {
//   setAutoplay(false);
//   if (swiper) {
//     swiper.autoplay.stop();
//   }
// };

// const handleMouseLeave = () => {
//   setAutoplay(true);
// };

//   return (
//     <>
//     <div>
//     {/* <div style={{display:'flex',alignItems:'center'}}>
//       <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
//       <p>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdata?.user?.name}</span>, Welcome to your dashboard.</p>
//     </div> */}
//     <div className='d-flex align-items-center justify-content-between'>
//     <div style={{display:'flex',alignItems:'center'}}>
//       <p>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdata?.user?.name}</span>, Welcome to your dashboard.</p>
//     </div>
//     <div>
//     {
//         profilePercentage<100 ?(
// <ProfileStatusChart/>
//         ):(
//           null
// )
// }
//     </div>
// </div>
//     <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
 
// <div>
//   {userproduct.map((product, index) => (
   
//     <div className='community-member-main-container' key={index}>
//       <img
//         src={membercommunity}
//         alt="Community Member"
//         className='community-member-image'
//       />

//       {/* <Swiper
//         onSwiper={(setSwiperRef) => { }}
//         watchSlidesVisibility
//         watchSlidesProgress
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 300,
//           },
//           768: {
//             slidesPerView: 1,
//             spaceBetween: 30,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 100,
//           },
//         }}
//         slidesPerView={3}
//         centeredSlides={false}
//         spaceBetween={100}
//         navigation={true}
//         loop={true}
//         modules={[Pagination, Navigation]}
//         autoplay={{ delay: 100, disableOnInteraction: false }}
//         speed={1000} 
//         className="mySwiper"
//       > */}
//       {/* <Swiper
//   getSwiper={(swiper) => setSwiperRef(swiper)}
//   ref={swiperRef}
//   watchSlidesVisibility
//   watchSlidesProgress
//   breakpoints={{
//     0: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     640: {
//       slidesPerView: 1,
//       spaceBetween: 300,
//     },
//     768: {
//       slidesPerView: 1,
//       spaceBetween: 30,
//     },
//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 100,
//     },
//   }}
//   slidesPerView={3}
//   centeredSlides={false}
//   spaceBetween={100}
//   navigation={false}
//   loop={true} 
//   modules={[Pagination, Navigation,Autoplay]}
//   autoplay={{ delay: 100, disableOnInteraction: false }}
//   speed={3000}
//   className="mySwiper"
//   onMouseEnter={() => swiperRef && swiperRef.autoplay.stop()}
//  onMouseLeave={() => swiperRef && swiperRef.autoplay.start()}
// > */}
// <Swiper
//   onSwiper={setSwiper}
//   ref={swiperRef}
//   watchSlidesVisibility
//   watchSlidesProgress
//   breakpoints={{
//     0: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     640: {
//       slidesPerView: 1,
//       spaceBetween: 300,
//     },
//     768: {
//       slidesPerView: 1,
//       spaceBetween: 30,
//     },
//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 100,
//     },
//   }}
//   slidesPerView={3}
//   centeredSlides={false}
//   spaceBetween={100}
//   navigation={false}
//   loop={true}
//   modules={[Pagination, Navigation, Autoplay]}
//   // autoplay={{ delay: 100, disableOnInteraction: false }}
//   autoplay={autoplay}
//   onMouseEnter={handleMouseEnter}
//   onMouseLeave={handleMouseLeave}
//   speed={3000}
  
//   className="mySwiper"
//   // on={{
//   //   mouseenter: () => swiperRef && swiperRef.autoplay.stop(),
//   //   mouseleave: () => swiperRef && swiperRef.autoplay.start(),
//   // }}
// >
  

//         <SwiperSlide >

//         <Card style={{width:'15rem'}}>

//       <Card.Body>
//         {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>Discount on  materials</Card.Title> */}
//         <Card.Img   src={product.link_owner_purchased_product ?unlockmaterial:feature}  style={{ height:'auto'}}/>
//         <Card.Text className='text-center'>
        
//         {/* <Card.Img variant="top" className='mb-3' src={lock}  style={{ height:'70px'}}/> */}
//           {/* {
           
//               <FontAwesomeIcon style={{fontSize:'70px',color:'black'}} icon={faHandHoldingDollar} className='text-secondary'  />
              
            
//           } */}
          
//         </Card.Text>
//         <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
//           {
// product.link_owner_purchased_product ?(
//   <>
//   <Button className='btn  btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Claimed <FaLockOpen/></Button> 
//   <FeaturedModal />
//   </>
// ):(
//   <>
//   <FeaturePaymentModal productid={product?.product?.id}/>
//   {/* userproduct */}
//   <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
//   </>
// )
//         }

//         </div>
        
//       </Card.Body>
//     </Card >
//         </SwiperSlide>
//         <SwiperSlide className='swiper-slide '>
//         <Card style={{width:'15rem'}}>
     
//       <Card.Body>
//         {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>User Mgt<br/> Platform</Card.Title> */}
//         <Card.Img variant="top"  src={ product.link_owner_purchased_product
//       ? (product.site_survey_purchased ? visitactivated : unlocksite)
//       : sitevisit}  style={{height:'auto'}}/>
//         <Card.Text className='text-center'>
//           {/* {
//               <FontAwesomeIcon style={{fontSize:'70px'}} className='text-secondary' icon={faFolderTree} />
//           } */}
//         </Card.Text>
//         <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
//         {
// product.link_owner_purchased_product ?(
//   <>
//   {
//     product.site_survey_purchased?(
//       // <Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated</Button>
//       <Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated <IoCheckmarkCircleOutline/></Button>
//     ):(
//       <>
//       <Button className='btn btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Claimed </Button>
//       <ProductServicePayment productid={product?.product?.id}/>
//       </>
//     )
//   }

//   </>
// ):(
//   <>
//   <FeaturePaymentModal productid={product?.product?.id}/>
 
//   <FeaturedModal productid={product?.product?.id} userproduct={userproduct} />
//   </>
// )
//         }
//         </div>
//       </Card.Body>
//     </Card>
//         </SwiperSlide>
//         <SwiperSlide>
//         <Card style={{width:'15rem'}}>
     
//       <Card.Body>
//         {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>Lower interest <br/>rates</Card.Title> */}
//         <Card.Img variant="top"src={product.link_owner_purchased_product ?unlocklower:interest}  style={{height:'auto'}}/>
//         <Card.Text className='text-center'>
//           {/* <MdLock style={{fontSize:'70px',color:'red'}} /> */}
//           {/* {
           
//               <FontAwesomeIcon style={{fontSize:'70px',color:'black'}} icon={faPercent} className='text-secondary' />
            
//           } */}
//         </Card.Text>
//         <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
//         {
// product.link_owner_purchased_product ?(
//   <>
  
//   <Button className='btn  btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Claimed <FaLockOpen/></Button> 
  
//   <FeaturedModal />
//   </>
// ):(
//   <>
//   <FeaturePaymentModal productid={product?.product?.id}/>
 
//   <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
//   </>
// )
//         }
//         </div>
//       </Card.Body>
//     </Card>

//         </SwiperSlide>
        
//         <SwiperSlide>

//          <Card style={{width:'15rem'}}>

//       <Card.Body>
//         {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>AI generated platform</Card.Title> */}
//         <Card.Img variant="top"  src={product.link_owner_purchased_product ?unlockai:AI}  style={{height:'auto'}}/>
//         <Card.Text className='text-center'>
//           {/* <MdLock style={{fontSize:'70px',color:'red'}} /> */}
//           {/* {
            
             
//               <FontAwesomeIcon style={{fontSize:'70px',color:'black'}} icon={faMicrochip} className='text-secondary'  />
            
//           } */}
//         </Card.Text>
//         <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
//         {
// product.link_owner_purchased_product ?(
//   <>
  
//   <Button className='btn  btn-sm' style={{backgroundColor:'#a96f12',border:'none'}}>Claimed <FaLockOpen/></Button> 
  
//   <FeaturedModal />
//   </>
// ):(
//   <>
//   <FeaturePaymentModal productid={product?.product?.id}/>
 
//   <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
//   </>
// )
//         }
//         </div>
//       </Card.Body>
//     </Card>
//         </SwiperSlide>
//         <SwiperSlide className='swiper-slide '>
//         <Card style={{width:'15rem'}}>
     
//       <Card.Body>
//         {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>User Mgt<br/> Platform</Card.Title> */}
//         <Card.Img variant="top"  src={product.link_owner_purchased_product ?unlockexpert:Expert}  style={{height:'auto'}}/>
//         <Card.Text className='text-center'>
//           {/* {

//               <FontAwesomeIcon style={{fontSize:'70px'}} className='text-secondary' icon={faFolderTree} />
           
//           } */}
//         </Card.Text>
//         <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
//         {
// product.link_owner_purchased_product ?(
//   <>
  
//   <Button className='btn  btn-sm' style={{backgroundColor:'#a96f12',border:'none'}}>Claimed <FaLockOpen/></Button>
//   <FeaturedModal/>
//   </>
// ):(
//   <>
//   <FeaturePaymentModal productid={product?.product?.id}/>
 
//   <FeaturedModal productid={product?.product?.id} userproduct={userproduct} />
//   </>
// )
//         }
//         </div>
//       </Card.Body>
//     </Card>
//         </SwiperSlide>
       

//       </Swiper>
//     </div>
//   ))}
// </div>


//           </div>
//       <div className='user-dashboard-overview-component-container'>
//         <div className='user-dashboard-overview-component-header-container'>
//           <div>
//                       <h3 style={{color:'#081d29'}} className='mt-4'> Your Affiliate Dashboard </h3>
            
//           </div>
//         </div>
//       </div>
//       <hr />
//       <div className='user-dashboard-overview-component-dashboardactivity'>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//           <div>
//           {loading ? (
//             // Show loader while data is being fetched
//             <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//           ) : (
//             // Render netCommission when data fetching is complete
//             <h3 style={{ color: '#6da8ba' }}>
//               <span>₹</span>
//               {netCommission}
//             </h3>
//           )}
//         </div>
            
            
//           </div>
//           <div>
//               <h6 >Net Commission </h6>
//             </div>
//         </div>
//         <div>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//             {/* <div>
//               <h3 style={{color:'#6da8ba'}}><span><GiClick/>{totalClicks}</span></h3>
//             </div> */}
//             <div>
//           {loading ? (
//             // Show loader while data is being fetched
//             <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//           ) : (
//             // Render netCommission when data fetching is complete
//             <h3 style={{ color: '#6da8ba' }}>
//               <span><GiClick/>{totalClicks}</span>
//             </h3>
//           )}
//         </div>

//             <div>
            
//               <h4 style={{color:'#6da8ba'}}><GiClick/></h4>
//             </div>
            
            
//           </div>
//           <div>
//               <h6>Clicks</h6>
//             </div>
//         </div>
//         </div>
//         <div>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//             {/* <div>
//              <h3 style={{color:'#6da8ba'}}><span><CiCreditCard2/>{transactioncount}</span></h3>
//             </div> */}
//             {loading ? (
//             // Show loader while data is being fetched
//             <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//           ) : (
//             // Render netCommission when data fetching is complete
//             <h3 style={{ color: '#6da8ba' }}>
//               <span><CiCreditCard2/>{transactioncount}</span>
//             </h3>
//           )}

//             <div>
           
//               <h4 style={{color:'#6da8ba'}}><CiCreditCard2/></h4>
//             </div>
            
            
//           </div>
//           <div>
//               <h6>Transactions</h6>
//             </div>
//         </div>
//         </div>
//         <div>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//             <div>
//             {loading ? (
//             // Show loader while data is being fetched
//             <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//           ) : (
//             // Render netCommission when data fetching is complete
//             <h3 style={{color:'#6da8ba'}}><span><GoGraph/></span>{grossSale}</h3>

//           )}
//             </div>

//             <div>
           
//               {/* <h4 style={{color:'#6da8ba'}}><GoGraph/></h4> */}
//             </div>
            
            
//           </div>
//           <div>
//               <h6>Gross Sale</h6>
//             </div>
//         </div>
//         </div>
//         <div>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//             <div>
//              <h3 style={{color:'#6da8ba'}}><span><RiExchangeFundsFill/></span>0</h3>
//             </div>

//             <div>
            
//               <h4 style={{color:'#6da8ba'}}><RiExchangeFundsFill/></h4>
//             </div>
            
            
//           </div>
//           <div>
//               <h6>Refunds</h6>
//             </div>
//         </div>
//         </div>
//         <div>
//         <div className='user-dashboard-overview-component-netcommission-container'>
//           <div className='user-dashboard-overview-component-netcommission'>
//             <div>
//              <h3 style={{color:'#6da8ba'}}><span><HiOutlineReceiptRefund/></span>0</h3>
//             </div>

//             <div>
           
//               <h4 style={{color:'#6da8ba'}}><HiOutlineReceiptRefund/></h4>
//             </div>
            
            
//           </div>
//           <div>
//               <h6>Refund amt</h6>
//             </div>
//         </div>
//         </div>
//       </div>
     
//       <div>
//       </div>
      
//     </>
//   )
// }

// export default OverviewComponent











import React,{useEffect, useState,useRef,  useContext} from 'react'
import '../../style/adminDashboard/OverviewComponent.css'
import communitymember from '../../Assets/img/ihdccommunity.jpg'
import avatar from '../../Assets/img/avatar.jpg'
import AI from '../../Assets/img/AI.png'
import Expert from '../../Assets/img/testcommunity.png'
import membercommunity from '../../Assets/img/member-community-new.png'
import sitevisit from '../../Assets/img/sitevisit.png'
import unlockai from '../../Assets/img/unlockai.png'
import unlockexpert from '../../Assets/img/unlockexpert.png'
import unlockmaterial from '../../Assets/img/unlockmaterial.png'
import visitactivated from '../../Assets/img/site-visit-activataded.png'
import unlocksite from '../../Assets/img/unlocksite.png'
import unlockinterest from '../../Assets/img/unlockinterest.png'
import unlocklower from '../../Assets/img/unlocklower.png'
// import lock from '../../Assets/img/test.jpg'
import feature from '../../Assets/img/feature-discount.png'
import interest from '../../Assets/img/interest-free.png'
import { FaUnlockKeyhole } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";
import { CiCreditCard2 } from "react-icons/ci";
import { MdLock } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RiExchangeFundsFill } from "react-icons/ri";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { FcSalesPerformance } from "react-icons/fc";
import { GoGraph } from "react-icons/go";
import axiosInstance from '../../config/axios/AxiosConfiguration';
import FeaturedModal from '../../component/AdminDashboard/FeaturedModal';
import {RotatingLines} from 'react-loader-spinner';
import FeaturePaymentModal from '../../component/AdminDashboard/FeaturePaymentModal';
import Alert from 'react-bootstrap/Alert';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import  { Pagination, Navigation,Autoplay} from 'swiper/modules';
import { FaLockOpen } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faHandHoldingDollar,faPercent,faMicrochip,faFolderTree } from '@fortawesome/free-solid-svg-icons'; // or '@fortawesome/free-duotone-svg-icons' for duotone icons
// import ProductServicePayment from '..'
import ProductServicePayment from '../../component/AdminDashboard/ProductServicePayment';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ProfileStatusChart from '../../component/AdminDashboard/ProfileStatusChart'
import MyContext from '../../store/MyContext'
import WebHookConfirmation from '../../component/AdminDashboard/WebHookConfirmation'
import Webdiscount from '../../Assets/img/web-discount-materials.jpg'
import webinterest from '../../Assets/img/Web-interest-free.jpg'
import webask from '../../Assets/img/web-ask-expert.jpg'
import lowerInterest from '../../Assets/img/lowerInterest.jpg'
import unlocklowerinterest from '../../Assets/img/unlocklowerinterest.jpg'
import weblower from '../../Assets/img/web-lower-interest.jpg'
import ProfileUpdationNotification from '../../component/AdminDashboard/ProfileUpdationNotification'

function OverviewComponent() {
  const [setuserdata,setUserData]=useState([])
  const [netCommission , setNetCommission] = useState(0)
  const [grossSale , setGrossSale] = useState(0)
  const [totalClicks , setTotalClicks] = useState(0)
  const [transactioncount,setTransactioncount]=useState(0)
  const [loading, setLoading] = useState(true);
  const [userproduct,setUserproduct]=useState([])
  const [productid,setProductid]=useState(null)
  const [affiliate,setAffiliate]=useState('')
  const [swiperRef, setSwiperRef] = useState(null);
  const[passid, setPassid] = useState(null)
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const{profilePercentage,setProfilePercentage}=useContext(MyContext)
  const[triger,setTriger]=useState(Date.now())
  
  const token = localStorage.getItem('usertoken');
  // console.log('purchasedProducts',purchasedProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const responseSale = await axiosInstance.get('userapp/user/total/gross/sale', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      
        // console.log(responseSale.data);
        setGrossSale(responseSale.data.message);
        setLoading(false)
       
      const responseClicks = await axiosInstance.get('userapp/user/total/clicks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        // console.log('message',responseClicks.data);
        setTotalClicks(responseClicks.data.message);
        setLoading(false)

        const responseNetCommission= await axiosInstance.get('userapp/user/total/commission',{
          headers: {
              'Authorization': `Bearer ${token}`
          }
         }) 
         setLoading(false)
        //  console.log('responsecommission',responseNetCommission.data.message);
         setNetCommission(responseNetCommission.data.message)
         
         const responsetransactioncount= await axiosInstance.get('userapp/user/overall/transaction/for/all/link',{
          headers: {
              'Authorization': `Bearer ${token}`
          }
         })
         setLoading(false)
        //  console.log('responsetransactioncount',responsetransactioncount.data.message);
         setTransactioncount(responsetransactioncount.data.message)
         
      } catch (error) {
        // console.log(error);
      }
        };

    fetchData();
  }, []);

  useEffect((async)=>{
   
    
  })

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const productdata = await axiosInstance.get('userapp/single/user/all/product/details',{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }) 

        // console.log('user product dataaaaaaasdfsffssdaaaaa',productdata?.data[0]?.link_owner_purchased_product);
        
        // console.log('1');
        setUserproduct(productdata.data)
        // console.log('2');
        setPurchasedProducts(productdata?.data[0]?.link_owner_purchased_product)
        // console.log('4');
        // console.log('productdata?.data[0]?.link_owner_purchased_product',productdata?.data[0]?.link_owner_purchased_product);
        const responseUser = await axiosInstance.get('userapp/single/user/dashboard/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (responseUser.data && responseUser.data.user) {
          setUserData(responseUser.data);
          if(profilePercentage===100){
            const profileresponse =  await axiosInstance.patch('userapp/user/profile/completion/invoice/genetation/if/needed',null,{
              headers:{
                Authorization: `Bearer ${token}`,
              }
            })
                                      
            // console.log('profileresponse123',profileresponse);
          }
        } else {
          // console.error('Unexpected response format:', responseUser.data);
        }
        // console.log('responseUser.data',responseUser.data);
        // setUserData(responseUser.data);
      }
        
      catch (error) {
        // console.log(error);
      }
    }
    fetchData()
  },[triger])

  
// console.log('userproduct',userproduct);
localStorage.setItem('ispurchase',purchasedProducts)
const [swiper, setSwiper] = useState(null);
const [autoplay, setAutoplay] = useState(true);

useEffect(() => {
  if (swiper) {
    swiper.autoplay.start();
  }
}, [swiper, autoplay]);

const handleMouseEnter = () => {
  setAutoplay(false);
  if (swiper) {
    swiper.autoplay.stop();
  }
};

const handleMouseLeave = () => {
  setAutoplay(true);
};

  return (
    <>
    <div>
    {/* <div style={{display:'flex',alignItems:'center'}}>
      <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdata?.user?.name}</span>, Welcome to your dashboard.</p>
    </div> */}
    <div className='d-flex align-items-center justify-content-between'>
    <div style={{display:'flex',alignItems:'center'}}>
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdata?.user?.name}</span>, Welcome to your dashboard.</p>
    </div>
    <div>
    {
        profilePercentage<100 ?(
          <>
<ProfileStatusChart/>
{/* <h3>109</h3> */}

</>
        ):(
          
          null
        
)
}
    </div>
</div>
    <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
 
<div>
  {userproduct.map((product, index) => (
   
    <div className='community-member-main-container' key={index}>
      <img
        src={membercommunity}
        alt="Community Member"
        className='community-member-image'
      />

      {/* <Swiper
        onSwiper={(setSwiperRef) => { }}
        watchSlidesVisibility
        watchSlidesProgress
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 300,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
        }}
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={100}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        autoplay={{ delay: 100, disableOnInteraction: false }}
        speed={1000} 
        className="mySwiper"
      > */}
      {/* <Swiper
  getSwiper={(swiper) => setSwiperRef(swiper)}
  ref={swiperRef}
  watchSlidesVisibility
  watchSlidesProgress
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 300,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 100,
    },
  }}
  slidesPerView={3}
  centeredSlides={false}
  spaceBetween={100}
  navigation={false}
  loop={true} 
  modules={[Pagination, Navigation,Autoplay]}
  autoplay={{ delay: 100, disableOnInteraction: false }}
  speed={3000}
  className="mySwiper"
  onMouseEnter={() => swiperRef && swiperRef.autoplay.stop()}
 onMouseLeave={() => swiperRef && swiperRef.autoplay.start()}
> */}
<Swiper
  onSwiper={setSwiper}
  ref={swiperRef}
  watchSlidesVisibility
  watchSlidesProgress
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 300,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 100,
    },
  }}
  slidesPerView={3}
  centeredSlides={false}
  spaceBetween={100}
  navigation={false}
  loop={true}
  modules={[Pagination, Navigation, Autoplay]}
  // autoplay={{ delay: 100, disableOnInteraction: false }}
  autoplay={autoplay}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  speed={3000}
  
  className="mySwiper"
  
>
  
   {/* card for discount materials */}
        <SwiperSlide >

        <Card style={{width:'15rem'}}>

      <Card.Body>
        
        {/* <Card.Img src={product.link_owner_purchased_product ?unlockmaterial:feature}  style={{ height:'auto'}}/> */}
        <Card.Img
  src={
    product.link_owner_purchased_product
      ? product.discounts_on_materials_activated
        ? Webdiscount
        : unlockmaterial
      : feature
  }
  style={{ height: 'auto' }}
/>
        <Card.Text className='text-center'>
    
        </Card.Text>
        <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
          {
product.link_owner_purchased_product ?(
  <>
  {
product.discounts_on_materials_activated?(
<Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated <IoCheckmarkCircleOutline/></Button>
):(
  <>
  <Button className='btn  btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>claimed</Button> 
  <WebHookConfirmation cardtype={'discount'} setTriger={setTriger}/>
  </>
)

  }
 
  
  </>
):(
  <>
  <FeaturePaymentModal productid={product?.product?.id}/>
  
  <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
  </>
)
        }

        </div>
        
      </Card.Body>
    </Card >
        </SwiperSlide>

{/* card for site survey */}

<SwiperSlide className='swiper-slide '>
        <Card style={{width:'15rem'}}>
     
      <Card.Body>
        {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>User Mgt<br/> Platform</Card.Title> */}
        <Card.Img variant="top"  src={ product.link_owner_purchased_product
      ? (product.site_survey_purchased ? visitactivated : unlocksite)
      : sitevisit}  style={{height:'auto'}}/>
        <Card.Text className='text-center'>
          
        </Card.Text>
        <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
        {
product.link_owner_purchased_product ?(
  <>
  {
    product.site_survey_purchased?(
      // <Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated</Button>
      <Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated <IoCheckmarkCircleOutline/></Button>
    ):(
      <>
      <Button className='btn btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Claimed </Button>
      {
        profilePercentage<100 ? (
          <ProfileUpdationNotification/>
        ):(
<ProductServicePayment productid={product?.product?.id}/>
        )
      }
      
      </>
    )
  }

  </>
):(
  <>
  <FeaturePaymentModal productid={product?.product?.id}/>
 
  <FeaturedModal productid={product?.product?.id} userproduct={userproduct} />
  </>
)
        }
        </div>
      </Card.Body>
    </Card>
        </SwiperSlide>

        {/* card for low interest rate */}

        <SwiperSlide>
        <Card style={{width:'15rem'}}>
     
      <Card.Body>
        {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>Lower interest <br/>rates</Card.Title> */}
        {/* <Card.Img variant="top"src={product.link_owner_purchased_product ?unlocklower:interest}  style={{height:'auto'}}/> */}
        <Card.Img
  variant="top"
  src={
    product.link_owner_purchased_product
      ? product.interest_free_payment_plans_activated

        ? webinterest
        : unlocklower
      : interest
  }
  style={{ height: 'auto' }}
/>
        <Card.Text className='text-center'>
          {/* <MdLock style={{fontSize:'70px',color:'red'}} /> */}
          {/* {
           
              <FontAwesomeIcon style={{fontSize:'70px',color:'black'}} icon={faPercent} className='text-secondary' />
            
          } */}
        </Card.Text>
        <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
        {
product.link_owner_purchased_product ?(
  <>
  {
    product.interest_free_payment_plans_activated
    ?(
<Button className='btn w-100 btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>Activated <IoCheckmarkCircleOutline/></Button>
    ):(
      <>
<Button className='btn  btn-sm'style={{backgroundColor:'#a96f12',border:'none'}}>claimed</Button> 
  <WebHookConfirmation cardtype={'interestfree'} setTriger={setTriger}/>
 </>
    )
  }

  </>
):(
  <>
  <FeaturePaymentModal productid={product?.product?.id}/>
 
  <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
  </>
)
        }
        </div>
      </Card.Body>
    </Card>

        </SwiperSlide>

        {/* card for ai platform */}
        
        <SwiperSlide>

         <Card style={{width:'15rem'}}>

      <Card.Body>
        {/* <Card.Title className=' text-center' style={{fontSize:'20px'}}>AI generated platform</Card.Title> */}
        <Card.Img variant="top"  src={product.link_owner_purchased_product ?unlockai:AI}  style={{height:'auto'}}/>
        <Card.Text className='text-center'>
          {/* <MdLock style={{fontSize:'70px',color:'red'}} /> */}
          {/* {
            
             
              <FontAwesomeIcon style={{fontSize:'70px',color:'black'}} icon={faMicrochip} className='text-secondary'  />
            
          } */}
        </Card.Text>
        <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
        {
product.link_owner_purchased_product ?(
  <>
  
  <Button className='btn  btn-sm' style={{backgroundColor:'#a96f12',border:'none'}}>Claimed <FaLockOpen/></Button> 
  
  <FeaturedModal />
  </>
):(
  <>
  <FeaturePaymentModal productid={product?.product?.id}/>
 
  <FeaturedModal productid={product?.product?.id} userproduct={userproduct}/>
  </>
)
        }
        </div>
      </Card.Body>
    </Card>
        </SwiperSlide>

        {/* card for unlock expert */}

        <SwiperSlide className='swiper-slide '>
  <Card style={{ width: '15rem' }}>
    <Card.Body>
      <Card.Img
        variant="top"
        src={
          product.link_owner_purchased_product
            ? product.asks_to_experts_and_community_activated
              ? webask
              : unlockexpert
            : Expert
        }
        style={{ height: 'auto' }}
      />
      <Card.Text className='text-center'></Card.Text>
      <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
        {product.link_owner_purchased_product ? (
          product.asks_to_experts_and_community_activated? (
            <>
              {/* {console.log("Activated")} */}
              <Button className='btn w-100 btn-sm' style={{ backgroundColor: '#a96f12', border: 'none' }}>
                Activated <IoCheckmarkCircleOutline />
              </Button>
            </>
          ) : (
            <>
              {/* {console.log("Claimed")} */}
              <Button className='btn btn-sm' style={{ backgroundColor: '#a96f12', border: 'none' }}>
                Claimed
              </Button>
              <WebHookConfirmation cardtype={'webask'} setTriger={setTriger} />
            </>
          )
        ) : (
          <>
            {/* {console.log("Not purchased")} */}
            <FeaturePaymentModal productid={product?.product?.id} />
            <FeaturedModal productid={product?.product?.id} userproduct={userproduct} />
          </>
        )}
      </div>
    </Card.Body>
  </Card>
</SwiperSlide>

{/* lower interest rates */}

<SwiperSlide className='swiper-slide '>
  <Card style={{ width: '15rem' }}>
    <Card.Body>
      <Card.Img
        variant="top"
        src={
          product.link_owner_purchased_product
            ? product.lower_interest_rates_activated
              ? weblower
              : unlocklowerinterest
            : lowerInterest
        }
        style={{ height: 'auto' }}
      />
      <Card.Text className='text-center'></Card.Text>
      <div className='text-center d-flex align-items-center justify-content-between buynow-and-details-button'>
        {product.link_owner_purchased_product ? (
          product.lower_interest_rates_activated? (
            <>
              {/* {console.log("Activated")} */}
              <Button className='btn w-100 btn-sm' style={{ backgroundColor: '#a96f12', border: 'none' }}>
                Activated <IoCheckmarkCircleOutline />
              </Button>
            </>
          ) : (
            <>
              {/* {console.log("Claimed")} */}
              <Button className='btn btn-sm' style={{ backgroundColor: '#a96f12', border: 'none' }}>
                Claimed
              </Button>
              <WebHookConfirmation cardtype={'lowerrates'} setTriger={setTriger} />
            </>
          )
        ) : (
          <>
            {/* {console.log("Not purchased")} */}
            <FeaturePaymentModal productid={product?.product?.id} />
            <FeaturedModal productid={product?.product?.id} userproduct={userproduct} />
          </>
        )}
      </div>
    </Card.Body>
  </Card>
</SwiperSlide>

       

      </Swiper>
    </div>
  ))}
</div>


          </div>
      <div className='user-dashboard-overview-component-container'>
        <div className='user-dashboard-overview-component-header-container'>
          <div>
                   <h3 style={{color:'#081d29'}} className='mt-4'> Your Affiliate Dashboard </h3>
            
          </div>
        </div>
      </div>
      <hr />
      <div className='user-dashboard-overview-component-dashboardactivity'>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
          <div>
          {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <h3 style={{ color: '#6da8ba' }}>
              <span>₹</span>
              {netCommission}
            </h3>
          )}
        </div>
            
            
          </div>
          <div>
              <h6 >Net Commission </h6>
            </div>
        </div>
        <div>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
            {/* <div>
              <h3 style={{color:'#6da8ba'}}><span><GiClick/>{totalClicks}</span></h3>
            </div> */}
            <div>
          {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <h3 style={{ color: '#6da8ba' }}>
              <span><GiClick/>{totalClicks}</span>
            </h3>
          )}
        </div>

            <div>
            
              <h4 style={{color:'#6da8ba'}}><GiClick/></h4>
            </div>
            
            
          </div>
          <div>
              <h6>Clicks</h6>
            </div>
        </div>
        </div>
        <div>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
            {/* <div>
             <h3 style={{color:'#6da8ba'}}><span><CiCreditCard2/>{transactioncount}</span></h3>
            </div> */}
            {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <h3 style={{ color: '#6da8ba' }}>
              <span><CiCreditCard2/>{transactioncount}</span>
            </h3>
          )}

            <div>
           
              <h4 style={{color:'#6da8ba'}}><CiCreditCard2/></h4>
            </div>
            
            
          </div>
          <div>
              <h6>Transactions</h6>
            </div>
        </div>
        </div>
        <div>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
            <div>
            {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <h3 style={{color:'#6da8ba'}}><span><GoGraph/></span>{grossSale}</h3>

          )}
            </div>

            <div>
           
              {/* <h4 style={{color:'#6da8ba'}}><GoGraph/></h4> */}
            </div>
          
            
          </div>
          <div>
              <h6>Gross Sale</h6>
            </div>
        </div>
        </div>
        <div>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
            <div>
             <h3 style={{color:'#6da8ba'}}><span><RiExchangeFundsFill/></span>0</h3>
            </div>

            <div>
            
              <h4 style={{color:'#6da8ba'}}><RiExchangeFundsFill/></h4>
            </div>
            
            
          </div>
          <div>
              <h6>Refunds</h6>
            </div>
        </div>
        </div>
        <div>
        <div className='user-dashboard-overview-component-netcommission-container'>
          <div className='user-dashboard-overview-component-netcommission'>
            <div>
             <h3 style={{color:'#6da8ba'}}><span><HiOutlineReceiptRefund/></span>0</h3>
            </div>

            <div>
           
              <h4 style={{color:'#6da8ba'}}><HiOutlineReceiptRefund/></h4>
            </div>
            
            
          </div>
          <div>
              <h6>Refund amt</h6>
            </div>
        </div>
        </div>
      </div>
     
      <div>
      </div>
      
    </>
  )
}

export default OverviewComponent
























