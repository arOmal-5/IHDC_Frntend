export const OrganiserColumn=[
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
        selector: (row) => row?.user_details?.phone || '---',
        sortable: true,
      }
]

export const OrganiserData=[
    {
        name:'smart pix media',
        phone:'9645612754',
        email:'smart@gmail.com'

    }
]

export const OrganiserPendingColumn=[
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
    name: 'Product',
    selector: (row) => row?.product?.name || '---',
    sortable: true,
  }
  // {
  //   name: 'Phone',
  //   selector: (row) => row?.user_details?.phone || '---',
  //   sortable: true,
  // }

]

export const PendingData=[
  {
      name:'smart pix media',
      phone:'9645612754',
      email:'smart@gmail.com'

  }
]