import { Component, OnInit, Renderer2, Inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.document.body, "chart-body");
    this.titleService.setTitle(
      "UK Coronavirus Statistics - Interactive charts"
    );
    this.meta.updateTag({
      name: "description",
      content:
        "UK Coronavius Statistics | Interactive charts representing deaths and confirmed infections dating back to 01/03/2020",
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, "chart-body");
  }
}
