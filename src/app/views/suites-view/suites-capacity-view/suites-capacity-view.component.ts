import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getCapacityAction,
  getSuitesAction,
} from "../../../store/suites/suites.actions";
import { getCapacity, getSuites } from "../../../store/suites/suites.selectors";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  E_SUITE_KEYS,
  E_SUITE_TYPE_KEYS,
} from "../../../store/suites/suites.types";

@Component({
  selector: "app-suites-capacity-view",
  templateUrl: "./suites-capacity-view.component.html",
  styleUrls: ["./suites-capacity-view.component.scss"],
})
export class SuitesCapacityViewComponent implements OnInit {
  filterForm = new FormGroup({
    arrival: new FormControl("", {
      validators: [Validators.required],
    }),
    departure: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  constructor(private readonly store: Store) {}

  suites$ = this.store.select(getSuites);

  capacity$ = this.store.select(getCapacity);

  ngOnInit(): void {
    this.store.dispatch(getSuitesAction());

    this.store.dispatch(
      getCapacityAction({
        arrival: "2024-01-01",
        departure: "2024-01-02",
        occupied: false,
      })
    );
  }

  getCapacity() {
    if (!this.filterForm.value.arrival || !this.filterForm.value.departure)
      return;
  }

  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
}
