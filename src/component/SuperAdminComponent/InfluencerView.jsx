import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { particularorganiserinfluencer } from '../../Constant/SuperAdminDashboard/InfluencerData';
import axiosInstance from '../../config/axios/AxiosConfiguration';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {`Influencers Under ${props.orgname.charAt(0).toUpperCase() + props.orgname.slice(1)}`}

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTable
          columns={particularorganiserinfluencer}
          data={props.influencerdatas}  // Use props to access the state from the parent component
          fixedHeader
          pagination
          customStyles={{
            table: {
              style: {
                border: '1px solid #ccc',
                background: '#ffffff',
              },
            },
            rows: {
              style: {
                backgroundColor: '#f9f9f9',
              },
            },
            header: {
              style: {
                background: '#333',
                color: '#fff',
              },
            },
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function InfluencerView({ orgid, orgname }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [influencerdatas, setInfluencerDatas] = useState([]);  // Lift state up

  const token = localStorage.getItem('admintoken');

  const handleFetchData = async () => {
    try {
      setModalShow(true);
      const response = await axiosInstance.get(`userapp/direct/refferals/${orgid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('response data', response.data);
      setInfluencerDatas(response.data);  // Update the state variable
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" className='btn-sm' onClick={handleFetchData}>
        Influencer
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        orgid={orgid}
        orgname={orgname}
        influencerdatas={influencerdatas}  // Pass the state to the modal
      />
    </>
  );
}

export default InfluencerView;
