import React, { useState, useEffect } from 'react'
// import avatar from '../../Assets/img/avatar.jpg'
import avatar from '../../../Assets/img/avatar.jpg'
// import '../../../style/adminDashboard/ProductComponent.css'
import '../../../style/SuperAdminDashboard/superadminproductcomponent.css'
// import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
// import { ProductColumn, ProductData } from '../../Constant/AdminDashboard/ProductData';
// import ProductDetails from '../../component/AdminDashboard/ProductDetails.jsx'
import SuperAdminProductDetails from './SuperAdminProductDetails.jsx';
import TransactionHistoryForParticularProduct from '../../../component/AdminDashboard/TransactionHistoryForParticularProduct.jsx';
import { IoMdArrowRoundBack } from "react-icons/io";
import AddProduct from '../../../component/SuperAdminComponent/ProductComponent/AddProduct.jsx';
import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
import BuyerComponent from '../BuyerComponent/BuyerComponent.jsx';
import ProductAnalytics from '../../../component/SuperAdminComponent/ProductComponent/ProductAnalytics.jsx'
import ProductCommission from './ProductCommission.jsx';
function ProductsComponent() {

  const [userprofiledatas, setUserprofiledatas] = useState([])
  const [product, Setproduct] = useState([])
  const [productId, setProductId] = useState('')
  const token = localStorage.getItem('admintoken')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('userapp/admin/dash/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserprofiledatas(response.data);
       const productresponse = await axiosInstance.get('product/list/all/products', {
        headers: {
          'Authorization': `Bearer ${token}`
       }
      })
      // console.log('response data all list',productresponse.data);
      Setproduct(productresponse.data)
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handleProductActive = (prodid) => {

    setProductId(prodid)
    setIsproduct(true)
  }

  localStorage.setItem('adminproductid',productId)
  const [ActiveKey, setActiveKey] = useState('Product')
  const renderComponent = (productId) => {
    switch (ActiveKey) {
      case 'product':
        return <SuperAdminProductDetails productId={productId}/>;
      case 'Analytics':
        return <ProductAnalytics productId={productId}/>;
      case 'transaction':
        return <BuyerComponent productId={productId} />
      case 'commissions':
        return <ProductCommission productId={productId} />
      default:
        return <SuperAdminProductDetails />;
    }
  };

  const [isProduct, setIsproduct] = useState(false)

  const handleProductBack = () => {
    setIsproduct(false)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
        <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofiledatas?.name}</span> Welcome to your admin dashboard</p>
      </div>
      <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }} />
      <div className='admin-dashboard-product-component-container'>
        <div className='admin-dashboard-product-component-header-container'>

          <div>
            <h3 style={{ color: '#081d29' }}>Products</h3>
          </div>
          <div>

            {
              isProduct ? (
                null
              ) : (
                <AddProduct Setproduct={Setproduct}/>
              )
            }

          </div>
          
        </div>

      </div>
      <hr />
      <div>
      </div>
      {
        isProduct ? (
          <>
            <button className='admin-dashboard-product-details-back-button' onClick={handleProductBack}><IoMdArrowRoundBack />Go Back</button>
            <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="product" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                  <Nav.Item>
                    <Nav.Link eventKey="product">Product</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Analytics">Analytics</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="transaction">Transaction</Nav.Link>
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
                {renderComponent(productId)}
              </Card.Body>
            </Card>
          </>
        ) : (
          <>
            <div className='admin-dashboard-product-heading-container'>
              <h4>Products</h4>
              <p>This is the list of sellers whose products you promote as an affiliate</p>
            </div>
            <div className='admin-dashboard-product-show-container'>
              {/* {
          product.map()
          <div>
          <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>YouTube</Card.Title>
              <Card.Text>
                Nandu Krishnan
              </Card.Text>
              <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
            </Card.Body>
          </Card>
        </div>
        } */}
              {
                product.map((item, index) => (
                  <div key={index}>
                    <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Card.Img variant="top" src={item.avatar} />
                      <Card.Body>
                        <Card.Title style={{ textAlign: 'center' }}>{item.name}</Card.Title>
                        
                        <Card.Text style={{ textAlign: 'center' }}>
                          ₹{item.subcription_fee}
                        </Card.Text>
                        <Button style={{ backgroundColor: '#3aa3e3' }} onClick={() => handleProductActive(item.id)}>
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




// import React, { useState, useEffect } from 'react'
// // import avatar from '../../Assets/img/avatar.jpg'
// import avatar from '../../../Assets/img/avatar.jpg'
// // import '../../../style/adminDashboard/ProductComponent.css'
// import '../../../style/SuperAdminDashboard/superadminproductcomponent.css'
// // import DataTable from 'react-data-table-component'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Nav from 'react-bootstrap/Nav';
// // import { ProductColumn, ProductData } from '../../Constant/AdminDashboard/ProductData';
// // import ProductDetails from '../../component/AdminDashboard/ProductDetails.jsx'
// import SuperAdminProductDetails from './SuperAdminProductDetails.jsx';
// import TransactionHistoryForParticularProduct from '../../../component/AdminDashboard/TransactionHistoryForParticularProduct.jsx';
// import { IoMdArrowRoundBack } from "react-icons/io";
// import AddProduct from '../../../component/SuperAdminComponent/ProductComponent/AddProduct.jsx';
// import axiosInstance from '../../../config/axios/AxiosConfiguration.jsx';
// import BuyerComponent from '../BuyerComponent/BuyerComponent.jsx';

// function ProductsComponent() {

//   const [userprofiledatas, setUserprofiledatas] = useState([])
//   const [productId, setProductId] = useState('')
//   const token = localStorage.getItem('admintoken')
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('userapp/admin/dash/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setUserprofiledatas(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [token]);

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
//   const handleProductActive = (prodid) => {

//     setProductId(prodid)
//     setIsproduct(true)
//   }

//   const [ActiveKey, setActiveKey] = useState('Product')
//   const renderComponent = (productId) => {
//     switch (ActiveKey) {
//       case 'product':
//         return <SuperAdminProductDetails productId={productId} />;
//       case 'Analytics':
//         return <TransactionHistoryForParticularProduct />;
//       case 'transaction':
//         return <BuyerComponent productId={productId} />
//       default:
//         return <SuperAdminProductDetails />;
//     }
//   };

//   const [isProduct, setIsproduct] = useState(false)



//   const handleProductBack = () => {
//     setIsproduct(false)
//   }

//   const [product, Setproduct] = useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       await axiosInstance.get('product/list/all/products', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }

//       }).then((response) => {
//         console.log(response.data);
//         Setproduct(response.data)

//       }).catch((error) => {
//         console.log(error);
//       })

//     }
//     fetchData()
//   }, [])
//   return (
//     <>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
//         <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofiledatas?.name}</span> Welcome to your Influencer dashboard</p>
//       </div>
//       <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }} />
//       <div className='admin-dashboard-product-component-container'>
//         <div className='admin-dashboard-product-component-header-container'>

//           <div>
//             <h3 style={{ color: '#081d29' }}>Products</h3>
//           </div>
//           <div>


//             {/* <input type="text" name="" id="" placeholder='Search product...' className='admin-dashboard-product-component-header-container-search' /> */}
//             {
//               isProduct ? (
//                 null
//               ) : (
//                 <AddProduct />
//               )
//             }

//           </div>
//           {/* <div>
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
//           </div> */}
//         </div>

//       </div>
//       <hr />
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
//         isProduct ? (
//           <>
//             <button className='admin-dashboard-product-details-back-button' onClick={handleProductBack}><IoMdArrowRoundBack />Go Back</button>
//             <Card>
//               <Card.Header>
//                 <Nav variant="tabs" defaultActiveKey="product" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
//                   <Nav.Item>
//                     <Nav.Link eventKey="product">Product</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link eventKey="Analytics">Analytics</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link eventKey="transaction">Transaction</Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               </Card.Header>
//               <Card.Body>
//                 {/* <Card.Title>Special title treatment</Card.Title>
//         <Card.Text>
//           With supporting text below as a natural lead-in to additional content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button> */}
//                 {renderComponent(productId)}
//               </Card.Body>
//             </Card>
//           </>
//         ) : (
//           <>
//             <div className='admin-dashboard-product-heading-container'>
//               <h4>Products</h4>
//               <p>This is the list of sellers whose products you promote as an affiliate</p>
//             </div>
//             <div className='admin-dashboard-product-show-container'>
//               {/* {
//           product.map()
//           <div>
//           <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
//             <Card.Img variant="top" src={avatar} />
//             <Card.Body>
//               <Card.Title style={{ textAlign: 'center' }}>YouTube</Card.Title>
//               <Card.Text>
//                 Nandu Krishnan
//               </Card.Text>
//               <Button style={{ backgroundColor: '#3aa3e3' }} onClick={handleProductActive}>View Product</Button>
//             </Card.Body>
//           </Card>
//         </div>
//         } */}
//               {
//                 product.map((item, index) => (
//                   <div key={index}>
//                     <Card style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       {/* Assuming 'avatar' and other properties are extracted from the 'item' object */}
//                       <Card.Img variant="top" src={item.avatar} />
//                       <Card.Body>
//                         <Card.Title style={{ textAlign: 'center' }}>{item.name}</Card.Title>
//                         {/* <Card.Text style={{textAlign:'center',textAlignLast:'center'}}>
//             {item.description}
//           </Card.Text> */}
//                         <Card.Text style={{ textAlign: 'center' }}>
//                           {item.subcription_fee}
//                         </Card.Text>
//                         <Button style={{ backgroundColor: '#3aa3e3' }} onClick={() => handleProductActive(item.id)}>
//                           View Product
//                         </Button>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 ))
//               }





//             </div>
//           </>

//         )
//       }


//       <div>

//       </div>


//     </>
//   )
// }

// export default ProductsComponent

