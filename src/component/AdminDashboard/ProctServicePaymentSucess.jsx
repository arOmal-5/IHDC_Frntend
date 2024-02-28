import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import Button from 'react-bootstrap/Button';
import abc from '../../Assets/img/site-visit-payment-modal.png'
import { RotatingLines } from 'react-loader-spinner';
import TopNav from '../../component/AdminDashboard/TopNav'

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(true);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true)
  const [transaction_id, setTransaction_id] = useState('')


  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const unique_transaction_id = queryParams.get('id');

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(`product/service/payment/successful/completed/${unique_transaction_id}`);
        if (isMounted.current) {
          console.log(response.data.message, '')
          console.log(response.data, '')
          setApiResponse(response.data.message);
          setTransaction_id(response.data.transaction_id)
          setLoading(false)

        }
      } catch (error) {
        if (isMounted.current) {
          setApiResponse(error.response.data.message);
          setLoading(false)

        }
      }
    };

    fetchData();
  }, [location.search]);

  const handleNavigate = () => {
    navigate('/user');
  };
  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    
  };
  

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <RotatingLines type="RotatingLines" color="#6da8ba" height={50} width={50} />
      </div>
    );
  }
  
  

  return (
<>
<TopNav/>
    <div style={pageContainerStyle}>
      
      <animated.div style={{ ...fadeIn, ...pageStyle }}>
        {apiResponse === 'Payment completed' ? (
          <>
            <FontAwesomeIcon icon={faCheckCircle} style={iconStyle} />
            <h1 style={headingStyle}>Payment Successful!</h1>
            <p style={textStyle}>
               <b>You will be contacted by our Community Manager shortly</b> <br/><br/>
              Thank you for your payment. Your transaction was successfull.
            </p>
            <div style={additionalInfoStyle}>
              <p>Transaction ID: {transaction_id}</p>
            </div>
            {/* <Button variant="primary" style={buttonStyle}>
              <a href="https://chat.whatsapp.com/LDcJy2WC7ZhHsWufe6xIZO" style={{ color: 'white', textDecoration: 'none' }}>Join WhatsApp Community</a>
            </Button> */}
            <Button variant="success" className='ml-3' onClick={handleNavigate} style={buttonStyle}>
              Back to Dashboard
            </Button>
          </>
        ) : (
          <>
            <h1 style={{ color: 'red' }}>{apiResponse}</h1>
            <p></p>
            <Button variant="danger" onClick={handleNavigate} style={buttonStyle}>
              Back to Dashboard
            </Button>
          </>
        )}
      </animated.div>
    </div>
    </>
  );
}

const pageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const pageStyle = {
  textAlign: 'center',
  // paddingTop: '50px',
};

const headingStyle = {
  fontSize: '2em',
  color: '#28a745',
};

const textStyle = {
  fontSize: '1.2em',
  color: '#333',
  marginTop: '20px',
};

const additionalInfoStyle = {
  marginTop: '20px',
};

const iconStyle = {
  fontSize: '4em',
  color: '#28a745',
};

const buttonStyle = {
  marginTop: '20px',
};

export default PaymentSuccessPage;