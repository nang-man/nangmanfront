import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrentUserType } from "@/types/index";

import { login } from "@/apis/auth";

const initialState: CurrentUserType = {
  adminState: false,
  email: "",
  name: "",
  password: "",
  phone: "",
  profileImg: "",
  createdAt: "",
  updatedAt: "",
  userId: "",
  followers: [],
  followings: [],
};

export const fetchCurrentUser = createAsyncThunk(
  "currentUser",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await login({ email, password });
    try {
      console.log(data.user);
      return data.user;
    } catch (error) {
      console.error(error);
    }
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.adminState = true;
      state.email = action.payload.curEmail;
      state.name = action.payload.curName;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.profileImg = action.payload.profileImg;
      state.userId = action.payload.userId;
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<CurrentUserType>) => {
        state.adminState = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.password = action.payload.password;
        state.phone = action.payload.phone;
        state.profileImg = action.payload.profileImg;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
        state.userId = action.payload.userId;
        state.followers = action.payload.followers;
        state.followings = action.payload.followings;
      }
    );
  },
});

export const { setUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
