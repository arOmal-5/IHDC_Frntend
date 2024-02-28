import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import Swal from 'sweetalert2';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';

function EnrollAsOrganiser({ productId }) {
  const [isEnroll, setIsEnroll] = useState([]);
  const [userRoleCheck, setUserRoleCheck] = useState([]);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem('usertoken');

  const fetchData = async () => {
    try {
      const userProductRoleResponse = await axiosInstance.get(
        `userapp/user/product/role/checking/for/upgradation/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('userProductRoleResponse.data', userProductRoleResponse.data);
      setUserRoleCheck(userProductRoleResponse.data);

      const response = await axiosInstance.get(`userapp/user/upgrdation/status/in/user/dash/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log('response', response.data);
      setIsEnroll(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId, token]);

  const handleEnrollClick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    const sendEnrollRequest = async () => {
      try {
        const response = await axiosInstance.post(
          `userapp/user/upgrdation/request/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    swalWithBootstrapButtons
      .fire({
        title: 'Send Request?',
        text: 'Send request for upgrading as an organiser',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Send',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          sendEnrollRequest();
          fetchData(); // Assuming fetchData is synchronous
          swalWithBootstrapButtons.fire({
            title: 'Send successfully!',
            text: 'Your request has been under process',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your request cancelled!',
            icon: 'error',
          });
        }
      });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSuccessClose = (request_id) => {
    const closeSuccessMessage = async () => {
      try {
        const userSeenUpdation = await axiosInstance.patch(
          `userapp/user/seen/enroll/as/organiser/updation/by/admin/${request_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('userSeenUpdation.data', userSeenUpdation.data);
        fetchData(); // Assuming fetchData is synchronous
      } catch (error) {
        // console.log(error);
      }
    };

    closeSuccessMessage();
  };

  const renderComponent = () => {
    if (!isEnroll || Object.keys(isEnroll).length === 0) {
      return (
        <>
          {userRoleCheck.link_holder_current_role === 'user' && (
            <div>
              <ul>
                <li>Refer the product to another person to become eligible for enrolling as an organizer.</li>
                <li>By enrolling as an organizer, you will get 2 levels of commission for the product.</li>
              </ul>
              <button
                className="btn btn-primary"
                onClick={handleEnrollClick}
                disabled={userRoleCheck.link_holder_current_role === 'user'}
              >
                Enroll as Organizer
              </button>
            </div>
          )}

          {userRoleCheck.link_holder_current_role === 'influencer' && (
            <div>
              <p>By enrolling as an organizer, you will get 2 levels of commission for the product</p>
              <button className="btn btn-primary" onClick={handleEnrollClick}>
                Enroll as Organizer
              </button>
            </div>
          )}

          {userRoleCheck.link_holder_current_role === 'organiser' && (
            <div>
              <p>You are an organizer of <span>{userRoleCheck.product.name}</span> </p>
              <p>
                Your link:
                <input type="text"
                  value={userRoleCheck.user_refferal_link}
                  style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
                <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
                  <Button variant="primary btn-sm" style={{ padding: '7px' }}>
                    <FaCopy />
                  </Button>
                </CopyToClipboard>
                {copied && <span style={{ color: 'green' }}>Link copied!</span>}
              </p>
              {/* Add other product details here */}
            </div>
          )}
        </>
      );
    }

    if (isEnroll.request_status === 'Pending') {
      return (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Your request is under process</h4>
          <p>
            Your upgradation request has been sent to the admin successfully. After screening your
            details, the admin will approve or reject your request
          </p>
          <hr />
          <p className="mb-0">Currently, your status is PENDING</p>
        </div>
      );
    }

    if (isEnroll.request_status === 'Approved' && !isEnroll.is_seen_by_user) {
      return (
        <div className="alert alert-success" role="alert">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => handleSuccessClose(isEnroll.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="alert-heading">Congratulations! Your request has been approved</h4>
          <p>
            Your upgradation request has been approved by the admin. You can now enjoy the benefits
            of your upgraded status
          </p>
          <hr />
          <p className="mb-0">Currently, your status is <strong>APPROVED</strong></p>
          <div>
            <strong>You are an organizer of <strong>{userRoleCheck.product.name}</strong> </strong>
            <p>
              Your link:
              <input type="text"
                value={userRoleCheck.user_refferal_link}
                style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
              <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
                <Button variant="primary btn-sm" style={{ padding: '7px' }}>
                  <FaCopy />
                </Button>
              </CopyToClipboard>
              {copied && <span style={{ color: 'green' }}>Link copied!</span>}
            </p>
            {/* Add other product details here */}
          </div>
        </div>
      );
    }

    if (isEnroll.request_status === 'Approved' && isEnroll.is_seen_by_user) {
      return (
        <div className="alert alert-success" role="alert">
          <div>
            <strong>You are an organizer of <strong>{userRoleCheck.product.name}</strong> </strong>
            <p>
              Your link   :
              <input type="text"
                value={userRoleCheck.user_refferal_link}
                style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
              <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
                <Button variant="primary btn-sm" style={{ padding: '7px' }}>
                  <FaCopy />
                </Button>
              </CopyToClipboard>
              {copied && <span style={{ color: 'green' }}>Link copied!</span>}
            </p>
            {/* Add other product details here */}
          </div>
        </div>
      );
    }

    if (isEnroll.request_status === 'Rejected') {
      return (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Your request has been Rejected by admin</h4>
          <p>
            You can send another request. After screening your request, the admin will approve or
            reject your request
          </p>
          <hr />
          <button className="btn btn-primary" onClick={handleEnrollClick}>
            Enroll as Organizer
          </button>
        </div>
      );
    }

    return null;
  };

  return <>{renderComponent()}</>;
}

export default EnrollAsOrganiser;















// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import Swal from 'sweetalert2';
// import CopyToClipboard from 'react-copy-to-clipboard';
// import { FaCopy } from 'react-icons/fa6';
// import Button from 'react-bootstrap/Button';

// function EnrollAsOrganiser({ productId }) {
//   const [isEnroll, setIsEnroll] = useState([]);
//   const [userRoleCheck, setUserRoleCheck] = useState([]);
//   const [copied, setCopied] = useState(false);

//   const token = localStorage.getItem('usertoken');

//   const fetchData = async () => {
//     try {
//       const userProductRoleResponse = await axiosInstance.get(
//         `userapp/user/product/role/checking/for/upgradation/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('userProductRoleResponse.data', userProductRoleResponse.data);
//       setUserRoleCheck(userProductRoleResponse.data);

//       const response = await axiosInstance.get(`userapp/user/upgrdation/status/in/user/dash/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log('response', response.data);
//       setIsEnroll(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [productId, token]);

//   const handleEnrollClick = async () => {
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger',
//       },
//       buttonsStyling: false,
//     });
//     swalWithBootstrapButtons
//       .fire({
//         title: 'Send Request?',
//         text: 'Send request for upgrading as an organiser',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Send',
//         cancelButtonText: 'Cancel',
//         reverseButtons: true,
//       })
//       .then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const response = await axiosInstance.post(
//               `userapp/user/upgrdation/request/${productId}`,
//               {},
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             console.log(response.data);
//           } catch (error) {
//             console.error(error);
//           }
//           swalWithBootstrapButtons.fire({
//             title: 'Send successfully!',
//             text: 'Your request has been under process',
//             icon: 'success',
//           });
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithBootstrapButtons.fire({
//             title: 'Cancelled',
//             text: 'Your request cancelled!',
//             icon: 'error',
//           });
//         }
//       });
//   };

//   const handleCopy = () => {
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   const handleSuccessClose = async (request_id) => {
//     try {
//       const userSeenUpdation = await axiosInstance.patch(
//         `userapp/user/seen/enroll/as/organiser/updation/by/admin/${request_id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('userSeenUpdation.data', userSeenUpdation.data);
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   const renderComponent = () => {
//     if (!isEnroll || Object.keys(isEnroll).length === 0) {
//       return (
//         <>
//           {userRoleCheck.link_holder_current_role === 'user' && (
//             <div>
//               <ul>
//                 <li>Refer the product to another person to become eligible for enrolling as an organizer.</li>
//                 <li>By enrolling as an organizer, you will get 2 levels of commission for the product.</li>
//               </ul>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleEnrollClick}
//                 disabled={userRoleCheck.link_holder_current_role === 'user'}
//               >
//                 Enroll as Organizer
//               </button>
//             </div>
//           )}

//           {userRoleCheck.link_holder_current_role === 'influencer' && (
//             <div>
//               <p>By enrolling as an organizer, you will get 2 levels of commission for the product</p>
//               <button className="btn btn-primary" onClick={handleEnrollClick}>
//                 Enroll as Organizer
//               </button>
//             </div>
//           )}

//           {userRoleCheck.link_holder_current_role === 'organiser' && (
//             <div>
//               <p>You are an organizer of <span>{userRoleCheck.product.name}</span> </p>
//               <p>
//                 Your link:
//                 <input type="text"
//                   value={userRoleCheck.user_refferal_link}
//                   style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
//                 <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
//                   <Button variant="primary btn-sm" style={{ padding: '7px' }}>
//                     <FaCopy />
//                   </Button>
//                 </CopyToClipboard>
//                 {copied && <span style={{ color: 'green' }}>Link copied!</span>}
//               </p>
//               {/* Add other product details here */}
//             </div>
//           )}
//         </>
//       );
//     }

//     if (isEnroll.request_status === 'Pending') {
//       return (
//         <div className="alert alert-danger" role="alert">
//           <h4 className="alert-heading">Your request is under process</h4>
//           <p>
//             Your upgradation request has been sent to the admin successfully. After screening your
//             details, the admin will approve or reject your request
//           </p>
//           <hr />
//           <p className="mb-0">Currently, your status is PENDING</p>
//         </div>
//       );
//     }

//     if (isEnroll.request_status === 'Approved' && !isEnroll.is_seen_by_user) {
//       return (
//         <div className="alert alert-success" role="alert">
//           <button
//             type="button"
//             className="close"
//             aria-label="Close"
//             onClick={() => handleSuccessClose(isEnroll.id)}
//           >
//             <span aria-hidden="true">&times;</span>
//           </button>
//           <h4 className="alert-heading">Congratulations! Your request has been approved</h4>
//           <p>
//             Your upgradation request has been approved by the admin. You can now enjoy the benefits
//             of your upgraded status
//           </p>
//           <hr />
//           <p className="mb-0">Currently, your status is <strong>APPROVED</strong></p>
//           <div>
//             <strong>You are an organizer of <strong>{userRoleCheck.product.name}</strong> </strong>
//             <p>
//               Your link:
//               <input type="text"
//                 value={userRoleCheck.user_refferal_link}
//                 style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
//               <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
//                 <Button variant="primary btn-sm" style={{ padding: '7px' }}>
//                   <FaCopy />
//                 </Button>
//               </CopyToClipboard>
//               {copied && <span style={{ color: 'green' }}>Link copied!</span>}
//             </p>
//             {/* Add other product details here */}
//           </div>
//         </div>
//       );
//     }

//     if (isEnroll.request_status === 'Approved' && isEnroll.is_seen_by_user) {
//       return (
//         <div className="alert alert-success" role="alert">
//           <div>
//             <strong>You are an organizer of <strong>{userRoleCheck.product.name}</strong> </strong>
//             <p>
//               Your link   :
//               <input type="text"
//                 value={userRoleCheck.user_refferal_link}
//                 style={{ width: '100%', maxWidth: '350px', padding: '5px' }} />
//               <CopyToClipboard text={userRoleCheck.user_refferal_link} onCopy={handleCopy}>
//                 <Button variant="primary btn-sm" style={{ padding: '7px' }}>
//                   <FaCopy />
//                 </Button>
//               </CopyToClipboard>
//               {copied && <span style={{ color: 'green' }}>Link copied!</span>}
//             </p>
//             {/* Add other product details here */}
//           </div>
//         </div>
//       );
//     }

//     if (isEnroll.request_status === 'Rejected') {
//       return (
//         <div className="alert alert-danger" role="alert">
//           <h4 className="alert-heading">Your request has been Rejected by admin</h4>
//           <p>
//             You can send another request. After screening your request, the admin will approve or
//             reject your request
//           </p>
//           <hr />
//           <button className="btn btn-primary" onClick={handleEnrollClick}>
//             Enroll as Organizer
//           </button>
//         </div>
//       );
//     }

//     return null;
//   };

//   return <>{renderComponent()}</>;
// }

// export default EnrollAsOrganiser;






