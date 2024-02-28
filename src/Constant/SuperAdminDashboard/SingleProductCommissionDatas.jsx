export const CommissionctColumn=[
    {
        name: 'Name',
        selector: (row) => row.user?.user?.name,
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
        name: 'Com level',
        selector: (row) => row.level_of_commission,
        sortable: true,
      },
      
      {
        name: 'Purchased Date',
        selector: (row) => row.commission_credited_on,
        sortable: true,
      },
      {
        name: 'Payout status',
        selector: (row) => row.commission_payment_status,
        sortable: true,
      },
      
]
