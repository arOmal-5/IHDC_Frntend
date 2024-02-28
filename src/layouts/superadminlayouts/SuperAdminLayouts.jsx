import React, { useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import TopNav from '../../component/AdminDashboard/TopNav'

function SuperAdminLayouts() {
  const navigate=useNavigate()
  const token=localStorage.getItem('admintoken')
  useEffect(()=>{
    if(!token){
      navigate('/dash/login')
    }
  },[navigate,token])
  
  return (
    <>
    {
      token ?(
        <div>
        <TopNav/>
        <Outlet/>
        
      </div>

      ):null
    }
    </>
  )
}

export default SuperAdminLayouts
