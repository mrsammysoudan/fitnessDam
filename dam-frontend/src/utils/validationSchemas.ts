// src/utils/validationSchemas.ts

import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name is too short"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const settingsValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name is too short"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});
