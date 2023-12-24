import axios from "axios";
import { URL } from "@/data/url";

export interface IUpdateUser {
  name: string;
  email: string;
  password: string;
  phone: number;
}

export const users = async () => {
  try {
    await axios.get(`${URL}/api/user`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const user = async ({ name }: { name: string }) => {
  try {
    await axios.get(`${URL}/api/user/${name}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};

// patch??
export const updateUsers = async ({
  email,
  name,
  password,
  phone,
}: IUpdateUser) => {
  try {
    await axios.post(`${URL}/api/user`, {
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
  } catch (error) {
    console.error(error);
  }
};
