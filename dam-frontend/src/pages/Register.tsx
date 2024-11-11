// src/pages/Register.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Email, Lock, LockOutlined } from "@mui/icons-material";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await axiosInstance.post("/auth/register", data);
      navigate("/login");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          backgroundColor: "rgb(34, 9, 44)",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="rgb(240, 89, 65)"
        >
          Create Account
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="name"
            InputLabelProps={{
              style: { color: "#FFFFFF", marginTop: "-9px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: "rgb(240, 89, 65)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
            InputLabelProps={{
              style: { color: "#FFFFFF", marginTop: "-9px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "rgb(240, 89, 65)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password"
            InputLabelProps={{
              style: { color: "#FFFFFF", marginTop: "-9px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "rgb(240, 89, 65)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            autoComplete="new-password"
            InputLabelProps={{
              style: { color: "#FFFFFF", marginTop: "-9px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "rgb(240, 89, 65)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "rgb(240, 89, 65)",
              "&:hover": { backgroundColor: "rgb(190, 49, 68)" },
            }}
          >
            Register
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "#FFFFFF" }}
          >
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ color: "rgb(240, 89, 65)" }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
