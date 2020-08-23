import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  event: Event;
  @Input() public activeNav: boolean;
  @Output() public closeNav: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.activeNav = false;
  }

  activateNav() {
    this.activeNav = true;
  }

  hideNav(event: Event) {
    this.activeNav = false;
    this.closeNav.emit(event);
  }
}
