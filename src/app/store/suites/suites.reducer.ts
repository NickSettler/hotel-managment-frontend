import { ISuitesState } from "./suites.types";
import { createReducer, on } from "@ngrx/store";
import {
  getCapacitySuccessAction,
  getSuitesAction,
  getSuitesSuccessAction,
} from "./suites.actions";

const initialState: ISuitesState = {
  suites: [],
  suiteTypes: [],
  capacity: {
    occupied: [],
    available: [],
  },
};

export const SuitesReducer = createReducer(
  initialState,
  on(getSuitesAction, (state): ISuitesState => ({ ...state })),
  on(
    getSuitesSuccessAction,
    (state, { payload }): ISuitesState => ({
      ...state,
      suites: payload,
    })
  ),
  on(
    getCapacitySuccessAction,
    (state, { payload }): ISuitesState => ({
      ...state,
      capacity: payload,
    })
  )
);
