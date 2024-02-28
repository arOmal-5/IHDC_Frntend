import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axiosInstance from '../../config/axios/AxiosConfiguration';
import Switch from '@mui/material/Switch';
import { RotatingLines } from "react-loader-spinner";


function ConfirmRegistrationAutoApproval({orgid,setPendingrequest}) {
    const token=localStorage.getItem('admintoken')
    const [checked, setChecked] = useState(false); // Define checked state
    // const [productREgStatus,setProductREgStatus] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          try {
            setLoading(true)
              const response = await axiosInstance.get('userapp/admin/dash/details', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              const response2 = await axiosInstance.get('userapp/registration/auto/approval/status/5', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              setLoading(false)
              setChecked(response2.data.user_auto_approval_after_registration); // Assuming response2 is an object containing data
              // console.log('2222222222222222222222222222222222222222222222', response2.data);
          } catch (error) {
            setLoading(false)
              // console.log(error);
          }
      };  
  
      fetchData();
  }, [checked]); // Dependency array is empty since this effect should run only once
  


      
    const handleApprovalRequestChange=()=>{
      // setChecked(prevChecked => !prevChecked);
      Swal.fire({
        // title: "Confirm",
        text: checked
          ? "By confirming you are setting the user registration in manual approving mode " 
          : "By confirming you are setting the user registration in auto approval mode",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: !checked ? "Off" : "On"
      }).then(async(result) => {
            if (result.isConfirmed) {
              // Rejected
                try {
                  const values={
                    default_approval_status : 'Pending'
                  }
                    const response=await axiosInstance.patch('userapp/user/approval/after/registration/5',values,{
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    // console.log('org response',response.data);
                    // console.log("response.data.datas.user_auto_approval_after_registration1",response.data.datas.user_auto_approval_after_registration)
                    setChecked(response.data.datas.user_auto_approval_after_registration);
                    if(response.data.message==='Status updated sucessfully'){
                      // console.log("response.data.datas.user_auto_approval_after_registration2",response.data.datas.user_auto_approval_after_registration)
                      setChecked(response.data.datas.user_auto_approval_after_registration);
                    }
                    
                } catch (error) {
                    
                }

              Swal.fire({
                // title: "Delete",
                text: checked? "Auto approval disabled" :  "Auto approval mode active",
                icon: "success"
              });
            }else{
              // setChecked(prevChecked => !prevChecked);
            }
          });
    }

   
  return (
    // <div>
    //   <button onClick={HandleApprove} className='btn-success' style={{padding:'5px',border:'none',borderRadius:'5px'}}>Approve</button>
    // </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
<span>User waitlisting </span>

{loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
           <>
            <Switch
    checked={!checked}
    onChange={handleApprovalRequestChange}
    inputProps={{'aria-label': 'controlled'}}
  />
  <b>{!checked? 'On' : 'Off'}</b>
  </>
          )}
  
  
</div>
  )
}

export default ConfirmRegistrationAutoApproval
