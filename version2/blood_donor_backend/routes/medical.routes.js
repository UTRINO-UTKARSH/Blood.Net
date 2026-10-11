const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const MedicalProfile = require("../models/Profilemodel");
const { BLOOD_GROUPS } = MedicalProfile;
const { protect } = require("../middleware/auth"); // <-- your JWT cookie middleware

const router = express.Router();

// ---------- Image upload ----------
const AVATAR_DIR = path.join(__dirname, "..", "uploads", "avatars");
fs.mkdirSync(AVATAR_DIR, { recursive: true });

const EXT = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

const upload = multer({
  storage: multer.diskStorage({
    destination: AVATAR_DIR,
    // random name, so the original filename is never trusted or exposed
    filename: (req, file, cb) =>
      cb(null, crypto.randomBytes(16).toString("hex") + EXT[file.mimetype]),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    EXT[file.mimetype] ? cb(null, true) : cb(new Error("Only JPG, PNG or WebP images are allowed.")),
});

const removeFile = (relUrl) => {
  if (!relUrl) return;
  const file = path.join(AVATAR_DIR, path.basename(relUrl));
  fs.promises.unlink(file).catch(() => {});
};

// ---------- Validation ----------
const FIELDS = [
  "fullName", "dob", "gender", "bloodGroup", "phone",
  "location", "height", "weight", "allergies", "chronicConditions",
];

const toNumberOrNull = (v) => (v === "" || v == null ? null : Number(v));

function buildData(body) {
  const data = {};
  for (const key of FIELDS) {
    if (typeof body[key] === "string") data[key] = body[key].trim();
  }
  data.height = toNumberOrNull(body.height);
  data.weight = toNumberOrNull(body.weight);
  return data;
}

function validate(d) {
  if (!d.fullName) return "Full name is required.";
  if (!d.dob || Number.isNaN(Date.parse(d.dob))) return "A valid date of birth is required.";
  if (new Date(d.dob) > new Date()) return "Date of birth cannot be in the future.";
  if (!BLOOD_GROUPS.includes(d.bloodGroup)) return "Please select a valid blood group.";
  if (!d.phone) return "Phone number is required.";
  if (!d.location) return "Location is required.";
  if (d.height !== null && !(d.height >= 1 && d.height <= 300)) return "Height must be between 1 and 300 cm.";
  if (d.weight !== null && !(d.weight >= 1 && d.weight <= 500)) return "Weight must be between 1 and 500 kg.";
  return null;
}

// ---------- Routes ----------
router.get("/me", protect, async (req, res) => {
  const profile = await MedicalProfile.findOne({ user: req.user._id || req.user.id });
  res.json({ profile });
});

// PUT /api/medical-profile/me  -> create or update (multipart/form-data)
router.put("/me", protect, upload.single("profilePic"), async (req, res) => {
  const data = buildData(req.body);
  const error = validate(data);

  if (error) {
    if (req.file) removeFile(req.file.filename);
    return res.status(400).json({ message: error });
  }

  const userId = req.user._id || req.user.id;
  const existing = await MedicalProfile.findOne({ user: userId });

  if (req.file) data.profilePic = `/uploads/avatars/${req.file.filename}`;

  const profile = await MedicalProfile.findOneAndUpdate(
    { user: userId },
    { $set: data },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  if (req.file && existing?.profilePic) removeFile(existing.profilePic); 
  res.json({ profile });
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message?.startsWith("Only JPG")) {
    return res.status(400).json({
      message: err.code === "LIMIT_FILE_SIZE" ? "Image must be under 5 MB." : err.message,
    });
  }
  next(err);
});

module.exports = router;