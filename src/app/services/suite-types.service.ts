import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import {
  E_SUITE_TYPE_KEYS,
  E_SUITE_TYPE_SPEC_KEYS,
  ISuiteType,
  ISuiteTypeSpec,
} from "../store/suites/suites.types";

export type ICreateSuiteTypeBody = Omit<
  ISuiteType,
  E_SUITE_TYPE_KEYS.SPEC | E_SUITE_TYPE_KEYS.ID
> &
  Omit<ISuiteTypeSpec, E_SUITE_TYPE_SPEC_KEYS.SUITE_TYPE_ID>;

@Injectable({
  providedIn: "root",
})
export class SuiteTypesService {
  public static readonly PATH = "suite-types";

  constructor(private readonly apiService: ApiService) {}

  getSuiteTypes(): Observable<Array<ISuiteType>> {
    return this.apiService.get({
      path: SuiteTypesService.PATH,
    });
  }

  createSuiteType(body: Partial<ICreateSuiteTypeBody>): Observable<ISuiteType> {
    return this.apiService.post({
      path: SuiteTypesService.PATH,
      body,
    });
  }
}
