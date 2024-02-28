import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserLogin from '../../page/AdminDashboard/UserLogin.jsx';
import AdminLayouts from '../../layouts/adminlayouts/AdminLayouts';
import Dashboard from '../../component/AdminDashboard/Dashboard';
import UserRegistrationComponent from '../../page/AdminDashboard/UserRegistrationComponent.jsx';
import PaymentSuccessPage from '../../component/AdminDashboard/PaymentSuccessPage.jsx';
import PaymentPageAfterRegistraction from '../../page/AdminDashboard/PaymentPageAfterRegistraction.jsx';
import ForgotPassword from '../../component/AdminDashboard/ForgotPassword.jsx';
import ProctServicePaymentSucess from '../../component/AdminDashboard/ProctServicePaymentSucess.jsx';
import RequestPendingPage from '../../page/AdminDashboard/RequestPendingPage.jsx';
import UserExtraDetails from '../../page/AdminDashboard/UserExtraDetails.jsx';

function AdminRouter() {

    return (
        <>
            <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path='/register' element={<UserRegistrationComponent/>}/> 
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/success' element={<PaymentSuccessPage/>}/>
            <Route path='/service/success' element={<ProctServicePaymentSucess/>}/>
            <Route path='/payment' element={<PaymentPageAfterRegistraction/>}/>
            <Route path='/approval/pending' element={<RequestPendingPage/>}/>
            <Route path='/details' element={<UserExtraDetails/>}/>
            

            
                <Route path="/" element={<AdminLayouts />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
    {/* //     <>
    //     <Routes>
    //     <Route path="/login" element={<UserLogin />} />
    //     <Route path="/register" element={<UserRegistrationComponent />} />
    //     <Route path='/success' element={<PaymentSuccessPage/>}/>
    //     <Route path="/" element={<AdminLayouts />}>
    //         <Route index element={<Dashboard />} />
    //         <Route />
    //     </Route>
    // </Routes> */}
        </>
    )
}

export default AdminRouter
