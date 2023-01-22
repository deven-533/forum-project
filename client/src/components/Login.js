import React, { useState } from 'react';
import './Login.css'
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const data = {
        email: Email,
        password: Password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/auth/login', data, {withCredentials : true}).then(function (response) {
            console.log(response);
            navigate('/')

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className='login-class'>
                    <div className="Email-container">
                        <label className='n-name'>Email</label>
                        <input className='n-input' onChange={(e) => { setEmail(e.target.value); console.log(Email) }} />
                    </div>
                    <div className="Email-container">
                        <label className='n-name' >Password</label>
                        <input className='n-input' onChange={(e) => { setPassword(e.target.value); console.log(Password) }} />
                    </div>
                    <div className="button-container">
                        <button className='button-c' onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;
