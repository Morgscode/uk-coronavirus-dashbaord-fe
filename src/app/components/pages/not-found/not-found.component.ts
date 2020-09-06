import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit() {}

  public setupPageMeta() {
    this.titleService.setTitle(
      "UK Coronavirus Statistics - Page Not Found: 404"
    );
    this.meta.updateTag({
      name: "description",
      content:
        "UK Coronavius Statistics | The page you requested was not found",
    });
  }
}
