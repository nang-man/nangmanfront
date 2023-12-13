import axios from "axios";

type IChat = {
  roomId: string;
};

export const getChatRoomData = async ({ roomId }: IChat) => {
  try {
    await axios.get(`localhost/api/chat/${roomId}`).then((res) => res.data);
  } catch (error) {
    console.error(error);
  }
};
