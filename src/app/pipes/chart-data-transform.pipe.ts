import { Pipe, PipeTransform } from "@angular/core";
import { ChartData } from "chart.js";
import { map } from "lodash";

@Pipe({
  name: "chartDataTransform",
})
export class ChartDataTransformPipe implements PipeTransform {
  transform<
    LK extends keyof T,
    VK extends keyof T,
    T extends
      | {
          [key in LK]: string;
        }
      | {
          [key in VK]: number;
        }
  >(
    data: Array<T>,
    labelKey: LK,
    valueKey: VK,
    labelFunction: (label: string) => string = (label: string) => label
  ): ChartData<"line", Array<number>> {
    return {
      labels: map(
        data.map((d) => d[labelKey]),
        labelFunction
      ),
      datasets: [
        {
          data: data.map((d) => d[valueKey] as number),
        },
      ],
    };
  }
}
