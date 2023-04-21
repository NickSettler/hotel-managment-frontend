import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ChartData } from "chart.js";
import Chart from "chart.js/auto";
import { isEqual, reduce } from "lodash";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnChanges {
  chart?: Chart;

  @Input() id = "";

  @Input() name = "";

  @Input() color = "rgb(255, 99, 132)";

  @Input() data: ChartData<"line", Array<number>> = {
    labels: [],
    datasets: [],
  };

  private createChart() {
    setTimeout(() => {
      this.chart = new Chart(this.id, {
        type: "line",
        data: {
          labels: this.data.labels,
          datasets: [
            {
              label: this.name,
              data: this.data.datasets[0].data,
              backgroundColor: this.color,
              borderColor: this.color,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: this.name,
              align: "start",
            },
          },
          datasets: {
            line: {
              tension: 0.98,
              cubicInterpolationMode: "monotone",
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            y: {
              type: "linear",
              min: 0,
              grace: "5%",
              ticks: {
                precision: 0,
              },
            },
          },
          maintainAspectRatio: false,
          aspectRatio: 1.5,
        },
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["id"] && changes["id"].currentValue) {
      this.createChart();
    }

    if (this.chart && changes["data"]) {
      if (
        isEqual(
          this.chart.data.datasets[0].data,
          changes["data"].currentValue["datasets"][0].data
        )
      ) {
        return;
      }

      this.chart.data.datasets[0].data =
        changes["data"].currentValue["datasets"][0].data;
      this.chart.update();
    }
  }
}
