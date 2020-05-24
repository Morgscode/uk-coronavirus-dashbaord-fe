import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from '../../services/date-conversion.service';
import { ChartDataService } from '../../services/chart-data.service';

import { CovidCasesStatisticGroup } from '../../models/CovidCasesStatisticGroup';
import { CovidMortalityStatisticGroup } from '../../models/CovidMortalityStatisticGroup';
 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  covidCasesStatistics: CovidCasesStatisticGroup[]; 
  covidDeathStatistics: CovidMortalityStatisticGroup[];
  ChartData: ChartDataSets[] = []; 
  ChartLabels: Label[] = [];
  ChartLegend:boolean;
  ChartType:string = 'line';
  ChartOptions: ChartOptions = {};
  ChartDataInterval: number = 1;
  chartLoaded: boolean = false;
  isDaily: boolean = true;
  isCumulative: boolean = false;

  constructor(private covidStatsService: CovidStatisticsService, private sqlDateConverter: DateConversionService, private chartDataService: ChartDataService) { }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit() {
    this.covidStatsService.getAllCovidCases().subscribe(covidCases => {
      this.covidCasesStatistics = covidCases;
      for (let covidCasesStatistic of this.covidCasesStatistics) {
        covidCasesStatistic.date = this.sqlDateConverter.convertFromSQLDate(covidCasesStatistic.date);
      }
      this.covidStatsService.getAllCovidDeaths().subscribe(covidDeaths => {
        this.covidDeathStatistics = covidDeaths;
        this.initializeChart();
        this.chartLoaded = true;
      });
    });
  }

  public prepareDailyChartData() {
    const casesLabel: string = 'Confirmed covid-19 infections';
    const deathsLabel: string = 'Confirmed covid-19 associated deaths';
    this.resetChartState(casesLabel, deathsLabel);
    this.isDaily = true;
    this.isCumulative = false;
    return this.chartDataService.prepareDailyCasesGraphData(this.covidCasesStatistics, this.covidDeathStatistics,this.ChartData, this.ChartLabels, this.ChartDataInterval);
  }

  public prepareCumulativeChartData() {
    const casesLabel: string = 'Cumulative total of covid-19 infections to date';
    const deathsLabel: string = 'Cumulative covid-19 associated deaths';
    this.resetChartState(casesLabel, deathsLabel);
    this.isDaily = false;
    this.isCumulative = true;
    return this.chartDataService.prepareCumulativeGraphData(this.covidCasesStatistics, this.covidDeathStatistics, this.ChartData, this.ChartLabels, this.ChartDataInterval);
  }

  protected initializeChart() {
      this.prepareDailyChartData();
      this.ChartOptions.responsive = true;
      this.ChartOptions.showLines = true;
      this.ChartLegend = true;
  }

  protected resetChartState(casesLabel: string, deathsLabel:string) {
    this.ChartData = [
      {data: [], label: casesLabel},
      {data: [], label: deathsLabel}
    ];
    this.ChartLabels = [];
  }

  public showBarChart() {
    this.ChartType = 'bar';
  }

  public showLineChart() {
    this.ChartType = 'line';
  }

  public changeDataInterval(dataInterval: number) {
    this.ChartDataInterval = dataInterval;
    if (this.isDaily) {
      this.prepareDailyChartData();
    } else {
      this.prepareCumulativeChartData();
    }
  }

}
