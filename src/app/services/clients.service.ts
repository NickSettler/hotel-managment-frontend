import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { E_CLIENT_KEYS, IClient } from "../store/clients/clients.types";

export interface ICreateClientBody
  extends Omit<
    IClient,
    E_CLIENT_KEYS.REGISTRATION_DATE | E_CLIENT_KEYS.BIRTH_DATE
  > {
  [E_CLIENT_KEYS.BIRTH_DATE]: string;
}

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  public static readonly PATH = "clients";

  constructor(private readonly apiService: ApiService) {}

  public getClients() {
    return this.apiService.get<Array<IClient>>({ path: ClientsService.PATH });
  }

  public createClient(client: Partial<ICreateClientBody>) {
    return this.apiService.post<IClient>({
      path: ClientsService.PATH,
      body: client,
    });
  }
}
