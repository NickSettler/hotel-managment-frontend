import { Component, OnInit } from "@angular/core";
import { debounceTime, Observable } from "rxjs";
import { E_CLIENT_KEYS, IClient } from "../../../store/clients/clients.types";
import { Store } from "@ngrx/store";
import { getClients } from "../../../store/clients/clients.selectors";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { getClientsAction } from "../../../store/clients/clients.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@UntilDestroy()
@Component({
  selector: "app-clients-table-view",
  templateUrl: "./clients-table-view.component.html",
  styleUrls: ["./clients-table-view.component.css"],
})
export class ClientsTableViewComponent implements OnInit {
  readonly E_CLIENT_KEYS = E_CLIENT_KEYS;

  filterForm = new FormGroup({
    [E_CLIENT_KEYS.PASSPORT_NUMBER]: new FormControl(""),
  });

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  clients$: Observable<Array<IClient>> = this.store.select(getClients);

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());

    this.route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((queryParams) => {
        this.filterForm.patchValue(queryParams);
      });

    this.filterForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: value,
          queryParamsHandling: "merge",
        });
      });
  }

  get filterClientsFunc(): (client: IClient) => boolean {
    return (client: IClient) => {
      if (!this.filterForm.value[E_CLIENT_KEYS.PASSPORT_NUMBER]) {
        return true;
      }

      return client[E_CLIENT_KEYS.PASSPORT_NUMBER].includes(
        this.filterForm.value[E_CLIENT_KEYS.PASSPORT_NUMBER]
      );
    };
  }
}
