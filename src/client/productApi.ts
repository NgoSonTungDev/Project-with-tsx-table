import { instance } from "./index";
import { IDataApi, ImMonitors, ISearch } from "../interface";

export const productApi = {
  createProduct: (data: ImMonitors) => {
    return instance.post<ImMonitors>("/monitors", data);
  },

  getProducts: (value: ISearch) => {
    return instance.get<IDataApi>(`/monitors`, {
      params: { page: value.page, q: value.nameSearch },
    });
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
