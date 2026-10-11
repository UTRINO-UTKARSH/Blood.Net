const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const userRoute = require("./routes/user.route.js");
const medicalroutes = require("./routes/medical.routes.js")
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Allow localhost for dev, or your production frontend URL from environment variables
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoute);
app.use("/api/medical-profile",medicalroutes)
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-location", ({ latitude, longitude }) => {
    socket.broadcast.emit("rec", {
      id: socket.id,
      latitude,
      longitude,
    });
  });

  socket.on("disconnect", () => {
    io.emit("user-gone", socket.id);
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Up and running at http://localhost:${PORT}`);
  console.log("Socket.IO server ready");
});