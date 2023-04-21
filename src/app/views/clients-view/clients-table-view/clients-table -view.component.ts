import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { E_CLIENT_KEYS, IClient } from "../../../store/clients/clients.types";
import { Store } from "@ngrx/store";
import { getClients } from "../../../store/clients/clients.selectors";
import { UntilDestroy } from "@ngneat/until-destroy";
import { getClientsAction } from "../../../store/clients/clients.actions";

@UntilDestroy()
@Component({
  selector: "app-clients-table-view",
  templateUrl: "./clients-table-view.component.html",
  styleUrls: ["./clients-table-view.component.css"],
})
export class ClientsTableViewComponent implements OnInit {
  readonly E_CLIENT_KEYS = E_CLIENT_KEYS;

  constructor(private readonly store: Store) {}

  clients$: Observable<Array<IClient>> = this.store.select(getClients);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
  }
}
