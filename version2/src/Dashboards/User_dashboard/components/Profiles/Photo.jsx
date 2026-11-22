
import React, { useState } from "react";
import {
    BadgeCheck,
    UserRound,
    Pencil,
    Droplet
} from "lucide-react";

import { useMedicalProfile } from"../../../../contexts/MedicalProfileContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Photo = ({ onEdit }) => {

    const { profile, loading, error } = useMedicalProfile();

    const [imageError, setImageError] = useState(false);

    const calculateAge = (dob) => {
        if (!dob) return null;

        const birth = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();

        const hasHadBirthday =
            today.getMonth() > birth.getMonth() ||
            (today.getMonth() === birth.getMonth() &&
                today.getDate() >= birth.getDate());

        if (!hasHadBirthday) age--;

        return age;
    };

    if (loading) {
        return (
            <div className="animate-pulse p-6">
                <div className="h-6 w-48 rounded bg-slate-700 mb-8" />
                <div className="h-36 w-36 rounded-full bg-slate-700" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-400">
                Unable to load medical profile.
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-6 text-slate-400">
                Medical profile not found.
            </div>
        );
    }

    const age = calculateAge(profile.dob);

    const picUrl = profile.profilePic
        ? `${API_URL}${profile.profilePic}`
        : null;

    return (
        <div className="w-full px-4 py-5 sm:px-6">

            <div className="mb-8 flex items-center gap-3">
                <div className="h-10 w-1.5 rounded bg-red-500" />

                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Medical Profile
                </h1>
            </div>

            <div className="relative w-full max-w-3xl py-4">
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
                    >
                        <Pencil size={15} />
                        <span>Edit</span>
                    </button>
                )}

                <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
                    <div className="relative shrink-0">

                        <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-full border border-slate-600 bg-slate-800 p-2">

                            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-800">

                                {picUrl && !imageError ? (
                                    <img
                                        src={picUrl}
                                        alt="Profile"
                                        onError={() => setImageError(true)}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound
                                        size={55}
                                        className="text-slate-500"
                                    />
                                )}

                            </div>
                        </div>
                       <div className="absolute bottom-2 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#080f1e] bg-emerald-500">
                            <BadgeCheck
                                size={23}
                                className="text-[#080f1e]"
                            />
                        </div>

                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-center text-center sm:items-start sm:text-left">

                        <h2 className="wrap-break-word text-2xl sm:text-3xl font-bold text-white">
                            {profile.fullName}
                        </h2>

                        <p className="mt-2 text-base sm:text-lg text-slate-400">
                            {age !== null ? `${age} years` : "Age not provided"}

                            {profile.gender && (
                                <> · {profile.gender}</>
                            )}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">

                            <Droplet
                                size={17}
                                className="fill-red-500 text-red-500"
                            />

                            <span className="text-sm font-semibold text-red-400">
                                {profile.bloodGroup === "unknown"
                                    ? "Blood group unknown"
                                    : profile.bloodGroup}
                            </span>

                        </div>

                        <p className="mt-4 text-xs text-slate-500">
                            Medical Profile
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photo;
