import { ScheduleKey } from "../api/persistance-store.model";

export enum ShiftCode {
  R = "R",
  P = "P",
  D = "D",
  N = "N",
  DN = "DN",
  PN = "PN",
  W = "W",
  U = "U",
  L4 = "L4",
}

export interface ShiftInfoModel {
  // eslint-disable-next-line @typescript-eslint/camelcase
  [nurse_name: string]: ShiftCode[];
}

export interface ShiftModel {
  code: string;
  from: string;
  to: string;
  color?: string;
  validityPeriod: ScheduleKey;
}
