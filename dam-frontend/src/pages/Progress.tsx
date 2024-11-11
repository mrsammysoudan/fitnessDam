import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  CircularProgress,
  Alert,
  Pagination,
  TextField,
  InputAdornment,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useWorkoutLogs, { WorkoutLog } from "../hooks/useWorkoutLogs";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import NotesIcon from "@mui/icons-material/Notes";

// Styled Components
const Header = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const LogCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StatisticsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ITEMS_PER_PAGE = 5;

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const { workoutLogs, loading, error } = useWorkoutLogs();

  // Pagination State
  const [page, setPage] = useState<number>(1);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle Page Change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Handle Log Workout
  const handleLogWorkout = () => {
    navigate("/log-workout");
  };

  // Filtered Logs based on Search Query
  const filteredLogs = useMemo(() => {
    return workoutLogs.filter(
      (log) =>
        log.workoutPlan.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (log.notes &&
          log.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        new Date(log.date).toLocaleDateString().includes(searchQuery)
    );
  }, [workoutLogs, searchQuery]);

  // Paginated Logs
  const paginatedLogs = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLogs, page]);

  // Statistics
  const totalWorkouts = workoutLogs.length;

  const workoutsThisMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return workoutLogs.filter((log) => {
      const logDate = new Date(log.date);
      return (
        logDate.getMonth() === currentMonth &&
        logDate.getFullYear() === currentYear
      );
    }).length;
  }, [workoutLogs]);

  const averageWorkoutsPerWeek = useMemo(() => {
    const weeks = 4;
    return weeks > 0 ? totalWorkouts / weeks : 0;
  }, [totalWorkouts]);

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Header container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            <FitnessCenterIcon color="primary" /> Your Progress
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogWorkout}
          >
            Log a Workout
          </Button>
        </Grid>
      </Header>

      {/* Statistics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatisticsCard>
            <Avatar sx={{ bgcolor: "primary.main", marginRight: 2 }}>
              <FitnessCenterOutlinedIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Total Workouts</Typography>
              <Typography variant="h4">{totalWorkouts}</Typography>
            </Box>
          </StatisticsCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticsCard>
            <Avatar sx={{ bgcolor: "secondary.main", marginRight: 2 }}>
              <CalendarTodayIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">This Month</Typography>
              <Typography variant="h4">{workoutsThisMonth}</Typography>
            </Box>
          </StatisticsCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticsCard>
            <Avatar sx={{ bgcolor: "success.main", marginRight: 2 }}>
              <FitnessCenterIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Avg Workouts/Week</Typography>
              <Typography variant="h4">
                {averageWorkoutsPerWeek.toFixed(1)}
              </Typography>
            </Box>
          </StatisticsCard>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <SearchContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Logs"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>

      {/* Content Section */}
      {loading ? (
        <Grid container justifyContent="center" style={{ marginTop: 50 }}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Alert severity="error" style={{ marginTop: 20 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            {paginatedLogs.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info">No workout logs found.</Alert>
              </Grid>
            ) : (
              paginatedLogs.map((log) => (
                <Grid item xs={12} sm={6} md={4} key={log.id}>
                  <LogCard>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <CalendarTodayIcon />
                        </Avatar>
                      }
                      title={new Date(log.date).toLocaleDateString()}
                      subheader={log.workoutPlan.name}
                    />
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <NotesIcon color="action" />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginLeft: 1 }}
                        >
                          {log.notes || "No additional notes."}
                        </Typography>
                      </Box>
                    </CardContent>
                  </LogCard>
                </Grid>
              ))
            )}
          </Grid>

          {/* Pagination */}
          {filteredLogs.length > ITEMS_PER_PAGE && (
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Pagination
                count={Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default Progress;
