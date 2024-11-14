import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";

const AdminPerformance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [performanceRating, setPerformanceRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [performances, setPerformances] = useState([]);
  const [editingPerformance, setEditingPerformance] = useState(null);
  const [adminId, setAdminId] = useState(""); // Replace with dynamic admin ID, e.g., from context or localStorage

  useEffect(() => {
    // Fetch admin ID from session/local storage or context
    const storedAdminId = localStorage.getItem("adminId"); // Use your method to get the admin ID
    setAdminId(storedAdminId);

    // Fetch employees list
    axios
      .get("http://localhost:5000/api/training/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  useEffect(() => {
    // Fetch performance reviews for the selected employee
    if (selectedEmployee) {
      axios
        .get(
          `http://localhost:5000/api/performance/employee/${selectedEmployee}`
        )
        .then((response) => setPerformances(response.data))
        .catch((error) =>
          console.error("Error fetching performance data:", error)
        );
    }
  }, [selectedEmployee]);

  const handleAssignPerformance = () => {
    if (!selectedEmployee || !performanceRating || !feedback) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/performance/assign", {
        employeeId: selectedEmployee,
        evaluatorId: adminId, // Use the dynamic admin ID
        performanceRating,
        feedback,
      })
      .then((response) => {
        alert("Performance assigned successfully");
        setPerformances((prev) => [response.data.performance, ...prev]);
        setPerformanceRating("");
        setFeedback("");
      })
      .catch((error) => {
        console.error("Error assigning performance:", error);
        alert("Failed to assign performance");
      });
  };

  const handleEditPerformance = (performance) => {
    setEditingPerformance(performance);
    setPerformanceRating(performance.performanceRating);
    setFeedback(performance.feedback);
  };

  const handleUpdatePerformance = () => {
    if (!performanceRating || !feedback) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/performance/update/${editingPerformance._id}`,
        {
          performanceRating,
          feedback,
        }
      )
      .then((response) => {
        const updatedPerformance = response.data;
        setPerformances((prev) =>
          prev.map((p) =>
            p._id === updatedPerformance._id ? updatedPerformance : p
          )
        );
        alert("Performance updated successfully");
        setEditingPerformance(null);
        setPerformanceRating("");
        setFeedback("");
      })
      .catch((error) => {
        console.error("Error updating performance:", error);
        alert("Failed to update performance");
      });
  };

  const handleDeletePerformance = (id) => {
    axios
      .delete(`http://localhost:5000/api/performance/delete/${id}`)
      .then(() => {
        setPerformances((prev) =>
          prev.filter((performance) => performance._id !== id)
        );
        alert("Performance deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting performance:", error);
        alert("Failed to delete performance");
      });
  };

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="training-form">
        <h2>
          {editingPerformance ? "Edit Performance" : "Assign Performance"}
        </h2>
        <div className="form-group">
          <select
            onChange={(e) => setSelectedEmployee(e.target.value)}
            value={selectedEmployee}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Performance Rating (1-5)"
            value={performanceRating}
            onChange={(e) => setPerformanceRating(e.target.value)}
          />
          <textarea
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={
              editingPerformance
                ? handleUpdatePerformance
                : handleAssignPerformance
            }
          >
            {editingPerformance ? "Update Performance" : "Assign Performance"}
          </button>
        </div>
      </div>
      <div className="performance-list">
        <h3>Performance Evaluations</h3>
      </div>
    </div>
  );
};

export default AdminPerformance;
