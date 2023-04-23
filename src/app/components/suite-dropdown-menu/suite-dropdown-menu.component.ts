import { Component, Input } from "@angular/core";
import {
  E_SUITE_KEYS,
  E_SUITE_STATUS,
  ISuite,
} from "../../store/suites/suites.types";
import { setSuiteStatusAction } from "../../store/suites/suites.actions";
import { Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-suite-dropdown-menu",
  templateUrl: "./suite-dropdown-menu.component.html",
  styleUrls: ["./suite-dropdown-menu.component.scss"],
})
export class SuiteDropdownMenuComponent {
  @Input() suite?: ISuite;

  @Input() isSmall = false;

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly route: ActivatedRoute
  ) {}

  handleSuiteStatusChange(suiteNumber: number, status: E_SUITE_STATUS) {
    this.store.dispatch(
      setSuiteStatusAction({
        suiteNumber,
        status,
      })
    );
  }

  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_STATUS = E_SUITE_STATUS;
}
