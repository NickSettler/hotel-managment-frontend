import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "mapCollection",
})
export class MapCollectionPipe implements PipeTransform {
  transform<T, K extends keyof T>(collection: Array<T>, key: K): Array<T[K]> {
    if (!collection || !key) return [];

    return collection.map((item) => item[key]);
  }
}
