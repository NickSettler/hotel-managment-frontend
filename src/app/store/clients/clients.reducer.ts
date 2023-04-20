import { IClientsState } from "./clients.types";
import { createReducer, on } from "@ngrx/store";
import { getClientsAction, getClientsSuccessAction } from "./clients.actions";

const initialState: IClientsState = {
  clients: [],
};

export const ClientsReducer = createReducer(
  initialState,
  on(getClientsAction, (state): IClientsState => ({ ...state })),
  on(
    getClientsSuccessAction,
    (state, { payload }): IClientsState => ({
      ...state,
      clients: payload,
    })
  )
);
