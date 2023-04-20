import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  E_CLIENT_KEYS,
  IClient,
  IClientsState,
} from "../../../store/clients/clients.types";
import { Store } from "@ngrx/store";
import { getClients } from "../../../store/clients/clients.selectors";
import { UntilDestroy } from "@ngneat/until-destroy";
import { getClientsAction } from "../../../store/clients/clients.actions";

@UntilDestroy()
@Component({
  selector: "app-clients-list-view",
  templateUrl: "./clients-list-view.component.html",
  styleUrls: ["./clients-list-view.component.css"],
})
export class ClientsListViewComponent implements OnInit {
  readonly E_CLIENT_KEYS = E_CLIENT_KEYS;

  constructor(private readonly store: Store) {}

  clients$: Observable<Array<IClient>> = this.store.select(getClients);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
  }
}
