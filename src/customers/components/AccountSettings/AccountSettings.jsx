import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Hidden,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, deleteAccount } from "../../../State/Authentication/Action";
import { useNavigate } from "react-router-dom";
import Profile from "../../Pages/Profile/Profile"

const validationSchema = Yup.object({
    fullname: Yup.string().min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email format"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
});

export default function AccountSettings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth}=useSelector(store=>store)
    const [editMode, setEditMode] = useState(false); // Управление режимом редактирования
    const [openDialog, setOpenDialog] = useState(false); // Диалог подтверждения удаления

    const handleSubmit = async (values) => {
        await dispatch(updateProfile(values));
        setEditMode(false); 
    };

    const handleDeleteAccount = () => {
        
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(deleteAccount(jwt));
            navigate("/");
        }
        setOpenDialog(false);
    };

    const handleDialogClose = () => setOpenDialog(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", // Центрирование по вертикали
                padding: { xs: 2, sm: 4 }, // Отступы для мобильных и больших экранов
                backgroundColor: "#000000", // Фон страницы
                overflow:"hidden"
            }}
        >
            <Box
                sx={{
                    maxWidth: "600px",
                    width: { xs: "100%", sm: "80%", md: "60%" }, // Адаптивная ширина
                    padding: { xs: 2, sm: 4 }, // Внутренние отступы
                    backgroundColor: "#000000", // Белый фон карточки
                    boxShadow: 3,
                    borderRadius: "8px",
                    border: "2px solid #ffffff", // Белое очертание карточки
                    overflow: "hidden", // Убираем прокрутку
                }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Account Settings
                </Typography>

                {editMode ? (
                    // Форма редактирования
                    <Formik
                        initialValues={{
                            fullName: auth.user?.fullName || "",
                            email: auth.user?.email || "",
                            password: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="fullname"
                                    label="Full Name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    error={touched.fullname && Boolean(errors.fullname)}
                                    helperText={touched.fullname && errors.fullname}
                                />
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="New Password"
                                    fullWidth
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => setEditMode(false)} // Выход из режима редактирования
                                >
                                    Cancel
                                </Button>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    // Отображение информации
                    <Box>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Full Name:</strong> {auth.user?.fullName || "N/A"}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Email:</strong> {auth.user?.email || "N/A"}
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => setEditMode(true)} // Включаем режим редактирования
                        >
                            Edit
                        </Button>
                    </Box>
                )}

                {/* Кнопка удаления аккаунта */}
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => setOpenDialog(true)} // Открытие диалога подтверждения удаления
                >
                    Delete Account
                </Button>

                {/* Диалог подтверждения удаления */}
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Confirm Account Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteAccount} color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
