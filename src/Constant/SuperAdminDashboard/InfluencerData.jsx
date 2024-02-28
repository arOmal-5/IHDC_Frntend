export const particularorganiserinfluencer=[
  {
    name: 'Name',
    selector: (row) => row.user.name,
    sortable: true,
  },
  {
    name: 'email',
    selector: (row) => row.user.email,
    sortable: true,
  },
  {
    name: 'Product',
    selector: (row) => row?.product?.name,
    sortable: true,
  },
  {
    name: 'Reffered Date',
    selector: (row) => {
      const dateObject = new Date(row?.link_created_data);
      const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      return formattedDate;
    },
    sortable: true,
  }
  
]






export const particularorganiserinfluencerdata=[
  {
    name:'akhil',
    email:'akhil@gmail.com'
  },
  {
    name:'siju',
    email:'siju@gmail.com'
 },
]



export const InfluencerColumn=[
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email,
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone,
        sortable: true,
      }
]

export const InfluencerData=[
    {
        name:'Karthik surya',
        phone:'9645612754',
        email:'karthik@gmail.com'

    }
]

// const handleSendInvoice = async (row) => {
//   try {
//     console.error('API call from handleSendInvoice');
//     // const response = await axiosInstance.post(
//     //   "userapp/user/register/phonenumber/already/exists/check",
//     //   {
//     //     phone: mergedPhoneNumber,
//     //     email : registrationData.email
//     //   }
//     // );
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     alert('An error occurred. Please try again later.');
//   }
// };

export const particularproductuser=[
  {
      name: 'Name',
      selector: (row) => row?.user_link.user?.name,
      sortable: true,
    },
    {
      name: 'Products Name',
      selector: (row) => row?.product?.name,
      sortable: true,
    },
    {
      name: 'Products amt',
      selector: (row) => row?.payment_total_amount_paid,
      sortable: true,
    },
    {
      name: 'Done at',
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
      name: 'Through',
      selector: (row) => row.payment_method?row.payment_method : 'None' ,
      sortable: true,
    },
//     {
//       name: 'Invoice',
//       button: true, // Indicates that this column should render as a button
//       cell: (row) => (
//         <button onClick={() => handleSendInvoice(row)}>Send</button>
  
//       ),
//       ignoreRowClick: true, // Prevents row click event when clicking the button
//       allowOverflow: true, // Allows the content to overflow into the next cell
//       buttonStyle: {
//         color: 'white',
//         backgroundColor: 'blue',
// },
// },
    
    
]

export const paymentColumn=[
  {
    name: 'Name',
    selector: (row) => row?.user_link.user?.name,
    sortable: true,
  },
  {
      name: 'Type',
      selector: (row) => row.payment_type? row.payment_type : 'None',
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
        const doneAtDate = new Date(row?.request_at);
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
      selector: (row) => `₹${row.total_amount}`,
      sortable: true,
    },
    {
      name: 'Through',
      selector: (row) => row.payment_method?row.payment_method : 'None' ,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) =>
        row.request_successfully_completed_or_not? (
          <span style={{ color: 'green' }}>Success</span>
        ) : (
          <span style={{ color: 'red' }}>Failed</span>
        ),
      sortable: true,
    }
    
]