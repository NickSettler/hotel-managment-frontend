import { ActionReducerMap } from "@ngrx/store";
import { IClientsState } from "./clients/clients.types";
import { ClientsReducer } from "./clients/clients.reducer";
import { IReservationsState } from "./reservations/reservations.types";
import { ReservationsReducer } from "./reservations/reservations.reducer";

export interface IAppState {
  clients: IClientsState;
  reservations: IReservationsState;
}

export const AppReducers: ActionReducerMap<IAppState> = {
  clients: ClientsReducer,
  reservations: ReservationsReducer,
};
