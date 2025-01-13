import React, { useState } from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../State/Authentication/Action";
import { useDispatch } from "react-redux";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from "@mui/icons-material/Menu";  
import Profile from "../../Pages/Profile/Profile";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon />, path: "orders" },
  { title: "Favorites", icon: <FavoriteIcon />, path: "favorites" },
  { title: "Address", icon: <HomeIcon />, path: "address" },
  { title: "Payment", icon: <AccountBalanceWalletIcon />, path: "payment" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "notifications" },
  { title: "Events", icon: <EventIcon />, path: "events" },
  { title: "Account Settings", icon: <ManageAccountsIcon />, path: "settings" },
  { title: "Logout", icon: <LogoutIcon />, path: "" },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/"); // Перенаправление на главную страницу после выхода
    } else {
      navigate(`/my-profile/${item.path}`);
    }
    handleClose(); // Закрытие меню после выбора
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"} 
      onClose={handleClose}
      open={isSmallScreen ? open : true} 
      anchor="left"
      sx={{ zIndex: 1, position: "sticky" }}
    >
      <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-16 gap-7">
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => handleNavigate(item)}  
              className="px-5 flex items-center space-x-5 cursor-pointer"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>

           
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default ProfileNavigation;
