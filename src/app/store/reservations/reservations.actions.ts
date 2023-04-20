import { createAction } from "@ngrx/store";
import { IReservation, IReservationStats } from "./reservations.types";

export const actionTypes = {
  GET_RESERVATIONS: "[Reservations] Get Reservations",
  GET_RESERVATIONS_SUCCESS: "[Reservations] Get Reservations Success",
  GET_RESERVATIONS_FAILURE: "[Reservations] Get Reservations Failure",

  GET_RESERVATIONS_STATS: "[Reservations] Get Reservations Stats",
  GET_RESERVATIONS_STATS_SUCCESS:
    "[Reservations] Get Reservations Stats Success",
  GET_RESERVATIONS_STATS_FAILURE:
    "[Reservations] Get Reservations Stats Failure",

  CREATE_RESERVATION: "[Reservations] Create Reservation",
  CREATE_RESERVATION_SUCCESS: "[Reservations] Create Reservation Success",
  CREATE_RESERVATION_FAILURE: "[Reservations] Create Reservation Failure",
};

export const getReservationsAction = createAction(actionTypes.GET_RESERVATIONS);

export const getReservationsSuccessAction = createAction(
  actionTypes.GET_RESERVATIONS_SUCCESS,
  (payload: Array<IReservation>) => ({ payload })
);

export const getReservationsFailureAction = createAction(
  actionTypes.GET_RESERVATIONS_FAILURE,
  (payload: { error: Error }) => ({ payload })
);

export const getReservationsStatsAction = createAction(
  actionTypes.GET_RESERVATIONS_STATS,
  (payload: { year: number }) => ({ payload })
);

export const getReservationsStatsSuccessAction = createAction(
  actionTypes.GET_RESERVATIONS_STATS_SUCCESS,
  (payload: { year: number; items: Array<IReservationStats> }) => ({ payload })
);

export const getReservationsStatsFailureAction = createAction(
  actionTypes.GET_RESERVATIONS_STATS_FAILURE,
  (payload: { error: Error }) => ({ payload })
);
