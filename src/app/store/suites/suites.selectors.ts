import { createFeatureSelector, createSelector } from "@ngrx/store";
import { E_SUITE_KEYS, ISuitesState } from "./suites.types";

export const getSuitesState = createFeatureSelector<ISuitesState>("suites");

export const getSuites = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.suites
);

export const getSuite = (suiteNumber: string | number) =>
  createSelector(getSuites, (suites) =>
    suites.find(
      (suite) => `${suite[E_SUITE_KEYS.SUITE_NUMBER]}` === `${suiteNumber}`
    )
  );

export const getCapacity = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.capacity
);

export const getOccupiedCapacity = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.capacity.occupied
);

export const getAvailableCapacity = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.capacity.available
);

export const getSuiteTypes = createSelector(
  getSuitesState,
  (state: ISuitesState) => state.suiteTypes
);
