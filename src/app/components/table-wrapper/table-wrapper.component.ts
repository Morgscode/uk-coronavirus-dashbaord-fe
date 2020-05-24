import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.css']
})

export class TableWrapperComponent implements OnInit {
  casesActive: boolean;
  deathsActive: boolean;
 
  constructor() { }

  ngOnInit(){
    this.casesActive = true;
    this.deathsActive = false;
  }

  public showCases() {
    this.deathsActive = false;
    this.casesActive = true;
  }

  public showDeaths() {
    this.casesActive = false;
    this.deathsActive = true;
  }


}
