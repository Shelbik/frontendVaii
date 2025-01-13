import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Routes, Route } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";
import AccountSettings from "../../components/AccountSettings/AccountSettings";

const Profile = ({ openSideBar, setOpenSideBar }) => {
  const handleMenuToggle = () => {
    setOpenSideBar((prevState) => !prevState); // Переключаем состояние бокового меню
  };

  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation
          open={openSideBar}
          handleClose={handleMenuToggle}
        />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/payments" element={<Orders />} />
          <Route path="/events" element={<CustomerEvents />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
