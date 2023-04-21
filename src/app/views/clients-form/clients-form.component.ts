import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { E_CLIENT_KEYS, IClient } from "../../store/clients/clients.types";
import { getClients } from "../../store/clients/clients.selectors";
import {
  createClientAction,
  createClientSuccessAction,
  getClientsAction,
} from "../../store/clients/clients.actions";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { createMask } from "@ngneat/input-mask";
import { Actions, ofType } from "@ngrx/effects";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Router } from "@angular/router";

interface IClientForm {
  [E_CLIENT_KEYS.PASSPORT_NUMBER]: FormControl<string>;
  [E_CLIENT_KEYS.FIRST_NAME]: FormControl<string>;
  [E_CLIENT_KEYS.LAST_NAME]: FormControl<string>;
  [E_CLIENT_KEYS.BIRTH_DATE]: FormControl<string>;
  [E_CLIENT_KEYS.PERMANENT_RESIDENCE]: FormControl<string>;
  [E_CLIENT_KEYS.TEMPORARY_RESIDENCE]: FormControl<string>;
  [E_CLIENT_KEYS.PHONE_NUMBER]: FormControl<string>;
  [E_CLIENT_KEYS.EMAIL]: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: "app-clients-form",
  templateUrl: "./clients-form.component.html",
  styleUrls: ["./clients-form.component.scss"],
})
export class ClientsFormComponent implements OnInit {
  E_CLIENT_KEYS = E_CLIENT_KEYS;
  form: FormGroup<IClientForm>;

  birthDateInputMask = createMask<string>({
    alias: "datetime",
    inputFormat: "dd.mm.yyyy",
    parser: (value: string) => {
      const [day, month, year] = value.split(".");
      return `${year}-${month}-${day}`;
    },
  });

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly router: Router
  ) {
    this.form = new FormGroup<IClientForm>({
      [E_CLIENT_KEYS.PASSPORT_NUMBER]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.FIRST_NAME]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.LAST_NAME]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.BIRTH_DATE]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.PERMANENT_RESIDENCE]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.TEMPORARY_RESIDENCE]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.PHONE_NUMBER]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [E_CLIENT_KEYS.EMAIL]: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  $clients: Observable<Array<IClient>> = this.store.select(getClients);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());

    this.actions
      .pipe(untilDestroyed(this), ofType(createClientSuccessAction))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(["/clients"]);
      });
  }

  create() {
    this.store.dispatch(createClientAction(this.form.value));
  }
}
