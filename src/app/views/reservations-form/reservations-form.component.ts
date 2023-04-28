import { Component, OnInit } from "@angular/core";
import { E_RESERVATION_KEYS } from "../../store/reservations/reservations.types";
import { FormControl, FormGroup } from "@angular/forms";
import { E_CLIENT_KEYS } from "../../store/clients/clients.types";
import {
  E_SUITE_KEYS,
  E_SUITE_TYPE_KEYS,
} from "../../store/suites/suites.types";
import { Store } from "@ngrx/store";
import { getClients } from "../../store/clients/clients.selectors";
import { getClientsAction } from "../../store/clients/clients.actions";
import { getSuites } from "../../store/suites/suites.selectors";
import { getSuitesAction } from "../../store/suites/suites.actions";

@Component({
  selector: "app-reservations-form",
  templateUrl: "./reservations-form.component.html",
  styleUrls: ["./reservations-form.component.scss"],
})
export class ReservationsFormComponent implements OnInit {
  protected readonly E_RESERVATION_KEYS = E_RESERVATION_KEYS;

  reservationForm = new FormGroup({
    [E_RESERVATION_KEYS.CLIENT_PASSPORT]: new FormControl(""),
    [E_RESERVATION_KEYS.SUITE_NUMBER]: new FormControl(""),
    [E_RESERVATION_KEYS.ARRIVAL]: new FormControl(""),
    [E_RESERVATION_KEYS.DEPARTURE]: new FormControl(""),
    [E_RESERVATION_KEYS.PAYMENT_OPTION]: new FormControl(""),
  });

  constructor(private readonly store: Store) {}

  clients$ = this.store.select(getClients);

  suites$ = this.store.select(getSuites);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
    this.store.dispatch(getSuitesAction());
  }

  protected readonly E_CLIENT_KEYS = E_CLIENT_KEYS;
  protected readonly E_SUITE_KEYS = E_SUITE_KEYS;
  protected readonly E_SUITE_TYPE_KEYS = E_SUITE_TYPE_KEYS;
}
