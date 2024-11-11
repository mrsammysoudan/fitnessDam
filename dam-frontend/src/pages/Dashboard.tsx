// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// Styled Components

const DashboardContainer = styled(Container)`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: calc(
    100vh - 128px
  ); /* Adjust based on Navbar and Footer heights */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled(Typography)`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 700;
`;

const AddButton = styled(Button)`
  text-transform: none;
`;

const StatsGrid = styled(Grid)`
  margin-bottom: 3rem;
`;

const StatCard = styled(Card)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const WorkoutCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WorkoutCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const ErrorContainer = styled.div`
  margin-top: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

// Dashboard Component

interface WorkoutPlan {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  intensity: "Low" | "Medium" | "High";
  createdAt: string; // ISO date string
  completed: boolean;
  // Add other necessary fields as per your API response
}

const Dashboard: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<WorkoutPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axiosInstance.get("/workouts");
        console.log("API Response:", response.data); // Debugging log

        if (Array.isArray(response.data)) {
          // Sanitize and ensure all required fields are present
          const sanitizedPlans: WorkoutPlan[] = response.data.map(
            (plan: any) => ({
              id: plan.id,
              title: plan.title || "Untitled Plan",
              description: plan.description || "",
              duration: plan.duration || 0,
              intensity: plan.intensity || "Low",
              createdAt: plan.createdAt || new Date().toISOString(),
              completed: plan.completed || false,
              // Add other necessary fields with default values
            })
          );
          setWorkoutPlans(sanitizedPlans);
          setFilteredPlans(sanitizedPlans);
        } else {
          console.error("Unexpected data format:", response.data);
          setWorkoutPlans([]);
          setFilteredPlans([]);
          setError("Received unexpected data format from the server.");
        }
      } catch (err: any) {
        console.error("Error fetching workout plans:", err);
        setError("Failed to load workout plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlans();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPlans(workoutPlans);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = workoutPlans.filter(
        (plan) =>
          plan.title.toLowerCase().includes(lowercasedQuery) ||
          plan.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPlans(filtered);
    }
  }, [searchQuery, workoutPlans]);

  const handleViewPlan = (id: number) => {
    navigate(`/workout-plan/${id}`);
  };

  const handleGeneratePlan = () => {
    navigate("/generate-workout");
  };

  const handleDeletePlan = (plan: WorkoutPlan) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePlan = async () => {
    if (planToDelete) {
      try {
        await axiosInstance.delete(`/workouts/${planToDelete.id}`);
        const updatedPlans = workoutPlans.filter(
          (plan) => plan.id !== planToDelete.id
        );
        setWorkoutPlans(updatedPlans);
        setFilteredPlans(updatedPlans);
        setDeleteDialogOpen(false);
        setPlanToDelete(null);
      } catch (err) {
        console.error("Error deleting workout plan:", err);
        setError("Failed to delete workout plan. Please try again.");
      }
    }
  };

  const cancelDeletePlan = () => {
    setDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  const totalPlans = workoutPlans.length;
  const completedPlans = workoutPlans.filter((plan) => plan.completed).length;
  const upcomingPlans = workoutPlans.filter((plan) => !plan.completed).length;
  const averageDuration =
    workoutPlans.length > 0
      ? `${(
          workoutPlans.reduce((acc, plan) => acc + plan.duration, 0) /
          workoutPlans.length
        ).toFixed(0)} mins`
      : "0 mins";

  return (
    <DashboardContainer>
      <Header>
        <Title variant="h4">Welcome to Your Dashboard</Title>
        <AddButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleGeneratePlan}
        >
          Generate New Workout Plan
        </AddButton>
      </Header>

      {/* Statistics Section */}
      <StatsGrid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h6">Total Plans</Typography>
              <Typography variant="h4">{totalPlans}</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h6">Completed</Typography>
              <Typography variant="h4">{completedPlans}</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h6">Upcoming</Typography>
              <Typography variant="h4">{upcomingPlans}</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h6">Average Duration</Typography>
              <Typography variant="h4">{averageDuration}</Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </StatsGrid>

      {/* Search Bar */}
      <SearchContainer>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search Workout Plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery("")}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>

      {/* Workout Plans Grid */}
      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : error ? (
        <ErrorContainer>
          <Alert severity="error">{error}</Alert>
        </ErrorContainer>
      ) : filteredPlans.length > 0 ? (
        <Grid container spacing={4} style={{ marginTop: 16 }}>
          {filteredPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <WorkoutCard>
                <WorkoutCardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {plan.description?.length > 100
                      ? `${plan.description.substring(0, 100)}...`
                      : plan.description || "No description available."}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Duration: {plan.duration} mins
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Intensity: {plan.intensity}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Status:
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={plan.completed ? 100 : 0}
                    color={plan.completed ? "success" : "error"}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {plan.completed ? "Completed" : "Incomplete"}
                  </Typography>
                </WorkoutCardContent>
                <CardActions>
                  <Tooltip title="View Plan">
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewPlan(plan.id)}
                    >
                      View
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Plan">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeletePlan(plan)}
                      aria-label={`Delete ${plan.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </WorkoutCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          No workout plans found. Try adjusting your search criteria.
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDeletePlan}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Workout Plan</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the workout plan "
            {planToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeletePlan} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeletePlan} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default Dashboard;
