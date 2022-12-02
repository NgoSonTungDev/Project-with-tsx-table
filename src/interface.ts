export interface ImMonitors {
  id: number;
  name: string;
  type: string;
  overVoltage: number;
  underVoltage: number;
  phaseLoss: number;
  phaseUnbalanced: number;
  overLoad: number;
  overFlow: number;
  underFlow: number;
  overPressure: number;
  underPressure: number;
  cosPhi: number;
  THDi: number;
}

export interface IDataApi {
  ok: boolean;
  items: ImMonitors[];
  pageSize: number;
  total: number;
  length: number;
  pageNumber: number;
}
