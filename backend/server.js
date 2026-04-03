const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // ✅ keep here
require("./db");

const User = require("./models/User");
const Application = require("./models/Application");

const app = express(); // ✅ MUST COME FIRST

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ STATIC FOLDER (ONLY ONE, CORRECT WAY)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// ✅ REGISTER
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const user = new User({ email, password, role });
  await user.save();

  res.json({ message: "User saved in DB" });
});

// ✅ LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.json({ email: user.email, role: user.role });
});

// ✅ APPLY
app.post("/api/apply", upload.single("file"), async (req, res) => {
  try {
    const email = req.body.email;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newApp = new Application({
      email,
      document: file.filename
    });

    await newApp.save();

    res.json({ message: "Application Saved" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error uploading file" });
  }
});

// ✅ GET APPLICATIONS
app.get("/api/applications", async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
});

// ✅ APPROVE
app.post("/api/approve/:id", async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, {
    status: "Approved"
  });

  res.json({ message: "Approved" });
});

// ✅ REJECT
app.post("/api/reject/:id", async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, {
    status: "Rejected"
  });

  res.json({ message: "Rejected" });
});



app.post("/api/profile", async (req, res) => {
  console.log("Profile:", req.body);
  res.json({ message: "Profile saved" });
});



app.post("/api/forward", async (req, res) => {
  const { email } = req.body;

  await Application.updateMany(
    { email },
    { status: "Forwarded" }
  );

  res.json({ message: "Application Forwarded" });
});


// ✅ START SERVER
app.listen(5000, () => console.log("Server running"));