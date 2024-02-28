import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AdminRouter from '../../routes/AdminRouter/AdminRouter';
import SuperAdminRouter from '../../routes/superAdminRouter/SuperAdminRouter';
import TopNav from '../../component/AdminDashboard/TopNav';
import '../../style/Home/Home.css'
import {Col, Row } from 'react-bootstrap';

function HomePage() {
  return (
    <>
    <Routes>
       

        <Route path='/user/*' element={<AdminRouter/>}/>
        <Route path='/dash/*' element={<SuperAdminRouter/>}/>
      </Routes>
      
    <div className='home-main-contsiner'>
    <TopNav/>
   
    <div className='home-redirect-container' style={{marginTop:'50px'}}>
      <Row className="justify-content-center">
        <Col md={4} className="mx-2 mb-3">
          <Card style={{ maxWidth: '300px' }}>
            <Card.Header as="h5">User</Card.Header>
            <Card.Body>
              <Card.Text>
                You can redirect to the user login.
              </Card.Text>
              <Link to="/user/login" className="btn btn-primary">Go to user login</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mx-2 mb-3">
          <Card style={{ maxWidth: '300px' }}>
            <Card.Header as="h5">Admin</Card.Header>
            <Card.Body>
              <Card.Text>
                You can redirect to the admin login.
              </Card.Text>
              <Link to="/dash/login" className="btn btn-primary">Go to admin login</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    <div>
      <p className='text-center  text-dark' style={{marginTop:'160px'}} >© 2024<span ><a href="https://www.ihdc.in/" className='text-dark text-decoration-none ml-2'>IHDC Building Systems Private Limited</a></span> All Rights Reserved <span><a className='text-dark text-decoration-none ml-2' href="https://www.ihdc.in/about/terms">Terms of Use</a></span> <span><a className='text-dark text-decoration-none ml-2' href="https://www.ihdc.in/about/privacy">Privacy Policy</a></span>  <span><a className='text-dark text-decoration-none ml-2' href="https://www.ihdc.in/about/refund">Refund Policy</a></span></p>
    </div>
    </div>
    </>
  );
}

export default HomePage;










// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import AdminRouter from '../../routes/AdminRouter/AdminRouter';
// import SuperAdminRouter from '../../routes/superAdminRouter/SuperAdminRouter';

// function HomePage() {
//   return (
//     <>
//     <Routes>
       

//         <Route path='/user/*' element={<AdminRouter/>}/>
//         <Route path='/admin/*' element={<SuperAdminRouter/>}/>
//       </Routes>
   
//     {/* <div className="container mt-5">
//       <Card>
//         <Card.Header as="h5">User</Card.Header>
//         <Card.Body>
//           <Card.Text>
//             You can redirect to the user login.
//           </Card.Text>
//           <Link to="/user/login">Go to login</Link>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Header as="h5">Admin</Card.Header>
//         <Card.Body>
//           <Card.Text>
//             You can redirect to the admin login.
//           </Card.Text>
//           <Link to="/admin/login">Go to admin login</Link>
//         </Card.Body>
//       </Card>
//     </div> */}
//      <div className="container mt-5 d-flex justify-content-center">
//       <div>
//         <Card className="mx-auto" style={{ maxWidth: '300px' }}>
//           <Card.Header as="h5">User</Card.Header>
//           <Card.Body>
//             <Card.Text>
//               You can redirect to the user login.
//             </Card.Text>
//             <Link to="/user/login">Go to user login</Link>
//           </Card.Body>
//         </Card>
//         <Card className="mx-auto mt-3" style={{ maxWidth: '300px' }}>
//           <Card.Header as="h5">Admin</Card.Header>
//           <Card.Body>
//             <Card.Text>
//               You can redirect to the admin login.
//             </Card.Text>
//             <Link to="/admin/login">Go to admin login</Link>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//     </>
//   );
// }

// export default HomePage;
