import React, { useEffect, useState } from 'react';
import avatar from '../../Assets/img/avatar.jpg';
import '../../style/SuperAdminDashboard/Organisercomponent.css';
import DataTable from 'react-data-table-component';
// import { OrganiserColumn, OrganiserData, OrganiserPendingColumn, PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData';
// import AddOrganiser from './OrganiserComponent/AddOrganiser';
import AddUser from '../../component/SuperAdminComponent/User/AddUser.jsx';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { Nav, Badge } from 'react-bootstrap';
import ApproveUserRequest from '../AdminDashboard/ApproveUserRequest.jsx';
import { FaSearch } from 'react-icons/fa';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Switch from '@mui/material/Switch';
import { RotatingLines } from "react-loader-spinner";
import { FcSearch } from "react-icons/fc";
import {Row,Col} from 'react-bootstrap'


import {
  nonRefferalUSerColounm,
  allusercoloumn,
  nonpurchsedUserColoumn,
  purchasedUserColoumn,
  approvalPendingUserColoumn
} from '../../Constant/SuperAdminDashboard/ListAllUserDetails.jsx';
import InvoiceGenerationForUser from './InvoiceGenerationForUser.jsx';

function ListUserComponent() {
  const [userprofile, SetUserProfile] = useState([]);
  const [ActiveKey, setActiveKey] = useState('All Users');
  const [allRegistredData, setallRegistredData] = useState([]);
  const [nonRefferedUsers, setnonRefferedUsers] = useState([]);
  const [nonpurchasedUsers, setnonpurchasedUsers] = useState([]);
  const [purchasedUsers, setpurchasedUsers] = useState([]);
  const [approvalpendingRequests, setApprovalPendingrequest] = useState([])
  const [pendingUserCount,setPendingUserCount] = useState(0)
  const [triger,setTriger]=useState(Date.now())
  const [selectedTab, setSelectedTab] = useState('all');
  const [checked, setChecked] = useState(false); // Define checked state
  const [loading, setLoading] = useState(false);
  const [searchInput,setSearchInput]=useState('')
  const [filteredData, setFilteredData] = useState([]);
  const[purchasedData,setPurchasedData]=useState([])
  const [pendinApproval,setPendingApproval]=useState([])

  const token = localStorage.getItem('admintoken');

  const [searchAllUsers, setSearchAllUsers] = useState('');
  const [searchPurchasedUsers, setSearchPurchasedUsers] = useState('');
  const [searchNonReferredUsers, setSearchNonReferredUsers] = useState('');
  const [searchNonPurchasedUsers, setSearchNonPurchasedUsers] = useState('');


  const handleInputSearch = () => {
    if (!allRegistredData) {
      return;
    }

    const filteredResults = filteredUsers.filter((user) => {
      return (
        (user?.user?.name &&
          typeof user?.user?.name === 'string' &&
          user?.user?.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (user?.user?.email &&
          typeof user?.user?.email === 'string' &&
          user?.user?.email.toLowerCase().includes(searchInput.toLowerCase())) ||
        (user?.user?.phone &&
          typeof user?.user?.phone === 'string' &&
          user?.user?.phone.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    // console.log('Filtered Results:', filteredResults);
    setFilteredData(filteredResults);
  };


const handleInputSearchPurchasedUser=()=>{
  if (!purchasedUsers) {
    return;
  }
 
  const filteredResults = purchasedUsers.filter((user) => {
    return (
      (user?.user_link.user?.name &&
              typeof user?.user_link.user?.name === 'string' &&
              user?.user_link.user?.name.toLowerCase().includes(searchInput.toLowerCase())) ||
            (user?.user_link?.user?.phone &&
              typeof user?.user_link?.user?.phone === 'string' &&
              user?.user_link?.user?.phone.toLowerCase().includes(searchInput.toLowerCase())) ||
            (user?.user_link?.user?.email &&
              typeof user?.user_link?.user?.email === 'string' &&
              user?.user_link?.user?.email.toLowerCase().includes(searchInput.toLowerCase()))
    );
  });
  setPurchasedData(filteredResults)
  }


const handleInputSearchPendingrequest=()=>{
    
  if (!approvalpendingRequests) {
    return;
  }
  const filteredResults = approvalpendingRequests.filter((user) => {
    return (
      (user?.user?.name &&
              typeof user?.user?.name=== 'string' &&
              user?.user?.name.toLowerCase().includes(searchInput.toLowerCase())) ||
            (user?.user?.phone &&
              typeof user?.user?.phone === 'string' &&
              user?.user?.phone.toLowerCase().includes(searchInput.toLowerCase())) ||
            (user?.user?.email &&
              typeof user?.user?.email === 'string' &&
              user?.user?.email.toLowerCase().includes(searchInput.toLowerCase()))
    );
  });
  setPendingApproval(filteredResults)
  }

useEffect(() => {
    
  handleInputSearchPurchasedUser()
  handleInputSearch();
  handleInputSearchPendingrequest();

}, [searchInput]);
 
  const handleSearch = (tab, value) => {
    // console.log('////////////////////////////////')
    // Update the respective search state based on the active tab
    switch (tab) {
      case 'All Users':
        setSearchAllUsers(value);
        // console.log('All Users////////////////////////////////')

        break;
      case 'Purchased Users':
        setSearchPurchasedUsers(value);
        // console.log('Purchased Users////////////////////////////////')
        break;
      case 'Till to Reffer':
        setSearchNonReferredUsers(value);
        // console.log('Till to Reffer////////////////////////////////')
        break;
      case 'Til To Purchase':
        setSearchNonPurchasedUsers(value);
        break;
      case 'Pending Requests':
        setApprovalPendingrequest(value);
        break;
      default:
        break;
    }
  };



  const getFilteredData = () => {
    // Return the filtered data based on the active tab
    switch (ActiveKey) {
      case 'All Users':
        // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        // console.log('allRegistredData',)
        const re = allRegistredData.filter(user => 
          user.name && user.name.toLowerCase().includes(searchAllUsers.toLowerCase())
        );
        // console.log(re,'ooooppp')
        return re
      case 'Purchased Users':
        return purchasedUsers.filter(user => 
          user.name && user.name.toLowerCase().includes(searchPurchasedUsers.toLowerCase())
        );
      case 'Till to Reffer':
        return nonRefferedUsers.filter(user => 
          user.name && user.name.toLowerCase().includes(searchNonReferredUsers.toLowerCase())
        );
      case 'Til To Purchase':
        return nonpurchasedUsers.filter(user => 
          user.name && user.name.toLowerCase().includes(searchNonPurchasedUsers.toLowerCase())
        );
      default:
        return [];
    }
  };
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('userapp/admin/dash/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        SetUserProfile(response.data);
        setLoading(true)
        const approvalPendingResponse = await axiosInstance.get('userapp/user/approval/pending/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log('approvalPendingResponse',approvalPendingResponse.data)
        const pendingData = approvalPendingResponse.data.filter(item => item.user_approved_by_admin === "Pending");
        setApprovalPendingrequest(pendingData)
        setLoading(false)
        const pendingCount = pendingData.length;
        setPendingUserCount(pendingCount)
        if (ActiveKey === 'Purchased Users') {
          setLoading(true)
          const purchasedUserResponse = await axiosInstance.get('product/payed/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setLoading(false)
          // console.log('all purchasedUserResponse data', purchasedUserResponse.data);
          setpurchasedUsers(purchasedUserResponse.data);
        } else if (ActiveKey === 'All Users') {
          setLoading(true)
          const allUserResponse = await axiosInstance.get('userapp/all/registred/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setLoading(false)
          // console.log('allUserResponse', allUserResponse.data);
          setallRegistredData(allUserResponse.data);
        } else if (ActiveKey === 'Till to Reffer') {
          setLoading(true)
          const nonRefferedUserResponse = await axiosInstance.get('userapp/all/non/reffered/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          // console.log('nonRefferedUserResponse', nonRefferedUserResponse.data);
          setnonRefferedUsers(nonRefferedUserResponse.data);
          setLoading(false)
        } else if (ActiveKey === 'Til To Purchase') {
          setLoading(true)
          const nonPurchasedUSerResponse = await axiosInstance.get('userapp/non/product/purchased/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          // console.log('nonPurchasedUSerResponse', nonPurchasedUSerResponse.data);
          setnonpurchasedUsers(nonPurchasedUSerResponse.data);
          setLoading(false)
        }
        // console.log('allRegistredData:', allRegistredData);
        // console.log('purchasedUsers:', purchasedUsers);
        // console.log('nonRefferedUsers:', nonRefferedUsers);
        // console.log('nonpurchasedUsers:', nonpurchasedUsers);
      } catch (error) {
        setLoading(false)
        // console.log();
      }
    };

    fetchData();
  }, [ActiveKey, triger]);


  const handleApprovalRequestChange = () => { // Define handleChange function
    const nonPurchasedUSerResponse = axiosInstance.patch('userapp/user/approval/after/registration/1',
    {
      default_approval_status : 'Pending'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setChecked((prevChecked) => !prevChecked);
  };

  const purchasedUserColumnButton = [
    ...purchasedUserColoumn,
    {
      
      name: 'Invoice',
      cell: (row) => (
        // <button className='btn-primary' >Influencer</button>
              <InvoiceGenerationForUser transaction_id={row.id} done_invoice_generation_by_admin_to_user = {row.done_invoice_generation_by_admin_to_user} done_invoice_generation_by_user ={row.done_invoice_generation_by_user} userCompletedProfile = {row.user_link?.user_details?.user_profile_completed}  setTriger={setTriger}/>
      ),
      sortable: false,


      
    
  }


  ]

  const approveUserColumnButton=[
    ...approvalPendingUserColoumn,
    {
      
      
        name: 'Approve',
        cell: (row) => (
         
          <ApproveUserRequest user_details_id={row.id} setTriger={setTriger} />
  
        ),
        sortable: false,
  
      
    
    }
  ]
  const filteredUsers = allRegistredData.filter(row => {
    // Assuming `commission_payment_status` is a field in your data
    if (selectedTab === 'Approved') {
        return row.user_details?.user_approved_by_admin === 'Approved';
    } else if (selectedTab === "Rejected") {
        return row.user_details?.user_approved_by_admin === "Rejected";
    } else {
        return true; 
    }
});

  return (
    <>
      <div className='d-flex align-items-center justify-content-between adduser-button'>
        <div>
        <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span>, Welcome to your admin dashboard</p>
        </div>
       
        <div>
         
          <AddUser/>
        </div>   
            


</div>
      <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }}/>
      <hr />
      <div style={{ marginBottom: '10px' }}>
      {/* <FaSearch className="mr-2" />
      <input type="text" name="" id="" placeholder='Search active members'
      value={ActiveKey === 'All Users' ? searchAllUsers :
      ActiveKey === 'Purchased Users' ? searchPurchasedUsers :
      ActiveKey === 'Till to Reffer' ? searchNonReferredUsers :
      ActiveKey === 'Til To Purchase' ? searchNonPurchasedUsers : ''}
    onChange={(e) => handleSearch(ActiveKey, e.target.value)}
      className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" ' />  */}
      {/* <input
        type="text"
        placeholder="Search..."
        value={ActiveKey === 'All Users' ? searchAllUsers :
          ActiveKey === 'Purchased Users' ? searchPurchasedUsers :
          ActiveKey === 'Till to Reffer' ? searchNonReferredUsers :
          ActiveKey === 'Til To Purchase' ? searchNonPurchasedUsers : ''}
        onChange={(e) => handleSearch(ActiveKey, e.target.value)}
      /> */}
        <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="All Users">All Users</Nav.Link>
            {/* {ActiveKey === 'All Users' && (
      <div>
        <ButtonGroup aria-label="Basic example" className='user-dashboard-commission-component-button-group'>
          <Button variant="light" onClick={() => setSelectedTab('All')} active={selectedTab === 'All'}>All  </Button>
          <Button variant="light" onClick={() => setSelectedTab('Approved')} active={selectedTab === 'Approved'}>Approved</Button>
          <Button variant="light" onClick={() => setSelectedTab('Rejected')} active={selectedTab === 'Rejected'}>Rejected</Button>
        </ButtonGroup>
      </div>
    )} */}


          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Purchased Users">Purchased Users</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Till to Reffer"></Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Til To Purchase">Non Members</Nav.Link>
          </Nav.Item>

          <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Pending Requests">
        Pending Requests <Badge variant="danger">{pendingUserCount}</Badge>
      </Nav.Link>
        </Nav>
        
        {ActiveKey === 'All Users' && (
          
          
          <div>
            <Row style={{ display:'flex',justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
    
    <input
      type="text"
      name=""
      id=""
      style={{ width: '100%', maxWidth:'220px', marginLeft:'15px',padding:'5px',borderRadius:'5px',border:'1px solid black' }}
      className='mb-3'
      placeholder='Search user....'
      onChange={(e)=>setSearchInput(e.target.value)}
    />
    <button className='btn-primary mb-3 ml-2' style={{width:'auto',padding:'1px', borderRadius:'5px',color:'white',border:'none', fontSize: '20px' }} onClick={handleInputSearch}>
      {<FcSearch/>}
    </button>
     
    </Row>
          {/* Filtering options */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ButtonGroup aria-label="Basic example" className='user-dashboard-commission-component-button-group mt-4 mb-4'>
  <Button variant="light" onClick={() => setSelectedTab('All')} active={selectedTab === 'All'} style={{ borderColor: '#add8e6' }}>All</Button>
  <Button variant="light" onClick={() => setSelectedTab('Approved')} active={selectedTab === 'Approved'} style={{ borderColor: '#add8e6' }}>Approved</Button>
  <Button variant="light" onClick={() => setSelectedTab('Rejected')} active={selectedTab === 'Rejected'} style={{ borderColor: '#add8e6' }}>Rejected</Button>
  {/* <Button variant="light" onClick={() => setSelectedTab('Rejected')} active={selectedTab === 'Rejected'} style={{ borderColor: '#add8e6' }}>Rejected</Button> */}

</ButtonGroup>
 
{/* <div style={{ display: 'flex', alignItems: 'center' }}>
<span>Auto Approve {checked? 'On' : 'Off'}</span>
  <Switch
    checked={checked}
    onChange={handleApprovalRequestChange}
    inputProps={{ 'aria-label': 'controlled'}}
  />
  
</div> */}
</div>
{/* {
  filteredData.length===0 ?(
    <p className='text-center text-danger'>No user found...</p>
  ):(null)
} */}

         
          {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
          <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                 </div>
      ) : (
          <DataTable
            columns={allusercoloumn}
            data={filteredData.length > 0 ? filteredData.reverse() : filteredUsers.reverse()}
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
          )}
          </div>
          //  </div>
        )}

        {ActiveKey === 'Purchased Users' && (
<>         
<Row style={{ display:'flex',justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
    
    <input
      type="text"
      name=""
      id=""
      style={{ width: '100%', maxWidth:'220px', marginLeft:'15px',padding:'5px',borderRadius:'5px',border:'1px solid black' }}
      className='mb-3'
      placeholder='Search user....'
      onChange={(e)=>setSearchInput(e.target.value)}
    />
    <button className='btn-primary mb-3 ml-2' style={{width:'auto',padding:'1px', borderRadius:'5px',color:'white',border:'none', fontSize: '20px' }} onClick={handleInputSearchPurchasedUser}>
      {<FcSearch/>}
    </button>
    {/*   {
      purchasedData.length===0?(<p className='text-center text-danger'>No user found...</p>):(null)
    } */}
    
  </Row>
          {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                           </div>
      ) : (
          <DataTable
            columns={purchasedUserColumnButton}
            data={purchasedData.length > 0 ? purchasedData.reverse() : purchasedUsers.reverse()}
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
          )}
          </>
        )}
        {ActiveKey === 'Till to Reffer' && (
<>         
          {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                           </div>
      ) : (
          <DataTable
            columns={nonRefferalUSerColounm}
            data={nonRefferedUsers.reverse()}
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
      )}
      </>
        )}
        {ActiveKey === 'Til To Purchase' && (
          // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
         <>
                   {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                           </div>
      ) : (
          <DataTable
            columns={nonpurchsedUserColoumn}
            data={nonpurchasedUsers.reverse()}
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
      )}
      </>
        )}
         {ActiveKey === 'Pending Requests' && (
<>         
<Row style={{ display:'flex',justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
    
    <input
      type="text"
      name=""
      id=""
      style={{ width: '100%', maxWidth:'220px', marginLeft:'15px',padding:'5px',borderRadius:'5px',border:'1px solid black' }}
      className='mb-3'
      placeholder='Search user....'
      onChange={(e)=>setSearchInput(e.target.value)}
    />
    <button className='btn-primary mb-3 ml-2' style={{width:'auto',padding:'1px', borderRadius:'5px',color:'white',border:'none', fontSize: '20px' }} onClick={handleInputSearchPendingrequest}>
      {<FcSearch/>}
    </button>
    
    
  </Row>
{/* {
      pendinApproval.length===0?(<p className='text-center text-danger'>user not found....</p>):(null)
    } */}
          {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: '50vh'}}>
                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                           </div>
      ) : (
          <DataTable
            columns={approveUserColumnButton}
            data={pendinApproval.length > 0 ? pendinApproval.reverse() : approvalpendingRequests.reverse()}
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
      )}
      </>
        )}
      </div>
      
    </>
  );
}

export default ListUserComponent;




















// import React, { useEffect, useState } from 'react';
// import avatar from '../../Assets/img/avatar.jpg';
// import '../../style/SuperAdminDashboard/Organisercomponent.css';
// import DataTable from 'react-data-table-component';
// // import { OrganiserColumn, OrganiserData, OrganiserPendingColumn, PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData';
// // import AddOrganiser from './OrganiserComponent/AddOrganiser';
// import AddUser from '../../component/SuperAdminComponent/User/AddUser.jsx';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { Nav, Badge } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';
// import {
//   nonRefferalUSerColounm,
//   allusercoloumn,
//   nonpurchsedUserColoumn,
//   purchasedUserColoumn,
//   approvalPendingUserColoumn
// } from '../../Constant/SuperAdminDashboard/ListAllUserDetails.jsx';
// import InvoiceGenerationForUser from './InvoiceGenerationForUser.jsx';

// function ListUserComponent() {
//   const [userprofile, SetUserProfile] = useState([]);
//   const [ActiveKey, setActiveKey] = useState('All Users');
//   const [allRegistredData, setallRegistredData] = useState([]);
//   const [nonRefferedUsers, setnonRefferedUsers] = useState([]);
//   const [nonpurchasedUsers, setnonpurchasedUsers] = useState([]);
//   const [purchasedUsers, setpurchasedUsers] = useState([]);
//   const [approvalpendingRequests, setApprovalPendingrequest] = useState([])
//   const [pendingUserCount,setPendingUserCount] = useState(0)

//   const token = localStorage.getItem('admintoken');



//   const [searchAllUsers, setSearchAllUsers] = useState('');
//   const [searchPurchasedUsers, setSearchPurchasedUsers] = useState('');
//   const [searchNonReferredUsers, setSearchNonReferredUsers] = useState('');
//   const [searchNonPurchasedUsers, setSearchNonPurchasedUsers] = useState('');

//   const handleSearch = (tab, value) => {
//     // console.log('////////////////////////////////')
//     // Update the respective search state based on the active tab
//     switch (tab) {
//       case 'All Users':
//         setSearchAllUsers(value);
//         // console.log('All Users////////////////////////////////')

//         break;
//       case 'Purchased Users':
//         setSearchPurchasedUsers(value);
//         // console.log('Purchased Users////////////////////////////////')
//         break;
//       case 'Till to Reffer':
//         setSearchNonReferredUsers(value);
//         // console.log('Till to Reffer////////////////////////////////')
//         break;
//       case 'Til To Purchase':
//         setSearchNonPurchasedUsers(value);
//         break;
//       case 'Pending Requests':
//         setApprovalPendingrequest(value);
//         break;
//       default:
//         break;
//     }
//   };



//   const getFilteredData = () => {
//     // Return the filtered data based on the active tab
//     switch (ActiveKey) {
//       case 'All Users':
//         // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
//         // console.log('allRegistredData',)
//         const re = allRegistredData.filter(user => 
//           user.name && user.name.toLowerCase().includes(searchAllUsers.toLowerCase())
//         );
//         // console.log(re,'ooooppp')
//         return re
//       case 'Purchased Users':
//         return purchasedUsers.filter(user => 
//           user.name && user.name.toLowerCase().includes(searchPurchasedUsers.toLowerCase())
//         );
//       case 'Till to Reffer':
//         return nonRefferedUsers.filter(user => 
//           user.name && user.name.toLowerCase().includes(searchNonReferredUsers.toLowerCase())
//         );
//       case 'Til To Purchase':
//         return nonpurchasedUsers.filter(user => 
//           user.name && user.name.toLowerCase().includes(searchNonPurchasedUsers.toLowerCase())
//         );
//       default:
//         return [];
//     }
//   };
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('userapp/admin/dash/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         SetUserProfile(response.data);
//         const approvalPendingResponse = await axiosInstance.get('userapp/user/approval/pending/list', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log('approvalPendingResponse',approvalPendingResponse.data)
//         const pendingData = approvalPendingResponse.data.filter(item => item.user_approved_by_admin === "Pending");
//         setApprovalPendingrequest(pendingData)
//         const pendingCount = pendingData.length;
//         setPendingUserCount(pendingCount)
//         if (ActiveKey === 'Purchased Users') {
//           const purchasedUserResponse = await axiosInstance.get('product/payed/users', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           // console.log('all purchasedUserResponse data', purchasedUserResponse.data);
//           setpurchasedUsers(purchasedUserResponse.data);
//         } else if (ActiveKey === 'All Users') {
//           const allUserResponse = await axiosInstance.get('userapp/all/registred/users/in/admin', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           // console.log('allUserResponse', allUserResponse.data);
//           setallRegistredData(allUserResponse.data);
//         } else if (ActiveKey === 'Till to Reffer') {
//           const nonRefferedUserResponse = await axiosInstance.get('userapp/all/non/reffered/users/in/admin', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           // console.log('nonRefferedUserResponse', nonRefferedUserResponse.data);
//           setnonRefferedUsers(nonRefferedUserResponse.data);
//         } else if (ActiveKey === 'Til To Purchase') {
//           const nonPurchasedUSerResponse = await axiosInstance.get('userapp/non/product/purchased/users/in/admin', {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           // console.log('nonPurchasedUSerResponse', nonPurchasedUSerResponse.data);
//           setnonpurchasedUsers(nonPurchasedUSerResponse.data);
//         }
//         // console.log('allRegistredData:', allRegistredData);
//         // console.log('purchasedUsers:', purchasedUsers);
//         // console.log('nonRefferedUsers:', nonRefferedUsers);
//         // console.log('nonpurchasedUsers:', nonpurchasedUsers);
//       } catch (error) {
//         console.log();
//       }
//     };

//     fetchData();
//   }, [ActiveKey, token]);

//   const purchasedUserColumnButton = [
//     ...purchasedUserColoumn,
//     {
      
//       name: 'Invoice',
//       cell: (row) => (
//         // <button className='btn-primary' >Influencer</button>
//               <InvoiceGenerationForUser transaction_id={row.id} done_invoice_generation_by_admin_to_user = {row.done_invoice_generation_by_admin_to_user} userCompletedProfile = {row.user_link?.user_details?.user_profile_completed}/>
//       ),
//       sortable: false,

    
//   }

//   ]

//   return (
//     <>
//       <div className='d-flex align-items-center justify-content-between adduser-button'>
//         <div>
//         <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span>, Welcome to your admin dashboard</p>
//         </div>
       
//         <div>
         
//           <AddUser/>
//         </div>   
            


// </div>
//       <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }}/>
//       <hr />
//       <div style={{ marginBottom: '10px' }}>
//       {/* <FaSearch className="mr-2" />
//       <input type="text" name="" id="" placeholder='Search active members'
//       value={ActiveKey === 'All Users' ? searchAllUsers :
//       ActiveKey === 'Purchased Users' ? searchPurchasedUsers :
//       ActiveKey === 'Till to Reffer' ? searchNonReferredUsers :
//       ActiveKey === 'Til To Purchase' ? searchNonPurchasedUsers : ''}
//     onChange={(e) => handleSearch(ActiveKey, e.target.value)}
//       className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" ' />  */}
//       {/* <input
//         type="text"
//         placeholder="Search..."
//         value={ActiveKey === 'All Users' ? searchAllUsers :
//           ActiveKey === 'Purchased Users' ? searchPurchasedUsers :
//           ActiveKey === 'Till to Reffer' ? searchNonReferredUsers :
//           ActiveKey === 'Til To Purchase' ? searchNonPurchasedUsers : ''}
//         onChange={(e) => handleSearch(ActiveKey, e.target.value)}
//       /> */}
//         <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
//           <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="All Users">All Users</Nav.Link>
            
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Purchased Users">Purchased Users</Nav.Link>
//           </Nav.Item>
//           {/* <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Till to Reffer"></Nav.Link>
//           </Nav.Item> */}
//           <Nav.Item>
//             <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Til To Purchase">Non Members</Nav.Link>
//           </Nav.Item>

//           <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Pending Requests">
//         Pending Requests <Badge variant="danger">{pendingUserCount}</Badge>
//       </Nav.Link>
//         </Nav>
        
//         {ActiveKey === 'All Users' && (
//           <DataTable
//             columns={allusercoloumn}
//             data={allRegistredData.reverse()}
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
//         )}
//         {ActiveKey === 'Purchased Users' && (
//           <DataTable
//             columns={purchasedUserColumnButton}
//             data={purchasedUsers.reverse()}
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
//         )}
//         {ActiveKey === 'Till to Reffer' && (
//           <DataTable
//             columns={nonRefferalUSerColounm}
//             data={nonRefferedUsers.reverse()}
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
//         )}
//         {ActiveKey === 'Til To Purchase' && (
          
//           <DataTable
//             columns={nonpurchsedUserColoumn}
//             data={nonpurchasedUsers.reverse()}
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
//         )}
//          {ActiveKey === 'Pending Requests' && (
          
//           <DataTable
//             columns={approvalPendingUserColoumn}
//             data={approvalpendingRequests.reverse()}
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
//         )}
//       </div>
      
//     </>
//   );
// }

// export default ListUserComponent;





