// src/pages/WorkoutGenerator.tsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// Define styled components for enhanced styling
const BackgroundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  // boxShadow: theme.shadows[3],
}));

const FormHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface FormData {
  fitnessLevel: string;
  goals: string;
  equipment: string[];
  workoutDays: number;
  name: string;
}

const WorkoutGenerator: React.FC = () => {
  const navigate = useNavigate();

  // Define validation schema using Yup
  const schema = Yup.object().shape({
    fitnessLevel: Yup.string().required("Fitness level is required"),
    goals: Yup.string().required("Goals are required"),
    equipment: Yup.array()
      .of(Yup.string().required())
      .min(1, "At least one equipment must be selected")
      .required("Equipment is required"),
    workoutDays: Yup.number()
      .required("Workout days per week is required")
      .min(1, "Minimum of 1 day")
      .max(7, "Maximum of 7 days"),
    name: Yup.string().required("Workout plan name is required"),
  });

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fitnessLevel: "",
      goals: "",
      equipment: [],
      workoutDays: 3,
      name: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("/workouts", data);
      const { workoutPlanId } = response.data;
      navigate(`/workout-plan/${workoutPlanId}`);
    } catch (error: any) {
      // Display error using Material-UI's alert or a Snackbar for better UX
      alert(error.response?.data?.message || "An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <BackgroundContainer>
      <Container maxWidth="sm">
        <FormPaper>
          {/* Form Header */}
          <FormHeader>
            <FitnessCenterIcon color="primary" fontSize="large" />
            <Box ml={2}>
              <Typography variant="h5" component="h1">
                Generate Your Workout Plan
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Customize your fitness journey
              </Typography>
            </Box>
          </FormHeader>

          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {/* Workout Plan Name */}
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Workout Plan Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      required
                    />
                  )}
                />
              </Grid>

              {/* Fitness Level */}
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={!!errors.fitnessLevel}
                  required
                >
                  <InputLabel id="fitness-level-label">
                    Fitness Level
                  </InputLabel>
                  <Controller
                    name="fitnessLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="fitness-level-label"
                        label="Fitness Level"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>
                    {errors.fitnessLevel ? errors.fitnessLevel.message : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Goals */}
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={!!errors.goals}
                  required
                >
                  <InputLabel id="goals-label">Goals</InputLabel>
                  <Controller
                    name="goals"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} labelId="goals-label" label="Goals">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="strength">Build Strength</MenuItem>
                        <MenuItem value="endurance">Improve Endurance</MenuItem>
                        <MenuItem value="flexibility">
                          Increase Flexibility
                        </MenuItem>
                        <MenuItem value="weight_loss">Weight Loss</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>
                    {errors.goals ? errors.goals.message : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Available Equipment */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Equipment{" "}
                  <span style={{ color: "#d32f2f" }}>*</span>
                </Typography>
                <FormGroup row>
                  {["Dumbbells", "Barbell", "Kettlebell", "Bodyweight"].map(
                    (item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Controller
                            name="equipment"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={field.value.includes(
                                  item.toLowerCase()
                                )}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      item.toLowerCase(),
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (v: string) => v !== item.toLowerCase()
                                      )
                                    );
                                  }
                                }}
                                color="primary"
                              />
                            )}
                          />
                        }
                        label={item}
                      />
                    )
                  )}
                </FormGroup>
                {errors.equipment && (
                  <Typography variant="caption" color="error">
                    {errors.equipment.message}
                  </Typography>
                )}
              </Grid>

              {/* Workout Days Per Week */}
              <Grid item xs={12}>
                <Controller
                  name="workoutDays"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Workout Days Per Week"
                      type="number"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{ inputProps: { min: 1, max: 7 } }}
                      error={!!errors.workoutDays}
                      helperText={errors.workoutDays?.message}
                    />
                  )}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Generating..." : "Generate Plan"}
                </SubmitButton>
              </Grid>
            </Grid>
          </form>
        </FormPaper>
      </Container>
    </BackgroundContainer>
  );
};

export default WorkoutGenerator;
