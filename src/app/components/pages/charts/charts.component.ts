import { Component, OnInit, Renderer2, Inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

import { CovidStatisticsService } from "../../../services/covid-statistics.service";
import { DateConversionService } from "../../../services/date-conversion.service";

import { CovidCasesStatisticGroup } from "../../../models/CovidCasesStatisticGroup";
import { CovidMortalityStatisticGroup } from "../../../models/CovidMortalityStatisticGroup";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  public casesDailyChartLabel: string = "Daily covid-19 confirmed infections";
  public casesCumulativeChartLabel: string =
    "Cumulative confirmed covid-19 infections";
  public mortalityDailyChartLabel: string = "Deaths within 28 days of positive test:";
  public mortalityCumulativeChartLabel: string =
    "Cumulative deaths within 28 days of positive test";
  public casesChartTitle: string = "Confirmed infections data chart";
  public mortalityChartTitle: string =
    "Covid-19 associated mortality data chart";
  public covidInfectionStatistics: CovidCasesStatisticGroup[];
  public covidMortalityStatistics: CovidMortalityStatisticGroup[];

  constructor(
    private titleService: Title,
    private meta: Meta,
    private renderer: Renderer2,
    public covidStatsService: CovidStatisticsService,
    public sqlDateConverter: DateConversionService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    this.renderer.addClass(this.document.body, "chart-body");
    this.setupPageMeta();
    await this.getMortalityChartData();
    await this.getInfectionsChartData();
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, "chart-body");
  }

  public setupPageMeta(): void {
    this.titleService.setTitle(
      "UK Coronavirus Statistics - Interactive charts"
    );
    this.meta.updateTag({
      name: "description",
      content:
        "UK Coronavius Statistics | Interactive charts representing deaths and confirmed infections dating back to 01/03/2020",
    });
  }

  public async getInfectionsChartData() {
    const covidCases = await this.covidStatsService
      .getAllCovidCases()
      .toPromise()
      .then((data) => {
        this.covidInfectionStatistics = data;
        for (let covidInfectionStatistic of this.covidInfectionStatistics) {
          covidInfectionStatistic.date = this.sqlDateConverter.convertFromSQLDate(
            covidInfectionStatistic.date
          );
        }
      })
      .catch((err) => console.log(err));
  }

  public async getMortalityChartData() {
    const covidDeaths = await this.covidStatsService
      .getAllCovidDeaths()
      .toPromise()
      .then((data) => {
        this.covidMortalityStatistics = data;
        for (let covidMortalityStatistic of this.covidMortalityStatistics) {
          covidMortalityStatistic.date = this.sqlDateConverter.convertFromSQLDate(
            covidMortalityStatistic.date
          );
        }
      })
      .catch((err) => console.log(err));
  }
}
