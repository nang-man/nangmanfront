import { atom } from "recoil";
import { IType } from "./modalType";

export const createModalState = atom<IType>({
  key: "createModalState",
  default: {
    isOpen: false,
  },
});

export const loginModalState = atom<IType>({
  key: "loginModalState",
  default: {
    isOpen: false,
  },
});

export const signupModalState = atom<IType>({
  key: "signupModalState",
  default: {
    isOpen: false,
  },
});

export const passwordModalState = atom<{ phoneCheck: boolean }>({
  key: "passwordModalState",
  default: {
    phoneCheck: false,
  },
});
