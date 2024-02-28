import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import MyContext from '../../store/MyContext';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";



  function InvoiceGenerationForUser({ transaction_id,done_invoice_generation_by_admin_to_user,done_invoice_generation_by_user,userCompletedProfile, setTriger }) {
    const token = localStorage.getItem('usertoken');
    const { profilePercentage, setProfilePercentage } = useContext(MyContext);
    const { isProfileVisible, setIsProfileVisible } = useContext(MyContext);
    // console.log('done_invoice_generation_by_admin_to_user' , done_invoice_generation_by_admin_to_user)
    // console.log('userCompletedProfile' , userCompletedProfile)

    const HandleConfirmation = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
            spacer: 'mr-2',
          },
          buttonsStyling: false,
        });
      
        if (!userCompletedProfile) {
          await swalWithBootstrapButtons.fire({
            title: 'Sorry, You can\'t send the invoice now!',
            text: 'The user hasn\'t completed the profile details.',
            icon: 'warning',
            // showCancelButton: true,
            cancelButtonText: 'Cancel!',
            reverseButtons: true,
          });
      
          setIsProfileVisible(true);
        } else {
          const result = await swalWithBootstrapButtons.fire({
            title: 'Confirm',
            text: 'Are you sure you want to send the transaction invoice to the user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Send',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
          });
      
          if (result.isConfirmed) {
            try {
              const InvoicegenerationResponse = await axiosInstance.post(
                `userapp/user/invoice/generation/by/admin/for/user/${transaction_id}`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
              console.log('InvoicegenerationResponse', InvoicegenerationResponse);
              setTriger(Date.now())
              swalWithBootstrapButtons.fire({
                text: 'Invoice has been sent to their registered email id',
                icon: 'success',
              });
      
            } catch (error) {
              console.error('Error generating invoice:', error);
              swalWithBootstrapButtons.fire({
                text: 'Failed to activate. Please try again.',
                icon: 'error',
              });
            }
          }
        }
      };
      

      return (
        <div>
          {done_invoice_generation_by_admin_to_user || done_invoice_generation_by_user ? (
            <div>
              {done_invoice_generation_by_user ? (
                <>
                  <IoCheckmarkDoneCircleSharp style={{ fontSize: '2em' }} /> <span>by user</span>
                </>
              ) : (
                <>
                  <IoCheckmarkDoneCircleSharp style={{ fontSize: '2em' }} /> <span>by admin</span>
                </>
              )}
            </div>
          ) : (
            <Button onClick={HandleConfirmation} className='btn btn-sm' style={{ backgroundColor: 'grey', border: 'none' }}>
              Send
            </Button>
          )}
        </div>
      );
      
      
  }
  
  export default InvoiceGenerationForUser;


















// import React, { useContext } from 'react';
// import Swal from 'sweetalert2';
// import Button from 'react-bootstrap/Button';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import MyContext from '../../store/MyContext';
// import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";



//   function InvoiceGenerationForUser({ transaction_id,done_invoice_generation_by_admin_to_user,userCompletedProfile, setTriger }) {
//     const token = localStorage.getItem('usertoken');
//     const { profilePercentage, setProfilePercentage } = useContext(MyContext);
//     const { isProfileVisible, setIsProfileVisible } = useContext(MyContext);
//     console.log('done_invoice_generation_by_admin_to_user' , done_invoice_generation_by_admin_to_user)
//     console.log('userCompletedProfile' , userCompletedProfile)

//     const HandleConfirmation = async () => {
//         const swalWithBootstrapButtons = Swal.mixin({
//           customClass: {
//             confirmButton: 'btn btn-success',
//             cancelButton: 'btn btn-danger',
//             spacer: 'mr-2',
//           },
//           buttonsStyling: false,
//         });
      
//         if (!userCompletedProfile) {
//           await swalWithBootstrapButtons.fire({
//             title: 'Sorry, You can\'t send the invoice now!',
//             text: 'The user hasn\'t completed the profile details.',
//             icon: 'warning',
//             // showCancelButton: true,
//             cancelButtonText: 'Cancel!',
//             reverseButtons: true,
//           });
      
//           setIsProfileVisible(true);
//         } else {
//           const result = await swalWithBootstrapButtons.fire({
//             title: 'Confirm',
//             text: 'Are you sure you want to send the transaction invoice to the user?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Send',
//             cancelButtonText: 'Cancel',
//             reverseButtons: true,
//           });
      
//           if (result.isConfirmed) {
//             try {
//               const InvoicegenerationResponse = await axiosInstance.post(
//                 `userapp/user/invoice/generation/by/admin/for/user/${transaction_id}`,
//                 {
//                   headers: {
//                     'Authorization': `Bearer ${token}`
//                   }
//                 }
//               );
//               console.log('InvoicegenerationResponse', InvoicegenerationResponse);
      
//               // If you want to trigger something after successful generation
//               // setTriger(Date.now());
      
//             } catch (error) {
//               console.error('Error generating invoice:', error);
//               // alert(error);
//             }
//           }
//         }
//       };
      

  
//     return (
//         <div>
//           {done_invoice_generation_by_admin_to_user ? (
//             // <h1>Done</h1>
//             <IoCheckmarkDoneCircleSharp style={{ fontSize: '2em' }} />
//           ) : (
//             <Button onClick={HandleConfirmation} className='btn btn-sm' style={{ backgroundColor: 'grey', border: 'none' }}>
//               Send
//             </Button>
//           )}
//         </div>
//       );
      
//   }
  
//   export default InvoiceGenerationForUser;