import { Component, OnInit } from '@angular/core';
import { CovidStatisticsService } from '../../services/covid-statistics.service';
import { DateConversionService } from 'src/app/services/date-conversion.service';
import { CovidMortalityStatisticGroup } from '../../models/CovidMortalityStatisticGroup';

@Component({
  selector: 'app-covid-mortality-total',
  templateUrl: './covid-mortality-total.component.html',
  styleUrls: ['./covid-mortality-total.component.css']
})

export class CovidMortalityTotalComponent implements OnInit {
  mortalityTotal: CovidMortalityStatisticGroup;
  totalUKCovidMortality: number;
  readableDate: string;

  constructor(private covidStatsService: CovidStatisticsService, private sqlDateConverter: DateConversionService) { }

  ngOnInit() {
    this.covidStatsService.getCovidMortalityTotal().subscribe(covidMortalityTotal => {
      this.mortalityTotal = covidMortalityTotal[0];
      this.totalUKCovidMortality = this.mortalityTotal.uk_death_total;
      this.readableDate = this.sqlDateConverter.convertFromSQLDate(this.mortalityTotal.date);
    });
  }

}
