import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login');
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: "#263043" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card" style={{ borderRadius: "1rem", backgroundColor: "#ffffff" }}>
                            <div className="card-body p-5 text-center">
                                <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "#000000" }}>Register</h2>
                                <p className="text-black-50 mb-5">Create your account!</p>
                                
                                <form onSubmit={onSubmit}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <select
                                            name="role"
                                            className="form-control form-control-lg"
                                            onChange={onChange}
                                            required
                                        >
                                            <option value="employee">Employee</option>
                                            <option value="admin">Admin</option>
                                            <option value="hrmanager">HR Manager</option>
                                            <option value="departmentmanager">Department Manager</option>
                                        </select>
                                    </div>
                                    
                                    <button className="btn btn-dark btn-lg px-5" type="submit">
                                        Register
                                    </button>

                                    <div className="mt-3">
                                        <Link to='/login' className="text-dark">Already have an account? Login</Link>
                                    </div>
                                </form>
                                
                                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                    <a href="#!" className="text-dark"><i className="fab fa-facebook-f fa-lg"></i></a>
                                    <a href="#!" className="text-dark mx-4 px-2"><i className="fab fa-twitter fa-lg"></i></a>
                                    <a href="#!" className="text-dark"><i className="fab fa-google fa-lg"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
