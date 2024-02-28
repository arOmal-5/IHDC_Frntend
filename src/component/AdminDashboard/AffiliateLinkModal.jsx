import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../style/adminDashboard/AffiliateLink.css'


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
          Your Affiliate Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='admin-dashboard-affiliatelink-creation-container'>
            <div>
            <p>Your Affiliate Link :</p>
            </div>
            <div>
                <button className='admin-dashboard-affiliatelink-generate-link-button'>Generate Link</button>
            </div>
        
        </div>
        
        <input type="text" name="" id="" className='admin-dashboard-affiliatelink-input' />
        <button className='admin-dashboard-affiliatelink-copy-button'>copy</button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AffiliateLinkModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button  style={{ backgroundColor: '#3aa3e3', }} onClick={() => setModalShow(true)}>
        view link
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AffiliateLinkModal