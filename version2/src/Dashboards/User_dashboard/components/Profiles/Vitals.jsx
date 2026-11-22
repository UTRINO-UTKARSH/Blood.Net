
import React from "react";
import {
    Activity,
    Ruler,
    Weight,
    AlertCircle,
    HeartPulse
} from "lucide-react";

import { useMedicalProfile } from "../../../../contexts/MedicalProfileContext";

const Vitals = () => {
    const { profile, loading, error } = useMedicalProfile();

    if (loading) return null;
    if (error || !profile) return null;

    const stats = [
        {
            label: "Height",
            value: profile.height ? `${profile.height} cm` : "Not provided",
            icon: Ruler,
        },
        {
            label: "Weight",
            value: profile.weight ? `${profile.weight} kg` : "Not provided",
            icon: Weight,
        },
    ];

    return (
        <section className="mt-8 w-full max-w-3xl px-4 sm:px-6">

            <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-red-500" />
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Vital Statistics
                </h2>
                <Activity className="ml-auto text-sky-400" size={22} />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-4 sm:p-5"
                        >
                            <div className="flex items-center gap-2 text-slate-400">
                                <Icon size={18} className="text-sky-400" />
                                <span className="text-xs font-medium uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </div>

                            <p className="mt-3 wrap-break-word text-2xl font-bold text-white sm:text-3xl">
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4 sm:p-5">

                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                    <HeartPulse size={19} className="text-red-400" />
                    Medical Conditions
                </h3>

                <div className="flex flex-col gap-2 border-b border-slate-700/50 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <AlertCircle size={17} />
                        <span className="text-sm">Known Allergies</span>
                    </div>

                    <span className={`w-fit max-w-full wrap-break-word rounded-full px-3 py-1 text-xs font-medium ${
                        profile.allergies
                            ? "bg-red-500/10 text-red-400"
                            : "bg-slate-700/50 text-slate-400"
                    }`}>
                        {profile.allergies || "Not provided"}
                    </span>
                </div>

                <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Activity size={17} />
                        <span className="text-sm">Chronic Conditions</span>
                    </div>

                    <span className={`w-fit max-w-full wrap-break-word rounded-full px-3 py-1 text-xs font-medium ${
                        profile.chronicConditions
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-slate-700/50 text-slate-400"
                    }`}>
                        {profile.chronicConditions || "Not provided"}
                    </span>
                </div>

            </div>
        </section>
    );
};

export default Vitals;
