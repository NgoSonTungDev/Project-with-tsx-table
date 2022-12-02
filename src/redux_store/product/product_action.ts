import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../client/productApi";
import { IDataApi, ImMonitors, ISearch } from "../../interface";

export const getProducts = createAsyncThunk<IDataApi, ISearch>(
  "product/getProducts",
  async (value, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts(value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<ImMonitors, ImMonitors>(
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

export const getByIdProduct = createAsyncThunk<ImMonitors, string>(
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

export const updateProduct = createAsyncThunk<ImMonitors, ImMonitors>(
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

export const deleteProduct = createAsyncThunk<ImMonitors, string>(
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
