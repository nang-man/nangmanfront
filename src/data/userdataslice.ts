import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CurrentUserData } from "@/types";

type UserState = {
  user: CurrentUserData | null;
};

const initialState: UserState = {
  user: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post(`${URL}/api/auth/login`, {
      email,
      password,
    });

    return res.data.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
