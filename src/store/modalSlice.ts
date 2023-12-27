import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IModal, IModalPayload } from "./types";

const initialState: IModal = {
  login: false,
  signup: false,
  createChat: false,
  chat: false,
  isPhoneCheck: false,
};

export const modalSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<IModalPayload>) => {
      const { type, isOpen } = action.payload;
      return (state = {
        ...state,
        [type]: isOpen,
      });
    },
    checkUserPhone: (state, action: PayloadAction<{ isCheck: boolean }>) => {
      const { isCheck } = action.payload;
      return (state = {
        ...state,
        isPhoneCheck: isCheck,
      });
    },
  },
});

export const { toggleModal, checkUserPhone } = modalSlice.actions;

export default modalSlice.reducer;
