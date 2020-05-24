import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive: boolean;

  constructor() { }

  ngOnInit() {
    this.isActive = false;
  }

  activateNav(event) {
    this.isActive = true;
  }

  hideNav() {
    this.isActive = false;
  }

}
