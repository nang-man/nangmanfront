import axios from "axios";
import { URL } from "@/data/url";

export const list = async () => {
  try {
    axios.get(`${URL}/api/list`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
