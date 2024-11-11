// src/pages/Settings.tsx

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { styled } from "@mui/system";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import EditIcon from "@mui/icons-material/Edit";

// Define the form input types
interface SettingsFormInputs {
  name: string;
  email: string;
}

// Styled Components
const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  // boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const UpdateButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "rgb(240, 89, 65)",
  "&:hover": { backgroundColor: "rgb(190, 49, 68)" },
  color: "#FFFFFF",
}));

const Settings: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        reset({
          name: response.data.name,
          email: response.data.email,
        });
        setProfilePictureUrl(response.data.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [reset]);

  // Handle form submission
  const onSubmit = async (data: SettingsFormInputs) => {
    try {
      await axiosInstance.put("/users/me", data);
      setSuccessMessage("Profile updated successfully.");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while updating profile."
      );
      setSuccessMessage("");
    }
  };

  // Handle profile picture upload success
  const handleProfilePictureUpload = (url: string) => {
    setProfilePictureUrl(url);
    setSuccessMessage("Profile picture updated successfully.");
    setErrorMessage("");
  };

  // Handle Snackbar close
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <ProfileCard>
          <Grid container spacing={4}>
            {/* Profile Picture Section */}
            <Grid item xs={12} md={4}>
              <ProfilePictureUpload
                onUploadSuccess={handleProfilePictureUpload}
              />
            </Grid>

            {/* Settings Form Section */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color="rgb(34, 9, 44)"
              >
                Account Settings
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name Field */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputLabelProps={{
                        style: { color: "rgb(34, 9, 44)" },
                      }}
                    />
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputLabelProps={{
                        style: { color: "rgb(34, 9, 44)" },
                      }}
                    />
                  )}
                />

                {/* Update Profile Button */}
                <UpdateButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? <CircularProgress size={20} /> : <EditIcon />
                  }
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </UpdateButton>
              </form>
            </Grid>
          </Grid>
        </ProfileCard>

        {/* Success Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Settings;
