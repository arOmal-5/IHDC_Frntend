import React,{useState,useEffect} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataTable from 'react-data-table-component'
import {InfluencerColumn,paymentColumn,particularproductuser,particularorganiserinfluencer} from '../../../Constant/SuperAdminDashboard/InfluencerData'
import axiosInstance from '../../../config/axios/AxiosConfiguration';

function BuyerComponent({productId}) {
  const [ProductOrganiser,setProductOrganiser]=useState([])
  const [ProductInfluencer,setProductInfluencer]=useState([])
  const [productUcers,setProductUsers]=useState([])
  const [productPaymentList, setProductPaymentsList] = useState([])
  const token=localStorage.getItem('admintoken')
  useEffect(()=>{

    const fetchData=async()=>{
      try {
        const organiserData=await axiosInstance.get(`product/organiser/${productId}`,{
          headers:{

              'Authorization': `Bearer ${token}`
          }
        })
        // console.log('organiserData.data',organiserData.data);
        setProductOrganiser(organiserData.data)

        const influencerData=await axiosInstance.get(`product/influncers/${productId}`,{
          headers:{
            'Authorization': `Bearer ${token}`
        }
        })
        // console.log('influencer data',influencerData.data);
        setProductInfluencer(influencerData.data)

        const particularproductusers= await axiosInstance.get(`product/specific/payed/users/${productId}`,{
          headers:{
            'Authorization': `Bearer ${token}`
        }
        })
        // console.log('particularproductusers',particularproductusers.data);
        setProductUsers(particularproductusers.data)
        const particularproductPayments= await axiosInstance.get(`product/single/product/payment/list/${productId}`,{
          headers:{
            'Authorization': `Bearer ${token}`
        }
        })
        // console.log('particularproductPayments',particularproductPayments.data);
        setProductPaymentsList(particularproductPayments.data)

      } catch (error) {
        // console.log(error);
      }
    }
   fetchData()
  },[])

  return (
    <>
    <div>
   
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
      style={{marginTop:'20px'}}
    >
      <Tab eventKey="home" title="Organiser">
      <DataTable
            columns={particularorganiserinfluencer}
            data={ProductOrganiser}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',  
                         
                  background: '#ffffff',  
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9', 
                },
              },
              header: {
                style: {
                  background: '#333',  
                  color: '#fff', 
                },
              },
            }}
          />
      </Tab>
      <Tab eventKey="profile" title="Influencer">
      <DataTable
            columns={InfluencerColumn}
            data={ProductInfluencer}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',  
                        
                  background: '#ffffff', 
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff', 
                },
              },
            }}
          />
      </Tab>
      <Tab eventKey="users" title="Purchased Members">
      <DataTable
            columns={particularproductuser}
            data={productUcers}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',  
                        
                  background: '#ffffff', 
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff', 
                },
              },
            }}
          />
      </Tab>
      <Tab eventKey="paymentlists" title="Payment Lists">
      <DataTable
            columns={paymentColumn}
            data={productPaymentList}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',  
                        
                  background: '#ffffff', 
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff', 
                },
              },
            }}
          />
      </Tab>
      
    </Tabs>
    </div>
    </>
  )
}

export default BuyerComponent






// import React,{useState,useEffect} from 'react'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import DataTable from 'react-data-table-component'
// import {InfluencerColumn,InfluencerData,particularproductuser} from '../../../Constant/SuperAdminDashboard/InfluencerData'
// import axiosInstance from '../../../config/axios/AxiosConfiguration';

// function BuyerComponent({productId}) {
//   const [ProductOrganiser,setProductOrganiser]=useState([])
//   const [ProductInfluencer,setProductInfluencer]=useState([])
//   const [productUcers,setProductUsers]=useState([])
//   const token=localStorage.getItem('admintoken')
//   useEffect(()=>{

//     const fetchData=async()=>{
//       try {
//         const organiserData=await axiosInstance.get(`product/organiser/${productId}`,{
//           headers:{

//               'Authorization': `Bearer ${token}`
//           }
//         })
//         console.log('organiserData.data',organiserData.data);
//         setProductOrganiser(organiserData.data)

//         const influencerData=await axiosInstance.get(`product/influncers/${productId}`,{
//           headers:{
//             'Authorization': `Bearer ${token}`
//         }
//         })
//         console.log('influencer data',influencerData.data);
//         setProductInfluencer(influencerData.data)

//         const particularproductusers= await axiosInstance.get(`product/specific/payed/users/${productId}`,{
//           headers:{
//             'Authorization': `Bearer ${token}`
//         }
//         })
//         console.log('particularproductusers',particularproductusers.data);
//         setProductUsers(particularproductusers.data)

//       } catch (error) {
//         console.log(error);
//       }
//     }
//    fetchData()
//   },[])

//   return (
//     <>
//     <div>
   
//     <Tabs
//       defaultActiveKey="profile"
//       id="fill-tab-example"
//       className="mb-3"
//       fill
//       style={{marginTop:'20px'}}
//     >
//       <Tab eventKey="home" title="Organiser">
//       <DataTable
//             columns={InfluencerColumn}
//             data={InfluencerData}
//             fixedHeader
//             pagination
//             customStyles={{
//               table: {
//                 style: {
//                   border: '1px solid #ccc',  
                         
//                   background: '#ffffff',  
//                 },
//               },
//               rows: {
//                 style: {
//                   backgroundColor: '#f9f9f9', 
//                 },
//               },
//               header: {
//                 style: {
//                   background: '#333',  
//                   color: '#fff', 
//                 },
//               },
//             }}
//           />
//       </Tab>
//       <Tab eventKey="profile" title="Influencer">
//       <DataTable
//             columns={InfluencerColumn}
//             data={ProductInfluencer}
//             fixedHeader
//             pagination
//             customStyles={{
//               table: {
//                 style: {
//                   border: '1px solid #ccc',  
                        
//                   background: '#ffffff', 
//                 },
//               },
//               rows: {
//                 style: {
//                   backgroundColor: '#f9f9f9',
//                 },
//               },
//               header: {
//                 style: {
//                   background: '#333',
//                   color: '#fff', 
//                 },
//               },
//             }}
//           />
//       </Tab>
//       <Tab eventKey="users" title="Suscribers">
//       <DataTable
//             columns={particularproductuser}
//             data={productUcers}
//             fixedHeader
//             pagination
//             customStyles={{
//               table: {
//                 style: {
//                   border: '1px solid #ccc',  
                        
//                   background: '#ffffff', 
//                 },
//               },
//               rows: {
//                 style: {
//                   backgroundColor: '#f9f9f9',
//                 },
//               },
//               header: {
//                 style: {
//                   background: '#333',
//                   color: '#fff', 
//                 },
//               },
//             }}
//           />
//       </Tab>
      
//     </Tabs>
//     </div>
//     </>
//   )
// }

// export default BuyerComponent
