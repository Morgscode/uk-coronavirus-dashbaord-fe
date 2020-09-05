import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-mixed-chart-controls",
  templateUrl: "./mixed-chart-controls.component.html",
  styleUrls: ["./mixed-chart-controls.component.css"],
})
export class MixedChartControlsComponent implements OnInit {
  @Output() setCumulativeData: EventEmitter<Event> = new EventEmitter();
  @Output() setDailyData: EventEmitter<Event> = new EventEmitter();
  @Output() setDataInterval: EventEmitter<number> = new EventEmitter();
  @Input() dataInterval: number;
  isDaily: boolean;
  isCumulative: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isDaily = true;
    this.isCumulative = false;
    this.dataInterval = 1;
  }

  public emitCumulativeData(): void {
    this.setCumulativeData.emit();
    this.isDaily = false;
    this.isCumulative = true;
  }

  public emitDailyData(): void {
    this.dataInterval = 1;
    this.emitDataInterval();
    this.setDailyData.emit();
    this.isCumulative = false;
    this.isDaily = true;
  }

  public emitDataInterval(): void {
    this.setDataInterval.emit(Number(this.dataInterval));
  }
}
