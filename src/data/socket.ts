import { io } from "socket.io-client";

const URL = "http://localhost:5174" as string;

export const socket = io(URL);
