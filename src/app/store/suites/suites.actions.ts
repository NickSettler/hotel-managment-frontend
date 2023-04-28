import { createAction } from "@ngrx/store";
import { E_SUITE_STATUS, ICapacity, ISuite, ISuiteType } from "./suites.types";
import { ICreateSuiteBody } from "../../services/suites.service";
import { ICreateSuiteTypeBody } from "../../services/suite-types.service";

export const actionTypes = {
  GET_SUITES: "[Suites] Get Suites",
  GET_SUITES_SUCCESS: "[Suites] Get Suites Success",
  GET_SUITES_FAILURE: "[Suites] Get Suites Failure",

  CREATE_SUITE: "[Suites] Create Suite",
  CREATE_SUITE_SUCCESS: "[Suites] Create Suite Success",
  CREATE_SUITE_FAILURE: "[Suites] Create Suite Failure",

  GET_CAPACITY: "[Suites] Get Capacity",
  GET_CAPACITY_SUCCESS: "[Suites] Get Capacity Success",
  GET_CAPACITY_FAILURE: "[Suites] Get Capacity Failure",

  SET_SUITE_STATUS: "[Suites] Set Suite Status",
  SET_SUITE_STATUS_SUCCESS: "[Suites] Set Suite Status Success",
  SET_SUITE_STATUS_FAILURE: "[Suites] Set Suite Status Failure",

  GET_SUITE_TYPES: "[Suites] Get Suite Types",
  GET_SUITE_TYPES_SUCCESS: "[Suites] Get Suite Types Success",
  GET_SUITE_TYPES_FAILURE: "[Suites] Get Suite Types Failure",

  CREATE_SUITE_TYPE: "[Suites] Create Suite Type",
  CREATE_SUITE_TYPE_SUCCESS: "[Suites] Create Suite Type Success",
  CREATE_SUITE_TYPE_FAILURE: "[Suites] Create Suite Type Failure",
};

export const getSuitesAction = createAction(actionTypes.GET_SUITES);

export const getSuitesSuccessAction = createAction(
  actionTypes.GET_SUITES_SUCCESS,
  (payload: Array<ISuite>) => ({ payload })
);

export const getSuitesFailureAction = createAction(
  actionTypes.GET_SUITES_FAILURE,
  (payload: Error) => ({ payload })
);

export const createSuiteAction = createAction(
  actionTypes.CREATE_SUITE,
  (payload: Partial<ICreateSuiteBody>) => ({ payload })
);

export const createSuiteSuccessAction = createAction(
  actionTypes.CREATE_SUITE_SUCCESS
);

export const createSuiteFailureAction = createAction(
  actionTypes.CREATE_SUITE_FAILURE,
  (payload: Error) => ({ payload })
);

export const getCapacityAction = createAction(
  actionTypes.GET_CAPACITY,
  (payload: { arrival: string; departure: string }) => ({
    payload,
  })
);

export const getCapacitySuccessAction = createAction(
  actionTypes.GET_CAPACITY_SUCCESS,
  (payload: { occupied: Array<ICapacity>; available: Array<ICapacity> }) => ({
    payload,
  })
);

export const getCapacityFailureAction = createAction(
  actionTypes.GET_CAPACITY_FAILURE,
  (payload: Error) => ({ payload })
);

export const setSuiteStatusAction = createAction(
  actionTypes.SET_SUITE_STATUS,
  (payload: { suiteNumber: number; status: E_SUITE_STATUS }) => ({
    payload,
  })
);

export const setSuiteStatusSuccessAction = createAction(
  actionTypes.SET_SUITE_STATUS_SUCCESS
);

export const setSuiteStatusFailureAction = createAction(
  actionTypes.SET_SUITE_STATUS_FAILURE,
  (payload: Error) => ({ payload })
);

export const getSuiteTypesAction = createAction(actionTypes.GET_SUITE_TYPES);

export const getSuiteTypesSuccessAction = createAction(
  actionTypes.GET_SUITE_TYPES_SUCCESS,
  (payload: Array<ISuiteType>) => ({ payload })
);

export const getSuiteTypesFailureAction = createAction(
  actionTypes.GET_SUITE_TYPES_FAILURE,
  (payload: Error) => ({ payload })
);

export const createSuiteTypeAction = createAction(
  actionTypes.CREATE_SUITE_TYPE,
  (payload: Partial<ICreateSuiteTypeBody>) => ({ payload })
);

export const createSuiteTypeSuccessAction = createAction(
  actionTypes.CREATE_SUITE_TYPE_SUCCESS
);

export const createSuiteTypeFailureAction = createAction(
  actionTypes.CREATE_SUITE_TYPE_FAILURE,
  (payload: Error) => ({ payload })
);
