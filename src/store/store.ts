import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./getCurrentUserSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: { currentUser: currentUserReducer, modalState: modalSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
