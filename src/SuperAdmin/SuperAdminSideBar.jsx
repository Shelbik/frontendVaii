import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Restaurants", icon: <ShoppingBagIcon />, path: "/restaurants" },
  { title: "Customers", icon: <ShopTwoIcon />, path: "/customers" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function SuperAdminSidebar({ handleClose, open }) {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/super-admin${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      handleClose(); // Закрыть боковое меню при выходе
    }
  };

  return (
    <React.Fragment>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor={"left"} // Меню будет выдвигаться слева
        open={open}
        onClose={handleClose} // Закрытие меню при клике вне его
        variant={isSmallScreen ? "temporary" : "permanent"} // Для мобильных - временное меню
      >
        <div className="w-[50vw] lg:w-[20vw] group h-[100vh] flex flex-col justify-center text-xl space-y-8">
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
      </Drawer>
    </React.Fragment>
  );
}
