import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

import { CovidStatisticsService } from "../../services/covid-statistics.service";
import { DateConversionService } from "../../services/date-conversion.service";
import { ChartDataService } from "../../services/chart-data.service";

import { CovidMortalityStatisticGroup } from "../../models/CovidMortalityStatisticGroup";

@Component({
  selector: "app-mortality-chart",
  templateUrl: "./mortality-chart.component.html",
  styleUrls: ["./mortality-chart.component.css"],
})
export class MortalityChartComponent implements OnInit {
  covidDeathStatistics: CovidMortalityStatisticGroup[];
  ChartData: ChartDataSets[] = [];
  ChartLabels: Label[] = [];
  ChartLegend: boolean;
  ChartType: string = "bar";
  ChartOptions: ChartOptions = {};
  ChartDataInterval: number = 1;
  chartLoaded: boolean = false;
  isDaily: boolean = true;
  isCumulative: boolean = false;

  constructor(
    private covidStatsService: CovidStatisticsService,
    private sqlDateConverter: DateConversionService,
    private chartDataService: ChartDataService
  ) {}

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  async ngOnInit() {
    const covidDeaths = await this.covidStatsService
      .getAllCovidDeaths()
      .toPromise()
      .then((data) => {
        this.covidDeathStatistics = data;
        for (let covidDeathStatistic of this.covidDeathStatistics) {
          covidDeathStatistic.date = this.sqlDateConverter.convertFromSQLDate(
            covidDeathStatistic.date
          );
        }
      })
      .catch((err) => console.log(err));
    this.initializeChart();
    this.chartLoaded = true;
  }

  public prepareDailyChartData() {
    const deathsLabel: string = "Confirmed covid-19 associated deaths";
    this.resetChartState(deathsLabel);
    this.isDaily = true;
    this.isCumulative = false;
    return this.chartDataService.prepareDailyGraphData(
      this.covidDeathStatistics,
      this.ChartData,
      this.ChartLabels,
      this.ChartDataInterval
    );
  }

  public prepareCumulativeChartData() {
    const deathsLabel: string = "Cumulative covid-19 associated deaths";
    this.resetChartState(deathsLabel);
    this.isDaily = false;
    this.isCumulative = true;
    return this.chartDataService.prepareCumulativeGraphData(
      this.covidDeathStatistics,
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

  protected resetChartState(deathsLabel: string): void {
    this.ChartData = [{ data: [], label: deathsLabel }];
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
