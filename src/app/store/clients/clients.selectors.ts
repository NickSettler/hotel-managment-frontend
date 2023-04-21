import { E_CLIENT_KEYS, IClientsState } from "./clients.types";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getClientsState = createFeatureSelector<IClientsState>("clients");

export const getClients = createSelector(
  getClientsState,
  (state: IClientsState) => state.clients
);

export const getClient = (passport: string) =>
  createSelector(getClients, (clients) =>
    clients.find((client) => client[E_CLIENT_KEYS.PASSPORT_NUMBER] === passport)
  );
