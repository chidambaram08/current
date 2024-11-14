import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Admin.css';

export default function EmployeeManager() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [editEmployee, setEditEmployee] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        joinDate: "",
        role: "",
        department: "",
        location: "",
        phone: ""
    });

    // Sidebar toggle state
    const [openSidebar, setOpenSidebar] = useState(true);

    const apiUrl = "http://localhost:5000";

    const handleSubmit = () => {
        setError("");
        if (name.trim() && email.trim() && phone.trim()) {
            const newEmployee = { name, email, password, gender, joinDate, role, department, location, phone };
            fetch(apiUrl + "/employees", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEmployee)
            }).then((res) => {
                if (res.ok) {
                    setEmployees([...employees, newEmployee]);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setGender("");
                    setJoinDate("");
                    setRole("");
                    setDepartment("");
                    setLocation("");
                    setPhone("");
                    setMessage("Employee added successfully");
                    setIsAdding(false); // Hide form after adding
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to add employee");
                }
            }).catch(() => setError("Unable to add employee"));
        }
    };

    useEffect(() => {
        fetch(apiUrl + "/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch(() => setError("Unable to fetch employees"));
    }, []);

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditEmployee(item);
    };

    const handleUpdate = () => {
        setError("");
        if (editEmployee.name.trim() && editEmployee.email.trim() && editEmployee.phone.trim()) {
            fetch(apiUrl + "/employees/" + editId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editEmployee)
            }).then((res) => {
                if (res.ok) {
                    setEmployees(employees.map((item) =>
                        item._id === editId ? editEmployee : item
                    ));
                    setEditId(-1);
                    setEditEmployee({
                        name: "",
                        email: "",
                        password: "",
                        gender: "",
                        joinDate: "",
                        role: "",
                        department: "",
                        location: "",
                        phone: ""
                    });
                    setMessage("Employee updated successfully");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to update employee");
                }
            }).catch(() => setError("Unable to update employee"));
        }
    };

    const handleEditCancel = () => {
        setEditId(-1);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(apiUrl + '/employees/' + id, {
                method: "DELETE"
            }).then(() => {
                setEmployees(employees.filter((item) => item._id !== id));
            }).catch(() => setError("Unable to delete employee"));
        }
    };

    // Pagination logic
    const employeesPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="grid-container">
            <Header openSidebarToggle={() => setOpenSidebar(!openSidebar)} />
            <Sidebar openSidebar={openSidebar} />
            <div className="main-container ">
            <div className="content-container">
            <div className="row text-light ">
                <h3 className="my-3">Employee Manager</h3>
                <button className="btn btn-success mb-3" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "Add Employee"}
                </button>
                {isAdding && (
                    <div className="employee-form-group d-flex  gap-2 m-3">
                        <input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} className="form-control" type="text" />
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" type="text" />
                        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" type="text" />
                        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" type="password" />
                        <input placeholder="Gender" onChange={(e) => setGender(e.target.value)} value={gender} className="form-control" type="text" />
                        <input placeholder="Joining Date" onChange={(e) => setJoinDate(e.target.value)} value={joinDate} className="form-control" type="date" />
                        <input placeholder="Role" onChange={(e) => setRole(e.target.value)} value={role} className="form-control" type="text" />
                        <input placeholder="Department" onChange={(e) => setDepartment(e.target.value)} value={department} className="form-control" type="text" />
                        <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} value={location} className="form-control" type="text" />
                        <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                    </div>
                )}
                {message && <p className="text-success">{message}</p>}
                {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="row mt-3 ">
                <h3>Employee List</h3>
                <div className="col-md-12">
                    <ul className="list-group">
                        {currentEmployees.map((item) =>
                            <li className="employee-list-group-item bg-primary d-flex justify-content-between align-items-center my-2" key={item._id}>
                                <div className="d-flex text-light flex-column me-2 p-2">
                                    {editId === -1 || editId !== item._id ? (
                                        <>
                                            <span className="fw-bold">{item.name}</span>
                                            <span>{item.email}</span>
                                            <span>{item.phone}</span>
                                        </>
                                    ) : (
                                        <div className="employee-form-group d-flex flex-4 gap-2">
                                            <input placeholder="Name" onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })} value={editEmployee.name} className="form-control" type="text" />
                                            <input placeholder="Email" onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} value={editEmployee.email} className="form-control" type="text" />
                                            <input placeholder="Phone" onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })} value={editEmployee.phone} className="form-control" type="text" />
                                            <input placeholder="Password" onChange={(e) => setEditEmployee({ ...editEmployee, password: e.target.value })} value={editEmployee.password} className="form-control" type="password" />
                                            <input placeholder="Gender" onChange={(e) => setEditEmployee({ ...editEmployee, gender: e.target.value })} value={editEmployee.gender} className="form-control" type="text" />
                                            <input placeholder="Joining Date" onChange={(e) => setEditEmployee({ ...editEmployee, joinDate: e.target.value })} value={editEmployee.joinDate} className="form-control" type="date" />
                                            <input placeholder="Role" onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })} value={editEmployee.role} className="form-control" type="text" />
                                            <input placeholder="Department" onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })} value={editEmployee.department} className="form-control" type="text" />
                                            <input placeholder="Location" onChange={(e) => setEditEmployee({ ...editEmployee, location: e.target.value })} value={editEmployee.location} className="form-control" type="text" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {editId === -1 || editId !== item._id ? (
                                        <>
                                            <button className="btn btn-info me-1" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn btn-danger me-1" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-dark me-1" onClick={handleUpdate}>Update</button>
                                            <button className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="pagination mt-4">
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            </div>
        </div>
    );
}
