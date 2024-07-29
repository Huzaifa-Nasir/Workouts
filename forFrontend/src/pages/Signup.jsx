    import React, { useState } from 'react';
    import useSignup from '../hooks/useSignup';
   

    export default function Signup() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { error, isLoading, signupFunc } = useSignup();
      

        const handleSignup = async (e) => {
            e.preventDefault();
            await signupFunc(email, password);
          
        };

        return (
            <>
                <div className="signup">
                    <h1>Signup</h1>
                    <form className="signupForm" onSubmit={handleSignup}>
                        <label>Email:</label>
                        <input
                            type="text"
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
                        <button type="submit" disabled={isLoading}>Sign Up</button>
                        {error && <div className='errorField error'>{error}</div>}
                    </form>
                </div>
            </>
        );
    }
