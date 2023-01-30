import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = {
  user: {},
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
