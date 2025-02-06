import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";
import AccountSettings from "../../components/AccountSettings/AccountSettings";

const Profile = ({ openSideBar, setOpenSideBar }) => {

  const handleMenuToggle = () => {
    setOpenSideBar(prevState => !prevState);  
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-screen">
      
      <div className="sticky top-0 lg:w-[20%] w-full h-[auto] lg:h-full">
        <ProfileNavigation 
          open={openSideBar} 
          handleClose={handleMenuToggle}
        />
      </div>

      
      <div className="lg:w-[80%] w-full h-full overflow-auto flex flex-col">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/payments" element={<Orders />} />
          <Route path="/events" element={<CustomerEvents />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path='/settings' element={<AccountSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
