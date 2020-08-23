import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  activeNav: boolean;

  constructor() {}

  ngOnInit(): void {}

  activateNav() {
    this.activeNav = true;
  }

  resetNav() {
    this.activeNav = false;
  }
}
