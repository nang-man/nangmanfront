import axios from "axios";

type Signup = {
  email: string;
  name: string;
  password: string;
  matchPassword: string;
  phone: string;
};

type Login = {
  email: string;
  password: string;
};

export const signup = async ({
  email,
  name,
  password,
  matchPassword,
  phone,
}: Signup) => {
  try {
    await axios
      .post("http://localhost:5174/signup", {
        name: name,
        email: email,
        password: password,
        matchPassword: matchPassword,
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({ email, password }: Login) => {
  try {
    await axios
      .post("http://localhost:5174/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch (error) {
    console.error(error);
  }
};
