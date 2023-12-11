import axios from "axios";

export type CurrentUserLogin = {
  email: string;
  password: string;
};

type RegisterUser = CurrentUserLogin & { name: string; phone: string };

const URL = import.meta.env.VITE_LOCAL_URL as string;

export const signup = async ({
  email,
  name,
  password,
  phone,
}: RegisterUser) => {
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

export const login = async ({ email, password }: CurrentUserLogin) => {
  try {
    const res = await axios.post(`${URL}/api/auth/login`, {
      email: email,
      password: password,
    });

    const {
      accessToken,
      refreshToken,
    }: { accessToken: string; refreshToken: string } = res.data;

    const {
      name,
      phone,
      profileImg,
      userId,
      followers,
      followings,
    }: {
      name: string;
      phone: string;
      profileImg: string;
      userId: string;
      followers: [];
      followings: [];
    } = res.data.user;

    const curUser = {
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

    sessionStorage.setItem("user", JSON.stringify(curUser));

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  await axios.post(`${URL}/api/auth/logout`);

  sessionStorage.removeItem("user");
  window.location.reload();
};
