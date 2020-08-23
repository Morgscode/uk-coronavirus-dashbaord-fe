import { Component, OnInit } from "@angular/core";
import { NHSConditionMetaService } from "../../services/nhs-condition-meta.service";
import { NHSConditionApiMeta } from "../../models/NHSConditionApiMeta";

@Component({
  selector: "app-nhs-covid-info",
  templateUrl: "./nhs-covid-info.component.html",
  styleUrls: ["./nhs-covid-info.component.css"],
})
export class NHSCovidInfoComponent implements OnInit {
  conditionMeta: NHSConditionApiMeta;
  nhsHeaderUrl: string;
  covidDescription: string;
  conditionName: string;
  symptoms: string;
  selfCareAdvice: string;
  selfIsolation: string;
  otherTreatments: string;
  diagnosis: string;
  prevention: string;
  nhsWebsiteUrl: string;

  constructor(private ConditionMetaService: NHSConditionMetaService) {}

  ngOnInit() {
    this.ConditionMetaService.getNHSConditionApiMeta().subscribe(
      (CovidConditionMeta) => {
        this.conditionMeta = CovidConditionMeta[0];
        this.setCovidInfoProperties();
      }
    );
  }

  private setCovidInfoProperties() {
    this.nhsHeaderUrl = this.conditionMeta.nhs_header_url;
    this.conditionName = this.conditionMeta.condition_name;
    this.covidDescription = this.conditionMeta.description;
    this.symptoms = this.conditionMeta.symptoms;
    this.selfCareAdvice = this.conditionMeta.self_care;
    this.nhsWebsiteUrl = this.conditionMeta.nhs_condition_url;
    this.selfIsolation = this.conditionMeta.self_isolation;
    this.otherTreatments = this.conditionMeta.other_treatments;
    this.diagnosis = this.conditionMeta.diagnosis;
    this.prevention = this.conditionMeta.prevention;
  }
}
