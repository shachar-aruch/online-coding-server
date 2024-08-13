const rooms = {};
const roomsOutput = {};

exports.userJoinedRoom = (roomId, socket) => {
  let role = "viewer";

  if (!rooms[roomId]) {
    rooms[roomId] = [];
    role = "teacher";
  }

  if (rooms[roomId].length == 1) {
    role = "student";
  }

  if (!rooms[roomId].some((user) => user.socket.id === socket.id)) {
    rooms[roomId].push({ socket, role });
    socket.emit("joined", { role });
    rooms[roomId].forEach((user) => {
      user.socket.emit("amount changed", { amount: rooms[roomId].length });
    });

    if (roomsOutput[roomId]) {
      socket.emit("code change", { value: roomsOutput[roomId] });
    }
  }
};

exports.removeUserFromRoom = (socket) => {
  Object.keys(rooms).forEach((roomId) => {
    const user = rooms[roomId]?.find((user) => user.socket.id === socket.id);
    if (user) {
      if (user.role === "teacher") {
        rooms[roomId]?.forEach((user) => {
          user.socket.emit("teacher left");
        });
        delete rooms[roomId];
        delete roomsOutput[roomId];
      } else {
        rooms[roomId] = rooms[roomId]?.filter(
          (user) => user.socket.id !== socket.id
        );
        if (rooms[roomId].length >= 2 && user.role === "student") {
          const lastViewer = rooms[roomId].find(
            (user) => user.role === "viewer"
          );
          if (lastViewer) {
            lastViewer.role = "student";
            lastViewer.socket.emit("role changed", { role: "student" });
          }
        }
        rooms[roomId]?.forEach((user) => {
          user.socket.emit("amount changed", { amount: rooms[roomId].length });
        });
      }
    }
  });
};

exports.codeChanged = (roomId, value, socket) => {
  rooms[roomId]?.forEach((user) => {
    if (user.socket.id !== socket.id) {
      user.socket.emit("code change", { value });
    }
  });

  roomsOutput[roomId] = value;
};

exports.chooseStudent = (roomId, socket) => {
  rooms[roomId]?.forEach((user) => {
    if (user.socket.id === socket.id) {
      user.role = "student";
      user.socket.emit("role changed", { role: "student" });
    } else if (user.role === "student") {
      user.role = "viewer";
      user.socket.emit("role changed", { role: "viewer" });
    }
  });
};
