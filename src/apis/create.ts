import axios from "axios";

import { URL } from "@/data/url";
import { CreateType } from "@/types";

export const create = async ({ userId, roomName, tags, count }: CreateType) => {
  try {
    await axios.post(`${URL}/api/list/create`, {
      userId: userId,
      roomName: roomName,
      tagName: tags,
      count: count,
    });
  } catch (error) {
    console.error(error);
  }
};
