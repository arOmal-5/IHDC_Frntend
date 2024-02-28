import React,{useEffect,useState} from 'react'
import '../../../style/SuperAdminDashboard/Influencercomponent.css'
import avatar from '../../../Assets/img/avatar.jpg'
import AddInfluencer from './AddInfluencer'
import DataTable from 'react-data-table-component'
import {InfluencerColumn,InfluencerData} from '../../../Constant/SuperAdminDashboard/InfluencerData'
import axiosInstance from '../../../config/axios/AxiosConfiguration'

function InfluencerComponent() {
  const [userprofiledata,setUserprofiledata]=useState([])
  const [influencerData,setInfluencerData]=useState([])
  const token=localStorage.getItem('admintoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/admin/dash/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserprofiledata(response.data);

                const influencer=await axiosInstance.get('product/influncers/all/list',{
                  headers:{
                    'Authorization': `Bearer ${token}`
                  }
                })
                // console.log('influencer',influencer.data);
                setInfluencerData(influencer.data)
            } catch (error) {
                // console.log(error);
            }
        };
    
        fetchData();
    }, [token]);
    const columnWithButton=[
        ...InfluencerColumn,
        // {
        //     name: 'Edit',
        //     cell: (row) => (
        //       <button className='btn-success'>Edit</button>

        //     ),
        //     sortable: false, 

        // },
        // {
        //     name: 'Delete',
        //     cell: (row) => (
        //       <button className='btn-danger'>Delete</button>

        //     ),
        //     sortable: false,
        //   },
        
    ]
  return (
    <>
    <div style={{display:'flex',alignItems:'center'}}>
      <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{userprofiledata?.name}</span> Welcome to your admin dashboard</p>
    </div>
    <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
     {/* <div className='admin-dashboard-overview-component-container'>
                <div className='admin-dashboard-overview-component-header-container'>
                    
                    <div>
                        <h3 style={{ color: '#081d29' }}>Hi admin welcome your ihdc dashboard</h3>
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
            <hr />
            <div >
                <div className='superadmin-dashboard-add-organiser-container'>
                    <h5>INFLUENCER</h5>
                    {/* <button className='superadmin-dashboard-add-organiser-add-button'>Add Organiser</button> */}
                    {/* <AddInfluencer/> */}
                    {/* <AddOrganiser/> */}
                </div>

            </div>
            {/* <DataTable
                  columns={columnWithButton}
                  data={InfluencerData}
                  fixedHeader
                  pagination
               /> */}
               <DataTable
            columns={columnWithButton}
            data={influencerData.reverse()}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',  // Set your desired border style and color
                  borderRadius: '8px',       // Optional: Set border radius for a rounded appearance
                  background: '#ffffff',      // Set your desired background color for the entire table
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',  // Set your desired background color for the rows
                },
              },
              header: {
                style: {
                  background: '#333',         // Set your desired background color for the header
                  color: '#fff',              // Set the text color for the header
                },
              },
            }}
          />
    </>
  )
}

export default InfluencerComponent

