import { io, Socket } from "socket.io-client";
import { URL } from "./url";

export const socket: Socket = io(URL);
