// src/hooks/useLogout.js
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import apiRequest from "../utilities/apiRequest";

const useLogout = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // Call the logout endpoint on the server to clear the refresh token cookie
            await apiRequest.post("/auth/logout", {}, { withCredentials: true });

            // Clear auth state in context to log the user out on the client
            setAuth({});
            
            // Redirect to the login page or home page after logout
            navigate("/");
        } catch (err) {
            console.error("Error during logout:", err);
            alert("Logout failed. Please try again.");
        }
    };

    return logout;
};

export default useLogout;
