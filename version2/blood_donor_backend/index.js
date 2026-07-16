const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", userRoute);
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Up and running at http://localhost:${PORT}`);
});