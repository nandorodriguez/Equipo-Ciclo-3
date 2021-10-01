import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleUpdateProducts: (state, action) => {
      state.products = [...action.payload];
    },
  },
});

export const { handleUpdateProducts} = productSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productSlice.reducer;
