import React, { useEffect, useState } from 'react'
import avatar from '../../Assets/img/avatar.jpg'
import '../../style/SuperAdminDashboard/Organisercomponent.css'
import DataTable from 'react-data-table-component'
import { OrganiserColumn, OrganiserData,OrganiserPendingColumn,PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData'
import AddOrganiser from './OrganiserComponent/AddOrganiser';
import axiosInstance from '../../config/axios/AxiosConfiguration'
import Nav from 'react-bootstrap/Nav';
import { IoMdArrowBack } from "react-icons/io";
import ApproveAsOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/ApproveAsOrganiser.jsx';
import RejectOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/RejectOrganiser.jsx'
import InfluencerView from '../../component/SuperAdminComponent/InfluencerView.jsx'

function OrganiserComponent() {

  const [userprofile, SetUserProfile] = useState([])
  const [organiserData,SetOrganiserData]=useState([])
  const [ActiveKey, setActiveKey] = useState('Organisers')
  const [pendingrequest,setPendingrequest]=useState([])
  const [isinfluencer,setIsinfluencer]=useState(false)
  const token = localStorage.getItem('admintoken')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('userapp/admin/dash/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        SetUserProfile(response.data);
        if(ActiveKey==='Organisers'){
          const organiser= await axiosInstance.get('product/organiser/all/list',{
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          // console.log('all organiser data',organiser.data);
          SetOrganiserData(organiser.data)

        }else if (ActiveKey === 'Request'){
          const organiserpendingrequest= await axiosInstance.get('userapp/user/upgrdation/request/in/admin',{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          })
          // console.log('organiserpendingrequest',organiserpendingrequest.data);
          setPendingrequest(organiserpendingrequest.data)
        }

      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [ActiveKey,token]);
  
  const columnWithButton = [
    ...OrganiserColumn,
    {
      
      name: 'View Influencer',
      cell: (row) => (
        // <button className='btn-primary' onClick={handleNavigateToInfluencer}>Influencer</button>
              <InfluencerView orgid={row.user.id} orgname={row?.user?.name}/>
      ),
      sortable: false,

    
  }

  ]

  const handleNavigateToInfluencer=()=>{
    setIsinfluencer(true)
  }

  const handleNavigateToOrganiser=()=>{
    setIsinfluencer(false)
  }

  const columnWithApproveButton=[
    ...OrganiserPendingColumn,
    {
      
        name: 'Approve',
        cell: (row) => (
         
          <ApproveAsOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>
  
        ),
        sortable: false,
  
      
    },
    {
      
      name: 'Reject',
      cell: (row) => (
        
        <RejectOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>

      ),
      sortable: false,

    
  }
  ]
  return (


    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
        <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span> Welcome to your admin dashboard</p>
      </div>
      <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }} />
      
      <hr />
      {
        isinfluencer ?(
         <>
         <button onClick={ handleNavigateToOrganiser} style={{marginBottom:'10px',border:'none'}}><span><IoMdArrowBack/></span>Back</button>
         <DataTable
            columns={columnWithButton}
            data={OrganiserData}
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
         </>
          
        ):(
          <>
          <div >
        <div className='superadmin-dashboard-add-organiser-container'>
          <h5>ORGANISER</h5>
          
          {/* <AddOrganiser /> */}
        </div>

      </div>
      <div style={{marginBottom:'10px'}}>
        <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Organisers">Organisers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Request">Pending Request</Nav.Link>
          </Nav.Item>

        </Nav>
        {
          ActiveKey   === 'Organisers' &&(
              <DataTable
            columns={columnWithButton}
            data={organiserData.reverse()}
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

          )
        }
        {
             ActiveKey === 'Request'&&(
              <DataTable
            columns={columnWithApproveButton}
            data={pendingrequest.reverse()}
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

             )
        }

       
      </div>

          </>
        )
      }

      

    </>
  )
}

export default OrganiserComponent



// import React, { useEffect, useState } from 'react'
// import avatar from '../../Assets/img/avatar.jpg'
// import '../../style/SuperAdminDashboard/Organisercomponent.css'
// import DataTable from 'react-data-table-component'
// import { OrganiserColumn, OrganiserData,OrganiserPendingColumn,PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData'
// import AddOrganiser from './OrganiserComponent/AddOrganiser';
// import axiosInstance from '../../config/axios/AxiosConfiguration'
// import Nav from 'react-bootstrap/Nav';
// import { IoMdArrowBack } from "react-icons/io";
// import ApproveAsOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/ApproveAsOrganiser.jsx';
// import RejectOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/RejectOrganiser.jsx'

// function OrganiserComponent() {

//   const [userprofile, SetUserProfile] = useState([])
//   const [organiserData,SetOrganiserData]=useState([])
//   const [ActiveKey, setActiveKey] = useState('Organisers')
//   const [pendingrequest,setPendingrequest]=useState([])
//   const [isinfluencer,setIsinfluencer]=useState(false)
//   const token = localStorage.getItem('admintoken')
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('userapp/admin/dash/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         SetUserProfile(response.data);
//     const organiser= await axiosInstance.get('product/organiser/all/list',{
//       headers:{
//         'Authorization':`Bearer ${token}`
//       }
//     })
//     console.log('all organiser data',organiser.data);
//     SetOrganiserData(organiser.data)

//     const organiserpendingrequest= await axiosInstance.get('userapp/user/upgrdation/request/in/admin',{
//       headers:{
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     console.log('organiserpendingrequest',organiserpendingrequest.data);
//     setPendingrequest(organiserpendingrequest.data)

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [token]);
//   const columnWithButton = [
//     ...OrganiserColumn,
//     {
//       name: 'Edit',
//       cell: (row) => (
//         <button className='btn-success'>Edit</button>

//       ),
//       sortable: false,

//     },
//     {
//       name: 'Delete',
//       cell: (row) => (
//         <button className='btn-danger'>Delete</button>

//       ),
//       sortable: false,
//     },
//     {
      
//       name: 'View Influencer',
//       cell: (row) => (
//         <button className='btn-primary' onClick={handleNavigateToInfluencer}>Influencer</button>

//       ),
//       sortable: false,

    
//   }

//   ]

//   const handleNavigateToInfluencer=()=>{
//     setIsinfluencer(true)
//   }

//   const handleNavigateToOrganiser=()=>{
//     setIsinfluencer(false)
//   }

//   const columnWithApproveButton=[
//     ...OrganiserPendingColumn,
//     {
      
//         name: 'Approve',
//         cell: (row) => (
//           // <button className='btn-success'>Approve</button>
//           <ApproveAsOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>
  
//         ),
//         sortable: false,
  
      
//     },
//     {
      
//       name: 'Reject',
//       cell: (row) => (
//         // <button className='btn-danger'>Reject</button>
//         <RejectOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>

//       ),
//       sortable: false,

    
//   }
//   ]
//   return (


//     <>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
//         <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span> Welcome to your Organisation dashboard</p>
//       </div>
//       <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }} />
      
//       <hr />
//       {
//         isinfluencer ?(
//          <>
//          <button onClick={ handleNavigateToOrganiser} style={{marginBottom:'10px',border:'none'}}><span><IoMdArrowBack/></span>Back</button>
//          <DataTable
//             columns={columnWithButton}
//             data={OrganiserData}
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
//          </>
          
//         ):(
//           <>
//           <div >
//         <div className='superadmin-dashboard-add-organiser-container'>
//           <h5>ORGANISER</h5>
          
//           {/* <AddOrganiser /> */}
//         </div>

//       </div>
//       <div style={{marginBottom:'10px'}}>
//         <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
//           <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Organisers">Organisers</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Request">Pending Request</Nav.Link>
//           </Nav.Item>

//         </Nav>
//         {
//           ActiveKey   === 'Organisers' &&(
//               <DataTable
//             columns={columnWithButton}
//             data={organiserData}
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

//           )
//         }
//         {
//              ActiveKey === 'Request'&&(
//               <DataTable
//             columns={columnWithApproveButton}
//             data={pendingrequest}
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

//              )
//         }

       
//       </div>

//           </>
//         )
//       }

      

//     </>
//   )
// }

// export default OrganiserComponent
