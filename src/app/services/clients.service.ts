import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { E_CLIENT_KEYS, IClient } from "../store/clients/clients.types";

export type ICreateClientBody = Omit<
  IClient,
  E_CLIENT_KEYS.REGISTRATION_DATE | E_CLIENT_KEYS.BIRTH_DATE
>;

export type IUpdateClientBody = Partial<
  Omit<ICreateClientBody, E_CLIENT_KEYS.PASSPORT_NUMBER>
>;

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

  public updateClient(passport: string, client: IUpdateClientBody) {
    return this.apiService.put<IClient>({
      path: `${ClientsService.PATH}/${passport}`,
      body: client,
    });
  }
}
