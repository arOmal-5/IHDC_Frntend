import React from 'react';
import TopNav from '../../component/AdminDashboard/TopNav';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
function SuperAdminLogin() {

  const navigate=useNavigate()
  const formik= useFormik({
    initialValues:{
      email:'',
      password:''

    },
   onSubmit: async (values, { resetForm })=>{
    let loginResponse;
    try {
     
      const validationResponse = await axiosInstance.post('userapp/admin/login', values);
      // console.log(validationResponse.data, 'ooooooooooooooooooooooooooooooooo');

      if (validationResponse.data.message === 'Verified admin') {
        loginResponse = await axiosInstance.post('userapp/api/login/', values);
        // console.log(loginResponse.data);

        if(loginResponse.data.access){
          localStorage.setItem('admintoken',loginResponse.data.access)
          toast.success('logged in successfully')
          navigate('/dash')
          resetForm()

        }
        else {
          // Handle the case where the user is not valid
          // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
          toast.error(loginResponse.data.data.detail);
        }
      } else {
        // Handle the case where the user is not valid
        // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
        toast.error(validationResponse.data);
      }
      
    } catch (error) {
      // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq');
      toast.error(error.response.data.message);
      // console.log(error);
    }
    

   }
  })
  // console.log(formik.values);
  return (
    <>
    <TopNav/>
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form id='userlogin' onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} className="form-control" />
                  <div style={{display:'none'}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button form='userlogin' type="submit" className="btn btn-primary w-100">Login</button>
                <Link to='/admin/forgot' style={{ color: 'black', textDecoration: 'none', textAlign: 'end', marginTop: '10px' }}>
                    Forgot password ?
                   </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SuperAdminLogin;


// import React from 'react';
// import TopNav from '../../component/AdminDashboard/TopNav';
// import { useFormik } from 'formik';
// import { useNavigate, Link } from 'react-router-dom';
// import axiosInstance from '../../config/axios/AxiosConfiguration';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function UserLogin() {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },

//     onSubmit: async (values, { resetForm }) => {
//       let loginResponse; 

//       try {
       
//         const validationResponse = await axiosInstance.post('userapp/admin/login', values);
//         console.log(validationResponse.data, 'ooooooooooooooooooooooooooooooooo');

//         // Check if the user is valid before attempting login
//         if (validationResponse.data.message === 'Verified admin') {
//           loginResponse = await axiosInstance.post('userapp/api/login/', values);
//           console.log(loginResponse.data);

//           if (loginResponse.data.access) {
//             localStorage.setItem('admintoken', loginResponse.data.access);
//             toast.success('Logged in successfully');
//             navigate('/admin');
//             resetForm();
//           }
//           else {
//             // Handle the case where the user is not valid
//             console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
//             toast.error(loginResponse.data.data.detail);
//           }
//         } else {
//           // Handle the case where the user is not valid
//           console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
//           toast.error(validationResponse.data);
//         }

//       } catch (error) {
//         console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq');
//         toast.error(error.response.data.message);
//         console.log(error);
//       }
//     },
//   });

//   console.log(formik.values);

//   return (
//     <>
//       <TopNav />
//       <div className="container-fluid">
//         <div className="row justify-content-center align-items-center vh-100">
//           <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h3 className="card-title text-center mb-4">Login</h3>
//                 <form id="userlogin" onSubmit={formik.handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       className="form-control"
//                     />
//                     <div style={{ display: 'none' }} id="emailHelp" className="form-text">
//                       We'll never share your email with anyone else.
//                     </div>
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       className="form-control"
//                       id="exampleInputPassword1"
//                     />
//                   </div>
//                   <button form="userlogin" type="submit" className="btn btn-primary w-100">
//                     Login
//                   </button>
//                   {/* <Link to='/user/forgotpassword' style={{color:'black',textDecoration:'none',textAlign:'end',marginTop:'10px'}}>Forgot password ?</Link> */}
//                   <Link to='/user/forgotpassword' style={{ color: 'black', textDecoration: 'none', textAlign: 'end', marginTop: '10px' }}>
//                     Forgot password ?
//                   </Link>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserLogin;








// import React from 'react';
// import TopNav from '../../component/AdminDashboard/TopNav';
// // import { useDispatch } from 'react-redux';
// // import {login} from '../../store/slice/AdminAuthSlice.jsx'
// // import { adminLogin } from '../../store/slice/AdminAuthSlice.jsx';
// import {  toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
// function SuperAdminLogin() {
//   // const dispatch=useDispatch()
//   const navigate=useNavigate()
//   const formik= useFormik({
//     initialValues:{
//       email:'',
//       password:''

//     },
//    onSubmit: async (values, { resetForm })=>{
//     let loginResponse;
//     try {
//       // Call the user validation API first
//       const validationResponse = await axiosInstance.post('userapp/admin/login', values);
//       console.log(validationResponse.data, 'ooooooooooooooooooooooooooooooooo');

//       // Check if the user is valid before attempting login
//       if (validationResponse.data.message === 'Verified admin') {
//         loginResponse = await axiosInstance.post('userapp/api/login/', values);
//         console.log(loginResponse.data);

//         if(loginResponse.data.access){
//           localStorage.setItem('admintoken',loginResponse.data.access)
//           toast.success('logged in successfully')
//           navigate('/admin')
//           resetForm()

//         }
//         else {
//           // Handle the case where the user is not valid
//           console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
//           toast.error(loginResponse.data.data.detail);
//         }
//       } else {
//         // Handle the case where the user is not valid
//         console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
//         toast.error(validationResponse.data);
//       }
      
//     } catch (error) {
//       console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq');
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//     // try {
//     //   await axiosInstance.post('userapp/api/login/',values).then((response)=>{
//     //     console.log(response.data.access);
//         // if(response.data.access){
//         //   localStorage.setItem('admintoken',response.data.access)
//         //   toast.success('logged in successfully')
//         //   navigate('/admin')
//         //   resetForm()

//         // }
//     //   })
    
//     // } catch (error) {
//     //   toast.error(error.response.data.detail)
//     //   console.log(error.response.data.detail);
//     // }

//    }
//   })
//   console.log(formik.values);
//   return (
//     <>
//     <TopNav/>
//     <div className="container-fluid">
//       <div className="row justify-content-center align-items-center vh-100">
//         <div className="col-md-4">
//           <div className="card">
//             <div className="card-body">
//               <h3 className="card-title text-center mb-4">Login</h3>
//               <form id='userlogin' onSubmit={formik.handleSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Email address</label>
//                   <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} className="form-control" />
//                   <div style={{display:'none'}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                   <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} className="form-control" id="exampleInputPassword1" />
//                 </div>
//                 <button form='userlogin' type="submit" className="btn btn-primary w-100">Login</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default SuperAdminLogin;


