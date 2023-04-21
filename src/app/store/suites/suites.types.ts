export interface ISuitesState {
  suites: Array<ISuite>;
  suiteTypes: Array<ISuiteType>;
  capacity: Array<ICapacity>;
}

export enum E_SUITE_STATUS {
  NOT_AVAILABLE,
  AVAILABLE,
}

export enum E_SUITE_KEYS {
  SUITE_NUMBER = "SUITE_NUMBER",
  SUITE_TYPE_ID = "SUITE_TYPE_ID",
  SUITE_STATUS = "SUITE_STATUS",
  SUITE_TYPE = "SUITE_TYPE",
}

export interface ISuite {
  [E_SUITE_KEYS.SUITE_NUMBER]: number;
  [E_SUITE_KEYS.SUITE_TYPE_ID]: number;
  [E_SUITE_KEYS.SUITE_STATUS]: E_SUITE_STATUS;
  [E_SUITE_KEYS.SUITE_TYPE]: ISuiteType;
}

export enum E_SUITE_TYPE_KEYS {
  ID = "ID",
  NAME = "NAME",
  CAPACITY = "CAPACITY",
  PRICE = "PRICE",
  SPEC = "SPEC",
}

export interface ISuiteType {
  [E_SUITE_TYPE_KEYS.ID]: number;
  [E_SUITE_TYPE_KEYS.NAME]: string;
  [E_SUITE_TYPE_KEYS.CAPACITY]: number;
  [E_SUITE_TYPE_KEYS.PRICE]: number;
  [E_SUITE_TYPE_KEYS.SPEC]: ISuiteTypeSpec;
}

export enum E_SUITE_TYPE_SPEC_KEYS {
  SUITE_TYPE_ID = "SUITE_TYPE_ID",
  SUITE_VARIANT = "SUITE_VARIANT",
  BEDS_COUNT = "BEDS_COUNT",
  ROOMS_COUNT = "ROOMS_COUNT",
}

export enum E_SUITE_TYPE_SPEC_VARIANT {
  ROOM = "ROOM",
  APARTMENT = "APARTMENT",
}

export interface ISuiteTypeSpec {
  [E_SUITE_TYPE_SPEC_KEYS.SUITE_TYPE_ID]: number;
  [E_SUITE_TYPE_SPEC_KEYS.SUITE_VARIANT]: E_SUITE_TYPE_SPEC_VARIANT;
  [E_SUITE_TYPE_SPEC_KEYS.BEDS_COUNT]: number;
  [E_SUITE_TYPE_SPEC_KEYS.ROOMS_COUNT]: number;
}

export type ICapacity = Pick<ISuite, E_SUITE_KEYS.SUITE_NUMBER>;
