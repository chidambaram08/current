import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated');
      return;
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      setError('Invalid or missing user ID in token');
      return;
    }

    axios.get(`/api/training/employee/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setTrainings(response.data))
    .catch(err => {
      console.error(err);
      setError('Failed to fetch training data. ' + (err.response ? err.response.data : ''));
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Training</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : trainings.length > 0 ? (
        <div className="list-group">
          {trainings.map(training => (
            <div key={training._id} className="list-group-item list-group-item-action">
              <h5 className="mb-1">{training.title}</h5>
              <p className="mb-1">{training.description}</p>
              <p className="mb-1">
                Status: <span className={`badge ${training.completed ? 'bg-success' : 'bg-warning'}`}>
                  {training.completed ? 'Completed' : 'In Progress'}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          No training assigned.
        </div>
      )}
    </div>
  );
};

// Helper function to decode the JWT and get the user ID
function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded token payload:', payload); // For debugging
    return payload.id; // Replace 'id' with the correct field if necessary
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
}

export default EmployeeTraining;
