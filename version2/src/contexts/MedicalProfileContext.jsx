/* eslint-disable react-refresh/only-export-components */
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MedicalProfileContext = createContext(null);

export const MedicalProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch profile
    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `${API_URL}/api/medical-profile/me`,
                { credentials: "include" }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch medical profile");
            }

            const data = await res.json();

            setProfile(data.profile ?? null);

        } catch (err) {
            setError(err.message);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch once when provider mounts
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <MedicalProfileContext.Provider
            value={{
                profile,
                setProfile,
                loading,
                error,
                refreshProfile: fetchProfile
            }}
        >
            {children}
        </MedicalProfileContext.Provider>
    );
};

// Custom hook
export const useMedicalProfile = () => {
    const context = useContext(MedicalProfileContext);

    if (!context) {
        throw new Error(
            "useMedicalProfile must be used inside MedicalProfileProvider"
        );
    }

    return context;
};
