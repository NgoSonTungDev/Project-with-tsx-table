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
  data: ImMonitors[];
  limit: number;
  total: number;
  page: number;
}

export interface ISearch {
  nameSearch: string;
  page: number;
}
