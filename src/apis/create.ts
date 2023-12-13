import axios from "axios";

import { URL } from "@/data/url";
import { CreateType } from "@/types";

export const create = async ({
  email,
  roomName,
  tagName,
  count,
}: CreateType) => {
  try {
    await axios.post(`${URL}/api/create`, {
      user: email,
      roomName: roomName,
      tagName: tagName,
      count: count,
    });
  } catch (error) {
    console.error(error);
  }
};
