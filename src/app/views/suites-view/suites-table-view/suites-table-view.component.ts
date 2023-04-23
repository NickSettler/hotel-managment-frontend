import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { debounceTime, filter } from "rxjs";
import { isEmpty } from "lodash";
import { getSuites } from "../../../store/suites/suites.selectors";
import { getSuitesAction } from "../../../store/suites/suites.actions";
import {
  E_SUITE_KEYS,
  E_SUITE_STATUS,
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
  ISuite,
} from "../../../store/suites/suites.types";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "@ngrx/effects";

@UntilDestroy()
@Component({
  selector: "app-suites-table-view",
  templateUrl: "./suites-table-view.component.html",
  styleUrls: ["./suites-table-view.component.scss"],
})
export class SuitesTableViewComponent implements OnInit {
  filterForm = new FormGroup({
    suiteNumber: new FormControl(""),
  });

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  suites$ = this.store.select(getSuites);

  ngOnInit(): void {
    this.store.dispatch(getSuitesAction());

    this.route.queryParams
      .pipe(
        untilDestroyed(this),
        filter((params) => !isEmpty(params["suiteNumber"]))
      )
      .subscribe(({ suiteNumber }) => {
        this.filterForm.patchValue({ suiteNumber });
      });

    this.filterForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: value,
          queryParamsHandling: "merge",
        });
      });
  }

  get filterSuitesFunc(): (suite: ISuite) => boolean {
    return (suite) => {
      if (!this.filterForm.value.suiteNumber) return true;

      return `${suite[E_SUITE_KEYS.SUITE_NUMBER]}`.includes(
        this.filterForm.value.suiteNumber
      );
    };
  }

  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly E_SUITE_TYPE_SPEC_KEYS = E_SUITE_TYPE_SPEC_KEYS;
  protected readonly faLock = faLock;
  protected readonly E_SUITE_STATUS = E_SUITE_STATUS;
  protected readonly faLockOpen = faLockOpen;
}
