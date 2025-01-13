import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import Customers from "./SuperAdminCustomerTable/Customers";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import RestaurantRequest from "./RestaurantRequest/RestaurantRequest";

const SuperAdminDashboard = () => {
  return (
    <div className="lg:flex">
      {/* Sidebar */}
      <div className="w-[20vw]">
        <SuperAdminSidebar />
      </div>

      {/* Main content */}
      <div className="w-[80vw] p-5">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/restaurants" element={<SuperAdminRestaurant />} />
          <Route path="/restaurant-request" element={<RestaurantRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
