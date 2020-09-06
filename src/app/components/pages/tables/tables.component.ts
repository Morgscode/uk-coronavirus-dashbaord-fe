import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.css"],
})
export class TablesComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit() {}

  public setupPageMeta() {
    this.titleService.setTitle(
      "UK Coronavirus Statistics - Tabular statistics for deaths and confirmed infections"
    );
    this.meta.updateTag({
      name: "description",
      content:
        "UK Coronavius Statistics | Tabular representations of deaths and confirmed infections dating back to 01/03/2020",
    });
  }
}
