// src/pages/ExerciseDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Typography, CardMedia } from "@mui/material";

interface Exercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  equipment: string;
  difficulty: string;
}

const ExerciseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get(`/exercises/${id}`);
        setExercise(response.data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
        // Handle error appropriately
      }
    };

    fetchExercise();
  }, [id]);

  if (!exercise) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {exercise.name}
      </Typography>
      <CardMedia
        component="img"
        height="300"
        image={exercise.imageUrl}
        alt={exercise.name}
      />
      <Typography variant="body1" paragraph>
        {exercise.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Equipment: {exercise.equipment}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Difficulty: {exercise.difficulty}
      </Typography>
    </Container>
  );
};

export default ExerciseDetails;
