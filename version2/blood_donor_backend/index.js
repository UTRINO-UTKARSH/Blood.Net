const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow localhost for dev, or your production frontend URL from environment variables
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL // Add your frontend URL on Render here
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoute);

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Up and running at http://localhost:${PORT}`);
});