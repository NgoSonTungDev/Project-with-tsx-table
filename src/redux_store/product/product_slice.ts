import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interface";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getByIdProduct,
  updateProduct,
} from "./product_action";

interface IState {
  data: IProduct[];
}

const initialState: IState = {
  data: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetState: (state) => {
      state.data = initialState.data;
      // state.loading = initialState.loading;
      // state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = [action.payload];
    });

    builder.addCase(getByIdProduct.fulfilled, (state, action) => {
      state.data = [action.payload];
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.data = [action.payload];
    });
  },
});

export const { resetState } = productSlice.actions;

export default productSlice.reducer;
