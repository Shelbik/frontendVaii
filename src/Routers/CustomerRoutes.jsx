import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customers/Pages/Home/HomePage";
import Navbar from "../customers/components/Navbar/Navbar";
import Cart from "../customers/Pages/Cart/Cart";
import Profile from "../customers/Pages/Profile/Profile";
import PaymentSuccess from "../customers/Pages/PaymentSuccess/PaymentSuccess";
import Search from "../customers/components/Search/Search";
import CreateRestaurantForm from "../Admin/AddRestaurants/CreateRestaurantForm";
import Restaurant from "../customers/Pages/Restaurant/Restaurant";
import PasswordChangeSuccess from "../customers/Pages/Auth/PasswordChangeSuccess";
import NotFound from "../customers/Pages/NotFound/NotFound";

const CustomerRoutes = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSidebar = () => {
    console.log("Sidebar toggle function called");
    setOpenSideBar((prevState) => !prevState);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Верхняя часть фиксирована */}
      <nav className="sticky top-0 z-50">
        <Navbar onMenuClick={toggleSidebar} />
      </nav>
      {/* Основной контент */}
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/account/:register" element={<HomePage />} />
          <Route exact path="/restaurant/:city/:title/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment/success/:id" element={<PaymentSuccess />} />
          <Route path="/my-profile/*" element={<Profile openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin/add-restaurant" element={<CreateRestaurantForm />} />
          <Route exact path="/password_change_success" element={<PasswordChangeSuccess />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};


export default CustomerRoutes;
