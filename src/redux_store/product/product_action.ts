import { createAsyncThunk } from "@reduxjs/toolkit";
import { Id } from "@reduxjs/toolkit/dist/tsHelpers";
import { productApi } from "../../client/productApi";
import { IProduct } from "../../interface";

export const getProducts = createAsyncThunk<IProduct[], string>(
  "product/getProducts",
  async (name, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts(name);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<IProduct, IProduct>(
  "product/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productApi.createProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getByIdProduct = createAsyncThunk<IProduct, string>(
  "product/getByIdProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getByIdProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk<IProduct, IProduct>(
  "product/updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk<IProduct, string>(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.deleteProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
