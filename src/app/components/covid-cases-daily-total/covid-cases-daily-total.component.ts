import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from '../../services/date-conversion.service';
import { CovidCasesStatisticGroup } from '../../models/CovidCasesStatisticGroup';

@Component({
  selector: 'app-covid-cases-daily-total',
  templateUrl: './covid-cases-daily-total.component.html',
  styleUrls: ['./covid-cases-daily-total.component.css']
})
export class CovidCasesDailyTotalComponent implements OnInit {
  dailyCasesTotal: CovidCasesStatisticGroup;
  dailyCovidCases: number;
  readableDate: string;
  
  constructor(private covidStatsService: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatsService.getCovidCasesTotal().subscribe(totalUKCovidCases => {
      this.dailyCasesTotal = totalUKCovidCases[0];
      this.dailyCovidCases = this.dailyCasesTotal.daily_confirmed_cases;
      this.readableDate = this.sqlDateConverter.convertFromSQLDate(this.dailyCasesTotal.date);
    });
  }

}
