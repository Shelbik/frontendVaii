import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const menu = [
  { title: "Restaurants", icon: <ShoppingBagIcon />, path: "/restaurants" },
  { title: "Customers", icon: <ShopTwoIcon />, path: "/customers" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

const SuperAdminSidebar = ({ handleClose, open }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
      handleClose();
    } else {
      navigate(`/super-admin${item.path}`);
      if (isSmallScreen) {
        handleClose();
      }
    }
  };

  return (
    <Drawer
      sx={{ 
        zIndex: 1,
        '& .MuiDrawer-paper': {
          width: isSmallScreen ? '50vw' : '20vw',
          boxSizing: 'border-box',
        },
      }}
      anchor="left"
      open={open}
      onClose={handleClose}
      variant={isSmallScreen ? "temporary" : "permanent"}
    >
      <div className="h-[100vh] flex flex-col justify-between py-20">
        <div className="flex flex-col flex-grow justify-evenly">
          <Divider />
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default SuperAdminSidebar;