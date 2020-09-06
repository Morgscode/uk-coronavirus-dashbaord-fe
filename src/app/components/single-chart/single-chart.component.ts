import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";
import { ChartDataService } from "../../services/chart-data.service";

@Component({
  selector: "app-single-chart",
  templateUrl: "./single-chart.component.html",
  styleUrls: ["./single-chart.component.css"],
})
export class SingleChartComponent implements OnInit {
  @Input() chartTitle: string;
  @Input() chartData: [];
  @Input() dailyChartLabel: string;
  @Input() cumulativeChartLabel;
  ChartData: ChartDataSets[] = [];
  ChartLabels: Label[] = [];
  ChartLegend: boolean;
  ChartType: string = "bar";
  ChartOptions: ChartOptions = {};
  ChartDataInterval: number = 1;
  chartLoaded: boolean = false;
  isDaily: boolean = true;
  isCumulative: boolean = false;

  constructor(private chartDataService: ChartDataService) {}

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  async ngOnInit() {
    await this.initializeChart();
    this.chartLoaded = true;
  }

  public prepareDailyChartData() {
    this.resetChartState(this.dailyChartLabel);
    this.isDaily = true;
    this.isCumulative = false;
    return this.chartDataService.prepareDailyGraphData(
      this.chartData,
      this.ChartData,
      this.ChartLabels,
      this.ChartDataInterval
    );
  }

  public prepareCumulativeChartData() {
    this.resetChartState(this.cumulativeChartLabel);
    this.isDaily = false;
    this.isCumulative = true;
    return this.chartDataService.prepareCumulativeGraphData(
      this.chartData,
      this.ChartData,
      this.ChartLabels,
      this.ChartDataInterval
    );
  }

  protected initializeChart(): void {
    this.prepareDailyChartData();
    this.ChartOptions.responsive = true;
    this.ChartOptions.showLines = true;
    this.ChartLegend = true;
  }

  protected resetChartState(label: string): void {
    this.ChartData = [{ data: [], label }];
    this.ChartLabels = [];
  }

  public showBarChart() {
    this.ChartType = "bar";
  }

  public showLineChart() {
    this.ChartType = "line";
  }

  public changeDataInterval(dataInterval: number): void {
    this.ChartDataInterval = dataInterval;
    if (this.isDaily) {
      this.prepareDailyChartData();
    } else {
      this.prepareCumulativeChartData();
    }
  }
}
