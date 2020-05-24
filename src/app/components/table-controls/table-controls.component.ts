import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tables-controls',
  templateUrl: './table-controls.component.html',
  styleUrls: ['./table-controls.component.css']
})

export class TableControlsComponent implements OnInit {
  @Output() showCases: EventEmitter<Event> = new EventEmitter();
  @Output() showDeaths: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitShowCases(event: Event) {
    this.showCases.emit(event)
  }

  emitShowDeaths(event: Event) {
    this.showDeaths.emit(event);
  }

}
