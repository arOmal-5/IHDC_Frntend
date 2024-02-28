import React,{useEffect,useState, useContext} from 'react'
import '../../style/adminDashboard/CommissionHistory.css'
import DataTable from 'react-data-table-component'
import avatar from '../../Assets/img/avatar.jpg'
import { CommissionctColumn, paymentColumn } from '../../Constant/AdminDashboard/CommissionData';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import ProfileStatusChart from '../../component/AdminDashboard/ProfileStatusChart';
import MyContext from '../../store/MyContext';
import UserGenerateInvoice from '../../component/AdminDashboard/UserGenerateInvoice';

function CommissionHistoryComponent() {
  const [userprofiledatas,setUserprofiledatas]=useState([])
  const [paymentDetails,setpaymentDetails]=useState([])
  const [commissionDetails,setcommissionDetails] = useState([])
  const [selectedTab, setSelectedTab] = useState('payments');
  const{profilePercentage,setProfilePercentage}=useContext(MyContext)
  const [triger,setTriger]=useState(Date.now())




  const token=localStorage.getItem('usertoken')
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
    //                 headers: {
    //                     'Authorization': Bearer ${token}
    //                 }
    //             });
    //             setUserprofiledatas(response.data);
    //             const paymentResponse = await axiosInstance.get('userapp/user/payment/details', {
    //               headers: {
    //                   'Authorization': Bearer ${token}
    //               }
    //           });
    //           console.log(paymentResponse.data, '9999999999999999999999999999999999')
    //           setpaymentDetails(paymentResponse.data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    
    //     fetchData();
    // }, [token]);

    const columns = selectedTab === 'payments' ? paymentColumn : CommissionctColumn;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserprofiledatas(response.data);
                // const paymentResponse = await axiosInstance.get('userapp/single/user/payment/details/at/user/dash', {
                  const paymentResponse = await axiosInstance.get('userapp/user/payment/details', {

                headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              // console.log('ggggggggggg',paymentResponse.data, )
              setpaymentDetails(paymentResponse.data)
              const commissionResponse = await axiosInstance.get('userapp/all/commission/details/user/dash', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(commissionResponse.data, '9999999999999999999999999999999999')
            setcommissionDetails(commissionResponse.data)
            } catch (error) {
                // console.log(error);
            }
        };
    
        fetchData();
    }, [triger]);




    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filterStartDate, setFilterStartDate] = useState('');

    const handleFilterChange = (e) => {
      const selectedValue=e.target.value
      
      setSelectedFilter(selectedValue);

      if (selectedValue === 'today') {
        setFilterStartDate(new Date().toISOString().split('T')[0]);
      }else if (selectedValue === 'yesterday'){
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setFilterStartDate(yesterday.toISOString().split('T')[0]);
      }else if (selectedValue === 'last week') {
        
        const currentDate = new Date();
        const lastWeekStartDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        setFilterStartDate(lastWeekStartDate.toISOString().split('T')[0]);
      }else if (selectedValue === 'last month') {
        
        const currentDate = new Date();
        const lastMonthStartDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        setFilterStartDate(lastMonthStartDate.toISOString().split('T')[0]);
    } else if (selectedValue === 'last 3 month') {
      // Set to the start date of 3 months ago
      const currentDate = new Date();
      const last3MonthsStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        1
      );
      setFilterStartDate(last3MonthsStartDate.toISOString().split('T')[0]);
    } else if (selectedValue === 'last 6 month') {
      // Set to the start date of 6 months ago
      const currentDate = new Date();
      const last6MonthsStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 6,
        1
      );
      setFilterStartDate(last6MonthsStartDate.toISOString().split('T')[0]);
    } else if (selectedValue === 'last year') {
      // Set to the start date of last year
      const currentDate = new Date();
      const lastYearStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
      setFilterStartDate(lastYearStartDate.toISOString().split('T')[0]);
    }
  }

  const paymentColumnWithInvoiceButton = [
    ...paymentColumn,
    {
      
      name: 'Invoice',
      cell: (row) => (
        // <button className='btn-primary' >Influencer</button>
              <UserGenerateInvoice transaction_id={row.id} done_invoice_generation_by_admin_to_user= {row.done_invoice_generation_by_admin_to_user} done_invoice_generation_by_user = {row.done_invoice_generation_by_user} setTriger={setTriger}/>
      ),
      sortable: false,
  }

  ]

  const getFilteredData = () => {
    if (selectedFilter === 'today') {
     
     
      const todayPayments = paymentDetails.filter((payment) => {
        
        const currentDate = new Date().toISOString().split('T')[0];

     
        return payment.payment_done_at.split('T')[0] === currentDate;
      });
      return todayPayments;
    } else if (selectedFilter === 'yesterday') {
      // Example: Filter payments for yesterday
      const yesterdayPayments = paymentDetails.filter((payment) => {
        // Get yesterday's date in YYYY-MM-DD format
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0];

        // Assuming payment.payment_done_at is the date of the payment in the same format
        return payment.payment_done_at.split('T')[0] === yesterdayDate;
      });
      return yesterdayPayments;
    }else if (selectedFilter === 'all') {
      
      return paymentDetails;
    }
    return [];
  };

  const getCommission = () => {
    if (selectedFilter === 'today') {
      const todayPayments = commissionDetails.filter((payment) => {
        if (payment && payment.commission_credited_on) {
          const currentDate = new Date().toISOString().split('T')[0];
          return payment.commission_credited_on.split('T')[0] === currentDate;
        }
        return false; 
      });
      return todayPayments;
    }else if (selectedFilter === 'all') {
      
      return commissionDetails;
    }else if (selectedFilter === 'yesterday') {
      
      const yesterdayPayments = commissionDetails.filter((payment) => {
        
        if (payment && payment.payment_done_at) {
          
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayDate = yesterday.toISOString().split('T')[0];
    
          
          return payment.payment_done_at.split('T')[0] === yesterdayDate;
        }
        return false; 
      });
      return yesterdayPayments;
    }
    return []; 
  };

  const filteredData = getFilteredData();

  const filterCommission=getCommission()


    return (
      <>
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
          <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofiledatas?.user?.name}</span>, Here is a historical list of your transactions.
           <br /> Your commission will be credited on every 30th date of the month</p>
        </div> */}
        <div className='d-flex align-items-center justify-content-between'>
    <div style={{display:'flex',alignItems:'center'}}>
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{userprofiledatas?.user?.name}</span>, Here is a historical list of your transactions.
      <br /> Your commission will be credited on every 30th date of the month</p>
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
        <hr style={{ width: '100%', backgroundColor: 'black', border: '1px' }} />
        <div className='user-dashboard-commission-component-container'>
          <div className='user-dashboard-commission-component-header-container'>
          {/* <div>
              <select name="" id="" value={selectedFilter} onChange={handleFilterChange} className='user-dashboard-overview-component-dropdown-list'>
              <option value="all">All</option> 
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last week">Last week</option>
              <option value="last month">Last month</option>
              <option value="last 3 month">Last 3 month</option>
              <option value="last 6 month">Last 6 month</option>
              <option value="last year">Last year</option>
              </select>
            </div> */}
            <div>
              <ButtonGroup aria-label="Basic example" className='user-dashboard-commission-component-button-group'>
                <Button variant="light" onClick={() => setSelectedTab('payments')} active={selectedTab === 'payments'}>Your Payments</Button>
                <Button variant="light" onClick={() => setSelectedTab('commissions')} active={selectedTab === 'commissions'}>Commissions</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <hr />
        <div className='user-dashboard-product-component-table-container'>
          <div className='user-dashboard-product-component-table-sub-container'>
            {selectedTab === 'payments' && (
              <DataTable
                columns={paymentColumnWithInvoiceButton}
                data={filteredData}
                fixedHeader
                pagination
                customStyles={{
                  table: {
                    style: {
                      border: '1px solid #ccc',
                      borderRadius: '8px',
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
            {selectedTab === 'commissions' && (
              <DataTable
                columns={CommissionctColumn}
                data={filterCommission}
                fixedHeader
                pagination
                customStyles={{
                  table: {
                    style: {
                      border: '1px solid #ccc',
                      borderRadius: '8px',
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
        </div>
      </>
    );
}

export default CommissionHistoryComponent



















// import React,{useEffect,useState, useContext} from 'react'
// import '../../style/adminDashboard/CommissionHistory.css'
// import DataTable from 'react-data-table-component'
// import avatar from '../../Assets/img/avatar.jpg'
// import { CommissionctColumn, paymentColumn } from '../../Constant/AdminDashboard/CommissionData';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import ProfileStatusChart from '../../component/AdminDashboard/ProfileStatusChart';
// import MyContext from '../../store/MyContext';
// import UserGenerateInvoice from '../../component/AdminDashboard/UserGenerateInvoice';

// function CommissionHistoryComponent() {
//   const [userprofiledatas,setUserprofiledatas]=useState([])
//   const [paymentDetails,setpaymentDetails]=useState([])
//   const [commissionDetails,setcommissionDetails] = useState([])
//   const [selectedTab, setSelectedTab] = useState('payments');
//   const{profilePercentage,setProfilePercentage}=useContext(MyContext)




//   const token=localStorage.getItem('usertoken')
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//     //                 headers: {
//     //                     'Authorization': `Bearer ${token}`
//     //                 }
//     //             });
//     //             setUserprofiledatas(response.data);
//     //             const paymentResponse = await axiosInstance.get('userapp/user/payment/details', {
//     //               headers: {
//     //                   'Authorization': `Bearer ${token}`
//     //               }
//     //           });
//     //           console.log(paymentResponse.data, '9999999999999999999999999999999999')
//     //           setpaymentDetails(paymentResponse.data)
//     //         } catch (error) {
//     //             console.log(error);
//     //         }
//     //     };
    
//     //     fetchData();
//     // }, [token]);

//     const columns = selectedTab === 'payments' ? paymentColumn : CommissionctColumn;


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 setUserprofiledatas(response.data);
//                 // const paymentResponse = await axiosInstance.get('userapp/single/user/payment/details/at/user/dash', {
//                   const paymentResponse = await axiosInstance.get('userapp/user/payment/details', {

//                 headers: {
//                       'Authorization': `Bearer ${token}`
//                   }
//               });
//               // console.log('ggggggggggg',paymentResponse.data, )
//               setpaymentDetails(paymentResponse.data)
//               const commissionResponse = await axiosInstance.get('userapp/all/commission/details/user/dash', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             // console.log(commissionResponse.data, '9999999999999999999999999999999999')
//             setcommissionDetails(commissionResponse.data)
//             } catch (error) {
//                 // console.log(error);
//             }
//         };
    
//         fetchData();
//     }, [token]);


//     const [selectedFilter, setSelectedFilter] = useState('all');
//     const [filterStartDate, setFilterStartDate] = useState('');

//     const handleFilterChange = (e) => {
//       const selectedValue=e.target.value
      
//       setSelectedFilter(selectedValue);

//       if (selectedValue === 'today') {
//         setFilterStartDate(new Date().toISOString().split('T')[0]);
//       }else if (selectedValue === 'yesterday'){
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         setFilterStartDate(yesterday.toISOString().split('T')[0]);
//       }else if (selectedValue === 'last week') {
        
//         const currentDate = new Date();
//         const lastWeekStartDate = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() - 7
//         );
//         setFilterStartDate(lastWeekStartDate.toISOString().split('T')[0]);
//       }else if (selectedValue === 'last month') {
        
//         const currentDate = new Date();
//         const lastMonthStartDate = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth() - 1,
//           1
//         );
//         setFilterStartDate(lastMonthStartDate.toISOString().split('T')[0]);
//     } else if (selectedValue === 'last 3 month') {
//       // Set to the start date of 3 months ago
//       const currentDate = new Date();
//       const last3MonthsStartDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() - 3,
//         1
//       );
//       setFilterStartDate(last3MonthsStartDate.toISOString().split('T')[0]);
//     } else if (selectedValue === 'last 6 month') {
//       // Set to the start date of 6 months ago
//       const currentDate = new Date();
//       const last6MonthsStartDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() - 6,
//         1
//       );
//       setFilterStartDate(last6MonthsStartDate.toISOString().split('T')[0]);
//     } else if (selectedValue === 'last year') {
//       // Set to the start date of last year
//       const currentDate = new Date();
//       const lastYearStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
//       setFilterStartDate(lastYearStartDate.toISOString().split('T')[0]);
//     }
//   }

//   const paymentColumnWithInvoiceButton = [
//     ...paymentColumn,
//     {
      
//       name: 'Invoice',
//       cell: (row) => (
//         // <button className='btn-primary' >Influencer</button>
//               <UserGenerateInvoice transaction_id={row.id} done_invoice_generation_by_user = {row.done_invoice_generation_by_user}/>
//       ),
//       sortable: false,

    
//   }

//   ]

//   const getFilteredData = () => {
//     if (selectedFilter === 'today') {
     
     
//       const todayPayments = paymentDetails.filter((payment) => {
        
//         const currentDate = new Date().toISOString().split('T')[0];

     
//         return payment.payment_done_at.split('T')[0] === currentDate;
//       });
//       return todayPayments;
//     } else if (selectedFilter === 'yesterday') {
//       // Example: Filter payments for yesterday
//       const yesterdayPayments = paymentDetails.filter((payment) => {
//         // Get yesterday's date in YYYY-MM-DD format
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const yesterdayDate = yesterday.toISOString().split('T')[0];

//         // Assuming payment.payment_done_at is the date of the payment in the same format
//         return payment.payment_done_at.split('T')[0] === yesterdayDate;
//       });
//       return yesterdayPayments;
//     }else if (selectedFilter === 'all') {
      
//       return paymentDetails;
//     }
//     return [];
//   };

//   const getCommission = () => {
//     if (selectedFilter === 'today') {
//       const todayPayments = commissionDetails.filter((payment) => {
//         if (payment && payment.commission_credited_on) {
//           const currentDate = new Date().toISOString().split('T')[0];
//           return payment.commission_credited_on.split('T')[0] === currentDate;
//         }
//         return false; 
//       });
//       return todayPayments;
//     }else if (selectedFilter === 'all') {
      
//       return commissionDetails;
//     }else if (selectedFilter === 'yesterday') {
      
//       const yesterdayPayments = commissionDetails.filter((payment) => {
        
//         if (payment && payment.payment_done_at) {
          
//           const yesterday = new Date();
//           yesterday.setDate(yesterday.getDate() - 1);
//           const yesterdayDate = yesterday.toISOString().split('T')[0];
    
          
//           return payment.payment_done_at.split('T')[0] === yesterdayDate;
//         }
//         return false; 
//       });
//       return yesterdayPayments;
//     }
//     return []; 
//   };

//   const filteredData = getFilteredData();

//   const filterCommission=getCommission()


//     return (
//       <>
//         {/* <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
//           <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofiledatas?.user?.name}</span>, Here is a historical list of your transactions.
//            <br /> Your commission will be credited on every 30th date of the month</p>
//         </div> */}
//         <div className='d-flex align-items-center justify-content-between'>
//     <div style={{display:'flex',alignItems:'center'}}>
//       <p>Hi <span style={{color:'black',fontWeight:'700'}}>{userprofiledatas?.user?.name}</span>, Here is a historical list of your transactions.
//       <br /> Your commission will be credited on every 30th date of the month</p>
//     </div>
//     <div>
//     {/* <ProfileStatusChart /> */}
//     {
//         profilePercentage<100 ?(
// <ProfileStatusChart/>
//         ):(
//           null
//         )
//       }
//     </div>
// </div>
//         <hr style={{ width: '100%', backgroundColor: 'black', border: '1px' }} />
//         <div className='user-dashboard-commission-component-container'>
//           <div className='user-dashboard-commission-component-header-container'>
//           {/* <div>
//               <select name="" id="" value={selectedFilter} onChange={handleFilterChange} className='user-dashboard-overview-component-dropdown-list'>
//               <option value="all">All</option> 
//               <option value="today">Today</option>
//               <option value="yesterday">Yesterday</option>
//               <option value="last week">Last week</option>
//               <option value="last month">Last month</option>
//               <option value="last 3 month">Last 3 month</option>
//               <option value="last 6 month">Last 6 month</option>
//               <option value="last year">Last year</option>
//               </select>
//             </div> */}
//             <div>
//               <ButtonGroup aria-label="Basic example" className='user-dashboard-commission-component-button-group'>
//                 <Button variant="light" onClick={() => setSelectedTab('payments')} active={selectedTab === 'payments'}>Your Payments</Button>
//                 <Button variant="light" onClick={() => setSelectedTab('commissions')} active={selectedTab === 'commissions'}>Commissions</Button>
//               </ButtonGroup>
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div className='user-dashboard-product-component-table-container'>
//           <div className='user-dashboard-product-component-table-sub-container'>
//             {selectedTab === 'payments' && (
//               <DataTable
//                 columns={paymentColumnWithInvoiceButton}
//                 data={filteredData}
//                 fixedHeader
//                 pagination
//                 customStyles={{
//                   table: {
//                     style: {
//                       border: '1px solid #ccc',
//                       borderRadius: '8px',
//                       background: '#ffffff',
//                     },
//                   },
//                   rows: {
//                     style: {
//                       backgroundColor: '#f9f9f9',
//                     },
//                   },
//                   header: {
//                     style: {
//                       background: '#333',
//                       color: '#fff',
//                     },
//                   },
//                 }}
//               />
//             )}
//             {selectedTab === 'commissions' && (
//               <DataTable
//                 columns={CommissionctColumn}
//                 data={filterCommission}
//                 fixedHeader
//                 pagination
//                 customStyles={{
//                   table: {
//                     style: {
//                       border: '1px solid #ccc',
//                       borderRadius: '8px',
//                       background: '#ffffff',
//                     },
//                   },
//                   rows: {
//                     style: {
//                       backgroundColor: '#f9f9f9',
//                     },
//                   },
//                   header: {
//                     style: {
//                       background: '#333',
//                       color: '#fff',
//                     },
//                   },
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </>
//     );
// }

// export default CommissionHistoryComponent
