import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the userId from localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch employee profile data using the userId
    const fetchEmployeeProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/employees/${userId}`); // Use your backend API endpoint
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    // Fetch employee profile data when component mounts
    if (userId) {
      fetchEmployeeProfile();
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [userId]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render employee profile
  if (employee) {
    return (
      <div className="employee-profile">
        <h2>{employee.name}'s Profile</h2>
        <div className="profile-details">
          <img src={employee.imageUrl || '/default-avatar.png'} alt={employee.name} />
          <div className="details">
            <p><strong>Job Title:</strong> {employee.jobTitle}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Location:</strong> {employee.location}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>About:</strong> {employee.about}</p>
            <p><strong>Goals:</strong> {employee.goals}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmployeeProfile;
