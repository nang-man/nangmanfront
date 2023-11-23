import axios from "axios";

// type User = {
//   name: string;
//   avatar: string;
// };

type userName = {
  name: string;
};

export const users = async () => {
  try {
    axios.get("localhost/user").then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const user = async ({ name }: userName) => {
  try {
    axios.get(`localhost/user/${name}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
