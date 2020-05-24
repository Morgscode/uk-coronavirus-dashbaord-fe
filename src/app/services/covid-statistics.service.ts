import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { CovidMortalityStatisticGroup } from '../models/CovidMortalityStatisticGroup';
import { CovidCasesStatisticGroup } from '../models/CovidCasesStatisticGroup';

/**
 * This compoent makes http requests for 
 * - uk-wide death/cases total to date
 * - most recent daily figure for deaths/cases
 * - entire daily_deaths/covid_cases table
 * 
 */

@Injectable({
  providedIn: 'root'
})

export class CovidStatisticsService {

  covidStatsBaseUrl: string = 'https://api.ukcoronavirusstatistics.com/stats/';
  
  totalCovidMortalityString: string = 'deaths/latest';
  totalCovidCasesString: string = 'cases/latest';
  allCovidCasesString: string = 'cases';
  allCovidDeathsString: string = 'deaths';

  constructor(private http: HttpClient) {}

  public getCovidMortalityTotal(): Observable<CovidMortalityStatisticGroup> {
    return this.http.get<CovidMortalityStatisticGroup>(`${this.covidStatsBaseUrl}${this.totalCovidMortalityString}`);
  }

  public getCovidCasesTotal(): Observable<CovidCasesStatisticGroup> {
    return this.http.get<CovidCasesStatisticGroup>(`${this.covidStatsBaseUrl}${this.totalCovidCasesString}`);
  }

  public getAllCovidDeaths(): Observable<CovidMortalityStatisticGroup[]> {
    return this.http.get<CovidMortalityStatisticGroup[]>(`${this.covidStatsBaseUrl}${this.allCovidDeathsString}`);
  }

  public getAllCovidCases(): Observable<CovidCasesStatisticGroup[]> {
    return this.http.get<CovidCasesStatisticGroup[]>(`${this.covidStatsBaseUrl}${this.allCovidCasesString}`);
  }

 

}
