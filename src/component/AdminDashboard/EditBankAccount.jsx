import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditBankAccount() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className='btn btn-danger btn-sm' onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="accountHolderName">
              <Form.Label>Account Holder Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" />
            </Form.Group>

            <Form.Group controlId="accountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control type="text" placeholder="XXXXXXXXXXXX" />
            </Form.Group>

            <Form.Group controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control type="text" placeholder="Example Bank" />
            </Form.Group>

            <Form.Group controlId="accountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control as="select">
                <option value="savings">Savings</option>
                <option value="checking">Checking</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="branchName">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control type="text" placeholder="Main Branch" />
            </Form.Group>

            <Form.Group controlId="ifscCode">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control type="text" placeholder="ABC1234567" />
            </Form.Group>
          </Form>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBankAccount;
