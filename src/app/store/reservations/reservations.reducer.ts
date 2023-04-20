import { IReservationsState } from "./reservations.types";
import { createReducer, on } from "@ngrx/store";
import {
  getReservationsAction,
  getReservationsStatsAction,
  getReservationsStatsSuccessAction,
  getReservationsSuccessAction,
} from "./reservations.actions";

const initialState: IReservationsState = {
  reservations: [],
  stats: {},
};

export const ReservationsReducer = createReducer(
  initialState,
  on(getReservationsAction, (state): IReservationsState => ({ ...state })),
  on(
    getReservationsSuccessAction,
    (state, { payload }): IReservationsState => ({
      ...state,
      reservations: payload,
    })
  ),
  on(getReservationsStatsAction, (state): IReservationsState => ({ ...state })),
  on(
    getReservationsStatsSuccessAction,
    (state, { payload }): IReservationsState => ({
      ...state,
      stats: {
        ...state.stats,
        [payload.year]: payload.items,
      },
    })
  )
);
