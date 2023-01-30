export const $userSelector = (state) => state.persistedReducer.user.user;
export const $userIsLoggedIn = (state) =>
  state.persistedReducer.user.isLoggedIn;
