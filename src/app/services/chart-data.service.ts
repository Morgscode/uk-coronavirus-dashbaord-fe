import { Injectable } from "@angular/core";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { CovidCasesStatisticGroup } from "../models/CovidCasesStatisticGroup";
import { CovidMortalityStatisticGroup } from "../models/CovidMortalityStatisticGroup";

@Injectable({
  providedIn: "root",
})
export class ChartDataService {
  constructor() {}

  public manageChartDataLoading() {}

  public prepareMixedDailyGraphData(
    casesData: CovidCasesStatisticGroup[],
    deathsData: CovidMortalityStatisticGroup[],
    lineChartData: ChartDataSets[],
    lineChartLabels: Label[],
    dataInterval: number
  ) {
    /**
     *
     * becuase there are more dates for cases than
     * mortality, lets work out the difference in array length
     * so we can keep the chart data consistent
     *
     * we'll use this to see if we need to add a 0 value
     * to the mortality data for the january-february
     *
     */
    let deathsDataIndex: number = 0;
    let arrLengthDiff: number = casesData.length - deathsData.length;
    for (
      let arrIndex = 0;
      arrIndex < casesData.length;
      arrIndex += dataInterval
    ) {
      /**
       *
       * the mixed chart data array has two
       * data objects, 1 for mortality stats
       * and another for infections
       *
       * lets push the cases value to the chart data array
       *
       */
      lineChartData[0].data.push(casesData[arrIndex].daily_confirmed_cases);
      if (arrIndex < arrLengthDiff) {
        /**
         *
         * if the current array doesn't exist on
         * both arrays, push zero to the chart data
         * array (mortaility stats object)
         *
         */
        lineChartData[1].data.push(0);
      } else {
        /**
         *
         * else if the array index exists on both
         * arrays, push the actual values
         *
         */
        lineChartData[1].data.push(
          deathsData[deathsDataIndex].daily_uk_covid_deaths
        );
        /**
         *
         * let's increment the deaths data
         * index by the date interval to keep the for loop
         * looking at the same dates across arrays
         *
         */
        deathsDataIndex += dataInterval;
      }
      lineChartLabels.push(casesData[arrIndex].date);
    }
  }

  public prepareMixedCumulativeGraphData(
    casesData: CovidCasesStatisticGroup[],
    deathsData: CovidMortalityStatisticGroup[],
    lineChartData: ChartDataSets[],
    lineChartLabels: Label[],
    dataInterval: number
  ) {
    let deathsDataIndex: number = 0;
    let arrLengthDiff: number = casesData.length - deathsData.length;
    for (
      let arrIndex = 0;
      arrIndex < casesData.length;
      arrIndex += dataInterval
    ) {
      lineChartData[0].data.push(casesData[arrIndex].uk_total_confirmed_cases);
      if (arrIndex < arrLengthDiff) {
        lineChartData[1].data.push(0);
      } else {
        lineChartData[1].data.push(deathsData[deathsDataIndex].uk_death_total);
        deathsDataIndex += dataInterval;
      }
      lineChartLabels.push(casesData[arrIndex].date);
    }
  }

  public prepareDailyGraphData(
    data: any[],
    lineChartData: ChartDataSets[],
    lineChartLabels: Label[],
    dataInterval: number
  ) {
    for (let arrIndex = 0; arrIndex < data.length; arrIndex += dataInterval) {
      /**
       *
       * let's asses to see if we're working with
       * infection or mortality stats
       *
       * once we've worked that out, let's push
       * the values to the chart data array
       *
       */
      if (data[arrIndex].daily_uk_covid_deaths) {
        lineChartData[0].data.push(data[arrIndex].daily_uk_covid_deaths);
      } else {
        lineChartData[0].data.push(data[arrIndex].daily_confirmed_cases);
      }
      /**
       *
       * lets fill up the labels with the dates
       * of each statistic group
       *
       */
      lineChartLabels.push(data[arrIndex].date);
    }
  }

  public prepareCumulativeGraphData(
    data: any[],
    lineChartData: ChartDataSets[],
    lineChartLabels: Label[],
    dataInterval: number
  ) {
    for (let arrIndex = 0; arrIndex < data.length; arrIndex += dataInterval) {
      console.log(data[arrIndex]);
      if (data[arrIndex].daily_uk_covid_deaths) {
        lineChartData[0].data.push(data[arrIndex].uk_death_total);
      } else {
        lineChartData[0].data.push(data[arrIndex].uk_total_confirmed_cases);
      }
      lineChartLabels.push(data[arrIndex].date);
    }
  }
}
