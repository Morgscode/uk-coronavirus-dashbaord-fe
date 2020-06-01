import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { CovidCasesStatisticGroup } from '../models/CovidCasesStatisticGroup';
import { CovidMortalityStatisticGroup} from '../models/CovidMortalityStatisticGroup';

@Injectable({
  providedIn: 'root'
})

export class ChartDataService {

  constructor() { }

  public prepareDailyCasesGraphData(casesData: CovidCasesStatisticGroup[], deathsData: CovidMortalityStatisticGroup[],lineChartData: ChartDataSets[], lineChartLabels: Label[], dataInterval: number) {
    let deathsDataIndex: number = 0;
    let arrLengthDiff: number = casesData.length - deathsData.length;
    console.log(arrLengthDiff);
    for (let arrIndex = 0; arrIndex < casesData.length; arrIndex += dataInterval) {
      lineChartData[0].data.push(casesData[arrIndex].daily_confirmed_cases);
      if (arrIndex < arrLengthDiff) {
        lineChartData[1].data.push(0);
      } else {
        lineChartData[1].data.push(deathsData[deathsDataIndex].daily_uk_covid_deaths);
        deathsDataIndex+= dataInterval;
      }
      lineChartLabels.push(casesData[arrIndex].date);
    }
  }

  public prepareCumulativeGraphData(casesData: CovidCasesStatisticGroup[], deathsData: CovidMortalityStatisticGroup[],lineChartData: ChartDataSets[], lineChartLabels: Label[], dataInterval: number) {
    let deathsDataIndex: number = 0;
    let arrLengthDiff: number = casesData.length - deathsData.length;
    for (let arrIndex = 0; arrIndex < casesData.length; arrIndex += dataInterval) {
      lineChartData[0].data.push(casesData[arrIndex].uk_total_confirmed_cases);
      if (arrIndex < arrLengthDiff) {
        lineChartData[1].data.push(0);
      } else {
        lineChartData[1].data.push(deathsData[deathsDataIndex].uk_death_total);
        deathsDataIndex+= dataInterval;
      }
      lineChartLabels.push(casesData[arrIndex].date);
    }
  }

}
