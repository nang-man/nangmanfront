import axios from "axios";
import { URL } from "@/data/url";

export const getChatRoomList = async () => {
  try {
    axios.get(`${URL}/list`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
