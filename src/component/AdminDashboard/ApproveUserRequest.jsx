import React from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../config/axios/AxiosConfiguration';

function ApproveUserRequest({ user_details_id, setTriger }) {
  const token = localStorage.getItem('admintoken');

  const HandleApprove = (requestStatus) => {
    Swal.fire({
      title: `Confirm ${requestStatus === 'Approved' ? 'approval' : 'rejection'}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: requestStatus,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const values = {
            request_status: requestStatus,
          };

          const response = await axiosInstance.patch(`userapp/user/approval/by/admin/${user_details_id}`, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('org response', response.data);
          setTriger(Date.now());

          if (response.data.message === 'Request for upgrading updated successfully') {
            // Additional logic for success, if needed
          }
        } catch (error) {
          console.log(error);
        }

        Swal.fire({
          text: `${requestStatus} Successfully`,
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
      <button onClick={() => HandleApprove('Approved')} className='btn-success' style={{ padding: '5px', border: 'none', borderRadius: '5px' }}>
        Approve
      </button>
      <button onClick={() => HandleApprove('Rejected')} className='btn-danger' style={{ padding: '5px', border: 'none', borderRadius: '5px' }}>
        Reject
      </button>
    </div>
  );
}

export default ApproveUserRequest;









// import React from 'react'
// import Swal from 'sweetalert2'
// import axiosInstance from '../../config/axios/AxiosConfiguration'

// function ApproveUserRequest({user_details_id,setTriger}) {
//     const token=localStorage.getItem('admintoken')
//     const HandleApprove=()=>{
//         Swal.fire({
//             title: "Confirm approval",
//             // text: "Confirm approval",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Approve"
            
//           }).then(async(result) => {
//             if (result.isConfirmed) {
//               // Rejected
//                 try {
//                   const values={
//                     request_status:'Approved'
//                   }
//                     const response=await axiosInstance.patch(`userapp/user/approval/by/admin/${user_details_id}`,values,{
//                         headers:{
//                             'Authorization': `Bearer ${token}`
//                         }
//                     })
//                     console.log('org response',response.data);
//                     setTriger(Date.now())
//                     if(response.data.message==='Request for upgrading updated sucessfully'){
                     
//                     //   setPendingrequest((prevRequests) => prevRequests.filter((req) => req.id !== user_details_id));
//                 console.log('')   
//                 }
                    
//                 } catch (error) {
//                     console.log(error);
//                 }

//               Swal.fire({
//                 // title: "Delete",
//                 text: "Approved Successfully",
//                 icon: "success"
//               });
//             }
//           });
//     }
//   return (
//     <div>
//       <button onClick={HandleApprove} className='btn-success' style={{padding:'5px',border:'none',borderRadius:'5px'}}>Approve/Reject</button>
//     </div>
//   )
// }


// export default ApproveUserRequest























// // import React from 'react'
// // import Swal from 'sweetalert2'
// // import axiosInstance from '../../config/axios/AxiosConfiguration'

// // function ApproveUserRequest({user_details_id}) {
// //     const token=localStorage.getItem('admintoken')
// //     const HandleApprove=()=>{
// //         Swal.fire({
// //             title: "Confirm approval",
// //             // text: "Confirm approval",
// //             icon: "warning",
// //             showCancelButton: true,
// //             confirmButtonColor: "#3085d6",
// //             cancelButtonColor: "#d33",
// //             confirmButtonText: "Approve"
            
// //           }).then(async(result) => {
// //             if (result.isConfirmed) {
// //               // Rejected
// //                 try {
// //                   const values={
// //                     request_status:'Approved'
// //                   }
// //                     const response=await axiosInstance.patch(`userapp/user/approval/by/admin/${user_details_id}`,values,{
// //                         headers:{
// //                             'Authorization': `Bearer ${token}`
// //                         }
// //                     })
// //                     console.log('org response',response.data);
// //                     if(response.data.message==='Request for upgrading updated sucessfully'){
// //                     //   setPendingrequest((prevRequests) => prevRequests.filter((req) => req.id !== user_details_id));
// //                 console.log('')   
// //                 }
                    
// //                 } catch (error) {
// //                     console.log(error);
// //                 }

// //               Swal.fire({
// //                 // title: "Delete",
// //                 text: "Approved Successfully",
// //                 icon: "success"
// //               });
// //             }
// //           });
// //     }
// //   return (
// //     <div>
// //       <button onClick={HandleApprove} className='btn-success' style={{padding:'5px',border:'none',borderRadius:'5px'}}>Approve</button>
// //     </div>
// //   )
// // }


// // export default ApproveUserRequest
