import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png';
import '../css/loginPage.css';
import { authApi } from '../api/auth.api';

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

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
            localStorage.setItem('token', user.token);

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="image">
                <img src={giacomLogo} alt="GIACOM" />
            </div>

            <div className="login-form">
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="InputUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="InputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button
                        type="submit"
                        className="login-btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}