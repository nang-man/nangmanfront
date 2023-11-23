import axios from "axios";

export const list = async () => {
  try {
    axios.get("localhost/list").then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
