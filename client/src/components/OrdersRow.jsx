import React from 'react'

import {Link} from 'react-router-dom'

const OrdersRow = (props) => {
  const isAdmin = false
  const {date, amount, status} = props.order
  
 

  return (
    <tr>
      <th>#{props.index + 1}</th>
      <td>{new Date(date).toLocaleString()}</td>
      <td>$ {amount.toFixed(2)}</td>
      <td><span className='label label-info'>{status}</span>
      </td>
      <td>
        <Link to={`/orders/details/${props.order._id}`} className='btn btn-outline-warning btn-sm'>View</Link>
      </td>
      {isAdmin && <td><button className='btn btn-outline-success btn-sm' onClick={() => console.log('"approve')}>Approve</button></td>}
    </tr>
  )
}

export default OrdersRow