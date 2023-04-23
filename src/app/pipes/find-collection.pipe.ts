import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "findCollection",
})
export class FindCollectionPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    collection: Array<T>,
    key: K,
    value: T[K]
  ): T | null {
    if (!collection || !key || !value) return null;

    return collection.find((item) => item[key] === value) || null;
  }
}
