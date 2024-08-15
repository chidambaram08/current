import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Admindashboard from './pages/AdminDash/Admindashboard'
import Employeedashboard from './pages/EmployeeDash/Employeedashboard'
import HRdashboard from './pages/HRDash/HRdashboard'
const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Add routes for other dashboards */}
            <Route path="/admin" element={<Admindashboard/>} />
            <Route path="/hrdashboard" element={<HRdashboard/>} />
            <Route path="/employee" element={<Employeedashboard/>} />
        </Routes>
    </Router>
);

export default App;
