import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getSuiteTypes } from "../../store/suites/suites.selectors";
import {
  createSuiteTypeAction,
  createSuiteTypeSuccessAction,
  getSuiteTypesAction,
} from "../../store/suites/suites.actions";
import {
  E_SUITE_KEYS,
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
  E_SUITE_TYPE_SPEC_VARIANT,
  ISuiteType,
} from "../../store/suites/suites.types";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { E_CLIENT_KEYS } from "../../store/clients/clients.types";
import { pick, values } from "lodash";
import { Actions, ofType } from "@ngrx/effects";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-suite-types-form",
  templateUrl: "./suite-types-form.component.html",
  styleUrls: ["./suite-types-form.component.scss"],
})
export class SuiteTypesFormComponent implements OnInit {
  form = new FormGroup({
    [E_SUITE_TYPE_KEYS.NAME]: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [E_SUITE_TYPE_KEYS.CAPACITY]: new FormControl<number | undefined>(
      undefined,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    [E_SUITE_TYPE_KEYS.PRICE]: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [E_SUITE_TYPE_SPEC_KEYS.ROOMS_COUNT]: new FormControl<number | undefined>(
      undefined,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    [E_SUITE_TYPE_SPEC_KEYS.BEDS_COUNT]: new FormControl<number | undefined>(
      undefined,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    [E_SUITE_TYPE_SPEC_KEYS.SUITE_VARIANT]:
      new FormControl<E_SUITE_TYPE_SPEC_VARIANT>(
        E_SUITE_TYPE_SPEC_VARIANT.APARTMENT,
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
  });

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  suiteTypes$ = this.store.select(getSuiteTypes);

  currentSuiteType$: Observable<ISuiteType | null> = this.route.params.pipe(
    untilDestroyed(this),
    switchMap((params) =>
      this.suiteTypes$.pipe(map((types) => ({ params, types })))
    ),
    map(({ params, types }) => {
      if (!params["id"] || !types.length) return null;

      const suiteType = types.find(
        (type) => `${type[E_SUITE_TYPE_KEYS.ID]}` === params["id"]
      );

      return suiteType || null;
    })
  );

  ngOnInit(): void {
    this.store.dispatch(getSuiteTypesAction());

    this.actions
      .pipe(untilDestroyed(this), ofType(createSuiteTypeSuccessAction))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(["/suites/types"]);
      });

    this.currentSuiteType$.pipe(untilDestroyed(this)).subscribe((type) => {
      if (!type) return;

      this.form.patchValue({
        ...pick(type, [
          E_SUITE_TYPE_KEYS.NAME,
          E_SUITE_TYPE_KEYS.CAPACITY,
          E_SUITE_TYPE_KEYS.PRICE,
        ]),
        ...pick(type[E_SUITE_TYPE_KEYS.SPEC], [
          E_SUITE_TYPE_SPEC_KEYS.ROOMS_COUNT,
          E_SUITE_TYPE_SPEC_KEYS.BEDS_COUNT,
          E_SUITE_TYPE_SPEC_KEYS.SUITE_VARIANT,
        ]),
      });
    });
  }

  create(event: Event) {
    event.preventDefault();

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.store.dispatch(createSuiteTypeAction(this.form.value));
  }

  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_CLIENT_KEYS = E_CLIENT_KEYS;
  protected readonly E_SUITE_TYPE_SPEC_KEYS = E_SUITE_TYPE_SPEC_KEYS;
  protected readonly E_SUITE_TYPE_SPEC_VARIANT = E_SUITE_TYPE_SPEC_VARIANT;
  protected readonly values = values;
}
