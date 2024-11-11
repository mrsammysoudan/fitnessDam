// src/hooks/useProfilePicture.ts

import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface UseProfilePictureResult {
  uploadPicture: (file: File) => Promise<string>;
  uploading: boolean;
  uploadError: string | null;
}

const useProfilePicture = (): UseProfilePictureResult => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadPicture = async (file: File): Promise<string> => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axiosInstance.post(
        "/users/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.profilePictureUrl;
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      setUploadError(
        error.response?.data?.message ||
          "An error occurred while uploading the profile picture."
      );
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadPicture, uploading, uploadError };
};

export default useProfilePicture;
