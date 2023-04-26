import { Component, OnInit } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import {
  E_CLIENT_KEYS,
  IClient,
} from "../../../../store/clients/clients.types";
import { getClient } from "../../../../store/clients/clients.selectors";
import { Store } from "@ngrx/store";
import { getClientsAction } from "../../../../store/clients/clients.actions";
import { ActivatedRoute } from "@angular/router";
import { getReservationsAction } from "../../../../store/reservations/reservations.actions";
import { getReservationForClient } from "../../../../store/reservations/reservations.selectors";
import {
  E_RESERVATION_KEYS,
  E_RESERVATION_STATUS,
  IReservation,
} from "../../../../store/reservations/reservations.types";
import { getSuitesAction } from "../../../../store/suites/suites.actions";
import { getSuites } from "../../../../store/suites/suites.selectors";
import {
  E_SUITE_KEYS,
  E_SUITE_TYPE_KEYS,
  ISuite,
} from "../../../../store/suites/suites.types";
import { sortBy } from "lodash";
import { ReservationHelpers } from "../../../../services/reservations.service";
import {
  faArrowLeft,
  faArrowRight,
  faCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-client-view",
  templateUrl: "./client-view.component.html",
  styleUrls: ["./client-view.component.scss"],
})
export class ClientViewComponent implements OnInit {
  readonly E_CLIENT_KEYS = E_CLIENT_KEYS;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  client$: Observable<IClient | undefined> = this.route.params.pipe(
    switchMap((params) => this.store.select(getClient(params["passport"])))
  );

  clientReservations$ = this.route.params.pipe(
    switchMap((params) =>
      this.store.select(getReservationForClient(params["passport"]))
    ),
    map((reservations) => sortBy(reservations, E_RESERVATION_KEYS.ARRIVAL))
  );

  suites$ = this.store.select(getSuites);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
    this.store.dispatch(getReservationsAction());
    this.store.dispatch(getSuitesAction());
  }

  formatSuite(suite: ISuite | null): string {
    if (!suite) return "";

    return `${suite[E_SUITE_KEYS.SUITE_NUMBER]} - ${
      suite[E_SUITE_KEYS.SUITE_TYPE][E_SUITE_TYPE_KEYS.NAME]
    }`;
  }

  getReservationStatusIcon(reservation: IReservation): IconDefinition {
    const status = ReservationHelpers.getReservationStatus(reservation);

    if (status === E_RESERVATION_STATUS.CURRENT) {
      return faCircle;
    } else if (status === E_RESERVATION_STATUS.PAST) {
      return faArrowLeft;
    } else if (status === E_RESERVATION_STATUS.UPCOMING) {
      return faArrowRight;
    }

    return faXmark;
  }

  getReservationStatusIconColor(reservation: IReservation): string {
    const status = ReservationHelpers.getReservationStatus(reservation);

    if (status === E_RESERVATION_STATUS.CURRENT) {
      return "var(--bs-success)";
    } else if (status === E_RESERVATION_STATUS.PAST) {
      return "var(--bs-warning)";
    } else if (status === E_RESERVATION_STATUS.UPCOMING) {
      return "var(--bs-primary)";
    }

    return "initial";
  }

  protected readonly E_RESERVATION_KEYS = E_RESERVATION_KEYS;
  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
}
