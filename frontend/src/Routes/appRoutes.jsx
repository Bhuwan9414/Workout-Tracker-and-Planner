import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Routines from "../pages/Routines";
import ProtectedRoute from "./ProtectedRoute";
import CreateRoutine from "../pages/createRoutine";
import ActiveWorkout from "../pages/ActiveWorkout";
import Workouts from "../pages/Workouts";
import WorkoutDetails from "../pages/WorkoutDetails";
import RoutineDetails from "../pages/RoutineDetails";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/routines"
          element={
            <ProtectedRoute>
              <Routines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-routine"
          element={
            <ProtectedRoute>
              <CreateRoutine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-routine/:id"
          element={
            <ProtectedRoute>
              <CreateRoutine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/active-workout/:id"
          element={
            <ProtectedRoute>
              <ActiveWorkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/:id"
          element={
            <ProtectedRoute>
              <WorkoutDetails />
            </ProtectedRoute>
          }
        />

        <Route
    path="/routine/:id"
    element={
        <ProtectedRoute>
            <RoutineDetails />
        </ProtectedRoute>
    }
/>


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;