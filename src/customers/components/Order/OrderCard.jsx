import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({ order }) => {
  console.log("Order in OrderCard:", order);

  if (!order || !order.items || order.items.length === 0) {
    return null;
  }

  return (
    <Card className="flex justify-between items-center p-5 mb-4">
      {order.items.map((item, index) => (
        <div key={index} className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <img
              className="h-16 w-16 object-cover rounded"
              src={item.food.images[0]}
              alt={item.food.name}
            />
            <div>
              <p className="font-semibold">{item.food.name}</p>
              <p className="text-gray-400">Quantity: {item.quantity}</p>
              <p className="text-gray-400">${item.totalPrice}</p>
            </div>
          </div>
          <div>
            <Button 
              className="cursor-not-allowed" 
              variant="contained"
              color={order.orderStatus === "PENDING" ? "warning" : 
                     order.orderStatus === "COMPLETED" ? "success" : 
                     order.orderStatus === "DELIVERED" ? "success" : "primary"}
            >
              {order.orderStatus}
            </Button>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default OrderCard;