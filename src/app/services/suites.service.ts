import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import {
  E_SUITE_KEYS,
  E_SUITE_STATUS,
  ICapacity,
  ISuite,
} from "../store/suites/suites.types";
import { E_RESERVATION_KEYS } from "../store/reservations/reservations.types";

export type ICreateSuiteBody = Omit<ISuite, E_SUITE_KEYS.SUITE_TYPE>;

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

  createSuite(suite: Partial<ICreateSuiteBody>): Observable<ISuite> {
    return this.apiService.post({
      path: SuitesService.PATH,
      body: suite,
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

  setSuiteStatus(
    suiteNumber: number,
    status: E_SUITE_STATUS
  ): Observable<ISuite> {
    return this.apiService.post({
      path: `${SuitesService.PATH}/${suiteNumber}/${status}`,
    });
  }
}
