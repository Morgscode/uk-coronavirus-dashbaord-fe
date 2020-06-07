import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle( 'Track UK Coronavirus Statistics' );
    this.meta.updateTag(
      { name: 'description', content: 'An Independant UK Coronavirus tracking dashboard. Information held within has been made publicly available by Public Health England, The Department for Health and Social Care and the NHS.' },
    );
  }

}
