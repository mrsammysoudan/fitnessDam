// src/pages/Login.tsx

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
import { Email, Lock } from "@mui/icons-material";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login"
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
          Welcome Back
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
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
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
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
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "#FFFFFF" }}
          >
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{ color: "rgb(240, 89, 65)" }}
            >
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
