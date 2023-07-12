import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  fullname: string;
  email: string;
  address: string;
  avatar: string;
}

export interface UserState {
  loggedIn: boolean;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  loggedIn: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.loggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
