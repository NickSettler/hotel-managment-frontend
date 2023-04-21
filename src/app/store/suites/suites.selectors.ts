import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISuitesState } from "./suites.types";

export const getSuitesState = createFeatureSelector<ISuitesState>("suites");

export const getSuites = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.suites
);

export const getCapacity = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.capacity
);
