import React from 'react'
import Swal from 'sweetalert2'
import axiosInstance from '../../../config/axios/AxiosConfiguration';


function ApproveAsOrganiser({orgid,setPendingrequest}) {
    const token=localStorage.getItem('admintoken')
    const HandleApprove=()=>{
        Swal.fire({
            title: "Confirm",
            text: "By approving this request the influencer will be upgraded as a organiser.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approve"
            
          }).then(async(result) => {
            if (result.isConfirmed) {
              // Rejected
                try {
                  const values={
                    request_status:'Approved'
                  }
                    const response=await axiosInstance.patch(`userapp/user/upgrdation/request/approval/${orgid}`,values,{
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log('org response',response.data);
                    if(response.data.message==='Request for upgrading updated sucessfully'){
                      setPendingrequest((prevRequests) => prevRequests.filter((req) => req.id !== orgid));
                    }
                    
                } catch (error) {
                    console.log(error);
                }

              Swal.fire({
                // title: "Delete",
                text: "Approved Successfully",
                icon: "success"
              });
            }
          });
    }
  return (
    <div>
      <button onClick={HandleApprove} className='btn-success' style={{padding:'5px',border:'none',borderRadius:'5px'}}>Approve</button>
    </div>
  )
}

export default ApproveAsOrganiser
