const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: { origin: "http://localhost:3000" },
});
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "front")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "front", "index.html"));
});

const onConnection = (socket) => {
  socket.on("new_order", (data) => {
    socketIO.emit("new_order", data);
  });
  socket.on("console", (data) => {
    socketIO.emit("console", data.toString());
  });
};

socketIO.on("connection", onConnection);
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});