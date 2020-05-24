import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { NHSConditionApiMeta } from '../models/NHSConditionApiMeta';

@Injectable({
  providedIn: 'root'
})
export class NHSConditionMetaService {

  covidInfoBaseUrl: string = 'http://api.ukcoronavirusstatistics.com/info/';
  conditionString: string = 'nhs-covid-19';
  
  constructor(private http: HttpClient) {}

  public getNHSConditionApiMeta(): Observable<NHSConditionApiMeta> {
    return this.http.get<NHSConditionApiMeta>(`${this.covidInfoBaseUrl}${this.conditionString}`);
  }

}
