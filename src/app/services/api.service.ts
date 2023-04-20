import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";

export type TRequestOptions = {
  path?: string;
  params?: { [key: string]: any };
  body?: any;
};

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) {}

  get apiUrl() {
    return `${this.configService.getConfig("apiURL")}`;
  }

  public get<T>(options: TRequestOptions): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${options.path}`, {
      observe: "body",
      responseType: "json",
      params: options.params,
    });
  }

  public post<T>(options: TRequestOptions): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${options.path}`, options.body, {
      observe: "body",
      responseType: "json",
    });
  }

  public put<T>(options: TRequestOptions): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${options.path}`, options.body, {
      observe: "body",
      responseType: "json",
    });
  }

  public delete<T>(options: TRequestOptions): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${options.path}`, {
      observe: "body",
      responseType: "json",
    });
  }
}
