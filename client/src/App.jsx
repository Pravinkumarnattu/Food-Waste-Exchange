import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landingpage from "./LandingPage/Home";
import ChooseYourGoal from "./ChooseYourGoal";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import ProtectedRoute from "./ProtectedRoute/index";

import DonorLayout from "./Donor/DonorLayout";
import DonorDashboard from "./Donor/DonorDashboard";
import AddFood from "./Donor/AddFood";
import MyDonations from "./Donor/MyDonations";
import DonorProfile from "./Donor/DonorProfile";

import NgoLayout from "./Ngo/NgoLayout";
import NgoDashboard from "./Ngo/NgoDashboard";
import AvailableFood from "./Ngo/AvailableFood";
import MyReservations from "./Ngo/MyReservations";
import NgoProfile from "./Ngo/NgoProfile";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choose-goal" element={<ChooseYourGoal />} />

        {/* Donor Section */}
        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DonorDashboard />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="my-donations" element={<MyDonations />} />
          <Route path="profile" element={<DonorProfile />} />
        </Route>

        <Route
          path="/ngo"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <NgoLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<NgoDashboard />} />
          <Route path="available-food" element={<AvailableFood />} />
          <Route path="my-reservations" element={<MyReservations />} />
          <Route path="profile" element={<NgoProfile />} />
        </Route>

        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
