import axios from "axios";
import { URL } from "@/data/url";

export const users = async () => {
  try {
    axios.get(`${URL}/api/user`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const user = async ({ name }: { name: string }) => {
  try {
    axios.get(`${URL}/api/user/${name}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
