import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getSuiteTypes } from "../../../store/suites/suites.selectors";
import { getSuiteTypesAction } from "../../../store/suites/suites.actions";
import {
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
} from "../../../store/suites/suites.types";

@Component({
  selector: "app-suite-types-table-view",
  templateUrl: "./suite-types-table-view.component.html",
  styleUrls: ["./suite-types-table-view.component.scss"],
})
export class SuiteTypesTableViewComponent implements OnInit {
  constructor(private readonly store: Store) {}

  suiteTypes$ = this.store.select(getSuiteTypes);

  ngOnInit(): void {
    this.store.dispatch(getSuiteTypesAction());
  }

  protected readonly onabort = onabort;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly E_SUITE_TYPE_SPEC_KEYS = E_SUITE_TYPE_SPEC_KEYS;
}
