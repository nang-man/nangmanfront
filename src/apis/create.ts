import axios from "axios";

type Create = {
  user: string;
  roomName: string;
  tagName: string;
  count: number;
};

export const create = async ({ user, roomName, tagName, count }: Create) => {
  try {
    await axios.post("localhost/create", {
      user: user,
      roomName: roomName,
      tagName: tagName,
      count: count,
    });
  } catch (error) {
    console.error(error);
  }
};
