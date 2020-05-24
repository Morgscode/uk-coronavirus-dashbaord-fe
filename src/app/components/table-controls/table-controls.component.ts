import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tables-controls',
  templateUrl: './table-controls.component.html',
  styleUrls: ['./table-controls.component.css']
})

export class TableControlsComponent implements OnInit {
  @Output() showCases: EventEmitter<Event> = new EventEmitter();
  @Output() showDeaths: EventEmitter<Event> = new EventEmitter();
  casesChecked: boolean = true;
  deathsChecked:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  emitShowCases(event: Event) {
    this.showCases.emit(event);
    this.deathsChecked = false;
    this.casesChecked = true;
  }

  emitShowDeaths(event: Event) {
    this.showDeaths.emit(event);
    this.casesChecked = false;
    this.deathsChecked = true;
   
  }

}
