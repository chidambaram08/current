import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
    </div>
  );
}

const AdminTraining = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingTrainings, setExistingTrainings] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of trainings per page

  // Fetch employees
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/training/employees")
      .then((response) => {
        const employeeList = response.data.filter(
          (user) => user.role === "employee"
        );
        setEmployees(employeeList);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Fetch existing trainings and employee details
  useEffect(() => {
    if (selectedEmployee) {
      axios
        .get(`http://localhost:5000/api/training/employee/${selectedEmployee}`)
        .then((response) => setExistingTrainings(response.data))
        .catch((error) =>
          console.error("Error fetching existing trainings:", error)
        );

      axios
        .get(`http://localhost:5000/api/users/${selectedEmployee}`)
        .then((response) => setEmployeeDetails(response.data))
        .catch((error) =>
          console.error("Error fetching employee details:", error)
        );
    }
  }, [selectedEmployee]);

  const handleAssignTraining = () => {
    if (!selectedEmployee || !title || !description) {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/training/assign", {
        title,
        description,
        userId: selectedEmployee,
      })
      .then((response) => {
        const assignedTraining = response.data;
        setExistingTrainings((prevTrainings) => [
          assignedTraining,
          ...prevTrainings,
        ]);
        resetForm();
        alert("Training assigned successfully");
      })
      .catch((error) => {
        console.error("Error assigning training:", error);
        alert("Failed to assign training");
      });
  };

  const handleEditTraining = (training) => {
    setEditingTraining(training);
    setTitle(training.title);
    setDescription(training.description);
  };

  const handleUpdateTraining = () => {
    axios
      .put(`http://localhost:5000/api/training/update/${editingTraining._id}`, {
        title,
        description,
        completed: editingTraining.completed,
      })
      .then((response) => {
        const updatedTraining = response.data;
        setExistingTrainings((prevTrainings) =>
          prevTrainings.map((t) =>
            t._id === updatedTraining._id ? updatedTraining : t
          )
        );
        resetForm();
        alert("Training updated successfully");
      })
      .catch((error) => {
        console.error("Error updating training:", error);
        alert("Failed to update training");
      });
  };

  const handleDeleteTraining = (id) => {
    axios
      .delete(`http://localhost:5000/api/training/delete/${id}`)
      .then(() => {
        setExistingTrainings((prevTrainings) =>
          prevTrainings.filter((training) => training._id !== id)
        );
        alert("Training deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting training:", error);
        alert("Failed to delete training");
      });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedEmployee("");
    setEditingTraining(null);
    setEmployeeDetails(null);
  };

  // Pagination logic
  const indexOfLastTraining = currentPage * itemsPerPage;
  const indexOfFirstTraining = indexOfLastTraining - itemsPerPage;
  const currentTrainings = existingTrainings.slice(
    indexOfFirstTraining,
    indexOfLastTraining
  );

  const totalPages = Math.ceil(existingTrainings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="grid-container">
      <Header />
        <Sidebar />
        <div className="training-form">
         <div className="item-center">
         <h2>{editingTraining ? "Edit Training" : "Assign Training"}</h2>
         </div>
          
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
              type="text"
              placeholder="Training Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Training Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-actions">
            {editingTraining ? (
              <button onClick={handleUpdateTraining}>Update Training</button>
            ) : (
              <button onClick={handleAssignTraining}>Assign Training</button>
            )}
            <button onClick={resetForm}>Cancel</button>
          </div>
          {currentTrainings.length > 0 && (
            <div className="existing-trainings">
              <h3>Existing Training Assignments</h3>
              <ul>
                {currentTrainings.map((training) => (
                  <li key={training._id}>
                    <p>
                      <strong>Assigned to:</strong> {training.assignedToName}
                    </p>
                    <p>
                      <strong>Title:</strong> {training.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {training.description}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {training.completed ? "Completed" : "In Progress"}
                    </p>
                    <button onClick={() => handleEditTraining(training)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTraining(training._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {employeeDetails && (
            <div className="employee-details">
              <h3>Employee Details</h3>
              <p>
                <strong>Name:</strong> {employeeDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {employeeDetails.email}
              </p>
              <p>
                <strong>Role:</strong> {employeeDetails.role}
              </p>
              <p>
                <strong>Department:</strong> {employeeDetails.department}
              </p>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default AdminTraining;
