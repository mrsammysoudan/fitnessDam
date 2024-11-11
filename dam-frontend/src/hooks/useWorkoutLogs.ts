// src/hooks/useWorkoutLogs.ts

import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export interface WorkoutPlan {
  id: number;
  name: string;
  // Add other relevant fields
}

export interface WorkoutLog {
  id: number;
  date: string;
  workoutPlan: WorkoutPlan;
  notes?: string;
}

interface UseWorkoutLogsResult {
  workoutLogs: WorkoutLog[];
  loading: boolean;
  error: string | null;
}

const useWorkoutLogs = (): UseWorkoutLogsResult => {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutLogs = async () => {
      try {
        const response = await axiosInstance.get<WorkoutLog[]>("/logs");
        setWorkoutLogs(response.data);
      } catch (err: any) {
        console.error("Error fetching workout logs:", err);
        setError(
          err.response?.data?.message || "Failed to fetch workout logs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutLogs();
  }, []);

  return { workoutLogs, loading, error };
};

export default useWorkoutLogs;
