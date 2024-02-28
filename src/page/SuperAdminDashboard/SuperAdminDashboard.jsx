import React, { useState,useEffect } from 'react'
import '../../style/SuperAdminDashboard/SuperAdminDashboard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import OverViewComponent from '../../component/SuperAdminComponent/OverViewComponent';
import OrganiserComponent from '../../component/SuperAdminComponent/OrganiserComponent';
import InfluencerComponent from '../../component/SuperAdminComponent/InfluencerComponent/InfluencerComponent';
import SuperadminProductComponent from '../../component/SuperAdminComponent/ProductComponent/SuperadminProductComponent';
import avatar from '../../Assets/img/avatar.jpg'
import SubscribeComponent from '../../component/SuperAdminComponent/SubscribeComponent/SubscribeComponent';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { useNavigate } from 'react-router-dom';
import ListUserComponent from '../../component/SuperAdminComponent/ListUserComponent';
import OverallCommission from '../../component/SuperAdminComponent/OverallCommission';
// import { useSelector } from 'react-redux';
// import {selectAdminToken} from '../../store/slice/AdminAuthSlice'



function SuperAdminDashboard() {
    
    const [ActiveKey, setActiveKey] = useState('overview')
    // const token=useSelector(selectAdminToken)
    const navigate=useNavigate() 
    
    const renderComponent = () => {
        switch (ActiveKey) {
            case 'overview':
                return <OverViewComponent />;
            case 'organiser':
                return <OrganiserComponent />;
            case 'influencer':
                return <InfluencerComponent />;
            case 'product':
                return <SuperadminProductComponent />;
            case 'commission':
                return <OverallCommission/> 
            case 'subscribe':
                return <SubscribeComponent/>   
            case 'users':
                return <ListUserComponent/>   
            default:
                return <OverViewComponent />;
        }
    };

    const handleLogout=()=>{
        localStorage.removeItem('admintoken')
        navigate('/dash/login')
    }

    return (
        <>
            <div className='super-admin-dashboard-main-container'>
                <div className='super-admin-dashboard-sub-container'>
                    
                    <Card>

                        <Card.Header style={{ backgroundColor: '#ffffff' }} >
                            <div className='admin-dashboard-nav-item-maincontainer'>
                                <div >
                                    <Nav variant="tabs" defaultActiveKey="overview" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="overview">Overview</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="organiser">Organiser</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="influencer">
                                                Influencer
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="product">
                                                Product
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="commission">
                                                Commissions
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="users">
                                            Users
                                            </Nav.Link>
                                        </Nav.Item>
                                        {/* <Nav.Item>
                                            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="users">
                                                Users
                                            </Nav.Link>
                                        </Nav.Item> */}
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
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <a className="dropdown-item" href="#">Profile</a>
                                                        <a className="dropdown-item" onClick={handleLogout}>Log Out</a>
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
             <div className='superadmin-copyright-footer'>
<p>CopyRight@IHDC Homes 2023+.All Right Reserved</p>
             </div>

        </>
    )
}

export default SuperAdminDashboard

