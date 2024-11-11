// src/components/ExerciseCard.tsx

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Exercise {
  id: number;
  name: string;
  imageUrl: string;
  difficulty: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/exercises/${exercise.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={exercise.imageUrl}
          alt={exercise.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {exercise.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Difficulty: {exercise.difficulty}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExerciseCard;
