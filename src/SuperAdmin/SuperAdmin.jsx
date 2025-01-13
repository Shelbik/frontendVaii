import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import RestaurantTable from "./Restaurants/RestaurantTable";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import RestaurantRequest from "./RestaurantRequest/RestaurantRequest";
// import AdminDashboard from "./Dashboard/AdminDashboard";
// import AdminSidebar from "./AdminSidebar";
// import RestaurantDashboard from "./Dashboard/RestaurantDashboard";
// import RestaurantsOrder from "./Orders/RestaurantsOrder";
// import RestaurantsMenu from "./MenuItem/RestaurantsMenu";
// import AddMenuForm from "./AddMenu/AddMenuForm";
// import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm";

const SuperAdmin = () => {
  // Состояние для управления открытием и закрытием бокового меню
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Функция для переключения видимости бокового меню
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Боковое меню */}
      <SuperAdminSidebar open={sidebarOpen} handleClose={toggleSidebar} />

      {/* Контент */}
      <div className="lg:w-3/4 w-full p-5 overflow-auto">
        {/* Кнопка для открытия/закрытия бокового меню на мобильных устройствах */}
        <div className="lg:hidden flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-white p-2 bg-blue-600 rounded-lg"
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>

        <Routes>
          <Route path="/super-admin/customers" element={<Customers />} />
          <Route path="/super-admin/restaurants" element={<SuperAdminRestaurant />} />
          {/* <Route path="/super-admin/restaurant-request" element={<RestaurantRequest />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
