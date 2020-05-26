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
  isLineGraph: boolean;
  isBarChart: boolean;
  isDaily: boolean;
  isCumulative: boolean;

  constructor() { }

  ngOnInit() {
    this.isLineGraph = true;
    this.isBarChart = false;
    this.isDaily = true;
    this.isCumulative = false;
    this.dataInterval = 1;
  }

  public emitBarChart(): void {
    this.setBarChart.emit();
    this.isLineGraph = false;
    this.isBarChart = true;
  }

  public emitLineChart(): void {
    this.setLineChart.emit();
    this.isBarChart = false;
    this.isLineGraph = true;
  }

  public emitCumulativeData(): void {
    this.setCumulativeData.emit();
    this.isDaily = false;
    this.isCumulative = true;
  }

  public emitDailyData(): void {
    this.setDailyData.emit();
    this.isCumulative = false;
    this.isDaily = true;
  }

  public emitDataInterval(): void {
    this.setDataInterval.emit(Number(this.dataInterval));
  }

}
