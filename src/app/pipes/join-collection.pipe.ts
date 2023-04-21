import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "joinCollection",
})
export class JoinCollectionPipe implements PipeTransform {
  transform<T, ID extends keyof T>(
    ids: Array<T[ID]>,
    collection: Array<T>,
    id: ID
  ): Array<T> {
    if (!ids || !collection || !id) return [];

    return ids.map((_id) => collection.find((item) => item[id] === _id)!);
  }
}
