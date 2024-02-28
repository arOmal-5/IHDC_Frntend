import React, { useState, useEffect } from "react";
 import "../../style/adminDashboard/userprofile.css";
 import AddBankAccountComponent from "../../component/AdminDashboard/AddBankAccountComponent.jsx";
 import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
 import ladyimage from "../../Assets/img/avatar.jpg";
 import { useNavigate } from "react-router-dom";
 import Select from "react-select";
 import { useFormik } from "formik";
 import Swal from "sweetalert2";
 import avatar from "../../Assets/img/avatar.jpg";
 import ProfileStatusChart from "./ProfileStatusChart.jsx";
 import {
   Container,
   ListGroup,
   Row,
   Col,
   Button,
   Image,
   Card,
   Form,
 } from "react-bootstrap";
 import EditProfile from "./EditProfile.jsx";


 import AddPhone from "../AdminDashboard/AddPhone.jsx";
 import AddEmail from "../AdminDashboard/AddEmail.jsx";

 function UserProfileComponent({ setIsProfileVisible }) {
  const navigate = useNavigate();
const handleBackButton = () => {
  setIsProfileVisible(false);
};

const handleLogout = () => {
  localStorage.removeItem("usertoken");
  navigate("/user/login");
};

const [bankAccounts, setBankAccounts] = useState([]);
const [selectedBankAccount, setSelectedBankAccount] = useState(null);
const [primaryBankAccount, setPrimaryBankAccount] = useState(null);

const handleBankAccountChange = (selectedOption) => {
  setSelectedBankAccount(selectedOption);
};

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState("");

const [profiledata, setProfiledata] = useState([]);
const [updateTrigger, setUpdateTrigger] = useState(Date.now());

const token = localStorage.getItem("usertoken");
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "userapp/single/user/dashboard/details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", response.data);
      setProfiledata(response.data);

      const bankresponse = await axiosInstance.get(
        "userapp/user/get/all/bank/account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log("bank details", bankresponse.data);
      setBankAccounts(bankresponse.data);
      const primaryAccount = bankresponse.data.find(
        (account) => account.current_primary_account === true
      );
      if (primaryAccount) {
        setPrimaryBankAccount(primaryAccount);
      }
    } catch (error) {
      // console.log();
    }
  };

  fetchData();
}, [updateTrigger]);

useEffect(() => {
  if (profiledata.user) {
    formik.setFieldValue("name", profiledata.user.name || "");
    formik.setFieldValue("email", profiledata.user.email || "");
    formik.setFieldValue("phone", profiledata.phone || "");
  }
}, [profiledata]);

const formik = useFormik({
  initialValues: {
    name: "",
    phone: "",
    email: "",
    address_line_1: "",
  },
  onSubmit: async (values) => {
    try {
      const primaryresponse = await axiosInstance.patch(
        `userapp/user/set/bank/account/primary/${selectedBankAccount?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log("primaryresponse", primaryresponse);

      const response = await axiosInstance.patch(
        "userapp/edit/user/profilee",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log("user response", response.data);
    } catch (error) {
      // console.log();
    }
  },
});

const hasProfileImage = true;

//  console.log("formik", formik.values);

const [selectedAccount, setSelectedAccount] = useState(null);

const bank = [
  { id: 1, accountNumber: "123456789", isPrimary: true },
  { id: 2, accountNumber: "987654321", isPrimary: false },
   
];

const handleRadioChange = (accountId) => {
  setSelectedAccount(accountId);
};
return (
 <div className="userprofile-card-container">
 <Card className="userprofile-card-sub-container">
   <Card.Header>
     
   <div
        
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p className="user-dashboard-welcome-heading">
            Hi{" "}
            <span style={{ color: "black", fontWeight: "700" }}>
              {profiledata?.user?.name}
            </span>
            , Welcome to your profile
          </p>
        </div>
        <div>
        <ProfileStatusChart/>
        </div>
        <div>
          <nav className="navbar navbar-expand-sm">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-list-4"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar-list-4">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={avatar}
                      width="40"
                      height="40"
                      className="rounded-circle"
                      alt="User Avatar"
                    />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" id="profileLink">
                      Profile
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={handleLogout}
                      id="logoutLink"
                    >
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
   </Card.Header>
   <Card.Body>
    

      <Row>
        <div className="d-flex align-items-center justify-content-between">
          <Button
            variant="danger"
            onClick={handleBackButton}
            className="mb-3 btn btn-sm"
          >
            Back
          </Button>
          <EditProfile  profiledata={profiledata} setUpdateTrigger={setUpdateTrigger} />
        </div>
        <Col md={6}>
          <Card className="mb-4 bg-light">
            <Card.Body>
              <Card.Title className="mb-5 text-center fw-bold">
                <Row>
                  <Col md='4' >
                 <p >Profile Details</p> 
                  </Col>
                  <Col md='4'>
                  {<AddEmail setUpdateTrigger={setUpdateTrigger} />}
                  </Col>
                  <Col md='4'>
                  {<AddPhone currentPhone = {profiledata?.phone } setUpdateTrigger={setUpdateTrigger} />}
                  </Col>
                </Row>
                
              </Card.Title>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  <Image
                    src={ladyimage}
                    alt="Profile Image"
                    rounded
                    fluid
                    style={{ maxHeight: "200px", borderRadius: "50%" }}
                  />
                </Col>
                <Col md={8}>
                  <div className="mb-3">
                    <strong
                      style={{
                        minWidth: "100px",
                        display: "inline-block",
                        verticalAlign: "top",
                      }}
                    >
                      Name
                    </strong>
                    : {profiledata?.user?.name ? profiledata?.user?.name : "---"}
                  </div>

                  <div className="mb-3">
                    <strong
                      style={{
                        minWidth: "100px",
                        display: "inline-block",
                        verticalAlign: "top",
                      }}
                    >
                      Phone
                    </strong>
                    : {profiledata?.phone ? profiledata?.phone : "---"}
                    
                  </div>


                  <div className="mb-3">
                    <strong
                      style={{
                        minWidth: "100px",
                        display: "inline-block",
                        verticalAlign: "top",
                      }}
                    >
                      Email
                    </strong>
                    : {profiledata?.user?.email ? profiledata?.user?.email : "---"}
                  </div>


               </Col>
             </Row>
             {/* <Row className="mt-4">
              <Col md='6'>
              {<AddEmail />}
              </Col>
              <Col md='6'>
              {<AddPhone currentPhone = {profiledata?.phone } />}
              </Col>
             
             
             </Row> */}
           </Card.Body>
         </Card>
       </Col>
       <Col md={6}>
         <Card className="mb-4 bg-light">
           <Card.Body>
             <Card.Title className="mb-4 text-center fw-bold">
             Location Details
             </Card.Title>
             <Row className="align-items-center">
               {/* <Col md={4} className="text-center">
             <Image src={ladyimage} alt="Profile Image" rounded fluid style={{ maxHeight: '200px', borderRadius: '50%' }} />
           </Col> */}
               <Col md={12}>
                 <div className="mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     State
                   </strong>
                   : {profiledata?.state}
                 </div>
                 <div className="mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     District
                   </strong>
                   : {profiledata?.district}
                 </div>
                 <div className="mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Sub district
                   </strong>
                   : {profiledata?.sub_district}
                 </div>
                 <div className="mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Local body
                   </strong>
                   : {profiledata?.local_body}
                 </div>
                 <div className="mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Village
                   </strong>
                   : {profiledata?.village}
                 </div>
                 <div className=" mt-3 mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Landmark
                   </strong>
                   : {profiledata?.land_mark}
                 </div>
                 <div className=" mt-3 mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Address line 1
                   </strong>
                   : {profiledata?.address_line_1}
                 </div>
                 <div className=" mt-3 mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Address Line 2
                   </strong>
                   :   {profiledata?.address_line_2}
                 </div>

                 <div className=" mt-3 mb-3">
                   <strong
                     style={{
                       minWidth: "150px",
                       display: "inline-block",
                       verticalAlign: "top",
                     }}
                   >
                     Pincode
                   </strong>
                   :   {profiledata?.pincode}
                 </div>
               </Col>
             </Row>
           </Card.Body>
         </Card>
        </Col>
      </Row>
  
   </Card.Body>
 </Card>
 </div>
);
}

export default UserProfileComponent;




















// import React, { useState, useEffect } from "react";
//  import "../../style/adminDashboard/userprofile.css";
//  import AddBankAccountComponent from "../../component/AdminDashboard/AddBankAccountComponent.jsx";
//  import axiosInstance from "../../config/axios/AxiosConfiguration.jsx";
//  import ladyimage from "../../Assets/img/avatar.jpg";
//  import { useNavigate } from "react-router-dom";
//  import Select from "react-select";
//  import { useFormik } from "formik";
//  import Swal from "sweetalert2";
//  import avatar from "../../Assets/img/avatar.jpg";
//  import ProfileStatusChart from "./ProfileStatusChart.jsx";
//  import {
//    Container,
//    ListGroup,
//    Row,
//    Col,
//    Button,
//    Image,
//    Card,
//    Form,
//  } from "react-bootstrap";
//  import EditProfile from "./EditProfile.jsx";


//  import AddPhone from "../AdminDashboard/AddPhone.jsx";
//  import AddEmail from "../AdminDashboard/AddEmail.jsx";

//  function UserProfileComponent({ setIsProfileVisible }) {
//   const navigate = useNavigate();
// const handleBackButton = () => {
//   setIsProfileVisible(false);
// };

// const handleLogout = () => {
//   localStorage.removeItem("usertoken");
//   navigate("/user/login");
// };

// const [bankAccounts, setBankAccounts] = useState([]);
// const [selectedBankAccount, setSelectedBankAccount] = useState(null);
// const [primaryBankAccount, setPrimaryBankAccount] = useState(null);

// const handleBankAccountChange = (selectedOption) => {
//   setSelectedBankAccount(selectedOption);
// };

// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");
// const [image, setImage] = useState(null);
// const [imagePreview, setImagePreview] = useState("");

// const [profiledata, setProfiledata] = useState([]);
// const [updateTrigger, setUpdateTrigger] = useState(Date.now());

// const token = localStorage.getItem("usertoken");
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance.get(
//         "userapp/single/user/dashboard/details",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       //  console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", response.data);
//       setProfiledata(response.data);

//       const bankresponse = await axiosInstance.get(
//         "userapp/user/get/all/bank/account",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       //  console.log("bank details", bankresponse.data);
//       setBankAccounts(bankresponse.data);
//       const primaryAccount = bankresponse.data.find(
//         (account) => account.current_primary_account === true
//       );
//       if (primaryAccount) {
//         setPrimaryBankAccount(primaryAccount);
//       }
//     } catch (error) {
//       // console.log();
//     }
//   };

//   fetchData();
// }, [updateTrigger]);

// useEffect(() => {
//   if (profiledata.user) {
//     formik.setFieldValue("name", profiledata.user.name || "");
//     formik.setFieldValue("email", profiledata.user.email || "");
//     formik.setFieldValue("phone", profiledata.phone || "");
//   }
// }, [profiledata]);

// const formik = useFormik({
//   initialValues: {
//     name: "",
//     phone: "",
//     email: "",
//     address_line_1: "",
//   },
//   onSubmit: async (values) => {
//     try {
//       const primaryresponse = await axiosInstance.patch(
//         `userapp/user/set/bank/account/primary/${selectedBankAccount?.id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       //  console.log("primaryresponse", primaryresponse);

//       const response = await axiosInstance.patch(
//         "userapp/edit/user/profilee",
//         values,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       //  console.log("user response", response.data);
//     } catch (error) {
//       // console.log();
//     }
//   },
// });

// const hasProfileImage = true;

// //  console.log("formik", formik.values);

// const [selectedAccount, setSelectedAccount] = useState(null);

// const bank = [
//   { id: 1, accountNumber: "123456789", isPrimary: true },
//   { id: 2, accountNumber: "987654321", isPrimary: false },
   
// ];

// const handleRadioChange = (accountId) => {
//   setSelectedAccount(accountId);
// };
// return (
//  <div className="userprofile-card-container">
//  <Card className="userprofile-card-sub-container">
//    <Card.Header>
     
//    <div
        
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <div>
//           <p className="user-dashboard-welcome-heading">
//             Hi{" "}
//             <span style={{ color: "black", fontWeight: "700" }}>
//               {profiledata?.user?.name}
//             </span>
//             , Welcome to your profile
//           </p>
//         </div>
//         <div>
//         <ProfileStatusChart/>
//         </div>
//         <div>
//           <nav className="navbar navbar-expand-sm">
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#navbar-list-4"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbar-list-4">
//               <ul className="navbar-nav ml-auto">
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     id="navbarDropdownMenuLink"
//                     role="button"
//                     data-toggle="dropdown"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                     <img
//                       src={avatar}
//                       width="40"
//                       height="40"
//                       className="rounded-circle"
//                       alt="User Avatar"
//                     />
//                   </a>
//                   <div
//                     className="dropdown-menu"
//                     aria-labelledby="navbarDropdownMenuLink"
//                   >
//                     <a className="dropdown-item" id="profileLink">
//                       Profile
//                     </a>
//                     <a
//                       className="dropdown-item"
//                       onClick={handleLogout}
//                       id="logoutLink"
//                     >
//                       Log Out
//                     </a>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </div>
//    </Card.Header>
//    <Card.Body>
    

//       <Row>
//         <div className="d-flex align-items-center justify-content-between">
//           <Button
//             variant="danger"
//             onClick={handleBackButton}
//             className="mb-3 btn btn-sm"
//           >
//             Back
//           </Button>
//           <EditProfile  profiledata={profiledata} setUpdateTrigger={setUpdateTrigger} />
//         </div>
//         <Col md={6}>
//           <Card className="mb-4 bg-light">
//             <Card.Body>
//               <Card.Title className="mb-4 text-center fw-bold">
//                 Profile Details
//               </Card.Title>
//               <Row className="align-items-center">
//                 <Col md={4} className="text-center">
//                   <Image
//                     src={ladyimage}
//                     alt="Profile Image"
//                     rounded
//                     fluid
//                     style={{ maxHeight: "200px", borderRadius: "50%" }}
//                   />
//                 </Col>
//                 <Col md={8}>
//                   <div className="mb-3">
//                     <strong
//                       style={{
//                         minWidth: "100px",
//                         display: "inline-block",
//                         verticalAlign: "top",
//                       }}
//                     >
//                       Name
//                     </strong>
//                     : {profiledata?.user?.name ? profiledata?.user?.name : "---"}
//                   </div>

//                   <div className="mb-3">
//                     <strong
//                       style={{
//                         minWidth: "100px",
//                         display: "inline-block",
//                         verticalAlign: "top",
//                       }}
//                     >
//                       Phone
//                     </strong>
//                     : {profiledata?.phone ? profiledata?.phone : "---"}
//                     {<AddPhone currentPhone = {profiledata?.phone } />}
//                   </div>


//                   <div className="mb-3">
//                     <strong
//                       style={{
//                         minWidth: "100px",
//                         display: "inline-block",
//                         verticalAlign: "top",
//                       }}
//                     >
//                       Email
//                     </strong>
//                     : {profiledata?.user?.email ? profiledata?.user?.email : "---"}{<AddEmail />}
//                   </div>


//                </Col>
//              </Row>
//            </Card.Body>
//          </Card>
//        </Col>
//        <Col md={6}>
//          <Card className="mb-4 bg-light">
//            <Card.Body>
//              <Card.Title className="mb-4 text-center fw-bold">
//              Location Details
//              </Card.Title>
//              <Row className="align-items-center">
//                {/* <Col md={4} className="text-center">
//              <Image src={ladyimage} alt="Profile Image" rounded fluid style={{ maxHeight: '200px', borderRadius: '50%' }} />
//            </Col> */}
//                <Col md={12}>
//                  <div className="mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      State
//                    </strong>
//                    : {profiledata?.state}
//                  </div>
//                  <div className="mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      District
//                    </strong>
//                    : {profiledata?.district}
//                  </div>
//                  <div className="mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Sub district
//                    </strong>
//                    : {profiledata?.sub_district}
//                  </div>
//                  <div className="mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Local body
//                    </strong>
//                    : {profiledata?.local_body}
//                  </div>
//                  <div className="mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Village
//                    </strong>
//                    : {profiledata?.village}
//                  </div>
//                  <div className=" mt-3 mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Landmark
//                    </strong>
//                    : {profiledata?.land_mark}
//                  </div>
//                  <div className=" mt-3 mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Address line 1
//                    </strong>
//                    : {profiledata?.address_line_1}
//                  </div>
//                  <div className=" mt-3 mb-3">
//                    <strong
//                      style={{
//                        minWidth: "150px",
//                        display: "inline-block",
//                        verticalAlign: "top",
//                      }}
//                    >
//                      Address Line 2
//                    </strong>
//                    :   {profiledata?.address_line_1}
//                  </div>
//                </Col>
//              </Row>
//            </Card.Body>
//          </Card>
//         </Col>
//       </Row>
  
//    </Card.Body>
//  </Card>
//  </div>
// );
// }

// export default UserProfileComponent;













