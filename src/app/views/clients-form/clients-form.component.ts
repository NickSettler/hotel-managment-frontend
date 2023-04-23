import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { E_CLIENT_KEYS, IClient } from "../../store/clients/clients.types";
import { getClients } from "../../store/clients/clients.selectors";
import {
  createClientAction,
  createClientSuccessAction,
  getClientsAction,
  updateClientAction,
} from "../../store/clients/clients.actions";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Actions, ofType } from "@ngrx/effects";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { omit } from "lodash";

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

  constructor(
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly route: ActivatedRoute,
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

  clients$: Observable<Array<IClient>> = this.store.select(getClients);

  currentClient$: Observable<IClient | null> = this.route.queryParams.pipe(
    untilDestroyed(this),
    switchMap((params) =>
      this.clients$.pipe(map((clients) => ({ params, clients })))
    ),
    map(({ params, clients }) => {
      if (!params["passport"] || !clients.length) return null;

      const client = clients.find(
        (client) => client[E_CLIENT_KEYS.PASSPORT_NUMBER] === params["passport"]
      );

      return client || null;
    })
  );

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());

    this.actions
      .pipe(untilDestroyed(this), ofType(createClientSuccessAction))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(["/clients"]);
      });

    this.currentClient$.pipe(untilDestroyed(this)).subscribe((client) => {
      if (!client) return;

      this.form.patchValue(omit(client, E_CLIENT_KEYS.REGISTRATION_DATE));
    });
  }

  handle() {
    if (this.form.invalid) return;

    console.log(this.form.value);

    this.currentClient$.pipe(untilDestroyed(this)).subscribe((client) => {
      if (!client) this.store.dispatch(createClientAction(this.form.value));
      else
        this.store.dispatch(
          updateClientAction({
            passport: client[E_CLIENT_KEYS.PASSPORT_NUMBER],
            client: omit(this.form.value, E_CLIENT_KEYS.PASSPORT_NUMBER),
          })
        );
    });
  }
}
