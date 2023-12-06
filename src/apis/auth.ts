import axios from "axios";

type CurrentUserLogin = {
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

    const { tokenAccess } = res.data;
    axios.defaults.headers.common[tokenAccess];

    // console.log(res.data, res.headers);

    return res.data.user;
  } catch (error) {
    console.error(error);
  }
};
