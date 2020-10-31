import { Component, OnInit } from "@angular/core";
import { CovidStatisticsService } from "../../services/covid-statistics.service";
import { DateConversionService } from "../../services/date-conversion.service";
import { CovidCasesStatisticGroup } from "../../models/CovidCasesStatisticGroup";
import { CovidMortalityStatisticGroup } from "../../models/CovidMortalityStatisticGroup";

@Component({
  selector: "app-table-wrapper",
  templateUrl: "./table-wrapper.component.html",
  styleUrls: ["./table-wrapper.component.css"],
})
export class TableWrapperComponent implements OnInit {
  public infectionStatistics: CovidCasesStatisticGroup[];
  public mortalityStatistics: CovidMortalityStatisticGroup[];
  public dailyInfectionStatTitle: string = "Daily confirmed infections:";
  public dailyMortalityStatTitle: string = "Deaths within 28 days of positive test:";
  public casesActive: boolean;
  public deathsActive: boolean;

  constructor(
    private covidStatisticsServive: CovidStatisticsService,
    private sqlDateConverter: DateConversionService
  ) {}

  ngOnInit() {
    this.initTables();
  }

  public async initTables() {
    await this.getInfectionData();
    await this.getMortalityData();
    this.casesActive = true;
    this.deathsActive = false;
  }

  public async getMortalityData() {
    const mortalityStatistics = await this.covidStatisticsServive
      .getAllCovidDeaths()
      .toPromise()
      .then((data) => {
        this.mortalityStatistics = data.reverse();
        for (let mortalityStatistic of this.mortalityStatistics) {
          mortalityStatistic.date = this.sqlDateConverter.convertFromSQLDate(
            mortalityStatistic.date
          );
        }
      });
  }

  public async getInfectionData() {
    const infectionStatistics = await this.covidStatisticsServive
      .getAllCovidCases()
      .toPromise()
      .then((covidCases) => {
        this.infectionStatistics = covidCases.reverse();
        for (let infectionStatistic of this.infectionStatistics) {
          infectionStatistic.date = this.sqlDateConverter.convertFromSQLDate(
            infectionStatistic.date
          );
        }
      });
  }

  public showCases() {
    this.deathsActive = false;
    this.casesActive = true;
  }

  public showDeaths() {
    this.casesActive = false;
    this.deathsActive = true;
  }
}
