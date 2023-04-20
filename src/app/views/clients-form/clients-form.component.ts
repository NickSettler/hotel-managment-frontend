import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { E_CLIENT_KEYS, IClient } from "../../store/clients/clients.types";
import { getClients } from "../../store/clients/clients.selectors";
import {
  createClientAction,
  getClientsAction,
} from "../../store/clients/clients.actions";
import { FormControl, FormGroup, Validators } from "@angular/forms";

interface IClientForm {
  [E_CLIENT_KEYS.PASSPORT_NUMBER]: FormControl<string>;
  [E_CLIENT_KEYS.FIRST_NAME]: FormControl<string>;
  [E_CLIENT_KEYS.LAST_NAME]: FormControl<string>;
  [E_CLIENT_KEYS.BIRTH_DATE]: FormControl<string>;
  [E_CLIENT_KEYS.PERMANENT_RESIDENCE]: FormControl<string>;
  [E_CLIENT_KEYS.TEMPORARY_RESIDENCE]: FormControl<string>;
  [E_CLIENT_KEYS.PHONE_NUMBER]: FormControl<string>;
  [E_CLIENT_KEYS.EMAIL]: FormControl<string>;
  [E_CLIENT_KEYS.REGISTRATION_DATE]: FormControl<string>;
}

@Component({
  selector: "app-clients-form",
  templateUrl: "./clients-form.component.html",
  styleUrls: ["./clients-form.component.scss"],
})
export class ClientsFormComponent implements OnInit {
  E_CLIENT_KEYS = E_CLIENT_KEYS;
  form: FormGroup<IClientForm>;

  constructor(private readonly store: Store) {
    this.form = new FormGroup<IClientForm>({
      [E_CLIENT_KEYS.PASSPORT_NUMBER]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.FIRST_NAME]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.LAST_NAME]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.BIRTH_DATE]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.PERMANENT_RESIDENCE]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.TEMPORARY_RESIDENCE]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.PHONE_NUMBER]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.EMAIL]: new FormControl("", {
        nonNullable: true,
      }),
      [E_CLIENT_KEYS.REGISTRATION_DATE]: new FormControl("", {
        nonNullable: true,
      }),
    });
  }

  $clients: Observable<Array<IClient>> = this.store.select(getClients);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
  }

  create() {
    // this.store.dispatch(createClientAction(this.form.value));
  }
}
