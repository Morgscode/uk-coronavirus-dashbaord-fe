import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'uk-covid-dashboard';
  headerBgImg: string = '/assets/backgrounds/gradient-bg.png';
  showBgImg: boolean;
  window: Window = window;
 
  ngOnInit() {
    if (this.window.innerWidth > 576) {
      this.showBgImg = true;
    } else {
      this.showBgImg = false;
    }
  }
}
