const express = require("express");
const app = express();
const db = require("./config/database");
const exercisesRoutes = require("./routes/exercises");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http").Server(app);
const {
  userJoinedRoom,
  removeUserFromRoom,
  codeChanged,
  chooseStudent,
} = require("./utils");

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

const io = new Server(http, {
  cors: {
    origin: "https://magical-donut-f4ea36.netlify.app",
  },
});

app.use(cors({
  origin: "https://magical-donut-f4ea36.netlify.app"
}));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", ({ roomId }) => {
    console.log("a user is joined to code block " + roomId);
    userJoinedRoom(roomId, socket);
  });

  socket.on("leave room", () => {
    console.log("a user leaved a room");
    removeUserFromRoom(socket);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUserFromRoom(socket);
  });

  socket.on("code change", ({ roomId, value }) => {
    console.log("code change event received");
    codeChanged(roomId, value, socket);
  });

  socket.on("choose student", ({ roomId }) => {
    console.log("role change event received");
    chooseStudent(roomId, socket);
  });
});

app.use("/exercises", exercisesRoutes);

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
