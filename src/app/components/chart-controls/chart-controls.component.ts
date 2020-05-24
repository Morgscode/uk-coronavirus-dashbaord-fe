import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.css']
})
export class ChartControlsComponent implements OnInit {
  @Output() setBarChart:EventEmitter<any> = new EventEmitter();
  @Output() setLineChart:EventEmitter<any> = new EventEmitter();
  @Output() setCumulativeData: EventEmitter<any> = new EventEmitter();
  @Output() setDailyData: EventEmitter<any> = new EventEmitter();
  @Output() setDataInterval: EventEmitter<number> = new EventEmitter();
  @Input()  dataInterval: number;

  constructor() { }

  ngOnInit() {

  }

  public emitBarChart(): void {
    this.setBarChart.emit();
  }

  public emitLineChart(): void {
    this.setLineChart.emit();
  }

  public emitCumulativeData(): void {
    this.setCumulativeData.emit();
  }

  public emitDailyData(): void {
    this.setDailyData.emit();
  }

  public emitDataInterval(): void {
    this.setDataInterval.emit(Number(this.dataInterval));
  }

}
