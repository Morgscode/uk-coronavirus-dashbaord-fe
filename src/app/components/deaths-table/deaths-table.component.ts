import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from '../../services/date-conversion.service';
import { CovidMortalityStatisticGroup } from '../../models/CovidMortalityStatisticGroup';

@Component({
  selector: 'app-deaths-table',
  templateUrl: './deaths-table.component.html',
  styleUrls: ['./deaths-table.component.css']
})
export class DeathsTableComponent implements OnInit {
  mortalityStatistics: CovidMortalityStatisticGroup[];

  constructor(private covidStatisticsServive: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatisticsServive.getAllCovidDeaths().subscribe(covidDeaths => {
      this.mortalityStatistics = covidDeaths.reverse();
      for (let mortalityStatistic of this.mortalityStatistics) {
        mortalityStatistic.date = this.sqlDateConverter.convertFromSQLDate(mortalityStatistic.date);
      }
     });
  }

  reverseStatsOrder() {
    this.mortalityStatistics = this.mortalityStatistics.reverse();
  }

}
