import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReservationsService } from "../../services/reservations.service";
import { catchError, map, mergeMap, of } from "rxjs";
import {
  getReservationsAction,
  getReservationsFailureAction,
  getReservationsStatsAction,
  getReservationsStatsSuccessAction,
  getReservationsSuccessAction,
} from "./reservations.actions";
import { getReservationsStats } from "./reservations.selectors";

@Injectable()
export class ReservationsEffects {
  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly reservationsService: ReservationsService
  ) {}

  $getAll = createEffect(() => {
    return this.actions.pipe(
      ofType(getReservationsAction),
      mergeMap(() =>
        this.reservationsService.getAll().pipe(
          map((reservations) => getReservationsSuccessAction(reservations)),
          catchError((error) => of(getReservationsFailureAction({ error })))
        )
      )
    );
  });

  $getStats = createEffect(() => {
    return this.actions.pipe(
      ofType(getReservationsStatsAction),
      mergeMap(({ payload }) =>
        this.reservationsService.getStats(payload.year).pipe(
          map((stats) =>
            getReservationsStatsSuccessAction({
              year: payload.year,
              items: stats,
            })
          ),
          catchError((error) => of(getReservationsFailureAction({ error })))
        )
      )
    );
  });
}
