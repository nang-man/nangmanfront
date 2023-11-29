// server.js
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  // 클라이언트로부터 받은 메시지를 모든 클라이언트에게 전송
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  // 연결 종료 시
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
