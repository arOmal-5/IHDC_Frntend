import React, { useState,useEffect ,  useContext} from 'react'
import avatar from '../../Assets/img/avatar.jpg'
import '../../style/adminDashboard/ProductComponent.css'
// import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { ProductColumn, ProductData } from '../../Constant/AdminDashboard/ProductData';
import ProductDetails from '../../component/AdminDashboard/ProductDetails.jsx'
import TransactionHistoryForParticularProduct from '../../component/AdminDashboard/TransactionHistoryForParticularProduct.jsx';
import EnrollAsOrganiser from '../../component/AdminDashboard/EnrollAsOrganiser.jsx';
import { IoMdArrowRoundBack } from "react-icons/io";
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
import SingleProductcommission from '../../component/AdminDashboard/SingleProductcommission.jsx';
import ProfileStatusChart from '../../component/AdminDashboard/ProfileStatusChart.jsx';
import MyContext from '../../store/MyContext.jsx';

function ProductsComponent() {

  // const columnWithButton=[
  //   ...ProductColumn,
  //   {
  //     name: 'Edit',
  //     cell: (row) => (
  //       // <button className='admin-dashboard-product-component-header-container-details-button' >
  //       //   Details
  //       // </button>
  //       <ProductDetails/>
  //     ),
  //     sortable: false, 
  //   },
  // ]

  const [setuserdataprofile,setUserDataprofile]=useState([])
  const [userproducts,setUserproducts]=useState([])
  const{profilePercentage,setProfilePercentage}=useContext(MyContext)

  const token=localStorage.getItem('usertoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserDataprofile(response.data);
            } catch (error) {
                // console.log(error);
            }
        };
    
        fetchData();
    }, [token]);
    const [productId,setProductid]=useState(null)
  const handleProductActive=(productId)=>{
    setProductid(productId)
    setIsproduct(true)
  }
  localStorage.setItem('productId',productId)
  const [ActiveKey,setActiveKey]=useState('Product')
  const renderComponent = () => {
    switch (ActiveKey) {
        case 'product':
            return <ProductDetails productId={productId}/>;
        case 'transaction':
            return <TransactionHistoryForParticularProduct productId={productId}/>;
        case 'enrollasorganiser':
          return <EnrollAsOrganiser productId={productId}/> 
        case 'commissions':
          return <SingleProductcommission productId={productId}/>  
        default:
            return <ProductDetails/>; 
    }
};

  const [isProduct, setIsproduct] = useState(false)
  

  const handleProductBack=()=>{
    setIsproduct(false)
  }

  useEffect(()=>{
  const fetchData=async()=>{
   await axiosInstance.get('userapp/single/user/all/product/details',{
    headers: {
      'Authorization': `Bearer ${token}`
  }
   }).then((response)=>{
    setUserproducts(response.data)
    // console.log(response.data);
    
   }).catch((error)=>{
    // console.log(error);
   })
  }
  fetchData()
  },[])
  return (
    <>
      {/* <div className='admin-dashboard-product-component-container'>
        <div className='admin-dashboard-product-component-header-container'>

          <div>
            <h3 style={{ color: '#081d29' }}>Products</h3>
          </div>
          <div >


            <input type="text" name="" id="" placeholder='Search product...' className='admin-dashboard-product-component-header-container-search' />
          </div>
          <div>
            <nav class="navbar   navbar-expand-sm">

              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbar-list-4">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src={avatar} width="40" height="40" class="rounded-circle" />
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                      <a class="dropdown-item" href="#">Profile</a>
                      <a class="dropdown-item" href="#">Log Out</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

      </div> */}
      {/* <div>
      <div style={{display:'flex',alignItems:'center'}}>
      <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
      <p className='user-dashboard-welcome-heading'>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdataprofile?.user?.name}</span>, Below are the products you registered.</p>
    </div>
      </div> */}
      <div className='d-flex align-items-center justify-content-between'>
    <div style={{display:'flex',alignItems:'center'}}>
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdataprofile?.user?.name}</span>, Below are the products you registered.</p>
    </div>
    <div>
    {/* <ProfileStatusChart /> */}
    {
        profilePercentage<100 ?(
<ProfileStatusChart/>
        ):(
          null
        )
      }
    </div>
  </div>
      <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
      <div>
      </div>
      {/* <h5>This is the list of sellers whose products you promote as an affiliate</h5> */}
      {/* <div className='admin-dashboard-product-component-table-container'>
        <div className='admin-dashboard-product-component-table-sub-container'>
          <DataTable
            columns={columnWithButton}
            data={ProductData}
            fixedHeader
            pagination
          />
        </div>
      </div> */}
      {
        isProduct ?(
          <>
          <button className='user-dashboard-product-details-back-button' onClick={handleProductBack}><IoMdArrowRoundBack/>Go Back</button>
          <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="product" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey="product">Product</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="transaction">Analytics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="enrollasorganiser">Organiser</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="commissions">Commissions</Nav.Link>
          </Nav.Item>
         
        </Nav>
      </Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
        {renderComponent()}
      </Card.Body>
    </Card>
    </>
        ):(
          <>
          <div className='user-dashboard-product-heading-container'>
        <h4 className='user-dashboard-vendor-heading'>Products</h4>
        <p className='user-dashboard-vendor-description'>This is the list of your registered products. Also you can earn by reffering the product.</p>
      </div>
      <div className='user-dashboard-product-show-container'>
        {/* <div>
          <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>YouTube</Card.Title>
              <Card.Text>
                Nandu Krishnansdfsfsdsdfsfsd
              </Card.Text>
              <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
            </Card.Body>
          </Card>
        </div> */}
        
        
        {/* {
          userproducts.map((item,index)=>{
            <div key={index}>
          <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>{item?.product?.name}</Card.Title>
              <Card.Text>
                Nandu Krishnan
              </Card.Text>
              <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
            </Card.Body>
          </Card>
        </div>
            
          })
        } */}
        {
  userproducts.map((item, index) => (
    <div key={index}>
      <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{item?.product?.name}</Card.Title>
          <Card.Text style={{ textAlign: 'center',textAlignLast:'center' }}>
            {
              item?.product?.description

            }
          </Card.Text>
          <Card.Text style={{ textAlign: 'center' }}>
          
          <span> ₹</span>{
              item?.product?.subcription_fee 

            }
          </Card.Text>
          <Button style={{ backgroundColor: '#3aa3e3' }} onClick={() => handleProductActive(item?.product?.id)}>
            View Product
          </Button>
        </Card.Body>
      </Card>
    </div>
  ))
}

      </div>
      </>

        )
      }
      

      <div>

      </div>


    </>
  )
}

export default ProductsComponent










// import React, { useState,useEffect } from 'react'
// import avatar from '../../Assets/img/avatar.jpg'
// import '../../style/adminDashboard/ProductComponent.css'
// // import DataTable from 'react-data-table-component'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Nav from 'react-bootstrap/Nav';
// import { ProductColumn, ProductData } from '../../Constant/AdminDashboard/ProductData';
// import ProductDetails from '../../component/AdminDashboard/ProductDetails.jsx'
// import TransactionHistoryForParticularProduct from '../../component/AdminDashboard/TransactionHistoryForParticularProduct.jsx';
// import EnrollAsOrganiser from '../../component/AdminDashboard/EnrollAsOrganiser.jsx';
// import { IoMdArrowRoundBack } from "react-icons/io";
// import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';


// function ProductsComponent() {

//   // const columnWithButton=[
//   //   ...ProductColumn,
//   //   {
//   //     name: 'Edit',
//   //     cell: (row) => (
//   //       // <button className='admin-dashboard-product-component-header-container-details-button' >
//   //       //   Details
//   //       // </button>
//   //       <ProductDetails/>
//   //     ),
//   //     sortable: false, 
//   //   },
//   // ]

//   const [setuserdataprofile,setUserDataprofile]=useState([])
//   const [userproducts,setUserproducts]=useState([])

//   const token=localStorage.getItem('usertoken')
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 setUserDataprofile(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
    
//         fetchData();
//     }, [token]);
//     const [productId,setProductid]=useState(null)
//   const handleProductActive=(productId)=>{
//     setProductid(productId)
//     setIsproduct(true)
//   }
//   const [ActiveKey,setActiveKey]=useState('Product')
//   const renderComponent = () => {
//     switch (ActiveKey) {
//         case 'product':
//             return <ProductDetails productId={productId}/>;
//         case 'transaction':
//             return <TransactionHistoryForParticularProduct productId={productId}/>;
//         case 'enrollasorganiser':
//           return <EnrollAsOrganiser/>  
//         default:
//             return <ProductDetails/>; 
//     }
// };

//   const [isProduct, setIsproduct] = useState(false)
  

//   const handleProductBack=()=>{
//     setIsproduct(false)
//   }

//   useEffect(()=>{
//   const fetchData=async()=>{
//    await axiosInstance.get(`userapp/single/user/all/product/details`,{
//     headers: {
//       'Authorization': `Bearer ${token}`
//   }
//    }).then((response)=>{
//     setUserproducts(response.data)
//     console.log(response.data);
    
//    }).catch((error)=>{
//     console.log(error);
//    })
//   }
//   fetchData()
//   },[])
//   return (
//     <>
//       {/* <div className='admin-dashboard-product-component-container'>
//         <div className='admin-dashboard-product-component-header-container'>

//           <div>
//             <h3 style={{ color: '#081d29' }}>Products</h3>
//           </div>
//           <div >


//             <input type="text" name="" id="" placeholder='Search product...' className='admin-dashboard-product-component-header-container-search' />
//           </div>
//           <div>
//             <nav class="navbar   navbar-expand-sm">

//               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//               </button>
//               <div class="collapse navbar-collapse" id="navbar-list-4">
//                 <ul class="navbar-nav">
//                   <li class="nav-item dropdown">
//                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                       <img src={avatar} width="40" height="40" class="rounded-circle" />
//                     </a>
//                     <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

//                       <a class="dropdown-item" href="#">Profile</a>
//                       <a class="dropdown-item" href="#">Log Out</a>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           </div>
//         </div>

//       </div> */}
//       <div>
//       <div style={{display:'flex',alignItems:'center'}}>
//       <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
//       <p className='user-dashboard-welcome-heading'>Hi <span style={{color:'black',fontWeight:'700'}}>{setuserdataprofile?.user?.name}</span> Below are the sellers whose products you promote as an affiliate</p>
//     </div>
//       </div>
//       <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
//       <div>
//       </div>
//       {/* <h5>This is the list of sellers whose products you promote as an affiliate</h5> */}
//       {/* <div className='admin-dashboard-product-component-table-container'>
//         <div className='admin-dashboard-product-component-table-sub-container'>
//           <DataTable
//             columns={columnWithButton}
//             data={ProductData}
//             fixedHeader
//             pagination
//           />
//         </div>
//       </div> */}
//       {
//         isProduct ?(
//           <>
//           <button className='user-dashboard-product-details-back-button' onClick={handleProductBack}><IoMdArrowRoundBack/>Go Back</button>
//           <Card>
//       <Card.Header>
//         <Nav variant="tabs" defaultActiveKey="product" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
//           <Nav.Item>
//             <Nav.Link eventKey="product">Product</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="transaction">Analytics</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="enrollasorganiser">Enroll as Organiser</Nav.Link>
//           </Nav.Item>
         
//         </Nav>
//       </Card.Header>
//       <Card.Body>
//         {/* <Card.Title>Special title treatment</Card.Title>
//         <Card.Text>
//           With supporting text below as a natural lead-in to additional content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button> */}
//         {renderComponent()}
//       </Card.Body>
//     </Card>
//     </>
//         ):(
//           <>
//           <div className='user-dashboard-product-heading-container'>
//         <h4 className='user-dashboard-vendor-heading'>Products</h4>
//         <p className='user-dashboard-vendor-description'>This is the list of sellers whose products you promote as an affiliate</p>
//       </div>
//       <div className='user-dashboard-product-show-container'>
//         {/* <div>
//           <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
//             <Card.Img variant="top" src={avatar} />
//             <Card.Body>
//               <Card.Title style={{ textAlign: 'center' }}>YouTube</Card.Title>
//               <Card.Text>
//                 Nandu Krishnansdfsfsdsdfsfsd
//               </Card.Text>
//               <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
//             </Card.Body>
//           </Card>
//         </div> */}
        
        
//         {/* {
//           userproducts.map((item,index)=>{
//             <div key={index}>
//           <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
//             <Card.Img variant="top" src={avatar} />
//             <Card.Body>
//               <Card.Title style={{ textAlign: 'center' }}>{item?.product?.name}</Card.Title>
//               <Card.Text>
//                 Nandu Krishnan
//               </Card.Text>
//               <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
//             </Card.Body>
//           </Card>
//         </div>
            
//           })
//         } */}
//         {
//   userproducts.map((item, index) => (
//     <div key={index}>
//       <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Card.Img variant="top" src={avatar} />
//         <Card.Body>
//           <Card.Title style={{ textAlign: 'center' }}>{item?.product?.name}</Card.Title>
//           <Card.Text style={{ textAlign: 'center',textAlignLast:'center' }}>
//             {
//               item?.product?.description

//             }
//           </Card.Text>
//           <Card.Text style={{ textAlign: 'center' }}>
//           ₹{
//               item?.product?.subcription_fee 

//             }<span> </span>
//           </Card.Text>
//           <Button style={{ backgroundColor: '#3aa3e3' }} onClick={() => handleProductActive(item?.product?.id)}>
//             View Product
//           </Button>
//         </Card.Body>
//       </Card>
//     </div>
//   ))
// }

//       </div>
//       </>

//         )
//       }
      

//       <div>

//       </div>


//     </>
//   )
// }

// export default ProductsComponent
