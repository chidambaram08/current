import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Admin.css';

export default function RecruitmentManager() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [editJob, setEditJob] = useState({
        title: "",
        location: "",
        description: ""
    });

    const apiUrl = "http://localhost:5000";

    const handleSubmit = () => {
        setError("");
        if (title.trim() && location.trim() && description.trim()) {
            const newJob = { title, location, description };
            fetch(apiUrl + "/job-positions", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            }).then((res) => {
                if (res.ok) {
                    setJobs([...jobs, newJob]);
                    setTitle("");
                    setLocation("");
                    setDescription("");
                    setMessage("Job position added successfully");
                    setIsAdding(false);
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to add job position");
                }
            }).catch(() => setError("Unable to add job position"));
        }
    };

    useEffect(() => {
        fetch(apiUrl + "/job-positions")
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch(() => setError("Unable to fetch job positions"));
    }, []);

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditJob(item);
    };

    const handleUpdate = () => {
        setError("");
        if (editJob.title.trim() && editJob.location.trim() && editJob.description.trim()) {
            fetch(apiUrl + "/job-positions/" + editId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editJob)
            }).then((res) => {
                if (res.ok) {
                    setJobs(jobs.map((item) =>
                        item._id === editId ? editJob : item
                    ));
                    setEditId(-1);
                    setEditJob({
                        title: "",
                        location: "",
                        description: ""
                    });
                    setMessage("Job position updated successfully");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to update job position");
                }
            }).catch(() => setError("Unable to update job position"));
        }
    };

    const handleEditCancel = () => {
        setEditId(-1);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(apiUrl + '/job-positions/' + id, {
                method: "DELETE"
            }).then(() => {
                setJobs(jobs.filter((item) => item._id !== id));
            }).catch(() => setError("Unable to delete job position"));
        }
    };

    return (
        <div className="grid-container">
            <Header />
            <Sidebar />
            <div className="main-container">
                <div className="content-container">
                    <div className="row text-light">
                        <h3 className="my-3">Recruitment Manager</h3>
                        <button className="btn btn-success mb-3" onClick={() => setIsAdding(!isAdding)}>
                            {isAdding ? "Cancel" : "Add Job Position"}
                        </button>
                        {isAdding && (
                            <div className="employee-form-group d-flex gap-2 m-3">
                                <input
                                    placeholder="Job Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    className="form-control"
                                    type="text"
                                />
                                <input
                                    placeholder="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                    className="form-control"
                                    type="text"
                                />
                                <input
                                    placeholder="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className="form-control"
                                    type="text"
                                />
                                <button className="btn btn-dark" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        )}
                        {message && <p className="text-success">{message}</p>}
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                    <div className="row mt-3">
                        <h3>Job Positions List</h3>
                        <div className="col-md-12">
                            <ul className="list-group">
                                {jobs.map((item) => (
                                    <li
                                        className="employee-list-group-item bg-primary d-flex justify-content-between align-items-center my-2"
                                        key={item._id}
                                    >
                                        <div className="d-flex text-light flex-column me-2 p-2">
                                            {editId === -1 || editId !== item._id ? (
                                                <>
                                                    <span className="fw-bold">{item.title}</span>
                                                    <span>{item.location}</span>
                                                    <span>{item.description}</span>
                                                    <span>Applicants: {item.applicants}</span>
                                                </>
                                            ) : (
                                                <div className="employee-form-group d-flex flex-4 gap-2">
                                                    <input
                                                        placeholder="Job Title"
                                                        onChange={(e) =>
                                                            setEditJob({ ...editJob, title: e.target.value })
                                                        }
                                                        value={editJob.title}
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                    <input
                                                        placeholder="Location"
                                                        onChange={(e) =>
                                                            setEditJob({ ...editJob, location: e.target.value })
                                                        }
                                                        value={editJob.location}
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                    <input
                                                        placeholder="Description"
                                                        onChange={(e) =>
                                                            setEditJob({ ...editJob, description: e.target.value })
                                                        }
                                                        value={editJob.description}
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-flex flex-column p-2">
                                            {editId === -1 || editId !== item._id ? (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-info m-1"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger m-1"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-info m-1"
                                                        onClick={handleUpdate}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger m-1"
                                                        onClick={handleEditCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
