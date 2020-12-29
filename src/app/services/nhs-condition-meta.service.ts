import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NHSConditionApiMeta } from "../models/NHSConditionApiMeta";

@Injectable({
  providedIn: "root",
})
export class NHSConditionMetaService {
  env: string = "prod";
  covidInfoBaseUrl: string;
  conditionString: string = "nhs-covid-19";

  constructor(private http: HttpClient) {
    this.env == "dev"
      ? (this.covidInfoBaseUrl =
          "http://127.0.0.1:8888/uk-coronavirus-dashboard-api/public/info/")
      : (this.covidInfoBaseUrl =
          "https://uk-coronavirus-dashboard-api.herokuapp.com/info/");
  }

  public getNHSConditionApiMeta(): Observable<NHSConditionApiMeta> {
    return this.http.get<NHSConditionApiMeta>(
      `${this.covidInfoBaseUrl}${this.conditionString}`
    );
  }
}
