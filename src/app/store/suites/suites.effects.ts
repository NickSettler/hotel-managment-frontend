import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SuitesService } from "../../services/suites.service";
import {
  getCapacityAction,
  getCapacityFailureAction,
  getCapacitySuccessAction,
  getSuitesAction,
  getSuitesFailureAction,
  getSuitesSuccessAction,
} from "./suites.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ICapacity, ISuite } from "./suites.types";
import { Injectable } from "@angular/core";

@Injectable()
export class SuitesEffects {
  constructor(
    private actions$: Actions,
    private suitesService: SuitesService
  ) {}

  getSuites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSuitesAction),
      switchMap(() =>
        this.suitesService.getSuites().pipe(
          map((suites: Array<ISuite>) => getSuitesSuccessAction(suites)),
          catchError((error) => of(getSuitesFailureAction(error)))
        )
      )
    );
  });

  getCapacity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCapacityAction),
      switchMap(({ payload }) =>
        this.suitesService
          .getCapacity(payload.arrival, payload.departure, payload.occupied)
          .pipe(
            map((suites: Array<ICapacity>) => getCapacitySuccessAction(suites)),
            catchError((error) => of(getCapacityFailureAction(error)))
          )
      )
    );
  });
}
