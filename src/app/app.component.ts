import { Component, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "Hotel Management";

  constructor(private readonly store: Store) {}
}
