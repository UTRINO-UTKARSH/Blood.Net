import React, { useState } from "react";
import Medical_Form from "./components/Profiles/Medical_Form";
import Photo from "./components/Profiles/Photo";
import Vitals from "./components/Profiles/Vitals";
import PersonalDetails from "./components/Profiles/PersonalDetails";
import Spinner from "#components/common/Spinner.jsx";

import { useMedicalProfile } from '../../contexts/MedicalProfileContext' ;

const Medical_Profile = () => {
    const { profile, loading, refreshProfile } = useMedicalProfile();
    const [editing, setEditing] = useState(false);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080f1e]">
                <Spinner />
            </div>
        );
    }

    if (!profile || editing) {
        return (
            <Medical_Form
                onSaved={async () => {
                    await refreshProfile();
                    setEditing(false);
                }}
            />
        );
    }

    return (
        <div className="w-full">
            <Photo onEdit={() => setEditing(true)} />
            <PersonalDetails />
            <Vitals />
        </div>
    );
};

export default Medical_Profile;
