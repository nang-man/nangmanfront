import { io } from "socket.io-client";

const URL = "" as string;

export const socket = io(URL);
