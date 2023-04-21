import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterDataByFunc",
})
export class FilterDataByFuncPipe implements PipeTransform {
  transform<T>(value: Array<T>, func: (item: T) => boolean): Array<T> {
    return value.filter(func);
  }
}
