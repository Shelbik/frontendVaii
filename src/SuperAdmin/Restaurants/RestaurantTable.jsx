import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import SuperAdminSidebar from "../SuperAdminSideBar";

const RestaurantTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <SuperAdminSidebar 
        open={isDrawerOpen} 
        handleClose={handleDrawerClose} 
      />
      
      <Box
        sx={{
          width: isSmallScreen ? '100vw' : 'calc(100vw - 20vw)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <Card 
          sx={{ 
            height: '100%', 
            borderRadius: 0,
            boxShadow: 'none',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: { xs: 1, sm: 2 },
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'primary.main',
            color: 'primary.contrastText'
          }}>
            <IconButton 
              color="inherit"
              sx={{ 
                mr: 2,
                display: isSmallScreen ? 'block' : 'none'
              }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
          </Box>

          <TableContainer 
            sx={{ 
              height: 'calc(100vh - 70px)',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#555',
                },
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Banner</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                  {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurant.restaurants
                  .slice(0, isDashboard ? 7 : restaurant.restaurants.length)
                  .map((item) => (
                    <TableRow
                      hover
                      key={item.name}
                      sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar alt={item.name} src={item.imageUrl} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.875rem !important",
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="caption">{item.brand}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {item.owner.fullName}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {item.cuisineType}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {item.address.city}
                      </TableCell>
                      {!isDashboard && (
                        <TableCell sx={{ textAlign: "center" }}>
                          {item.contactInformation.email}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={restaurant.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default RestaurantTable;