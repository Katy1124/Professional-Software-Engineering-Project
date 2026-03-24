import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png';
import '../css/loginPage.css';
import { authApi } from '../api/auth.api';

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

    try {
        const user = await authApi.login({
            user_name: username,
            password: password
        });

        const userSession = {
            id: user.id,
            username: user.user_name,
            type: user.user_type
        };

        localStorage.setItem('user', JSON.stringify(userSession));

        if (user.user_type === 1) {
            navigate('/admin');
        } else if (user.user_type === 0) {
            navigate('/customer');
        } else {
            setError('Invalid account type');
        }
    } catch (err) {
        console.error('Login error:', err);
        setError('Invalid username or password');
    }
    };

    return (
        <div className="login-page">
            <div className="image">
                <img src={giacomLogo} alt="GIACOM" width="110" height="24" />
            </div>

            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="InputUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="InputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p>{error}</p>}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}