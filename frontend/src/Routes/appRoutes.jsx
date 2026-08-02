import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Routines from "../pages/Routines";
import ProtectedRoute from "./ProtectedRoute";
import CreateRoutine from "../pages/createRoutine";

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


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;