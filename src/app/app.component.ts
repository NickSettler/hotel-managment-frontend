import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { getClientsAction } from "./store/clients/clients.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = "untitled";

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getClientsAction());
  }
}
