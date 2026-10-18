/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const Medical_Preview = (onedit) => {
    const [profile, setprofile] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/medical-profile/me`, {
                    credentials: "include",
                });
                if (!res.ok) return;
                const { profile } = await res.json();
                if (!profile) return;
                setprofile(profile)
            } catch {
                setprofile(null);

            }
        })();
    }, []);
    const calculateAge = (dob) => {
        if (!dob) return null;

        const birth = new Date(dob);
        const today = new Date();

        let age = today.getUTCFullYear() - birth.getUTCFullYear();

        const hasHadBirthday =
            today.getUTCMonth() > birth.getUTCMonth() ||
            (today.getUTCMonth() === birth.getUTCMonth() &&
                today.getUTCDate() >= birth.getUTCDate());

        if (!hasHadBirthday) age--;

        return age;
    };
    if (!profile) return null;
    const age = calculateAge(profile.dob)
    const picUrl = profile.profilePic ? `${API_URL}${profile.profilePic}` : null;
    return (
        <div>
            <div className='p-6 flex items-center gap-3'>
                <div className='bg-red-500 h-10 w-1.5 opacity-95 rounded'></div>
                <span className='text-3xl font-bold'>Medical Profile</span>
            </div>
            <div className='flex flex-col mt-3'>
                <div className='relative flex flex-col gap-3 h-50 w-50'>
                    <div className='h-full w-full rounded-full border border-slate-700 bg-slate-800/40 p-3'>
                        {/* photo */}
                        <div className='h-full w-full overflow-hidden rounded-full bg-slate-800'>
                            {picUrl && (
                                <img className='h-full w-full object-cover' src={picUrl} alt="Profile" />
                            )}
                        </div>
                    </div>
                    <div className='absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#080f1e] bg-emerald-500'>
                        <BadgeCheck size={24} className='text-[#080f1e]' />
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <span className='text-3xl font-bold font-greet'>Name: {profile.fullName}</span>
                        <span className='text-xl text-slate-400'>Age: {age} years</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medical_Preview