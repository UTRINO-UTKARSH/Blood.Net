import React, { useEffect, useRef, useState } from "react";
import { Camera, UserRound, MapPin, Droplet, HeartPulse } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Medical_Form = () => {
    const fileInputRef = useRef(null);

    const [profilePic, setProfilePic] = useState(null); 
    const [profileFile, setProfileFile] = useState(null); 
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        location: "",
        height: "",
        weight: "",
        allergies: "",
        chronicConditions: "",
    });
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/medical-profile/me`, {
                    credentials: "include",
                });
                if (!res.ok) return;
                const { profile } = await res.json();
                if (!profile) return;

                setFormData({
                    fullName: profile.fullName ?? "",
                    dob: profile.dob ? profile.dob.slice(0, 10) : "",
                    gender: profile.gender ?? "",
                    bloodGroup: profile.bloodGroup ?? "",
                    phone: profile.phone ?? "",
                    location: profile.location ?? "",
                    height: profile.height != null ? String(profile.height) : "",
                    weight: profile.weight != null ? String(profile.weight) : "",
                    allergies: profile.allergies ?? "",
                    chronicConditions: profile.chronicConditions ?? "",
                });
                if (profile.profilePic) setProfilePic(`${API_URL}${profile.profilePic}`);
            } catch {
                /* first-time user or server offline: leave the form empty */
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5 MB.");
            return;
        }

        setProfileFile(file);
        setProfilePic(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);

        try {
            // FormData because we're sending a file as well as text.
            // Don't set Content-Type yourself: the browser adds the multipart boundary.
            const body = new FormData();
            Object.entries(formData).forEach(([key, value]) => body.append(key, value));
            if (profileFile) body.append("profilePic", profileFile);

            const res = await fetch(`${API_URL}/api/medical-profile/me`, {
                method: "PUT",
                credentials: "include", // sends your httpOnly JWT cookie
                body,
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Could not save your profile.");

            setProfileFile(null);
            setStatus({ type: "success", text: "Medical profile saved." });
        } catch (err) {
            setStatus({ type: "error", text: err.message });
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-slate-700 bg-slate-900 " +
        "px-4 py-3 text-sm text-white outline-none transition " +
        "placeholder:text-slate-500 focus:border-red-500";

    const labelClass = "mb-2 block text-sm font-medium text-slate-300";

    return (
        <div className="min-h-screen bg-[#080f1e] px-4 py-8 text-white sm:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                        Blood.net / Account Setup
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Create your medical profile
                    </h1>

                    <p className="mt-3 text-sm text-slate-400">
                        Add your details to help make blood donation and emergency
                        assistance easier.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-slate-800 bg-[#101a2c] p-5 sm:p-8"
                >
                    <div className="flex flex-col items-center gap-4 border-b border-slate-800 pb-7 sm:flex-row">
                        <div className="relative">
                            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-slate-800">
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt="Profile preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound size={42} className="text-slate-500" />
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 rounded-full bg-red-600 p-2 transition hover:bg-red-500"
                                aria-label="Upload profile picture"
                            >
                                <Camera size={18} />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-lg font-semibold">Profile picture</h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Upload a clear picture of yourself.
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                JPG, PNG or WebP · Maximum 5 MB
                            </p>
                        </div>
                    </div>

                    {/* Personal details */}
                    <section>
                        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <UserRound className="text-red-400" size={20} />
                            Personal information
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Full name *</label>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    autoComplete="name"
                                    required
                                    maxLength={100}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Date of birth *</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={inputClass}
                                    autoComplete="bday"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Phone number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className={inputClass}
                                    autoComplete="tel"
                                    maxLength={15}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Location *</label>
                                <div className="relative">
                                    <MapPin
                                        size={18}
                                        className="absolute left-3 top-3.5 text-slate-500"
                                    />
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, state"
                                        className={`${inputClass} pl-10`}
                                        autoComplete="address-level2"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-slate-800 pt-6">
                        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                            <HeartPulse className="text-red-400" size={20} />
                            Medical information
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>
                                    Blood group *
                                </label>

                                <div className="relative">
                                    <Droplet
                                        size={18}
                                        className="absolute left-3 top-3.5 text-red-400"
                                    />

                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-10`}
                                        required
                                    >
                                        <option value="">Select blood group</option>
                                        {[
                                            "A+",
                                            "A-",
                                            "B+",
                                            "B-",
                                            "AB+",
                                            "AB-",
                                            "O+",
                                            "O-",
                                        ].map((group) => (
                                            <option key={group} value={group}>
                                                {group}
                                            </option>
                                        ))}
                                        <option value="unknown">I don't know</option>
                                    </select>
                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    If unknown, select "I don't know". Confirm blood type
                                    through appropriate testing before transfusion.
                                </p>
                            </div>

                            <div>
                                <label className={labelClass}>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    placeholder="e.g. 175"
                                    className={inputClass}
                                    min="1"
                                    max="300"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="e.g. 70"
                                    className={inputClass}
                                    min="1"
                                    max="500"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Known allergies</label>
                                <input
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    placeholder="e.g. Penicillin, or None known"
                                    className={inputClass}
                                    maxLength={500}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Chronic conditions
                                </label>
                                <input
                                    name="chronicConditions"
                                    value={formData.chronicConditions}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                    className={inputClass}
                                    maxLength={500}
                                />
                            </div>
                        </div>
                    </section>

                    {status && (
                        <p
                            role="status"
                            className={`rounded-lg px-4 py-3 text-sm ${
                                status.type === "success"
                                    ? "bg-emerald-500/10 text-emerald-300"
                                    : "bg-red-500/10 text-red-300"
                            }`}
                        >
                            {status.text}
                        </p>
                    )}

                    {/* Submit */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    fullName: "",
                                    dob: "",
                                    gender: "",
                                    bloodGroup: "",
                                    phone: "",
                                    location: "",
                                    height: "",
                                    weight: "",
                                    allergies: "",
                                    chronicConditions: "",
                                });
                                setProfilePic(null);
                                setProfileFile(null);
                                setStatus(null);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                            className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                        >
                            Reset form
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-red-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save medical profile"}
                        </button>
                    </div>
                </form>

                <p className="mt-5 text-center text-xs text-slate-500">
                    Your medical information should only be accessible to authorized
                    users with appropriate permission.
                </p>
            </div>
        </div>
    );
};

export default Medical_Form;