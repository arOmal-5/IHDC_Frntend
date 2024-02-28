import { number } from "yup";
// import ApproveUserRequest from "../../component/AdminDashboard/ApproveUserRequest";
import ApproveUserRequest from "../../../src/component/AdminDashboard/ApproveUserRequest"

import axiosInstance from '../../config/axios/AxiosConfiguration';
const token = localStorage.getItem('usertoken');



export const allusercoloumn=[
  // {
  //   name: 'Sl No',
  //   selector: (_, index) => index + 1,
  //   sortable: true,
  // },
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email ?  row?.user?.email: "---",
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone ? row?.user_details?.phone: "---",
        sortable: true,
      },
      {
        name: 'Registered On',
        selector: (row) => {
          const joinedDate =row?.user?.date_joined 

            if (!joinedDate){
            return ''; // Handle the case where payment_done_at is null or undefined
          }
      
          const earnedDate = new Date(joinedDate);
          const hours = earnedDate.getHours();
          const amOrPm = hours >= 12 ? 'PM' : 'AM';
          const formattedDate = `${earnedDate.getDate()}/${earnedDate.getMonth() + 1}/${earnedDate.getFullYear()}  ${hours % 12 || 12}:${earnedDate.getMinutes()} ${amOrPm}`;
      
      
          return formattedDate;
        },
        sortable: true,


        // name: 'Purchased on',
        // selector: (row) => {
        //   const paymentDoneAt = row.payment_done_at;
          
        //   if (!paymentDoneAt) {
        //     return ''; // Handle the case where payment_done_at is null or undefined
        //   }
      
        //   const earnedDate = new Date(paymentDoneAt);
        //   const formattedDate = `${earnedDate.getDate()}/${earnedDate.getMonth() + 1}/${earnedDate.getFullYear()} : ${earnedDate.getHours()}:${earnedDate.getMinutes()}`;
      
        //   return formattedDate;
        // },
        // sortable: true,

      },
      {
        name: 'Registered By',
        selector: (row) => row?.user_details?.registration_done_by === 'Admin' ? `${row?.user_details?.registration_done_by} - ${row?.user_details?.registration_done_by_user?.name}` : row?.user_details?.registration_done_by,
        sortable: true,
      },
      
]

export const nonpurchsedUserColoumn=[
  // {
  //   name: 'Sl No',
  //   selector: (_, index) => index + 1,
  //   sortable: true,
  // },
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email ? row?.user?.email : "---",
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone ? row?.user_details?.phone: "---",
        sortable: true,
      }
]

export const nonRefferalUSerColounm=[
  // {
  //   name: 'Sl No',
  //   cell: (row, index) => {
  //     const currentPage = row?.tableData?.page;
  //     const rowsPerPage = row?.tableData?.rowsPerPage;
  //     const serialNumber = index + 1 + currentPage * rowsPerPage;
  //     return serialNumber;
  //   },
  //   sortable: true,
  // },
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email ? row?.user?.email : "---",
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user_details?.phone ? row?.user_details?.phone : "---",
        sortable: true,
      }
]

export const approvalPendingUserColoumn=[
  // {
  //   name: 'Sl No',
  //   selector: (_, index) => index + 1,
  //   sortable: true,
  // },
    {
        name: 'Name',
        selector: (row) => row?.user?.name,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user?.email ? row?.user?.email : "---",
        sortable: true,
      },
      {
        name: 'Phone',
        selector: (row) => row?.user?.phone ? row?.user?.phone: "---",
        sortable: true,
      },
      {
        name: 'Registered On',
        selector: (row) => {
          const joinedDate =row?.user?.date_joined 

            if (!joinedDate) {
            return ''; // Handle the case where payment_done_at is null or undefined
          }
      
          const earnedDate = new Date(joinedDate);
          const hours = earnedDate.getHours();
          const amOrPm = hours >= 12 ? 'PM' : 'AM';
          const formattedDate = `${earnedDate.getDate()}/${earnedDate.getMonth() + 1}/${earnedDate.getFullYear()}  ${hours % 12 || 12}:${earnedDate.getMinutes()} ${amOrPm}`;
      
      
          return formattedDate;
        },
        sortable: true,
      },
    //   {
      
    //     name: 'Approve',
    //     cell: (row) => (
         
    //       <ApproveUserRequest user_details_id={row.id} />
  
    //     ),
    //     sortable: false,
  
      
    // },
    
]

// export const purchasedUserColoumn=[
//     {
//         name: 'Name',
//         selector: (row) => row?.user?.name,
//         sortable: true,
//       },
//       {
//         name: 'Email',
//         selector: (row) => row?.user?.email,
//         sortable: true,
//       },
//       {
//         name: 'Phone',
//         selector: (row) => row?.user_details?.phone,
//         sortable: true,
//       }
// ]

// const handleSendInvoice = async (transaction_id) => {
//   try {
//     const InvoicegenerationResponse = await axiosInstance.post(`userapp/user/invoice/generation/by/admin/for/user/${transaction_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     console.log('InvoicegenerationResponse',InvoicegenerationResponse)
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     // alert(error);
//   }
// };

export const purchasedUserColoumn=[
  // {
  //   name: 'Sl No',
  //   selector: (_, index) => index + 1,
  //   sortable: true,
  // },
    {
        name: 'Name',
        selector: (row) => row?.user_link.user?.name ?row?.user_link.user?.name : "---" ,
        sortable: true,
      }
      ,{
        name: 'Phone',
        selector: (row) => row?.user_link?.user?.phone ? row?.user_link?.user?.phone : "---",
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row?.user_link?.user?.email ? row?.user_link?.user?.email : "---",
        sortable: true,
      },
      
      {
        name: 'Type',
        selector: (row) => row.product_service,
        sortable: true,
      },
      {
        name: 'Products Name',
        selector: (row) => row?.product?.name,
        sortable: true,
      },
      {
        name: 'Products amt',
        selector: (row) => <span style={{ fontFamily: 'Arial' }}>₹ { row?.payment_total_amount_paid}/-</span>,
        
        sortable: true,
      },
      {
  name: 'Purchased on',
  selector: (row) => {
    const paymentDoneAt = row.payment_done_at;

    if (!paymentDoneAt) {
      return ''; // Handle the case where payment_done_at is null or undefined
    }

    const earnedDate = new Date(paymentDoneAt);
    const localDate = new Date(earnedDate.getTime() - earnedDate.getTimezoneOffset() * 60000); // Adjust for timezone offset
    const hours = localDate.getHours()+1;
    const amOrPm = hours >= 12 ? 'AM' : 'PM';
    const formattedHours = (hours % 12) || 12; // Convert 0 to 12
    const formattedMinutes = localDate.getMinutes();
    
    const formattedDate = `${localDate.getDate()}/${localDate.getMonth() + 1}/${localDate.getFullYear()} ${formattedHours}:${formattedMinutes} ${amOrPm} `;
    
    return formattedDate;
  },
  sortable: true,
},
{
  name: 'Transaction added by',
  selector: (row) => row?.payment_details_added_by === 'Admin' ? `${row?.payment_details_added_by} - ${row?.payment_details_added_user?.name}` : row?.payment_details_added_by,
  sortable: true,
},

  //     {
  //       name: 'Invoice',
  //       button: true, // Indicates that this column should render as a button
  //       cell: (row) => (
          
  //         <button onClick={() => handleSendInvoice(row.id)}>Send</button>
    
  //       ),
  //       ignoreRowClick: true, // Prevents row click event when clicking the button
  //       allowOverflow: true, // Allows the content to overflow into the next cell
  //       buttonStyle: {
  //         color: 'white',
  //         backgroundColor: 'blue',
  // },
  // },
  
      
      
      
      
]
