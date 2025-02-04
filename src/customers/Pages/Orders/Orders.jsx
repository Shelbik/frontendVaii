import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Update these import paths to match your project structure
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import OrderCard from '../../components/Order/OrderCard';
import { CircularProgress } from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  console.log("Orders from Redux:", orders);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">Error loading orders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20">
      <h1 className="py-7 text-xl font-semibold">Your Orders</h1>
      <div className="space-y-5">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;