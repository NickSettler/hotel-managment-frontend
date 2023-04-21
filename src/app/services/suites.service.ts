import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { ICapacity, ISuite } from "../store/suites/suites.types";
import { E_RESERVATION_KEYS } from "../store/reservations/reservations.types";

@Injectable({
  providedIn: "root",
})
export class SuitesService {
  public static readonly PATH = "suites";

  constructor(private readonly apiService: ApiService) {}

  getSuites(): Observable<Array<ISuite>> {
    return this.apiService.get({
      path: SuitesService.PATH,
    });
  }

  getCapacity(
    arrival: string,
    departure: string,
    occupied: boolean
  ): Observable<Array<ICapacity>> {
    const params = new URLSearchParams();
    params.set(E_RESERVATION_KEYS.ARRIVAL, arrival);
    params.set(E_RESERVATION_KEYS.DEPARTURE, departure);
    params.set("occupied", occupied.toString());

    return this.apiService.get({
      path: `${SuitesService.PATH}/capacity?${params.toString()}`,
    });
  }
}
