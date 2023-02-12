import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = {
  product: {},
};
const productSlice = createSlice({
  name: 'product',
  initialState: INIT_STATE,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state) => {
      state.product = {};
    },
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
