// src/components/ProfilePictureUpload.tsx

import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Button,
  Avatar,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface ProfilePictureUploadProps {
  onUploadSuccess?: (url: string) => void;
}

const HiddenInput = styled("input")({
  display: "none",
});

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Fetch current profile picture on mount
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axiosInstance.get("/users/profile-picture");
        setProfilePictureUrl(response.data.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setSnackbarMessage("Failed to fetch profile picture.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchProfilePicture();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file); // Ensure the field name is 'file'

    try {
      const res = await axiosInstance.post(
        "/users/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePictureUrl(res.data.profilePictureUrl);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(res.data.profilePictureUrl);
      setSnackbarMessage("Profile picture uploaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      setSnackbarMessage(
        error.response?.data?.message ||
          "An error occurred while uploading the profile picture."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mt: 2, mb: 3 }}
    >
      <Avatar src={profilePictureUrl} sx={{ width: 120, height: 120, mb: 2 }} />
      <label htmlFor="profile-picture-upload">
        <HiddenInput
          accept="image/*"
          id="profile-picture-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<PhotoCamera />}
          disabled={uploading}
          sx={{
            backgroundColor: "rgb(240, 89, 65)",
            "&:hover": { backgroundColor: "rgb(190, 49, 68)" },
            color: "#FFFFFF",
          }}
        >
          Choose Picture
        </Button>
      </label>
      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading}
          sx={{
            mt: 2,
            backgroundColor: "rgb(240, 89, 65)",
            "&:hover": { backgroundColor: "rgb(190, 49, 68)" },
            color: "#FFFFFF",
          }}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePictureUpload;
