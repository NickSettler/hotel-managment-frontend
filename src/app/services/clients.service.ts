import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { IClient } from "../store/clients/clients.types";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  public static readonly PATH = "clients";

  constructor(private readonly apiService: ApiService) {}

  public getClients() {
    return this.apiService.get<Array<IClient>>({ path: ClientsService.PATH });
  }

  public createClient(client: IClient) {
    return this.apiService.post<IClient>({
      path: ClientsService.PATH,
      body: client,
    });
  }
}
