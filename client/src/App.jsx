import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./LandingPage/Home";
import ChooseYourGoal from "./ChooseYourGoal";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import ProtectedRoute from "./ProtectedRoute/index";
import Donor from "./Dashboard/Donor/index";
import Ngo from "./Dashboard/Ngo/index";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choose-goal" element={<ChooseYourGoal />} />
        <Route
          path="/dashboard/donor"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <Donor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ngo"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <Ngo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <div>volunteer</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <div>admin</div>
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
