export const subscribe=[
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
        selector: (row) => row?.payment_total_amount_paid
        ,
        sortable: true,
      },
      {
        name: 'Done at',
        selector: (row) => row?.payment_done_at,
        sortable: true,
      },
]

export const subscribeData=[
    {
        'name':'akhil',
        'product':'ihdc',
        'amt':'2999'
    }

]