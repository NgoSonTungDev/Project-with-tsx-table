import { instance } from "./index";
import { IDataApi, ImMonitors } from "../interface";

export const productApi = {
  createProduct: (data: ImMonitors) => {
    return instance.post<ImMonitors>("/monitors", data);
  },

  getProducts: (value: number) => {
    return instance.get<IDataApi>(`/monitors`, { params: { page: value } });
  },

  getByIdProduct: (id: any) => {
    return instance.get<ImMonitors>(`/monitors/${id}`, id);
  },

  updateProduct: (data: ImMonitors) => {
    return instance.put<ImMonitors>(`/monitors/${data.id}`, data);
  },

  deleteProduct: (id: any) => {
    return instance.delete<ImMonitors>(`/monitors/${id}`, id);
  },
};
