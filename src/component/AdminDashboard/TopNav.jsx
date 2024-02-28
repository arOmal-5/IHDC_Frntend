import React from 'react'
import '../../style/adminDashboard/TopNav.css'
import ihdclogo from '../../Assets/img/ihdclogo.jpg'
function TopNav() {
  return (
    // <>
    // <div className='admin-top-nav-container'>
    // <div className='admin-top-nav-subcontainer-heading'>
    //   <div style={{backgroundColor:'red'}}>
    //   <img src={ihdclogo} alt="" width={100} height={100} className='topnav-ihdclogo' />
    //   </div>
    //   <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'15px'}}>
    //   <p>IHDC HOMES</p>
    //   </div>
         
    // </div>
    // </div>
      
    // </>
    <>
  <div className='admin-top-nav-container'>
    <div className='admin-top-nav-subcontainer-heading'>
      <div >
        <img src={ihdclogo} alt="" className='topnav-ihdclogo' />
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '15px' }}>
        <p>IHDC HOMES</p>
      </div> */}
    </div>
  </div>
</>

  )
}

export default TopNav








// import React from 'react'
// import '../../style/adminDashboard/TopNav.css'
// function TopNav() {
//   return (
//     <>
//     <div className='admin-top-nav-container'>
//     <div className='admin-top-nav-subcontainer-heading'>
//          <p>IHDC HOMES</p>
//     </div>
//     </div>
      
//     </>
//   )
// }

// export default TopNav
