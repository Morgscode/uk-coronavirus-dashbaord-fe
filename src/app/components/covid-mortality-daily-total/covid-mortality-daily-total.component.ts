import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from 'src/app/services/date-conversion.service';
import { CovidMortalityStatisticGroup } from '../../models/CovidMortalityStatisticGroup';

@Component({
  selector: 'app-covid-mortality-daily-total',
  templateUrl: './covid-mortality-daily-total.component.html',
  styleUrls: ['./covid-mortality-daily-total.component.css']
})

export class CovidMortalityDailyTotalComponent implements OnInit {
  dailyMortalityTotal: CovidMortalityStatisticGroup;
  dailyCovidDeaths: number
  readableDate: string;

  constructor(private covidStatsService: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatsService.getCovidMortalityTotal().subscribe(CovidMortalityStatisticGroup => {
      this.dailyMortalityTotal = CovidMortalityStatisticGroup[0];
      this.dailyCovidDeaths = this.dailyMortalityTotal.daily_uk_covid_deaths;
      this.readableDate = this.sqlDateConverter.convertFromSQLDate(this.dailyMortalityTotal.date);
    });
  }

}
