import { UserType } from "@/types";

const setStorage = (user: UserType) => {
  return sessionStorage.setItem("user", JSON.stringify(user));
};

const getStorage = () => {
  const getSession = sessionStorage.getItem("user") as string;
  return JSON.parse(getSession) as UserType;
};

const removeStorage = () => {
  return sessionStorage.removeItem("user");
};

export { setStorage, getStorage, removeStorage };
