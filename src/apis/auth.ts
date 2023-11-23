import axios from "axios";

export const signup = async () => {
  try {
    await axios
      .post("localhost/signup", {
        user: "TEST",
        email: "TEST@TEST.COM",
        password: "PASSWORD",
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch (error) {
    console.error(error);
  }
};

export const login = async () => {
  try {
    await axios
      .post("localhost/login", {
        email: "TEST@TEST.COM",
        password: "PASSWORD",
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch (error) {
    console.error(error);
  }
};
