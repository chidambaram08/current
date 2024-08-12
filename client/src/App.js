import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Add routes for other dashboards */}
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
            <Route path="/hrdashboard" element={<div>HR Dashboard</div>} />
            <Route path="/employee" element={<div>Employee Dashboard</div>} />
        </Routes>
    </Router>
);

export default App;
