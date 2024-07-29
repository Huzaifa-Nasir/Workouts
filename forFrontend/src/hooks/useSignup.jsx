import React, { useState } from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';


export default function useSignup() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signupFunc = async (email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if(!response.ok) {
            setError(data.error);
            setIsLoading(false);
            console.log('Error', data.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setIsLoading(false);
            console.log("User Signed UP", data);

            navigate('/');
        } 
    };

    return { signupFunc, isLoading, error };
}
