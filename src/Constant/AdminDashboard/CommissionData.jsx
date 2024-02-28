import axiosInstance from '../../config/axios/AxiosConfiguration';
import UserGenerateInvoice from '../../component/AdminDashboard/UserGenerateInvoice';
const token = localStorage.getItem('usertoken');






export const CommissionctColumn=[
    {
        name: 'Name',
        selector: (row) => 'User',
        sortable: true,
      },
      
      
      {
        name: 'Product',
        selector: (row) => row.product?.name,
        sortable: true,
      },
      {
        name: 'Earned',
        selector: (row) => `₹${row.commission_amount}`,
        sortable: true,
      },
      {
        name: 'Comm %',
        selector: (row) => {
          return row.commission_percent_got ? `${row.commission_percent_got}%` : '---';
        },
        sortable: true,
      },
      {
        name: 'Comm Tier',
        selector: (row) => row.level_of_commission,
        sortable: true,
      },
      {
        name: 'Earned On',
        selector: (row) => {
          const [year, month, day] = row.commission_credited_on.split('-');
          return `${day}-${month}-${year}`;
        },
        sortable: true,
      },
      
      
      // {
      //   name: 'Earned On',
      //   selector: (row) => {
      //     const earnedDate = new Date(row.commission_credited_on);
      //     const month = String(earnedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
      //     const day = String(earnedDate.getDate()).padStart(2, '0');
      //     const year = earnedDate.getFullYear();
          
      //     return `${month}-${day}-${year}`;
      //   },
      //   sortable: true,
      // },
      
      {
        name: 'Payout status',
        selector: (row) => row.commission_payment_status,
        sortable: true,
      },
      
]




export const CommissionctColumnofsingleProduct=[
  {
      name: 'Name',
      selector: (row) => 'User',
      sortable: true,
    },
    
    
    // {
    //   name: 'Product',
    //   selector: (row) => row.product?.name,
    //   sortable: true,
    // },
    {
      name: 'Earned',
      selector: (row) => `₹${row.commission_amount}`,
      sortable: true,
    },
    {
      name: 'Comm %',
      selector: (row) => {
        return row.commission_percent_got ? `${row.commission_percent_got}%` : '---';
      },
      sortable: true,
    },
    {
      name: 'Comm Tier',
      selector: (row) => row.level_of_commission,
      sortable: true,
    },
    {
      name: 'Earned On',
      selector: (row) => {
        const [year, month, day] = row.commission_credited_on.split('-');
        return `${day}-${month}-${year}`;
      },
      sortable: true,
    },
    
    
    // {
    //   name: 'Earned On',
    //   selector: (row) => {
    //     const earnedDate = new Date(row.commission_credited_on);
    //     const month = String(earnedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    //     const day = String(earnedDate.getDate()).padStart(2, '0');
    //     const year = earnedDate.getFullYear();
        
    //     return `${month}-${day}-${year}`;
    //   },
    //   sortable: true,
    // },
    
    
    {
      name: 'Payout status',
      selector: (row) => row.commission_payment_status,
      sortable: true,
    },
    
]

// const handleGenerateInvoice = async (transaction_id) => {
//   <UserGenerateInvoice transaction_id = {transaction_id}/>
//   console.log('iooo', transaction_id)

// //   try {
// //     const InvoicegenerationResponse = await axiosInstance.post(`userapp/user/invoice/generation/by/user/${transaction_id}`, {
// //       headers: {
// //         'Authorization': `Bearer ${token}`
// //       }
// //     });
// //     console.log('InvoicegenerationResponse',InvoicegenerationResponse)
// //   } catch (error) {
// //     console.error('Error generating invoice:', error);
// //     // alert(error);
// //   }
// };

export const paymentColumn=[
  {
      name: 'Type',
      selector: (row) => row.product_service,
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row) => row.product?.name,
      sortable: true,
    },
    // {
    //   name: 'Purchase Date',
    //   selector: (row) => row.payment_done_at,
    //   sortable: true,
    // },
    {
      name: 'Purchase Date',
      selector: (row) => {
        const doneAtDate = new Date(row?.payment_done_at);
        const day = doneAtDate.getDate().toString().padStart(2, '0');
        const month = (doneAtDate.getMonth() + 1).toString().padStart(2, '0');
        const year = doneAtDate.getFullYear();
        const hours = doneAtDate.getHours().toString().padStart(2, '0');
        const minutes = doneAtDate.getMinutes().toString().padStart(2, '0');
        // const seconds = doneAtDate.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        const formattedTime = `${day}-${month}-${year}   ${hours % 12 || 12}:${minutes}  ${ampm}`;
    
        return formattedTime;
      },
      sortable: true,
    },
    
    
    {
      name: 'Amount',
      selector: (row) => <span style={{ fontFamily: 'Arial' }}>₹ {row.payment_total_amount_paid}/-</span>,
      sortable: true,
    },
    
    // {
    //   name: 'Amount',
    //   selector: (row) => `₹${row.total_amount}`,
    //   sortable: true,
    // },
    {
      name: 'Through',
      selector: (row) => row.payment_method ? row.payment_method : row.payment_method,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) =>
        row.payment_request?.request_successfully_completed_or_not? (
          <span style={{ color: 'green' }}>Success</span>
        ) : (
          <span style={{ color: 'red' }}>Failed</span>
        ),
      sortable: true,
    },
//     {
//       name: 'Invoice',
//       button: true, // Indicates that this column should render as a button
//       cell: (row) => (
//         // <button onClick={() => handleDownloadInvoice(row)}>Download</button>
//         <button onClick={() => handleGenerateInvoice(row.id)}>Generate</button>
//         // <button onClick="">Generate</button>
//       ),
//       ignoreRowClick: true, // Prevents row click event when clicking the button
//       allowOverflow: true, // Allows the content to overflow into the next cell
//       buttonStyle: {
//         color: 'white',
//         backgroundColor: 'blue',
//       },
//     },
    
]

// export const Data=[
//     {
//         type:'payout',
//         date:'10-10-23',
//         product:'youtube',
//         amount:'1500',
//         through:'paypal'
//     },
//     {
//       type:'payout',
//       date:'10-11-23',
//       product:'facebook',
//       amount:'1400',
//       through:'Razorpay'
//   }

// ]