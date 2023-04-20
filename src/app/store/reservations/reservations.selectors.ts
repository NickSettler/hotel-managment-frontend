import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";
import { IClientsState } from "../clients/clients.types";
import {
  IReservation,
  IReservationsState,
  IReservationStats,
} from "./reservations.types";
import { IAppState } from "../app.reducers";

export type TGetReservationsStatsProps = {
  year: number;
};

export const getReservationsState =
  createFeatureSelector<IReservationsState>("reservations");

export const getReservations = createSelector(
  getReservationsState,
  (state: IReservationsState) => state.reservations
);

export const getReservationsStats = createSelector(
  getReservationsState,
  (state: IReservationsState) => state.stats
);
