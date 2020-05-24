import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from '../../services/date-conversion.service';
import { CovidCasesStatisticGroup } from '../../models/CovidCasesStatisticGroup';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.css']
})
export class CasesTableComponent implements OnInit {
  casesStatistics: CovidCasesStatisticGroup[];

  constructor(private covidStatisticsServive: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatisticsServive.getAllCovidCases().subscribe(covidCases => {
      this.casesStatistics = covidCases.reverse();
      console.log(this.casesStatistics);
      for (let casesStatistic of this.casesStatistics) {
        casesStatistic.date = this.sqlDateConverter.convertFromSQLDate(casesStatistic.date);
      }
    });
  }

}
