import axios from "axios";

type Create = {
  email: string;
  roomName: string;
  tagName: string;
  count: number;
};

export const create = async ({ email, roomName, tagName, count }: Create) => {
  try {
    await axios.post("localhost/create", {
      user: email,
      roomName: roomName,
      tagName: tagName,
      count: count,
    });
  } catch (error) {
    console.error(error);
  }
};
