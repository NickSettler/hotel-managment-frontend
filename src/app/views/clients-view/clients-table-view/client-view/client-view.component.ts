import { Component } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import {
  E_CLIENT_KEYS,
  IClient,
} from "../../../../store/clients/clients.types";
import {
  getClient,
  getClients,
} from "../../../../store/clients/clients.selectors";
import { Store } from "@ngrx/store";
import { getClientsAction } from "../../../../store/clients/clients.actions";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-client-view",
  templateUrl: "./client-view.component.html",
  styleUrls: ["./client-view.component.scss"],
})
export class ClientViewComponent {
  readonly E_CLIENT_KEYS = E_CLIENT_KEYS;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  client$: Observable<IClient | undefined> = this.route.params.pipe(
    switchMap((params) => this.store.select(getClient(params["passport"])))
  );

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
  }
}
