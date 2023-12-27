import axios from "axios";
import { URL } from "@/data/url";

export interface IUpdateUser {
  userId: string;
  name: string;
  profileImg: FileList;
  phone: string;
}
export interface IUpdateUserPassword {
  userId: string;
  password: string;
}

export const getAllUsers = async () => {
  try {
    await axios.get(`${URL}/api/user`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ name }: { name: string }) => {
  try {
    await axios.get(`${URL}/api/user/${name}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};

// Update user data
export const updateUsers = async ({
  userId,
  profileImg,
  name,
  phone,
}: IUpdateUser) => {
  try {
    await axios.patch(`${URL}/api/user/${userId}`, {
      name: name,
      phone: phone,
      profileImg: profileImg,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersPassword = async ({
  userId,
  password,
}: IUpdateUserPassword) => {
  try {
    await axios.patch(`${URL}/api/user${userId}/password`, {
      password: password,
    });
  } catch (error) {
    console.error(error);
  }
};
