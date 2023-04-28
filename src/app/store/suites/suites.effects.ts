import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SuitesService } from "../../services/suites.service";
import {
  createSuiteAction,
  createSuiteFailureAction,
  createSuiteSuccessAction,
  createSuiteTypeAction,
  createSuiteTypeFailureAction,
  createSuiteTypeSuccessAction,
  getCapacityAction,
  getCapacitySuccessAction,
  getSuitesAction,
  getSuitesFailureAction,
  getSuitesSuccessAction,
  getSuiteTypesAction,
  getSuiteTypesFailureAction,
  getSuiteTypesSuccessAction,
  setSuiteStatusAction,
  setSuiteStatusSuccessAction,
} from "./suites.actions";
import { catchError, combineLatest, map, mergeMap, of, switchMap } from "rxjs";
import { ICapacity, ISuite, ISuiteType } from "./suites.types";
import { Injectable } from "@angular/core";
import { SuiteTypesService } from "../../services/suite-types.service";

@Injectable()
export class SuitesEffects {
  constructor(
    private actions: Actions,
    private suitesService: SuitesService,
    private suiteTypesService: SuiteTypesService
  ) {}

  getSuites$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getSuitesAction),
      switchMap(() =>
        this.suitesService.getSuites().pipe(
          map((suites: Array<ISuite>) => getSuitesSuccessAction(suites)),
          catchError((error) => of(getSuitesFailureAction(error)))
        )
      )
    );
  });

  createClient$ = createEffect(() => {
    return this.actions.pipe(
      ofType(createSuiteAction),
      mergeMap(({ payload }) =>
        this.suitesService.createSuite(payload).pipe(
          map(() => {
            getSuitesAction();
            return createSuiteSuccessAction();
          }),
          catchError((error) => of(createSuiteFailureAction(error)))
        )
      )
    );
  });

  getCapacity$ = createEffect(() => {
    return this.actions.pipe(
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
    return this.actions.pipe(
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
    return this.actions.pipe(
      ofType(setSuiteStatusSuccessAction),
      mergeMap(() => of(getSuitesAction()))
    );
  });

  getSuiteTypes$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getSuiteTypesAction),
      switchMap(() =>
        this.suiteTypesService.getSuiteTypes().pipe(
          map((suiteTypes: Array<ISuiteType>) =>
            getSuiteTypesSuccessAction(suiteTypes)
          ),
          catchError((error) => of(getSuiteTypesFailureAction(error)))
        )
      )
    );
  });

  createSuiteType$ = createEffect(() => {
    return this.actions.pipe(
      ofType(createSuiteTypeAction),
      mergeMap(({ payload }) =>
        this.suiteTypesService.createSuiteType(payload).pipe(
          map(() => {
            getSuiteTypesAction();
            return createSuiteTypeSuccessAction();
          }),
          catchError((error) => of(createSuiteTypeFailureAction(error)))
        )
      )
    );
  });
}
