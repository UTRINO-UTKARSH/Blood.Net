import React, { useEffect, useState } from "react";
import Medical_Form from "./components/Profiles/Medical_Form";
import Medical_Preview from "./components/Profiles/Medical_Preview";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Medical_Profile = () => {
    const [view, setView] = useState(null); // null = still checking

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/medical-profile/me`, {
                    credentials: "include",
                });
                if (!res.ok) return setView("form");
                const { profile } = await res.json();
                setView(profile ? "preview" : "form");
            } catch {
                setView("form"); // server offline or first-time user
            }
        })();
    }, []);

    if (view === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080f1e] text-slate-400">
                Loading...
            </div>
        );
    }

    if (view === "preview") {
        return <Medical_Preview onEdit={() => setView("form")} />;
    }

    return <Medical_Form onSaved={() => setView("preview")} />;
};

export default Medical_Profile;