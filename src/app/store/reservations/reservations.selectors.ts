import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  E_RESERVATION_KEYS,
  IReservation,
  IReservationsState,
} from "./reservations.types";

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

export const getReservationForClient = (passport: string) =>
  createSelector(getReservations, (reservations: Array<IReservation>) =>
    reservations.filter(
      (reservation) =>
        reservation[E_RESERVATION_KEYS.CLIENT_PASSPORT] === passport
    )
  );
