import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the application
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: "" });

    // Set default Authorization header for axios
    axios.defaults.headers.common['Authorization'] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                userId: parseData.userId,
                email: parseData.email,
                name: parseData.name,
                token: parseData.token
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
