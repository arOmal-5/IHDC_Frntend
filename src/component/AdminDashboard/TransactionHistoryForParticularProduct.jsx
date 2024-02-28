import React, { useState,useEffect } from 'react'
import '../../style/adminDashboard/TransactionHistoryForParticularProduct.css'
import Card from 'react-bootstrap/Card';
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
import {RotatingLines} from 'react-loader-spinner';





function TransactionHistoryForParticularProduct({productId}) {

  const token=localStorage.getItem('usertoken')
  const [productTraction, setProductTraction] = useState(0);
  const [productgrossSale, setProductgrossSale] = useState(0);
  const [productCommission, setproductCommission] = useState(0);
  const [productClicks, setproductClicks] = useState(0);
  const [productConvertionrate, setproductConvertionrate] = useState(0);
  const [productEPC, setproductEPC] = useState(0);
  const [productAverageOrderValue, setproductAverageOrderValue] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axiosInstance.get(`product/user/overall/per/product/analytics/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(function (analyticsResponse) {
      // console.log('affiliatelink.data', analyticsResponse.data);
      setProductTraction(analyticsResponse.data.transaction_count)
      setProductgrossSale(analyticsResponse.data.total_gross_sale)
      setproductCommission(analyticsResponse.data.total_commission)
      setproductClicks(analyticsResponse.data.clicks)
      setproductEPC(analyticsResponse.data.e_p_c)
      setproductConvertionrate(analyticsResponse.data.converstion_rate)
      setproductAverageOrderValue(analyticsResponse.data.avg_order_value)
      setLoading(false)
    })
    .catch(function (error) {
      // console.log(error, 'error');
    });
  }, [productId, token]);  // Include dependencies in the dependency array
  
    
    // const fetchData = async () => {
    //   try {
        
    //       // setProductAnalyticsss(response.data)
    //   //  const analyticsResponse=await axiosInstance.get(`user/overall/per/product/analytics/${productId}`,{
    //   //   headers: {
    //   //     'Authorization': `Bearer ${token}`
    //   //   }
    //   //  })
    //   //  console.log('affiliatelink.data',analyticsResponse.data);
    //   // //  setProductAnalytics(affiliatelink.data)   
    //   } catch (error) {

        
    //   }
      
       
      
    // }
    



  return (
    <>
    <div className='user-dashboard-TransactionHistoryForParticularProduct-container'>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Total Customer</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>{productTraction}</Card.Title>

          )}
          <Card.Text>
            Total Customer
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Total Transcations</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>{productTraction}</Card.Title>

          )}
          <Card.Text>
          Total Transcations
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Gross Sale</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>₹{productgrossSale}</Card.Title>

          )}
          <Card.Text>
          Gross Sale
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Net Commission</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>₹{productCommission}</Card.Title>

          )}
          <Card.Text>
          Net Commission
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Total Clicks</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>{productClicks}</Card.Title>

          )}
          <Card.Text>
            Total Clicks
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Conversion Rate</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>{productConvertionrate}%</Card.Title>

          )}
          <Card.Text>
          Conversion Rate
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>EPC</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>₹{productEPC}</Card.Title>

          )}
          <Card.Text>
          EPC
          </Card.Text>
        </Card.Body>
      </Card>

        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Avg.order value</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>{productAverageOrderValue}</Card.Title>

          )}
          <Card.Text>
          Avg.order value
          </Card.Text>
        </Card.Body>
      </Card>

        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Refunded Customers</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>0</Card.Title>

          )}
          <Card.Text>
          Refunded Customers
          </Card.Text>
        </Card.Body>
      </Card>

        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Refund Transaction</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>0</Card.Title>

          )}
          <Card.Text>
          refund Transaction
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Refund Rate</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>0</Card.Title>

          )}
          <Card.Text>
          Refund Rate
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
        <div>
        <Card border="secondary" style={{ width: '14rem' }}>
        <Card.Header>Refund Amount</Card.Header>
        <Card.Body>
        {loading ? (
            // Show loader while data is being fetched
            <RotatingLines type="RotatingLines" color="#6da8ba" height={40} width={40} />
          ) : (
            // Render netCommission when data fetching is complete
            <Card.Title>0</Card.Title>

          )}
          <Card.Text>
          Refund Amount
          </Card.Text>
        </Card.Body>
      </Card>
        </div>



    </div>
      
    </>
  )
}

export default TransactionHistoryForParticularProduct
