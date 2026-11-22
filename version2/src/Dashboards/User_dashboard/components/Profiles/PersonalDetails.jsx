
import React from "react";
import { UserRound, MapPin, Phone, CalendarDays, VenusAndMars } from "lucide-react";
import { useMedicalProfile } from "../../../../contexts/MedicalProfileContext";

const PersonalDetails = () => {
    const { profile, loading, error } = useMedicalProfile();

    if (loading || error || !profile) return null;

    const details = [
        {
            label: "Date of Birth",
            value: profile.dob
                ? new Date(profile.dob).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
                : "Not provided",
            icon: CalendarDays,
        },
        {
            label: "Gender",
            value: profile.gender || "Not provided",
            icon: VenusAndMars,
        },
        {
            label: "Phone Number",
            value: profile.phone || "Not provided",
            icon: Phone,
        },
        {
            label: "Location",
            value: profile.location || "Not provided",
            icon: MapPin,
        },
    ];

    return (
        <section className="mt-8 w-full max-w-3xl px-4 sm:px-6">

            <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-red-500" />
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Personal Details
                </h2>
                <UserRound className="ml-auto text-sky-400" size={22} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {details.map((detail) => {
                    const Icon = detail.icon;

                    return (
                        <div
                            key={detail.label}
                            className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4"
                        >
                            <div className="rounded-lg bg-slate-800 p-2">
                                <Icon size={19} className="text-sky-400" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    {detail.label}
                                </p>

                                <p className="mt-1 wrap-break-word text-sm font-semibold text-white sm:text-base">
                                    {detail.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PersonalDetails;
