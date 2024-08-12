import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

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
        <form onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={onChange} required />
            <input type="email" name="email" placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" placeholder="Password" onChange={onChange} required />
            <select name="role" onChange={onChange}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="hrmanager">HR Manager</option>
                <option value="departmentmanager">Department Manager</option>
            </select>
            <button type="submit">Register</button>
            <Link to='/login'>Login</Link>
        </form>
    );
};

export default Register;
