import React from 'react'
import Swal from 'sweetalert2';
import axiosInstance from '../../../config/axios/AxiosConfiguration';

function RejectOrganiser({orgid,setPendingrequest}) {
    const token = localStorage.getItem('admintoken')
    const HandleReject = () => {
        Swal.fire({
            title: "Do you want reject the request?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Reject",
            denyButtonText: `Cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const values={
                        request_status:'Rejected'
                      }
                    const response = await axiosInstance.patch(`userapp/user/upgrdation/request/approval/${orgid}`,values,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(response.data.message==='Request for upgrading updated sucessfully'){
                        setPendingrequest((prevRequests) => prevRequests.filter((req) => req.id !== orgid));
                      }
                    console.log('reject request',response.data);
                } catch (error) {

                }
                Swal.fire("Rejected Successfully!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    return (
        <div>
            <button onClick={HandleReject} className='btn-danger' style={{ padding: '5px', border: 'none', borderRadius: '5px' }}>Reject    </button>
        </div>
    )
}

export default RejectOrganiser

// Swal.fire({
//     title: "Do you want to save the changes?",
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: "Save",
//     denyButtonText: `Don't save`
//   }).then((result) => {
//     /* Read more about isConfirmed, isDenied below */
//     if (result.isConfirmed) {
//       Swal.fire("Saved!", "", "success");
//     } else if (result.isDenied) {
//       Swal.fire("Changes are not saved", "", "info");
//     }
//   });
