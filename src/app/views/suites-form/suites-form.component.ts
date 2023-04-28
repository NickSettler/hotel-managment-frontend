import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { getSuiteTypes } from "../../store/suites/suites.selectors";
import {
  E_SUITE_KEYS,
  E_SUITE_STATUS,
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
} from "../../store/suites/suites.types";
import {
  createSuiteAction,
  createSuiteSuccessAction,
  getSuiteTypesAction,
} from "../../store/suites/suites.actions";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "app-suites-form",
  templateUrl: "./suites-form.component.html",
  styleUrls: ["./suites-form.component.scss"],
})
export class SuitesFormComponent implements OnInit {
  form = new FormGroup({
    [E_SUITE_KEYS.SUITE_NUMBER]: new FormControl<number | undefined>(
      undefined,
      { nonNullable: true, validators: [Validators.required] }
    ),
    [E_SUITE_KEYS.SUITE_TYPE_ID]: new FormControl<number | undefined>(
      undefined,
      { nonNullable: true, validators: [Validators.required] }
    ),
    [E_SUITE_KEYS.SUITE_STATUS]: new FormControl<E_SUITE_STATUS>(
      E_SUITE_STATUS.AVAILABLE,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
  });

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly router: Router
  ) {}

  suiteTypes$ = this.store.select(getSuiteTypes);

  ngOnInit(): void {
    this.store.dispatch(getSuiteTypesAction());

    this.actions
      .pipe(untilDestroyed(this), ofType(createSuiteSuccessAction))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(["/suites/table"]);
      });
  }

  create(event: Event) {
    event.preventDefault();

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.store.dispatch(
      createSuiteAction({
        ...this.form.value,
        [E_SUITE_KEYS.SUITE_STATUS]: this.form.value[E_SUITE_KEYS.SUITE_STATUS]
          ? E_SUITE_STATUS.AVAILABLE
          : E_SUITE_STATUS.NOT_AVAILABLE,
      })
    );
  }

  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_TYPE_SPEC_KEYS = E_SUITE_TYPE_SPEC_KEYS;
}
