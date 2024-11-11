// src/pages/WorkoutPlanPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

interface Exercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  equipment: string;
  difficulty: string;
}

interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
}

interface WorkoutPlan {
  id: number;
  exercises?: WorkoutExercise[]; // Marking as optional to handle cases where it might be undefined
}

const WorkoutPlanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axiosInstance.get(`/workouts/${id}`);
        setWorkoutPlan(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setError("Could not load workout plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (
    !workoutPlan ||
    !workoutPlan.exercises ||
    workoutPlan.exercises.length === 0
  ) {
    return <Typography>No exercises found for this workout plan.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Workout Plan
      </Typography>
      <Grid container spacing={2}>
        {workoutPlan.exercises.map((we) => (
          <Grid item xs={12} md={6} key={we.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={
                  we.exercise.imageUrl || "https://via.placeholder.com/140"
                }
                alt={we.exercise.name}
              />
              <CardContent>
                <Typography variant="h5">{we.exercise.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {we.exercise.description}
                </Typography>
                <Typography variant="body1">
                  Sets: {we.sets} | Reps: {we.reps}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkoutPlanPage;
