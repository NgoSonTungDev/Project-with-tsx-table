import * as yup from "yup";

export const validationInput = yup.object({
  id: yup.number(),
  name: yup.string().min(5),
  type: yup.string().min(5),
  overVoltage: yup.number().nullable(),
  underVoltage: yup.number().nullable(),
  phaseLoss: yup.number().nullable(),
  phaseUnbalanced: yup.number().nullable(),
  overLoad: yup.number().nullable(),
  cosPhi: yup.number().nullable(),
  THDi: yup.number().nullable(),
  overFlow: yup.number().nullable(),
  underFlow: yup.number().nullable(),
  overPressure: yup.number().nullable(),
  underPressure: yup.number().nullable(),
});
