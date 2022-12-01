import * as yup from "yup";

export const validationInput = yup.object({
  id: yup.string().required("ID không được bỏ trống"),
  name: yup.string().required("Name không được bỏ trống").min(5),
  avatar: yup.string().required("Avatar không được bỏ trống").min(5),
  type: yup.string().required("Type không được bỏ trống").min(5),
  description: yup.string().required("Description không được bỏ trống").min(5),
  price: yup.number().required("Price không được bỏ trống").min(5),
});
