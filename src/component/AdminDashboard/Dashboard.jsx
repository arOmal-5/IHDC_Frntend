import React, { useState,useEffect,useContext } from 'react'
import '../../style/adminDashboard/Dashboard.css'
import Nav from 'react-bootstrap/Nav';
import CommissionHistoryComponent from '../../page/AdminDashboard/CommissionHistoryComponent'
import OverviewComponent from '../../page/AdminDashboard/OverviewComponent'
import ProductsComponent from '../../page/AdminDashboard/ProductsComponent';
import Card from 'react-bootstrap/Card';
import avatar from '../../Assets/img/avatar.jpg'
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import {selectUserToken} from '../../store/slice/AuthSlice'
import UserProfileComponent from '../../component/AdminDashboard/UserProfileComponent.jsx';
import MyContext from '../../store/MyContext.jsx';
import './DropdownButton.css'



function Dashboard() {
    const [ActiveKey, setActiveKey] = useState('Overview')
    const navigate=useNavigate()

  
    const {isProfileVisible, setIsProfileVisible} = useContext(MyContext);

    
    
  useEffect(() => {
    const handleProfileClick = () => {
      setIsProfileVisible(true);
    };

    const profileLink = document.getElementById('profileLink');
    

    if (profileLink) {
      profileLink.addEventListener('click', handleProfileClick);

      return () => {
        profileLink.removeEventListener('click', handleProfileClick);
      };
    }
  }, [isProfileVisible]);

  const handleLogout=()=>{
    localStorage.removeItem('usertoken')
    navigate('/user/login')
  }


    const renderComponent = () => {
        switch (ActiveKey) {
            case 'overview':
                return <OverviewComponent />;
            case 'Products':
                return <ProductsComponent />;
            case 'commission':
                return <CommissionHistoryComponent />;
           
            default:
                return <OverviewComponent />;
        }
    };

    
    return (
        <>{
            isProfileVisible?(
                <>

                
                <UserProfileComponent setIsProfileVisible={setIsProfileVisible}/>
                </>
       
           
            ):(
                <>
                <div className='admin-dashboard-main-container'>
                <div className='admin-dashboard-sub-container'>
                    <div className='admin-dashboard-navbar'>
                       
                        {/* <Nav fill variant="tabs" defaultActiveKey="link-1" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Overview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">Commission history</Nav.Link>
                        </Nav.Item>
                    </Nav> */}
                        <Card>
                   
                            <Card.Header style={{ backgroundColor: '#ffffff' }} >
                                <div className='admin-dashboard-nav-item-maincontainer'>
                                    <div >
                                        <Nav variant="tabs" defaultActiveKey="overview" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                                            <Nav.Item>
                                                <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="overview">Overview</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Products">Products</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="commission">
                                                    Transactions
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                    <div>
                                        <nav className="navbar navbar-expand-sm">
                                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbar-list-4">
                                                <ul className="navbar-nav ml-auto">
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <img src={avatar} width="40" height="40" className="rounded-circle" alt="User Avatar" />
                                                        </a>
                                                       <div className="dropdown-menu" style={{cursor:'pointer'}} aria-labelledby="navbarDropdownMenuLink">
                                                            <a className="dropdown-item"  id="profileLink">Profile</a>
                                                             <a className="dropdown-item" onClick={handleLogout}id='logoutLink' >Log Out</a>
                                                            {/* <p className='dropdown-item'>Profile</p>
                                                            <p className='dropdown-item'>Log Out</p> */}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>

                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {
                                 renderComponent()
                               
                                }
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
            </>
            )
}
<div className='superadmin-copyright-footer'>
{/* <p>Copyright@IHDC Homes 2024+. All Rights Reserved.</p> */}
             </div>

        </>
    )
}

export default Dashboard


