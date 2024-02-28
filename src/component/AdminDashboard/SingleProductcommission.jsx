import React,{useEffect,useState} from 'react'
import '../../style/adminDashboard/CommissionHistory.css'
import DataTable from 'react-data-table-component'
import avatar from '../../Assets/img/avatar.jpg'
import { CommissionctColumn, paymentColumn, CommissionctColumnofsingleProduct } from '../../Constant/AdminDashboard/CommissionData';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axiosInstance from '../../config/axios/AxiosConfiguration';

function SingleProductcommission({productId}) {
  const [userprofiledatas,setUserprofiledatas]=useState([])
//   const [paymentDetails,setpaymentDetails]=useState([])
  const [commissionDetails,setcommissionDetails] = useState([])
//   const [selectedTab, setSelectedTab] = useState('payments');




  const token=localStorage.getItem('usertoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserprofiledatas(response.data);
                const commissionResponse = await axiosInstance.get(`userapp/all/commission/details/per/product/user/dash/${productId}`, {
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
    }, [token]);

    // const columns = selectedTab === 'payments' ? paymentColumn : CommissionctColumn;


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             setUserprofiledatas(response.data);
    //             const paymentResponse = await axiosInstance.get('userapp/user/payment/details', {
    //               headers: {
    //                   'Authorization': `Bearer ${token}`
    //               }
    //           });
    //           console.log(paymentResponse.data, '')
    //           setpaymentDetails(paymentResponse.data)
    //           const commissionResponse = await axiosInstance.get('userapp/all/commission/details/user/dash', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         console.log(commissionResponse.data, '9999999999999999999999999999999999')
    //         setcommissionDetails(commissionResponse.data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    
    //     fetchData();
    // }, [token]);

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" /> */}
          <p> Here is a historical list of your Commissions. <br /> Your commission will be credited on every 30th date of the month</p>
          
        </div>
        <hr style={{ width: '100%', backgroundColor: 'black', border: '1px' }} />
        <div className='user-dashboard-commission-component-container'>
          <div className='user-dashboard-commission-component-header-container'>
            <div>
              <select name="" id="" className='user-dashboard-overview-component-dropdown-list'>
              <option value="">Today</option>
              <option value="">Yesterday</option>
              <option value="">Week to date</option>
              <option value="">Last week</option>
              <option value="">Month to date</option>
              <option value="">Last month</option>
              <option value="">Last 3 month</option>
              <option value="">Last 6 month</option>
              <option value="">Year to date</option>
              <option value="">Last year</option>
              <option value="">All time</option>
              <option value="">Custom range</option>
              </select>
            </div>
            <div>
              <ButtonGroup aria-label="Basic example" className='user-dashboard-commission-component-button-group'>
                {/* <Button variant="light" onClick={() => setSelectedTab('payments')} active={selectedTab === 'payments'}>Payments</Button>
                <Button variant="light" onClick={() => setSelectedTab('commissions')} active={selectedTab === 'commissions'}>Commissions</Button> */}
              </ButtonGroup>
            </div>
          </div>
        </div>
        <hr />
        <div className='user-dashboard-product-component-table-container'>
          <div className='user-dashboard-product-component-table-sub-container'>
            {/* {selectedTab === 'payments' && (
              <DataTable
                columns={paymentColumn}
                data={paymentDetails}
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
            )} */}
            {/* {selectedTab === 'commissions' && ( */}
              <DataTable
                columns={CommissionctColumnofsingleProduct}
                data={commissionDetails}
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
            {/* )} */}
          </div>
        </div>
      </>
    );
}

export default SingleProductcommission
