import React, { useEffect, useState } from "react";
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
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer } from "../../State/SuperAdmin/superAdmin.action";
import SuperAdminSidebar from "../SuperAdminSideBar";

const SuperAdminCustomerTable = () => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: "asc",
  });

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedCustomers = [...(superAdmin.customers || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteCustomer(userId));
    }
  };

  return (
    <>
      <SuperAdminSidebar 
        open={isDrawerOpen} 
        handleClose={handleDrawerClose} 
      />
      
      <Box
        sx={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
          bgcolor: "background.default",
          ml: isSmallScreen ? 0 : '20vw',
          width: isSmallScreen ? '100vw' : '80vw',
        }}
      >
        <Card sx={{ height: "100%", borderRadius: 0, boxShadow: 'none' }}>
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
              Customer Management
            </Typography>
          </Box>

          <TableContainer 
            sx={{ 
              height: "calc(100vh - 64px)",
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#555",
                },
              },
            }}
          >
            <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: { xs: "40px", sm: "60px" } }}>
                    Image
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("fullName")}
                    sx={{
                      cursor: "pointer",
                      width: { xs: "100px", sm: "200px" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Full Name
                      {sortConfig.key === "fullName" && 
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          ({sortConfig.direction})
                        </Typography>
                      }
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("email")}
                    sx={{
                      cursor: "pointer",
                      width: { xs: "120px", sm: "250px" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Email
                      {sortConfig.key === "email" && 
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          ({sortConfig.direction})
                        </Typography>
                      }
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("role")}
                    sx={{
                      cursor: "pointer",
                      width: { xs: "70px", sm: "150px" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Role
                      {sortConfig.key === "role" && 
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          ({sortConfig.direction})
                        </Typography>
                      }
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: { xs: "50px", sm: "100px" } }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCustomers.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Avatar
                        src={item.imageUrl}
                        alt={item.fullName}
                        sx={{
                          width: { xs: 30, sm: 40 },
                          height: { xs: 30, sm: 40 },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      maxWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                      {item.fullName}
                    </TableCell>
                    <TableCell sx={{ 
                      maxWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                      {item.email}
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        sx={{
                          px: { xs: 1, sm: 2 },
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          bgcolor: item.role === "ADMIN" ? "error.light" : "success.light",
                          color: item.role === "ADMIN" ? "error.dark" : "success.dark",
                        }}
                      >
                        {item.role}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size={isSmallScreen ? "small" : "medium"}
                        onClick={() => handleDelete(item.id)}
                        sx={{
                          minWidth: { xs: "40px", sm: "auto" },
                          px: { xs: 1, sm: 2 },
                          py: 0.5,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        {isSmallScreen ? "Del" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Backdrop
          open={superAdmin.loading}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default SuperAdminCustomerTable;