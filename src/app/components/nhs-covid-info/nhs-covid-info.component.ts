import { Component, OnInit } from '@angular/core';
import { NHSConditionMetaService } from '../../services/nhs-condition-meta.service';
import { NHSConditionApiMeta } from '../../models/NHSConditionApiMeta';

@Component({
  selector: 'app-nhs-covid-info',
  templateUrl: './nhs-covid-info.component.html',
  styleUrls: ['./nhs-covid-info.component.css']
})
export class NHSCovidInfoComponent implements OnInit {
  condtionMeta: NHSConditionApiMeta;
  nhsHeaderUrl: string;
  covidDescription: string;
  conditionName: string;
  symptoms: string;
  selfCareAdvice: string;
  nhsWebsiteUrl: string;

  constructor(private ConditionMetaService: NHSConditionMetaService) { }

  ngOnInit() {
    this.ConditionMetaService.getNHSConditionApiMeta().subscribe(CovidConditionMeta => {
      this.condtionMeta = CovidConditionMeta[0];
      this.setCovidInfoProperties();
    });
  } 

  private setCovidInfoProperties() {
    this.nhsHeaderUrl = this.condtionMeta.nhs_header_url;
    this.conditionName = this.condtionMeta.condition_name;
    this.covidDescription = this.condtionMeta.description;
    this.symptoms = this.condtionMeta.symptoms;
    this.selfCareAdvice = this.condtionMeta.self_care;
    this.nhsWebsiteUrl = this.condtionMeta.nhs_condition_url;
  }

}
