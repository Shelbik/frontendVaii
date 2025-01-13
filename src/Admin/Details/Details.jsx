import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { updateProfile, deleteAccount } from "../../State/Authentication/Action";
import {
  updateRestaurant,
  updateRestaurantStatus,
  deleteRestaurant,
} from "../../State/Customers/Restaurant/restaurant.action";

const Details = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: restaurant.usersRestaurant?.name || "",
    owner: restaurant.usersRestaurant?.owner.fullName || "",
    cuisineType: restaurant.usersRestaurant?.cuisineType || "",
    openingHours: restaurant.usersRestaurant?.openingHours || "",
    address: {
      country: restaurant.usersRestaurant?.address.country || "",
      city: restaurant.usersRestaurant?.address.city || "",
      postalCode: restaurant.usersRestaurant?.address.postalCode || "",
      streetAddress: restaurant.usersRestaurant?.address.streetAddress || "",
    },
    contactInformation: {
      email: restaurant.usersRestaurant?.contactInformation.email || "",
      mobile: restaurant.usersRestaurant?.contactInformation.mobile || "",
    },
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = () => {
    const data = {
      name: formData.name || restaurant.usersRestaurant.name,
      description: formData.description || restaurant.usersRestaurant.description,
      cuisineType: formData.cuisineType || restaurant.usersRestaurant.cuisineType,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      openingHours: formData.openingHours,
      website: formData.website,
      socialLinks: formData.socialLinks,
      imageUrl: formData.imageUrl,
      categories: formData.categories || restaurant.usersRestaurant.categories,
      events: formData.events || restaurant.usersRestaurant.events,
    };

    dispatch(updateRestaurant({
      restaurantId: restaurant.usersRestaurant?.id,
      restaurantData: data,
      jwt: auth.jwt || jwt,
    }));
  };

  const renderEditableField = (value, fieldName) => {
    if (editingField === fieldName) {
      return (
        <TextField
          fullWidth
          name={fieldName}
          value={value}
          onChange={handleInputChange}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditingField(null);
          }}
          variant="standard"
          autoFocus
        />
      );
    }
    return (
      <span
        className="cursor-pointer text-gray-400"
        onClick={() => setEditingField(fieldName)}
      >
        {value || "—"}
      </span>
    );
  };

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );
  };

  const handleDeleteRestaurant = () => {
    dispatch(deleteRestaurant({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: auth.jwt || jwt,
    }));
    setOpenDeleteDialog(false); // Закрыть диалог после удаления
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(updateProfile({
      restaurantId: restaurant.usersRestaurant.id,
      newPassword,
      jwt: auth.jwt || jwt,
    }));
    setOpenPasswordDialog(false); // Закрыть диалог после смены пароля
  };

  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
    setOpenPasswordDialog(false);
  };

  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {renderEditableField(formData.name, "name")}
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={handleRestaurantStatus}
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color={restaurant.usersRestaurant?.open ? "error" : "primary"}
          >
            {restaurant.usersRestaurant?.open ? "Close" : "Open"}
          </Button>
          <Button
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>

          <Button
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color="primary"
            onClick={() => setOpenPasswordDialog(true)} // Открыть диалог для смены пароля
          >
            Change Password
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Restaurant</span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Owner</p>
                  {renderEditableField(formData.owner, "owner")}
                </div>
                <div className="flex">
                  <p className="w-48">Cuisine Type</p>
                  {renderEditableField(formData.cuisineType, "cuisineType")}
                </div>
                <div className="flex">
                  <p className="w-48">Opening Hours</p>
                  {renderEditableField(formData.openingHours, "openingHours")}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Address</span>} />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">Country</p>
                  {renderEditableField(formData.address.country, "address.country")}
                </div>
                <div className="flex">
                  <p className="w-48">City</p>
                  {renderEditableField(formData.address.city, "address.city")}
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>
                  {renderEditableField(formData.address.postalCode, "address.postalCode")}
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>
                  {renderEditableField(formData.address.streetAddress, "address.streetAddress")}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Contact</span>} />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  {renderEditableField(formData.contactInformation.email, "contactInformation.email")}
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  {renderEditableField(formData.contactInformation.mobile, "contactInformation.mobile")}
                </div>
                <div className="flex">
                  <p className="w-48">Social</p>
                  <div className="flex gap-5">
                    <a href="#" target="_blank" rel="noreferrer">
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Диалог для удаления ресторана */}
      <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Restaurant Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your restaurant? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRestaurant} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог для смены пароля */}
      <Dialog open={openPasswordDialog} onClose={handleDialogClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="standard"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Кнопка удаления ресторана */}
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setOpenDeleteDialog(true)} // Открытие диалога для удаления ресторана
      >
        Delete Restaurant
      </Button>
    </div>
  );
};

export default Details;
