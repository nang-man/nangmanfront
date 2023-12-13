import axios from "axios";
import { setStorage, removeStorage } from "@/data/storage";
import {
  LoginType,
  RegisterType,
  TokenType,
  GetUserDataType,
  UserType,
} from "@/types";
import { URL } from "@/data/url";

export const signup = async ({
  email,
  name,
  password,
  phone,
}: RegisterType) => {
  try {
    await axios.post(`${URL}/api/auth/signup`, {
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({ email, password }: LoginType) => {
  try {
    const res = await axios.post(`${URL}/api/auth/login`, {
      email: email,
      password: password,
    });

    const { accessToken, refreshToken }: TokenType = res.data;

    const {
      name,
      phone,
      profileImg,
      userId,
      followers,
      followings,
    }: GetUserDataType = res.data.user;

    const curUser: UserType = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      curEmail: email,
      curName: name,
      adminState: true,
      phone: phone,
      profileImg: profileImg,
      userId: userId,
      followers: followers,
      followings: followings,
    };

    setStorage(curUser);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  await axios.post(`${URL}/api/auth/logout`);

  removeStorage();
  window.location.reload();
};
