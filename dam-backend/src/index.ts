import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import logsRoutes from "./routes/logsRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/users", userRoutes);

// Fallback Route for 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to database:", error));
