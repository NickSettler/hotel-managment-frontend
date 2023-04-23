import { Component, OnInit } from "@angular/core";
import {
  E_CLIENT_KEYS,
  IClient,
} from "../../../../store/clients/clients.types";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { map, withLatestFrom } from "rxjs";
import { getClients } from "../../../../store/clients/clients.selectors";
import { getClientsAction } from "../../../../store/clients/clients.actions";
import {
  E_SUITE_KEYS,
  E_SUITE_STATUS,
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
} from "../../../../store/suites/suites.types";
import { getSuites } from "../../../../store/suites/suites.selectors";
import {
  getSuitesAction,
  setSuiteStatusAction,
} from "../../../../store/suites/suites.actions";
import { getReservationsAction } from "../../../../store/reservations/reservations.actions";
import { getReservations } from "../../../../store/reservations/reservations.selectors";
import {
  E_RESERVATION_KEYS,
  IReservation,
} from "../../../../store/reservations/reservations.types";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "@ngrx/effects";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-suite-view",
  templateUrl: "./suite-view.component.html",
  styleUrls: ["./suite-view.component.scss"],
})
export class SuiteViewComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly route: ActivatedRoute
  ) {}

  reservations$ = this.store.select(getReservations);

  clients$ = this.store.select(getClients);

  suites$ = this.store.select(getSuites);

  suite$ = this.store.select(getSuites).pipe(
    withLatestFrom(this.route.params),
    map(([suites, params]) => {
      if (!suites) return undefined;

      return suites.find(
        (suite) => suite[E_SUITE_KEYS.SUITE_NUMBER] === +params["suiteNumber"]
      );
    })
  );

  ngOnInit(): void {
    this.store.dispatch(getSuitesAction());
    this.store.dispatch(getReservationsAction());
    this.store.dispatch(getClientsAction());
  }

  getFilterReservationsFunc(
    suiteNumber: number
  ): (reservation: IReservation) => boolean {
    return (reservation: IReservation) =>
      reservation[E_SUITE_KEYS.SUITE_NUMBER] === suiteNumber;
  }

  formatClient(client: IClient | null) {
    if (!client) return "";

    return `${client[E_CLIENT_KEYS.FIRST_NAME]} ${
      client[E_CLIENT_KEYS.LAST_NAME]
    }`;
  }

  handleSuiteStatusChange(suiteNumber: number, status: E_SUITE_STATUS) {
    this.store.dispatch(
      setSuiteStatusAction({
        suiteNumber,
        status,
      })
    );
  }

  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_RESERVATION_KEYS = E_RESERVATION_KEYS;
  protected readonly E_CLIENT_KEYS = E_CLIENT_KEYS;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
  protected readonly E_SUITE_STATUS = E_SUITE_STATUS;
  protected readonly faLockOpen = faLockOpen;
  protected readonly faLock = faLock;
  protected readonly E_SUITE_TYPE_SPEC_KEYS = E_SUITE_TYPE_SPEC_KEYS;
}
