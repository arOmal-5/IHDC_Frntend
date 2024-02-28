import React, { useState } from 'react'
// import '../../style/adminDashboard/OverviewComponent.css'
import '../../style/SuperAdminDashboard/SuperAdminOverviewComponent.css'
import avatar from '../../Assets/img/avatar.jpg'
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { CiCreditCard2 } from "react-icons/ci";
// import { FcSalesPerformance } from "react-icons/fc";
import { GoGraph } from "react-icons/go";
import { RiExchangeFundsFill } from "react-icons/ri";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { useEffect } from 'react'
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx'
import { RotatingLines } from 'react-loader-spinner';

function OverViewComponent() {

    const [userprofile,setUserprofile]=useState([])
    const [netCommission , setNetCommission] = useState(0)
    const [grossSale , setGrossSale] = useState(0)
    const [totalClicks , setTotalClicks] = useState(0)
    const [transactioncount,setTransactioncount]=useState(0)
    const [loading, setLoading] = useState(true)

    const token=localStorage.getItem('admintoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/admin/dash/details', {
                    headers: {
                         'Authorization': `Bearer ${token}`
                    }
                });
                setUserprofile(response.data);
                // console.log(response.data)
               const responsetransactioncount= await axiosInstance.get('product/overall/transaction/count',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
               }) 
            //    console.log('responsetransactioncount',responsetransactioncount.data.message);
               setTransactioncount(responsetransactioncount.data.message)
               


               const overViewDetailsResponse = await axiosInstance.get('product/overview/overall/details/admin', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              setTransactioncount(overViewDetailsResponse.data.transaction_count)
              setGrossSale(overViewDetailsResponse.data.total_gross_sale)
            setNetCommission(overViewDetailsResponse.data.total_commission)
            setTotalClicks(overViewDetailsResponse.data.clicks)
            setLoading(false)
            // setproductEPC(overViewDetailsResponse.data.e_p_c)
            // setproductConvertionrate(overViewDetailsResponse.data.converstion_rate)
            // setproductAverageOrderValue(overViewDetailsResponse.data.avg_order_value)



               
            } catch (error) {
                // console.log(error);
            } 
        };
    
        fetchData();
    }, [token]);
    return (
        <>
        <div style={{display:'flex',alignItems:'center'}}>
      <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{userprofile?.name} </span>  Welcome to your admin dashboard</p>
    </div>
    <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
            <div className='admin-dashboard-overview-component-container'>
                <div className='admin-dashboard-overview-component-header-container'>
                    <div >
                        
                        <h3 style={{ color: '#081d29' }}>Affliate Dashboard</h3>

                    </div>
                    {/* <div>
                    <select name="" id="" className='admin-dashboard-overview-component-dropdown-list'>
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
                        
                    </div> */}
                    {/* <div>

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
                    </div> */}
                </div>

            </div>
            <hr />
            <div className='admin-dashboard-overview-component-dashboardactivity'>
                <div className='admin-dashboard-overview-component-netcommission-container'>
                    <div className='admin-dashboard-overview-component-netcommission'>
                        <div>
                        {loading ? (
                            // Show loader while data is being fetched
                            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                        ) : (
                            // Render netCommission when data fetching is complete
                            <h3 style={{color:'#6da8ba'}}><span> ₹</span>{netCommission}</h3>

                        )}
                        </div>

                        <div>

                            <h4 style={{color:'#6da8ba'}}> ₹</h4>
                        </div>


                    </div>
                    <div>
                        <h6>Net Commission</h6>
                    </div>
                </div>
                <div>
                    <div className='admin-dashboard-overview-component-netcommission-container'>
                        <div className='admin-dashboard-overview-component-netcommission'>
                            <div>
                            {loading ? (
                        // Show loader while data is being fetched
                        <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                    ) : (
                        // Render netCommission when data fetching is complete
                        <h3 style={{color:'#6da8ba'}}><span><GiClick /></span>{totalClicks}</h3>

           
           )}
                            </div>

                            <div>

                                <h4 style={{color:'#6da8ba'}}><GiClick /></h4>
                            </div>


                        </div>
                        <div>
                            <h6>Clicks</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='admin-dashboard-overview-component-netcommission-container'>
                        <div className='admin-dashboard-overview-component-netcommission'>
                            <div>
                            {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <h3 style={{color:'#6da8ba'}}><span><CiCreditCard2 /></span>{transactioncount}</h3>

          )}
                            </div>

                            <div>

                                <h4 style={{color:'#6da8ba'}}><CiCreditCard2 /></h4>
                            </div>


                        </div>
                        <div>
                            <h6>Transactions</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='admin-dashboard-overview-component-netcommission-container'>
                        <div className='admin-dashboard-overview-component-netcommission'>
                            <div>
                            {loading ? (
                                    // Show loader while data is being fetched
                                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                                ) : (
                                    // Render netCommission when data fetching is complete
                                    <h3 style={{color:'#6da8ba'}}><span><GoGraph /></span>{grossSale}</h3>

                                )}
                            </div>

                            <div>

                                <h4 style={{color:'#6da8ba'}}><GoGraph /></h4>
                            </div>


                        </div>
                        <div>
                            <h6>Gross Sale</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='admin-dashboard-overview-component-netcommission-container'>
                        <div className='admin-dashboard-overview-component-netcommission'>
                            <div>
                            {loading ? (
                                // Show loader while data is being fetched
                                <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                            ) : (
                                // Render netCommission when data fetching is complete
                                <h3 style={{color:'#6da8ba'}}><span><RiExchangeFundsFill /></span>0</h3>


)}
                            </div>

                            <div>

                                <h4 style={{color:'#6da8ba'}}><RiExchangeFundsFill /></h4>
                            </div>


                        </div>
                        <div>
                            <h6>Refunds</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='admin-dashboard-overview-component-netcommission-container'>
                        <div className='admin-dashboard-overview-component-netcommission'>
                            <div>
                                                    {loading ? (
                                    // Show loader while data is being fetched
                                    <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
                                ) : (
                                    // Render netCommission when data fetching is complete
                                    <h3 style={{color:'#6da8ba'}}><span><HiOutlineReceiptRefund /></span>0</h3>

                                )}
                            </div>

                            <div>

                                <h4 style={{color:'#6da8ba'}}><HiOutlineReceiptRefund /></h4>
                            </div>


                        </div>
                        <div>
                            <h6>Refund amt</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverViewComponent

