import axios from "axios";
import { URL } from "@/data/url";

export const list = async () => {
  try {
    axios.get(`${URL}/list`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
