import axios from "axios";

export const create = async () => {
  try {
    await axios.post("localhost/create", {
      user: "create room user/guest",
      roomName: "room name",
      tagName: "tag name",
      count: "people counting",
    });
  } catch (error) {
    console.error(error);
  }
};
