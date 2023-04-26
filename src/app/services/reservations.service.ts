import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import {
  E_RESERVATION_KEYS,
  E_RESERVATION_STATUS,
  IReservation,
  IReservationStats,
} from "../store/reservations/reservations.types";

export class ReservationHelpers {
  static getReservationStatus(reservation: IReservation): E_RESERVATION_STATUS {
    const arrival = new Date(reservation[E_RESERVATION_KEYS.ARRIVAL]);
    const departure = new Date(reservation[E_RESERVATION_KEYS.DEPARTURE]);
    const now = new Date();

    return now < arrival
      ? E_RESERVATION_STATUS.UPCOMING
      : now > departure
      ? E_RESERVATION_STATUS.PAST
      : E_RESERVATION_STATUS.CURRENT;
  }
}

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
  public getStats(year?: number): Observable<Array<IReservationStats>> {
    return this.apiService.get<Array<IReservationStats>>({
      path: `${ReservationsService.STATS_PATH}/${year || ""}`,
    });
  }
}
