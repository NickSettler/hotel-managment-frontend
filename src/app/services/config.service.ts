import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface IProjectConfig {
  apiURL: string;
}

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  public config?: IProjectConfig;

  constructor(private readonly injector: Injector) {}

  public getConfig(key: keyof IProjectConfig) {
    if (!this.config) throw new Error("Config not loaded yet!");

    return this.config[key];
  }

  public async load(): Promise<boolean> {
    const client = this.injector.get(HttpClient);
    this.config = await client
      .get<IProjectConfig>("assets/config.json")
      .toPromise();

    return true;
  }
}
