import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import MyContext from '../../store/MyContext';

function WebHookConfirmation({ cardtype, setTriger }) {
  const token = localStorage.getItem('usertoken');
  const { profilePercentage, setProfilePercentage } = useContext(MyContext);
  const { isProfileVisible, setIsProfileVisible } = useContext(MyContext);
  const [wehookFailed, setwebhookFailed] = useState(false)

  const HandleConfirmation = () => {
    profilePercentage < 100 ? (
      (() => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Complete your profile and activate this service',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Complete Profile & Activate',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setIsProfileVisible(true);
            }
          });
      })()
    ) : (
      (() => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Confirm',
            text: 'By activating you will be contacted from the team shortly',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Activate',
            cancelButtonText: 'cancel',
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              if (cardtype === 'discount') {
                const data = {
                  service: 'discounts_on_materials_activated',
                };
                try {
                  setwebhookFailed(false)
                  const discountresponse = await axiosInstance.post(
                    'userapp/webhook/trigger/by-service',
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  // console.log('discountresponse', discountresponse.data.message);
                  swalWithBootstrapButtons.fire({
                    text: 'Activated Successfully',
                    icon: 'success',
                  });
                  setTriger(Date.now());
                } catch (error) {
                  // console.log('discountresponse',error);
                  setwebhookFailed(true)
                  swalWithBootstrapButtons.fire({
                    text: 'Failed to activate. Please try again.',
                    icon: 'error',
                  });
                }
              } else if (cardtype === 'interestfree') {
                const data = {
                  service: 'interest_free_payment_plans_activated',
                };
                try {
                  setwebhookFailed(false)
                  const lowerresponse = await axiosInstance.post(
                    'userapp/webhook/trigger/by-service',
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  // console.log('lowerresponse', lowerresponse.data);
                  swalWithBootstrapButtons.fire({
                    text: 'Activated Successfully',
                    icon: 'success',
                  });
                  setTriger(Date.now());
                } catch (error) {
                  // console.log('lowerresponse',error);
                  setwebhookFailed(true)
                  swalWithBootstrapButtons.fire({
                    text: 'Failed to activate. Please try again.',
                    icon: 'error',
                  });
                }
              } else if (cardtype === 'webask') {
                const data = {
                  service: 'asks_to_experts_and_community_activated',
                };
                try {
                  setwebhookFailed(false)
                  const askexpert = await axiosInstance.post(
                    'userapp/webhook/trigger/by-service',
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  swalWithBootstrapButtons.fire({
                    text: 'Activated Successfully',
                    icon: 'success',
                  });
                  // console.log('askexpert', askexpert.data);
                  setTriger(Date.now());
                } catch (error) {
                  // console.log(error);
                  setwebhookFailed(true)
                  swalWithBootstrapButtons.fire({
                    text: 'Failed to activate. Please try again.',
                    icon: 'error',
                  });
                }
              } else if (cardtype === 'lowerrates') {
                const data = {
                  service: 'lower_interest_rates_activated',
                };
                try {
                  setwebhookFailed(false)
                  const lowerinterest = await axiosInstance.post(
                    'userapp/webhook/trigger/by-service',
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  swalWithBootstrapButtons.fire({
                    text: 'Activated Successfully',
                    icon: 'success',
                  });
                  // console.log('askexpert', lowerinterest.data);
                  setTriger(Date.now());
                } catch (error) {
                  // console.log(error);
                  setwebhookFailed(true)
                  swalWithBootstrapButtons.fire({
                    text: 'Failed to activate. Please try again.',
                    icon: 'error',
                  });
                }
              }

              else if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                  text: 'Activated Successfully',
                  icon: 'success',
                });
              } 
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                icon: 'error',
              });
            }else{
              swalWithBootstrapButtons.fire({
                text: 'Activated Successfully',
                icon: 'success',
              });

            }
          });
      })()
    );
  };

  return (
    <div>
      <Button onClick={HandleConfirmation} className='btn btn-sm' style={{ backgroundColor: 'green', border: 'none' }}>
        Activate Now
      </Button>
    </div>
  );
}

export default WebHookConfirmation;
















// import React from 'react'
// import Swal from 'sweetalert2';
// import Button from 'react-bootstrap/Button';
// import axiosInstance from '../../config/axios/AxiosConfiguration';

// function WebHookConfirmation({cardtype,setTriger}) {
//     const token=localStorage.getItem('usertoken')
    
//     const HandleConfirmation=()=>{
//         const swalWithBootstrapButtons = Swal.mixin({
//             customClass: {
//               confirmButton: "btn btn-success",
//               cancelButton: "btn btn-danger"
//             },
//             buttonsStyling: false
//           });
//           swalWithBootstrapButtons.fire({
//             title: "Confirm",
//             text: "By activating you will be contacted from the team shortlty",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Activate",
//             cancelButtonText: "cancel",
//             reverseButtons: true
//           }).then(async(result) => {
//             if (result.isConfirmed) {
//                 // if(cardtype === 'discount'){
//                 //     const values='discounts_on_materials_activated'
//                 //     try {
//                 //         const discountresponse = await axiosInstance.patch('userapp/webhook/trigger/by-service',values,{
//                 //             headers: {
//                 //                 'Authorization': Bearer ${token}
//                 //               }
//                 //         })
//                 //         console.log('discountresponse',discountresponse.data);
//                 //     } catch (error) {
//                 //         console.log(error);
//                 //     }
//                 // }
//                 if (cardtype === 'discount') {
//                     const data = {
//                       // key: 'service',
//                       service:'discounts_on_materials_activated'
//                     };
                   
//                     try {
//                         const discountresponse = await axiosInstance.post(
//                           'userapp/webhook/trigger/by-service',
//                           data,
//                           {
//                             headers: {
//                               'Authorization': `Bearer ${token}`
//                             }
//                           }
//                         );
            
//                         console.log('discountresponse',discountresponse.data.message);
//                         setTriger(Date.now())
//                       } catch (error) {
//                         console.log(error);
//                       }
//                     }else if(cardtype==='interestfree'){
//                         const data = {
//                             // key: 'service',
//                             service:'interest_free_payment_plans_activated'
//                           };
//                           console.log('data',data);
//                           try {
//                               const lowerresponse = await axiosInstance.post(
//                                 'userapp/webhook/trigger/by-service',
//                                 data,
//                                 {
//                                   headers: {
//                                     'Authorization': `Bearer ${token}`
//                                   }
//                                 }
//                               );
                  
//                               console.log('lowerresponse', lowerresponse.data);
//                               setTriger(Date.now())
//                             } catch (error) {
//                               console.log(error);
//                             }
//                     }
//                     else if(cardtype==='webask'){
//                       // asks_to_experts_and_communnity_activated 
//                       const data = {
//                         // key: 'service',
//                         service:'asks_to_experts_and_community_activated'
//                       };
//                       console.log('data',data);
//                           try {
//                               const askexpert = await axiosInstance.post(
//                                 'userapp/webhook/trigger/by-service',
//                                 data,
//                                 {
//                                   headers: {
//                                     'Authorization': `Bearer ${token}`
//                                   }
//                                 }
//                               );
                  
//                               console.log('askexpert', askexpert.data);
//                               setTriger(Date.now())
//                             } catch (error) {
//                               console.log(error);
//                             }
//                     }else if(cardtype==='lowerrates'){
//                       const data = {
//                         // key: 'service',
//                         service:'lower_interest_rates_activated'
//                       };
//                       try {
//                         const lowerinterest = await axiosInstance.post(
//                           'userapp/webhook/trigger/by-service',
//                           data,
//                           {
//                             headers: {
//                               'Authorization': `Bearer ${token}`
//                             }
//                           }
//                         );
            
//                         console.log('askexpert', lowerinterest.data);
//                         setTriger(Date.now())
//                       } catch (error) {
//                         console.log(error);
//                       }
//                     }

//               swalWithBootstrapButtons.fire({
//                 // title: "Deleted!",
//                 text: "Activated Successfully",
//                 icon: "success"
//               });
//             } else if (
              
//               result.dismiss === Swal.DismissReason.cancel
//             ) {
//               swalWithBootstrapButtons.fire({
//                 title: "Cancelled",
//                 // text: "Your imaginary file is safe :)",
//                 icon: "error"
//               });
//             }
//           });
//     }
//   return (
//     <div>
//       <Button onClick={HandleConfirmation} className='btn btn-sm' style={{backgroundColor:'green',border:'none'}}>Activate Now</Button>
//     </div>
//   )
// }

// export default WebHookConfirmation

















