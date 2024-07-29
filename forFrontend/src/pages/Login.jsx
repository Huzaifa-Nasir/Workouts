import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error,isLoading, loginFunc} = useLogin();

    const handleLoggedIN = async (e) => {
        e.preventDefault();

       await loginFunc(email,password)

    };

    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form className="loginForm" onSubmit={handleLoggedIN}>
                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button type="submit" disabled={isLoading}>Login</button>
                    {error && <div className='errorField error'>{error}</div>}
                </form>
            </div>
        </>
    );
}
