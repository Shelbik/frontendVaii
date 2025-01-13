import React, { useEffect } from 'react'
import OrderCard from '../../components/Order/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../../State/Customers/Orders/Action';

const Orders = () => {
  const {order,auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
  console.log("Fetching orders...");
  dispatch(getUsersOrders(jwt));
}, [auth.jwt]);

useEffect(() => {
  console.log("Fetched orders:", order.orders);
}, [order.orders]);


  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
      {order.orders && order.orders.map((order) => (
  order.items?.map((item) => (
    <OrderCard key={item.id} status={order.orderStatus} order={item} />
  ))
))}


</div>

    </div>
  )
}

export default Orders