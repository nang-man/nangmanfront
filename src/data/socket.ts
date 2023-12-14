import { io, Socket } from "socket.io-client";
import { URL } from "./url";

export const socket: Socket = io(URL);

// useEffect(() => {
//   newSocket.on("handshake", updateMessage);
//   newSocket.on("joinChatRoom", updateMessage);
//   newSocket.on("leaveChatRoom", updateMessage);
//   newSocket.on("sendMessage", updateMessage);
//   newSocket.on("disconnect", updateMessage);

//   setSocket(newSocket);

//   return () => {
//     newSocket.disconnect();
//   };
// }, []);

// const handshake = () => {
//   socket.emit("handshake", "Hello this is client");
// };

// const joinChatRoom = () => {
//   socket.emit("joinChatRoom", { name: socket.id, roomId: "Test" });
// };

// const leaveRoom = () => {
//   socket.emit("leaveChatRoom", {
//     name: socket.id,
//     roomId: "Test",
//   });
// };

// const updateMessage = (data) => {
//   setMessage(data["message"]);
//   console.log(data);
// };

// const sendMessage = () => {
//   console.log(socket);
//   socket.emit(
//     "sendMessage",
//     {
//       name: socket.id,
//       roomId: "Test",
//       message: `The user ${socket.id} sent the message from client`,
//     },
//     (message) => {
//       updateMessage(message);
//     }
//   );
// };

// const disconnect = () => {
//   socket.emit("disconnect", { message: "The connection is closed" });
// };

// export {
//   handshake,
//   joinChatRoom,
//   leaveRoom,
//   updateMessage,
//   sendMessage,
//   disconnect,
// };
