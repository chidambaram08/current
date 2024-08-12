import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token, role } = res.data;
            localStorage.setItem('token', token);

            if (role === 'admin') navigate('/admin');
            else if (role === 'hrmanager') navigate('/hrdashboard');
            else navigate('/employee');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" placeholder="Password" onChange={onChange} required />
            <button type="submit">Login</button>
             <Link to='/'>Register</Link>
            </form>
    );
};

export default Login;
