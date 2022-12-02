import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataApi, ImMonitors } from "../../interface";
import {
  createProduct,
  deleteProduct,
  getByIdProduct,
  getProducts,
  updateProduct,
} from "./product_action";

interface IState {
  data: IDataApi;
}

const initialState: IState = {
  data: {
    ok: true,
    items: [],
    pageSize: 0,
    total: 0,
    length: 0,
    pageNumber: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetState: (state) => {
      // state.data = initialState.items;
      // state.loading = initialState.loading;
      // state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.data.items.unshift(action.payload);
    });

    builder.addCase(getByIdProduct.fulfilled, (state, action) => {
      state.data.items = [action.payload];
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.data.items = [action.payload];
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data.items = [action.payload];
    });
  },
});

export const { resetState } = productSlice.actions;

export default productSlice.reducer;
