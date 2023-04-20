import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import {
  IReservation,
  IReservationStats,
} from "../store/reservations/reservations.types";

@Injectable({
  providedIn: "root",
})
export class ReservationsService {
  public static readonly PATH = "reservations";
  public static readonly STATS_PATH = `${ReservationsService.PATH}/stats`;

  constructor(private readonly apiService: ApiService) {}

  public getAll(): Observable<Array<IReservation>> {
    return this.apiService.get<Array<IReservation>>({
      path: ReservationsService.PATH,
    });
  }

  public getStats(): Observable<Array<IReservationStats>>;
  public getStats(year: number): Observable<Array<IReservationStats>>;
  public getStats(year?: number): Observable<Array<IReservationStats>>;
  public getStats(year?: number): Observable<Array<IReservationStats>> {
    return this.apiService.get<Array<IReservationStats>>({
      path: `${ReservationsService.STATS_PATH}/${year || ""}`,
    });
  }
}
