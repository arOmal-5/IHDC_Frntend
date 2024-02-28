export const ListUserColumn=[
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

export const ListUserData=[
    {
        name:'Karthik surya',
        phone:'9645612754',
        email:'karthik@gmail.com'

    }
]


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
      selector: (row) => row?.payment_done_at,
      sortable: true,
    },
]
