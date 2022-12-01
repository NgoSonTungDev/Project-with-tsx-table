import { instance } from "./index";
import { IProduct } from "../interface";

export const productApi = {
  createProduct: (data: IProduct) => {
    return instance.post<IProduct>("/products", data);
  },

  getProducts: (name: any) => {
    return instance.get<IProduct[]>(`/products?search=${name}`, name);
  },

  getByIdProduct: (id: any) => {
    return instance.get<IProduct>(`/products/${id}`, id);
  },

  deleteProduct: (id: any) => {
    return instance.delete<IProduct>(`/products/${id}`, id);
  },

  updateProduct: (data: IProduct) => {
    return instance.put<IProduct>(`/products/${data.id}`, data);
  },
};
