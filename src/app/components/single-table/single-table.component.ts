import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-single-table",
  templateUrl: "./single-table.component.html",
  styleUrls: ["./single-table.component.css"],
})
export class SingleTableComponent implements OnInit {
  @Input() dailyStatTitle: string;
  @Input() statistics: [];
  constructor() {}

  ngOnInit(): void {
    this.manageStatisticDisplay();
  }

  public manageStatisticDisplay() {
    /**
     *
     * The table needs to work out if we're working
     * with infection or mortality stats
     *
     * check for the existence of a key unique to the
     * stats group, and map the value of the key to a new
     * object property which the template will display
     *
     */
    for (let statistic of this.statistics) {
      if (statistic["daily_confirmed_cases"]) {
        statistic["dailyFigure"] = statistic["daily_confirmed_cases"];
        statistic["cumulativeFigure"] = statistic["uk_total_confirmed_cases"];
      } else if (statistic["daily_uk_covid_deaths"]) {
        statistic["dailyFigure"] = statistic["daily_uk_covid_deaths"];
        statistic["cumulativeFigure"] = statistic["uk_death_total"];
      }
    }
  }
}
