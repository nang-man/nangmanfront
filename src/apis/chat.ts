import axios from "axios";
import { URL } from "@/data/url";

type IChat = {
  roomId: string;
};

export const getChatRoomData = async ({ roomId }: IChat) => {
  try {
    await axios.get(`${URL}/api/chat/${roomId}`).then((res) => res.data);
  } catch (error) {
    console.error(error);
  }
};

