import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

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

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        gtag('config', 'UA-167411505-1', { 'page_path': event.urlAfterRedirects });
      } 
    }) 
  }
 
  ngOnInit() {
    if (this.window.innerWidth > 576) {
      this.showBgImg = true;
    } else {
      this.showBgImg = false;
    }
  }
}
