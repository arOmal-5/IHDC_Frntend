import React,{useEffect,useState} from 'react'
import avatar from '../../../Assets/img/avatar.jpg'
import axiosInstance from '../../../config/axios/AxiosConfiguration'
import DataTable from 'react-data-table-component'
import {subscribe,subscribeData} from '../../../Constant/SuperAdminDashboard/subscribeData'

function SubscribeComponent() {
    const [userprofiledatas,setUserprofiledatas]=useState([])
//     const token=localStorage.getItem('admintoken');
//     useEffect(()=>{
//         const fetchData= async()=>{
//             try {
//                 const response=await axiosInstance.get('payed/users',{

//                 })
//             } catch (error) {
                
//             }

//         }
// fetchData()
//     },[])
  const [productId,setProductId]=useState('')
  const [paidsubscribe,setPaidsubscribe]=useState([])
  const token=localStorage.getItem('admintoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('userapp/admin/dash/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserprofiledatas(response.data);
                const suscribers=await axiosInstance.get('product/payed/users',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('suscribers',suscribers.data);
                setPaidsubscribe(suscribers.data)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [token]);
  return (
    <>
    <div style={{display:'flex',alignItems:'center'}}>
      <img src={avatar} style={{width:'50px',height:'50px', borderRadius:'50%'}} alt="" />
      <p>Hi <span style={{color:'black',fontWeight:'700'}}>{userprofiledatas?.name}</span> Welcome to your Influencer dashboard</p>
    </div>
    <hr style={{width:'100%',backgroundColor:'black',boder:'1px'}}/>
    <div>
    <DataTable
    title="Subscribed Users"
            columns={subscribe}
            data={paidsubscribe.reverse()}
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
    </div>
      
    </>
  )
}

export default SubscribeComponent
