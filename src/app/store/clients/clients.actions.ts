import { createAction } from "@ngrx/store";
import { IClient } from "./clients.types";
import { ICreateClientBody } from "../../services/clients.service";

export const actionTypes = {
  GET_CLIENTS: "[Clients] Get Clients",
  GET_CLIENTS_SUCCESS: "[Clients] Get Clients Success",
  GET_CLIENTS_FAILURE: "[Clients] Get Clients Failure",

  CREATE_CLIENT: "[Clients] Create Client",
  CREATE_CLIENT_SUCCESS: "[Clients] Create Client Success",
  CREATE_CLIENT_FAILURE: "[Clients] Create Client Failure",

  UPDATE_CLIENT: "[Clients] Update Client",
  UPDATE_CLIENT_SUCCESS: "[Clients] Update Client Success",
  UPDATE_CLIENT_FAILURE: "[Clients] Update Client Failure",
};

export const getClientsAction = createAction(actionTypes.GET_CLIENTS);

export const getClientsSuccessAction = createAction(
  actionTypes.GET_CLIENTS_SUCCESS,
  (payload: Array<IClient>) => ({ payload })
);

export const getClientsFailureAction = createAction(
  actionTypes.GET_CLIENTS_FAILURE,
  (payload: { error: Error }) => ({ payload })
);

export const createClientAction = createAction(
  actionTypes.CREATE_CLIENT,
  (payload: Partial<ICreateClientBody>) => ({
    payload,
  })
);

export const createClientSuccessAction = createAction(
  actionTypes.CREATE_CLIENT_SUCCESS
);

export const createClientFailureAction = createAction(
  actionTypes.CREATE_CLIENT_FAILURE,
  (payload: { error: Error }) => ({ payload })
);

export const updateClientAction = createAction(
  actionTypes.UPDATE_CLIENT,
  (payload: { passport: string; client: Partial<ICreateClientBody> }) => ({
    payload,
  })
);

export const updateClientSuccessAction = createAction(
  actionTypes.UPDATE_CLIENT_SUCCESS
);

export const updateClientFailureAction = createAction(
  actionTypes.UPDATE_CLIENT_FAILURE,
  (payload: { error: Error }) => ({ payload })
);
