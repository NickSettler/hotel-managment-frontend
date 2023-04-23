import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getCapacityAction,
  getCapacitySuccessAction,
  getSuitesAction,
} from "../../../store/suites/suites.actions";
import {
  getAvailableCapacity,
  getOccupiedCapacity,
  getSuites,
} from "../../../store/suites/suites.selectors";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  E_SUITE_KEYS,
  E_SUITE_TYPE_KEYS,
} from "../../../store/suites/suites.types";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

@UntilDestroy()
@Component({
  selector: "app-suites-capacity-view",
  templateUrl: "./suites-capacity-view.component.html",
  styleUrls: ["./suites-capacity-view.component.scss"],
})
export class SuitesCapacityViewComponent implements OnInit, OnDestroy {
  filterForm = new FormGroup({
    arrival: new FormControl("", {
      validators: [Validators.required],
    }),
    departure: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  suites$ = this.store.select(getSuites);

  occupiedCapacity$ = this.store.select(getOccupiedCapacity);

  availableCapacity$ = this.store.select(getAvailableCapacity);

  ngOnInit(): void {
    this.store.dispatch(getSuitesAction());

    this.route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((queryParams) => {
        this.filterForm.patchValue({
          arrival: queryParams["arrival"],
          departure: queryParams["departure"],
        });

        this.getCapacity(null);
      });
  }

  getCapacity(event: Event | null) {
    if (event) event.preventDefault();

    if (!this.filterForm.value.arrival || !this.filterForm.value.departure)
      return;

    this.store.dispatch(
      getCapacityAction({
        arrival: this.filterForm.value.arrival,
        departure: this.filterForm.value.departure,
      })
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        arrival: this.filterForm.value.arrival,
        departure: this.filterForm.value.departure,
      },
      queryParamsHandling: "merge",
    });
  }

  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  ngOnDestroy(): void {
    this.store.dispatch(
      getCapacitySuccessAction({
        occupied: [],
        available: [],
      })
    );
  }
}
