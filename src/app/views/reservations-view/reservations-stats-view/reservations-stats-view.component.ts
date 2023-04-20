import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { debounceTime, distinctUntilChanged, map, Observable } from "rxjs";
import { IReservationStats } from "../../../store/reservations/reservations.types";
import { getReservationsStats } from "../../../store/reservations/reservations.selectors";
import { getReservationsStatsAction } from "../../../store/reservations/reservations.actions";
import { FormControl, FormGroup } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

interface ReservationsStatsViewFormGroup {
  year: FormControl;
}

@UntilDestroy()
@Component({
  selector: "app-reservations-stats-view",
  templateUrl: "./reservations-stats-view.component.html",
  styleUrls: ["./reservations-stats-view.component.scss"],
})
export class ReservationsStatsViewComponent implements OnInit {
  readonly years = Array.from({ length: 10 }, (_, i) => 2020 + i);

  statisticsForm: FormGroup<ReservationsStatsViewFormGroup> = new FormGroup({
    year: new FormControl(new Date().getFullYear(), { nonNullable: true }),
  });

  constructor(private readonly store: Store) {}

  reservationStats$: Observable<Array<IReservationStats>> = this.store
    .select(getReservationsStats)
    .pipe(
      distinctUntilChanged(),
      map(
        (stats) =>
          stats[
            this.statisticsForm.get("year")?.value || new Date().getFullYear()
          ]
      )
    );

  ngOnInit(): void {
    this.store.dispatch(
      getReservationsStatsAction({
        year:
          this.statisticsForm.get("year")?.value || new Date().getFullYear(),
      })
    );

    this.reservationStats$.subscribe(console.log);

    this.statisticsForm
      .get("year")
      ?.valueChanges.pipe(untilDestroyed(this), debounceTime(500))
      .subscribe((year) => {
        console.log(year);
        if (!year) return;
        this.store.dispatch(getReservationsStatsAction({ year }));
      });
  }

  protected readonly Date = Date;
}
