import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getReservations } from "../../../store/reservations/reservations.selectors";
import { getReservationsAction } from "../../../store/reservations/reservations.actions";
import {
  E_RESERVATION_KEYS,
  IReservation,
} from "../../../store/reservations/reservations.types";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { debounceTime } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-reservations-table-view",
  templateUrl: "./reservations-table-view.component.html",
  styleUrls: ["./reservations-table-view.component.scss"],
})
export class ReservationsTableViewComponent implements OnInit {
  form = new FormGroup({
    client: new FormControl(null),
    suite: new FormControl(null),
  });

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  reservations$ = this.store.select(getReservations);

  ngOnInit(): void {
    this.store.dispatch(getReservationsAction());

    this.route.queryParams.subscribe((params) => {
      if (params["client"]) {
        this.form.get("client")?.patchValue(params["client"]);
      }

      if (params["suite"]) {
        this.form.get("suite")?.patchValue(params["suite"]);
      }
    });

    this.form.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { client: value.client, suite: value.suite },
          queryParamsHandling: "merge",
        });
      });
  }

  get filterFunc() {
    return (reservation: IReservation): boolean => {
      const client = this.form.get("client")?.value;
      const suite = this.form.get("suite")?.value;

      if (client && suite) {
        return (
          reservation[E_RESERVATION_KEYS.CLIENT_PASSPORT].includes(client) &&
          reservation[E_RESERVATION_KEYS.SUITE_NUMBER]
            .toString()
            .includes(suite)
        );
      }

      if (client) {
        return reservation[E_RESERVATION_KEYS.CLIENT_PASSPORT].includes(client);
      }

      if (suite) {
        return reservation[E_RESERVATION_KEYS.SUITE_NUMBER]
          .toString()
          .includes(suite);
      }

      return true;
    };
  }

  protected readonly E_RESERVATION_KEYS = E_RESERVATION_KEYS;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faArrowUpRightFromSquare = faArrowUpRightFromSquare;
}
