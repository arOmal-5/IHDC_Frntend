export const CommissionctColumn=[
    {
        name: 'Name',
        selector: (row) => row.user?.user?.name,
        sortable: true,
      },
      {
        name: 'Source of Comm',
        selector: (row) => row.paid_user?.user?.name,
        sortable: true,
      },
      {
        name: 'Product',
        selector: (row) => row.product?.name,
        sortable: true,
      },
      
    //   {
    //     name: 'Product',
    //     selector: (row) => row.product?.name,
    //     sortable: true,
    //   },
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
        selector: (row) => {
          return row.level_of_commission ? `${row.level_of_commission}` : '---';
        },
        sortable: true,
      },
      
      {
        name: 'Earned Date',
        selector: (row) => row.commission_credited_on,
        sortable: true,
      },
      {
        name: 'Payout status',
        selector: (row) => row.commission_payment_status,
        sortable: true,
      },
      
]

export const paymentColumn=[
  {
      name: 'Type',
      selector: (row) => row.payment_type,
      sortable: true,
    },
    {
      name: 'Purchase Date',
      selector: (row) => row.payment_done_at,
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row) => row.product?.name,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.payment_total_amount_paid,
      sortable: true,
    },
    {
      name: 'Through',
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) =>
        row.payment_status ? (
          <span style={{ color: 'green' }}>Success</span>
        ) : (
          <span style={{ color: 'red' }}>Failed</span>
        ),
      sortable: true,
    }
    
]
