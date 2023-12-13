// State type

export interface IModal {
  login: boolean;
  signup: boolean;
  createChat: boolean;
  chat: boolean;
  isPhoneCheck: boolean;
}

export interface IModalPayload {
  type: TModalType;
  isOpen: boolean;
}

export type TModalType =
  | "login"
  | "signup"
  | "createChat"
  | "chat"
  | "isPhoneCheck";

export const TYPE_CREATE_CHAT = "createChat";
export const TYPE_LOGIN = "login";
export const TYPE_SIGNUP = "signup";
export const TYPE_CHAT = "chat";
export const TYPE_PHONE = "isPhoneCheck";
