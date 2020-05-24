import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from 'src/app/services/date-conversion.service';
import { CovidCasesStatisticGroup } from '../../models/CovidCasesStatisticGroup';

@Component({
  selector: 'app-covid-cases-total',
  templateUrl: './covid-cases-total.component.html',
  styleUrls: ['./covid-cases-total.component.css']
})

export class CovidCasesTotalComponent implements OnInit {
  totalCovidCases: CovidCasesStatisticGroup;
  totalUKCovidCases: string;
  readableDate: string;

  constructor(private covidStatsService: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatsService.getCovidCasesTotal().subscribe(totalUKCovidCases => {
      this.totalCovidCases = totalUKCovidCases[0];
      this.totalUKCovidCases = this.totalCovidCases.uk_total_confirmed_cases.toLocaleString();
      this.readableDate = this.sqlDateConverter.convertFromSQLDate(this.totalCovidCases.date);
    });
  }

}
