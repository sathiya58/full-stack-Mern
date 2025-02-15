import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://full-stack-mern-856n.onrender.com";

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(null);

    // Getting Doctors using API (wrapped in useCallback)
    const getDoctorsData = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching doctors data.");
        }
    }, [backendUrl]); // Dependency added

    // Getting User Profile using API (wrapped in useCallback)
    const loadUserProfileData = useCallback(async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching user profile.");
        }
    }, [backendUrl, token]); // Dependencies added

    useEffect(() => {
        getDoctorsData();
    }, [getDoctorsData]); // Now includes dependency

    useEffect(() => {
        loadUserProfileData();
    }, [loadUserProfileData]); // Now includes dependency

    return (
        <AppContext.Provider
            value={{
                doctors,
                getDoctorsData,
                currencySymbol,
                backendUrl,
                token,
                setToken,
                userData,
                setUserData,
                loadUserProfileData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// ✅ Add PropTypes validation
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;
