import { Injectable } from "@angular/core";
import { ClientsService } from "../../services/clients.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  createClientAction,
  createClientSuccessAction,
  getClientsAction,
  getClientsFailureAction,
  getClientsSuccessAction,
} from "./clients.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable()
export class ClientsEffects {
  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly clientsService: ClientsService
  ) {}

  getClients$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getClientsAction),
      mergeMap(() =>
        this.clientsService.getClients().pipe(
          map((clients) => getClientsSuccessAction(clients)),
          catchError((error) => of(getClientsFailureAction({ error })))
        )
      )
    );
  });

  createClient$ = createEffect(() => {
    return this.actions.pipe(
      ofType(createClientAction),
      mergeMap(({ payload }) =>
        this.clientsService.createClient(payload).pipe(
          map(() => {
            getClientsAction();
            return createClientSuccessAction();
          }),
          catchError((error) => of(getClientsFailureAction({ error })))
        )
      )
    );
  });
}
