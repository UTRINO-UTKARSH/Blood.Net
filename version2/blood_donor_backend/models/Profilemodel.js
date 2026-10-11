const mongoose = require("mongoose");

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"];

const medicalProfileSchema = new mongoose.Schema(
  {
    // One profile per user. Always set from the JWT, never from the request body.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    dob: { type: Date, required: true },
    gender: { type: String, trim: true, maxlength: 30, default: "" },
    bloodGroup: { type: String, required: true, enum: BLOOD_GROUPS },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, "Invalid phone number"],
    },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    height: { type: Number, min: 1, max: 300, default: null },
    weight: { type: Number, min: 1, max: 500, default: null },
    allergies: { type: String, trim: true, maxlength: 500, default: "" },
    chronicConditions: { type: String, trim: true, maxlength: 500, default: "" },
    profilePic: { type: String, default: "" }, // relative URL, e.g. /uploads/avatars/abc.jpg
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", medicalProfileSchema);
module.exports.BLOOD_GROUPS = BLOOD_GROUPS;