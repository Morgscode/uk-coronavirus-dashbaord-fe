import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";

import { CovidStatisticsService } from "../../../services/covid-statistics.service";
import { DateConversionService } from "../../../services/date-conversion.service";
import { CovidCasesStatisticGroup } from "../../../models/CovidCasesStatisticGroup";
import { CovidMortalityStatisticGroup } from "../../../models/CovidMortalityStatisticGroup";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  latestCovidInfectionStats: CovidCasesStatisticGroup;
  latestCovidMortalityStats: CovidMortalityStatisticGroup;
  covidCasesDailyPanelTitle: string = "Daily number of lab-confirmed UK cases:";
  covidCasesCumulativePanelTitle: string =
    "Confirmed COVID-19 infections UK wide:";
  covidMortalityDailyPanelTitle: string =
    "Daily number of COVID-19 associated UK deaths:";
  covidMortalityCumulativePanelTitle: string =
    "Total COVID-19 associated UK deaths:";

  constructor(
    private titleService: Title,
    private meta: Meta,
    private covidStatsService: CovidStatisticsService,
    private sqlDateConverter: DateConversionService
  ) {}

  ngOnInit() {
    this.setupPageMeta();
    this.getLatestInfectionsData();
    this.getLatestMortalityData();
  }

  public async getLatestInfectionsData() {
    const covidCases = await this.covidStatsService
      .getCovidCasesTotal()
      .toPromise()
      .then((data) => {
        this.latestCovidInfectionStats = data[0];
        this.latestCovidInfectionStats.date = this.sqlDateConverter.convertFromSQLDate(
          this.latestCovidInfectionStats.date
        );
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log(this.latestCovidInfectionStats);
      });
  }

  public async getLatestMortalityData() {
    const covidDeaths = await this.covidStatsService
      .getCovidMortalityTotal()
      .toPromise()
      .then((data) => {
        this.latestCovidMortalityStats = data[0];
        this.latestCovidMortalityStats.date = this.sqlDateConverter.convertFromSQLDate(
          this.latestCovidMortalityStats.date
        );
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log(this.latestCovidMortalityStats);
      });
  }

  public setupPageMeta() {
    this.titleService.setTitle("Track UK Coronavirus Statistics");
    this.meta.updateTag({
      name: "description",
      content:
        "An Independant UK Coronavirus tracking dashboard. Information held within has been made publicly available by Public Health England, The Department for Health and Social Care and the NHS.",
    });
  }
}
