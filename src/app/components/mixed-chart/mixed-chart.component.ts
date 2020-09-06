import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

import { CovidStatisticsService } from "../../services/covid-statistics.service";
import { DateConversionService } from "../../services/date-conversion.service";
import { ChartDataService } from "../../services/chart-data.service";

import { CovidCasesStatisticGroup } from "../../models/CovidCasesStatisticGroup";
import { CovidMortalityStatisticGroup } from "../../models/CovidMortalityStatisticGroup";

@Component({
  selector: "app-mixed-chart",
  templateUrl: "./mixed-chart.component.html",
  styleUrls: ["./mixed-chart.component.css"],
})
export class MixedChartComponent implements OnInit {
  @Input() covidInfectionStatistics: CovidCasesStatisticGroup[];
  @Input() covidMortalityStatistics: CovidMortalityStatisticGroup[];
  ChartData: ChartDataSets[] = [];
  ChartLabels: Label[] = [];
  ChartLegend: boolean;
  ChartType: string = "line";
  ChartOptions: ChartOptions = {};
  ChartDataInterval: number = 1;
  chartLoaded: boolean = false;
  isDaily: boolean = true;
  isCumulative: boolean = false;

  constructor(private chartDataService: ChartDataService) {}

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit() {
    this.initializeChart();
    this.chartLoaded = true;
  }

  public prepareDailyChartData() {
    const casesLabel: string = "Confirmed covid-19 infections";
    const deathsLabel: string = "Confirmed covid-19 associated deaths";
    this.resetChartState(casesLabel, deathsLabel);
    this.isDaily = true;
    this.isCumulative = false;
    return this.chartDataService.prepareMixedDailyGraphData(
      this.covidInfectionStatistics,
      this.covidMortalityStatistics,
      this.ChartData,
      this.ChartLabels,
      this.ChartDataInterval
    );
  }

  public prepareCumulativeChartData() {
    const casesLabel: string = "Cumulative covid-19 infections";
    const deathsLabel: string = "Cumulative covid-19 associated deaths";
    this.resetChartState(casesLabel, deathsLabel);
    this.isDaily = false;
    this.isCumulative = true;
    return this.chartDataService.prepareMixedCumulativeGraphData(
      this.covidInfectionStatistics,
      this.covidMortalityStatistics,
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

  protected resetChartState(casesLabel: string, deathsLabel: string): void {
    this.ChartData = [
      { data: [], label: casesLabel },
      { data: [], label: deathsLabel },
    ];
    this.ChartLabels = [];
  }

  public showBarChart(): void {
    this.ChartType = "bar";
  }

  public showLineChart(): void {
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
