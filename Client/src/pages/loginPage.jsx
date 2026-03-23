import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountsApi } from '../api/accounts.api';
import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import '../css/loginPage.css';
export default function LoginPage() { 
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const accounts = await accountsApi.list();
            const selectedAcc = accounts.find(acc => acc.user_name === username);
            
            if (selectedAcc) {
                const userSession = {
                    id: selectedAcc.id,
                    username: selectedAcc.user_name,
                    type: selectedAcc.user_type
                };
                localStorage.setItem('user', JSON.stringify(userSession));

                if (selectedAcc.user_type === 1) {
                    navigate('/admin');
                } else if (selectedAcc.user_type === 0) {
                    navigate('/customer');
                }
            } else {
                setError('Username not found');
            }
        } catch (err) {
            console.error("Database connection error:", err);
            setError('Could not connect to the database')
        };

        // const storedUser = 0;
        // if (username === 'admin' && password === '1234') {
        //     const testLogin = { username: 'admin', type: 1 };
        //     localStorage.setItem('user', JSON.stringify(testLogin));

        //     if (testLogin.type === 1) {
        //         navigate('/admin');
        //     } else {
        //     setError('Invalid account type');
        // }
        // } else if (username === 'customer' && password === '5678') {
        //     const testLogin = { username: 'customer', type: 0 };
        //     localStorage.setItem('user', JSON.stringify(testLogin));

        //     if (testLogin.type === 0) {
        //         navigate('/customer');
        //     } else {
        //     setError('Invalid account type');
        // }
        // } else {
        //     setError('Invalid username or password');
        // }
    };



    return (
        <div className="login-page">

            <div className='image'>
                <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img>
            </div>

            <div className='login-form'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div class="mb-3">
                        <label for="InputUsername" class="form-label">Username</label>
                        <input type="text" class="form-control" id="InputUsername" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div class="mb-3">
                        <label for="InputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="InputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" >Submit</button>
                </form>
            </div>

        </div>
     )
}