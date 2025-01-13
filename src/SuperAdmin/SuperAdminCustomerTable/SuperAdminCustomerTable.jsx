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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../State/SuperAdmin/superAdmin.action";
import { deleteCustomer } from "../../State/SuperAdmin/superAdmin.action";

const SuperAdminCustomerTable = ({ isDashboard, name }) => {
  const dispatch = useDispatch();
  const { superAdmin } = useSelector((store) => store);

  // Состояние для сортировки
  const [sortConfig, setSortConfig] = useState({
    key: "fullName", // Поле для сортировки по умолчанию
    direction: "asc", // Направление сортировки (asc или desc)
  });

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  // Обработчик изменения сортировки
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Сортировка данных
  const sortedCustomers = [...superAdmin.customers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Обработчик удаления пользователя
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteCustomer(userId)); // Передаем id в action
    }
  };
  

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell
                  onClick={() => handleSort("fullName")}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  Full Name
                  {sortConfig.key === "fullName" ? ` (${sortConfig.direction})` : ""}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("id")}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  User Id
                  {sortConfig.key === "id" ? ` (${sortConfig.direction})` : ""}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("email")}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  Email
                  {sortConfig.key === "email" ? ` (${sortConfig.direction})` : ""}
                </TableCell>
                <TableCell
                  onClick={() => handleSort("role")}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  User Role
                  {sortConfig.key === "role" ? ` (${sortConfig.direction})` : ""}
                </TableCell>
                <TableCell>Action</TableCell> {/* Добавлена колонка для кнопки */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCustomers
                .slice(0, isDashboard ? 7 : sortedCustomers.length)
                .map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Avatar alt={item.fullName} src={item.imageUrl} />
                    </TableCell>
                    <TableCell
                      sx={{
                        py: (theme) => `${theme.spacing(0.5)} !important`,
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(item.id)} // Вызов обработчика удаления
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={superAdmin.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SuperAdminCustomerTable;
