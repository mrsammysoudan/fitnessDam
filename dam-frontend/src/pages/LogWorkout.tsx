// src/pages/LogWorkout.tsx

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";

interface FormData {
  workoutPlanId: number;
  date: string; // Keep as string
  notes?: string;
}

const LogWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const schema = Yup.object().shape({
    workoutPlanId: Yup.number()
      .required("Workout Plan ID is required")
      .positive("Must be a positive number"),
    date: Yup.string()
      .required("Date is required")
      .test("is-date", "Invalid date", (value) => {
        return value ? !isNaN(Date.parse(value)) : false;
      }),
    notes: Yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      workoutPlanId: 0,
      date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axiosInstance.post("/logs", data);
      alert("Workout log created successfully!");
      reset(); // Reset form after successful submission
      navigate("/dashboard");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: "80px" }}>
      {" "}
      {/* Adjust '80px' to match your navbar height */}
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Log Your Workout
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <Controller
            name="workoutPlanId"
            control={control}
            render={({ field }) => (
              <TextField
                label="Workout Plan ID"
                type="number"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.workoutPlanId}
                helperText={errors.workoutPlanId?.message}
              />
            )}
          />

          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...field}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

          {/* Notes */}
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                label="Notes (optional)"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />

          {/* Error Message */}
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}

          {/* Submit Button with Loading State */}
          <Box position="relative" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Log Workout"}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default LogWorkout;
