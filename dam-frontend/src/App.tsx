// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Correct import

// Import Global Styles and Theme
import { GlobalStyles } from "./styles/GlobalStyles";
import theme from "./styles/theme";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Import Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WorkoutGenerator from "./pages/WorkoutGenerator";
import WorkoutPlanPage from "./pages/WorkoutPlanPage";
import ExerciseDetails from "./pages/ExerciseDetails";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import LogWorkout from "./pages/LogWorkout";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <MUIThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS across browsers */}
        <GlobalStyles />
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate-workout" element={<WorkoutGenerator />} />
              <Route path="/workout-plan/:id" element={<WorkoutPlanPage />} />
              <Route path="/exercises/:id" element={<ExerciseDetails />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/log-workout" element={<LogWorkout />} />
            </Route>

            {/* Fallback Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </StyledThemeProvider>
    </MUIThemeProvider>
  );
};

export default App;
