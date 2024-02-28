import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import MyContext from '../../store/MyContext';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { RotatingLines } from 'react-loader-spinner';
import ReactDOM from 'react-dom'; // Import ReactDOM

function UserGenerateInvoice({ transaction_id, done_invoice_generation_by_user,done_invoice_generation_by_admin_to_user, setTriger }) {
  const token = localStorage.getItem('usertoken');
  const { profilePercentage, setProfilePercentage } = useContext(MyContext);
  const { isProfileVisible, setIsProfileVisible } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const HandleConfirmation = () => {
    profilePercentage < 100
      ? (() => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Sorry, You can\'t generate the invoice now!',
            text: 'After completing your profile, you can generate invoice',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update profile',
            cancelButtonText: 'Cancel!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setIsProfileVisible(true);
            }
          });
      })()
      : (() => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
            spacer: 'mr-2',
          },
          buttonsStyling: false,
          onBeforeOpen: (modalElement) => {
            // Create a div for the loading spinner
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-spinner';
            modalElement.querySelector('.swal2-content').appendChild(loadingDiv);

            // Show loading spinner
            const loadingElement = (
              <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
            );
            ReactDOM.render(loadingElement, loadingDiv);
          },
        });

        swalWithBootstrapButtons
          .fire({
            title: 'Confirm',
            text: 'You will receive the invoice of this transaction via email.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Generate',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                setLoading(true);
                const InvoicegenerationResponse = await axiosInstance.post(`userapp/user/invoice/generation/by/user/${transaction_id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                setTriger(Date.now())
                console.log('InvoicegenerationResponse', InvoicegenerationResponse);
                setLoading(false);
                swalWithBootstrapButtons.fire({
                  text: 'Invoice has been sent to your registered email id',
                  icon: 'success',
                });
              } catch (error) {
                console.error('Error generating invoice:', error);
                setLoading(false);
                swalWithBootstrapButtons.fire({
                  text: 'Failed to generate invoice. Please try again.',
                  icon: 'error',
                });
              }
            }
          });
      })();
  };

  return (
    <div>
      {done_invoice_generation_by_user || done_invoice_generation_by_admin_to_user ? (
        <IoCheckmarkDoneCircleSharp style={{ fontSize: '2em' }} />
      ) : (
        <Button
          onClick={HandleConfirmation}
          className='btn btn-sm'
          style={{ backgroundColor: 'grey', border: 'none' }}
          disabled={loading}
        >
          {loading ? (
            <RotatingLines type="RotatingLines" color="red" height={40} width={40} />
          ) : (
            'Generate'
          )}
        </Button>
      )}
    </div>
  );
}

export default UserGenerateInvoice;










// import React, { useState,useContext } from 'react';
// import Swal from 'sweetalert2';
// import Button from 'react-bootstrap/Button';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import MyContext from '../../store/MyContext';
// import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
// import {RotatingLines} from 'react-loader-spinner';


//   function UserGenerateInvoice({ transaction_id,done_invoice_generation_by_user, setTriger }) {
//     const token = localStorage.getItem('usertoken');
//     const { profilePercentage, setProfilePercentage } = useContext(MyContext);
//     const { isProfileVisible, setIsProfileVisible } = useContext(MyContext);
   
//     const [loading, setLoading] = useState(false);

//     // console.log('done_invoice_generation_by_user' , done_invoice_generation_by_user)
  
//     const HandleConfirmation = () => {
//       profilePercentage < 100
//         ? (() => {
//             const swalWithBootstrapButtons = Swal.mixin({
//               customClass: {
//                 confirmButton: 'btn btn-success',
//                 cancelButton: 'btn btn-danger',
//               },
//               buttonsStyling: false,
//             });
//             swalWithBootstrapButtons
//               .fire({
//                 title: 'Sorry, You can\'t generate the invoice now!',
//                 text: 'After completing your profile, you can generate invoice',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonText: 'Update profile',
//                 cancelButtonText: 'Cancel!',
//                 reverseButtons: true,
//               })
//               .then((result) => {
//                 if (result.isConfirmed) {
//                   setIsProfileVisible(true);
//                 }
//               });
//           })()
//         : (() => {
//             const swalWithBootstrapButtons = Swal.mixin({
//               customClass: {
//                 confirmButton: 'btn btn-success',
//                 cancelButton: 'btn btn-danger',
//                 spacer: 'mr-2',
//               },
//               buttonsStyling: false,
              
//             });
//             swalWithBootstrapButtons
//               .fire({
//                 title: 'Confirm',
//                 text: 'You will receive the invoice of this transaction via email.',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonText: 'Generate',
//                 cancelButtonText: 'Cancel',
//                 reverseButtons: true,
//               })
//               .then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {
//                       setLoading(true);
//                         const InvoicegenerationResponse = await axiosInstance.post(`userapp/user/invoice/generation/by/user/${transaction_id}`, {
//                           headers: {
//                             'Authorization': `Bearer ${token}`
//                           }
//                         });
//                         console.log('InvoicegenerationResponse',InvoicegenerationResponse)
//                         setLoading(false);
//                         swalWithBootstrapButtons.fire({
//                           text: 'Invoice has been sent to your registered email id',
//                           icon: 'success',
//                         });
//                       } catch (error) {
//                         console.error('Error generating invoice:', error);
//                         // alert(error.response.data.message);
//                         setLoading(false);
//                         swalWithBootstrapButtons.fire({
//                           text: 'Failed to generate invoice. Please try again.',
//                           icon: 'error',
//                         });
//                       }
                    
//                 }
//               });
//           })();
//     };

  
//     return (
//       <div>
//       {done_invoice_generation_by_user ? (
//         <IoCheckmarkDoneCircleSharp style={{ fontSize: '2em' }} />
//       ) : (
//         <Button
//           onClick={HandleConfirmation}
//           className='btn btn-sm'
//           style={{ backgroundColor: 'grey', border: 'none' }}
//           disabled={loading} // Disable the button when loading
//         >
//            {/* {loading ? (
//             <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
//           ) : ( */}
//             Generate
//           {/* )} */}
//         </Button>
//       )}
//     </div>
//   );
// }
//   export default UserGenerateInvoice;