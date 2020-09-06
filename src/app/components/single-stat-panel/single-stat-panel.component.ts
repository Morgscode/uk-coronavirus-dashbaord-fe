import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-single-stat-panel",
  templateUrl: "./single-stat-panel.component.html",
  styleUrls: ["./single-stat-panel.component.css"],
})
export class SingleStatPanelComponent implements OnInit {
  @Input() title: string;
  @Input() statistic: number;
  @Input() date;

  constructor() {}

  ngOnInit(): void {}
}
