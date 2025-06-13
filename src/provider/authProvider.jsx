import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {saveToken, getToken, removeToken, isAuthenticated} from "../services/auth";
import api from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    //state to hold the auth token from storage
    const [token, setToken_] = useState(getToken());

    //update token state
    const setToken = (newToken) => {
        // Save the token to local storage
        setToken_(newToken);
    };

    // keep Axios header in sync with the token state
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            saveToken(token); // Save the token to local storage
        } else {
            delete api.defaults.headers.common['Authorization'];
            removeToken(); // Remove the token from local storage
        }
    }, [token]); // run this effect whenever the token changes

    // Create a context value that includes the token and a function to update it
    const contextValue = useMemo(() => ({
        token,
        setToken,
        isAuthenticated: !!token,
    }), [token]);

    // Provide the context to children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
