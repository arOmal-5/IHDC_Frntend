import React, { useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import TopNav from '../../component/AdminDashboard/TopNav'

function AdminLayouts() {
  const navigate=useNavigate()
  const token=localStorage.getItem('usertoken')
  useEffect(()=>{
    if(!token){
      navigate('/user/login')
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

export default AdminLayouts
