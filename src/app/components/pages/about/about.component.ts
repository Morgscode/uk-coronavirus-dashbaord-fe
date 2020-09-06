import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit() {}

  public setupPageMeta() {
    this.titleService.setTitle(
      "About Coronavirus - Information about symptoms and self-care from the NHS"
    );
    this.meta.updateTag({
      name: "description",
      content:
        "UK Coronavius Statistics | An info page on Covid-19 with approved content from the NHS",
    });
  }
}
