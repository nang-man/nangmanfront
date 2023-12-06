// State
export interface IType {
  isOpen: boolean;
  phoneCheck?: boolean;
}

// Type
export type Tmodal = "SIGNUP" | "LOGIN" | "CREATE" | "CHAT";

export const CREATE_STATE = "CREATE";
export const LOGIN_STATE = "LOGIN";
export const SIGNUP_STATE = "SIGNUP";
export const CHAT_STATE = "CHAT";
