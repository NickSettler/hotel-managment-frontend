import { IClientsState } from "./clients.types";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getClientsState = createFeatureSelector<IClientsState>("clients");

export const getClients = createSelector(
  getClientsState,
  (state: IClientsState) => state.clients
);
