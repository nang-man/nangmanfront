import axios from "axios";

type userName = {
  name: string;
};

export const users = async () => {
  try {
    axios.get("/").then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const user = async ({ name }: userName) => {
  try {
    axios.get(`localhost/api/user/${name}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
