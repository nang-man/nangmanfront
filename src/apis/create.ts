import axios from "axios";

import { URL } from "@/data/url";
import { CreateType } from "@/types";

export const create = async ({ userId, roomName, tags, count }: CreateType) => {
  try {
    await axios.post(`${URL}/api/room`, {
      name: roomName,
      maxNum: count,
      tags: [tags],
      owner: userId,
      participants: [userId],
    });
  } catch (error) {
    console.error(error);
  }
};
