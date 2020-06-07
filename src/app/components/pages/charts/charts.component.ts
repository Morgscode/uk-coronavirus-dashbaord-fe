import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle( 'UK Coronavirus Statistics - Interactive charts' );
    this.meta.updateTag(
      { name: 'description', content: 'UK Coronavius Statistics | Interactive charts representing deaths and confirmed infections dating back to 01/03/2020' },
    );
  }

}
