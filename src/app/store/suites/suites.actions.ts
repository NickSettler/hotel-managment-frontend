import { createAction } from "@ngrx/store";
import { ICapacity, ISuite } from "./suites.types";

export const actionTypes = {
  GET_SUITES: "[Suites] Get Suites",
  GET_SUITES_SUCCESS: "[Suites] Get Suites Success",
  GET_SUITES_FAILURE: "[Suites] Get Suites Failure",

  GET_CAPACITY: "[Suites] Get Capacity",
  GET_CAPACITY_SUCCESS: "[Suites] Get Capacity Success",
  GET_CAPACITY_FAILURE: "[Suites] Get Capacity Failure",
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

export const getCapacityAction = createAction(
  actionTypes.GET_CAPACITY,
  (payload: { arrival: string; departure: string; occupied: boolean }) => ({
    payload,
  })
);

export const getCapacitySuccessAction = createAction(
  actionTypes.GET_CAPACITY_SUCCESS,
  (payload: Array<ICapacity>) => ({ payload })
);

export const getCapacityFailureAction = createAction(
  actionTypes.GET_CAPACITY_FAILURE,
  (payload: Error) => ({ payload })
);
