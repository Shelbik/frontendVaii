import React, { useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../Pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { pink } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToProfile = () => {
    auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div onClick={() => navigate("/")} className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <li className="logo font-semibold text-gray-300 text-2xl">Martiniuc Restaurant</li>
        </div>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span onClick={auth.user?.role === "ROLE_ADMIN" ? handleOpenMenu : navigateToProfile} className="font-semibold cursor-pointer">
              <Avatar sx={{ bgcolor: "white", color: pink.A400 }}>{auth.user.fullName[0].toUpperCase()}</Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => (auth.user?.role === "ROLE_ADMIN" ? navigate("/admin") : navigate("/super-admin"))}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <IconButton onClick={navigateToCart}>
          <Badge color="black" badgeContent={cart.cartItems?.length || 0}>
            <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
        {isSmallScreen && (
          <div className="lg:hidden">
            <IconButton onClick={onMenuClick} className="p-2 bg-white text-pink-500 rounded-md shadow-md">
              <MenuIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </div>
        )}
      </div>
      <Auth handleClose={() => navigate("/")} />
    </div>
  );
};

export default Navbar;
