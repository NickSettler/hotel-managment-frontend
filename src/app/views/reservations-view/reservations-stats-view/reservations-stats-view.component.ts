import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { debounceTime, distinctUntilChanged, map, Observable } from "rxjs";
import { IReservationStats } from "../../../store/reservations/reservations.types";
import { getReservationsStats } from "../../../store/reservations/reservations.selectors";
import { getReservationsStatsAction } from "../../../store/reservations/reservations.actions";
import { FormControl, FormGroup } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ChartData } from "chart.js";
import { DatePipe } from "@angular/common";

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

    this.statisticsForm
      .get("year")
      ?.valueChanges.pipe(untilDestroyed(this), debounceTime(500))
      .subscribe((year) => {
        if (!year) return;
        this.store.dispatch(getReservationsStatsAction({ year }));
      });
  }

  get graphLabelUpdateFunc(): (label: string) => string {
    const datePipe = new DatePipe("en-US");

    return (label: string) => datePipe.transform(`1970-${label}-01`, "MMM")!;
  }

  get hotFilterFunc(): (value: IReservationStats) => boolean {
    return (value: IReservationStats) => value.isHot;
  }

  get coldFilterFunc(): (value: IReservationStats) => boolean {
    return (value: IReservationStats) => value.isCold;
  }
}
