import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SuitesService } from "../../services/suites.service";
import {
  getCapacityAction,
  getCapacitySuccessAction,
  getSuitesAction,
  getSuitesFailureAction,
  getSuitesSuccessAction,
  setSuiteStatusAction,
  setSuiteStatusSuccessAction,
} from "./suites.actions";
import { catchError, combineLatest, map, mergeMap, of, switchMap } from "rxjs";
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
        combineLatest([
          this.suitesService.getCapacity(
            payload.arrival,
            payload.departure,
            true
          ),
          this.suitesService.getCapacity(
            payload.arrival,
            payload.departure,
            false
          ),
        ])
      ),
      map(([occupied, available]: [Array<ICapacity>, Array<ICapacity>]) =>
        getCapacitySuccessAction({ occupied, available })
      )
    );
  });

  setSuiteStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setSuiteStatusAction),
      mergeMap(({ payload }) =>
        this.suitesService
          .setSuiteStatus(payload.suiteNumber, payload.status)
          .pipe(
            map(() => setSuiteStatusSuccessAction()),
            catchError((error) => of(getSuitesFailureAction(error)))
          )
      )
    );
  });

  setSuiteStatusSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setSuiteStatusSuccessAction),
      mergeMap(() => of(getSuitesAction()))
    );
  });
}
