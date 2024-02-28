import React from 'react'
import { Routes,Route } from 'react-router-dom';
import SuperAdminLayouts from '../../layouts/superadminlayouts/SuperAdminLayouts.jsx'
import SuperAdminDashboard from '../../page/SuperAdminDashboard/SuperAdminDashboard';
import SuperAdminLogin from '../../component/SuperAdminComponent/SuperAdminLogin.jsx';
import ForgotPassword from '../../component/SuperAdminComponent/ForgotPassword.jsx';

function SuperAdminRouter() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<SuperAdminLogin/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/' element={<SuperAdminLayouts/>}>
            <Route index element={<SuperAdminDashboard/>}/>
        </Route>
        
    </Routes>
      
    </>
  )
}

export default SuperAdminRouter

