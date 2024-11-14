// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admindashboard from "./pages/AdminDash/Admindashboard";
import Employeedashboard from "./pages/EmployeeDash/Employeedashboard";
import HRdashboard from "./pages/HRDash/HRdashboard";
import EmployeeManager from "./pages/AdminDash/EmployeeManager";
import AdminTraining from "./pages/AdminDash/AdminTraining";
import EmployeeTraining from "./pages/EmployeeDash/EmployeeTraining";
import LogoutPage from "./pages/LogoutPage";
import RecruitmentManager from "./pages/AdminDash/RecruitmentManager";
import AttendanceCalendar from "./pages/AdminDash/AttendanceCalendar";
import Performance from "./pages/AdminDash/Performance";




const getUserIdFromStorage = () => {
  return localStorage.getItem("userId"); // Fetch userId from localStorage
};

const App = () => {
  const userId = getUserIdFromStorage(); // Use the function to get the userId

  return (
    <Router>
      <Routes>
      <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add routes for other dashboards */}
        <Route path="/admin-dashboard" element={<Admindashboard />} />
        <Route path="/hr-dashboard" element={<HRdashboard />} />
        <Route path="/employee-dashboard" element={<Employeedashboard />} />
        <Route path="/employee-manager" element={<EmployeeManager />} />
        <Route path="/admin-training" element={<AdminTraining />} />
        <Route
          path="/employee-training"
          element={<EmployeeTraining userId={userId} />}
        />
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/recruitment" element={<RecruitmentManager />} />
        <Route path="/calendar" element={<AttendanceCalendar />} />
        <Route path="/performance" element={<Performance/>} />
        
      
        
      </Routes>
    </Router>
  );
};

export default App;
