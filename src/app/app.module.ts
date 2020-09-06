import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { ChartsModule } from "ng2-charts";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { CovidStatisticsService } from "./services/covid-statistics.service";
import { NHSConditionMetaService } from "./services/nhs-condition-meta.service";
import { DateConversionService } from "./services/date-conversion.service";
import { ChartDataService } from "./services/chart-data.service";
import { NHSCovidInfoComponent } from "./components/nhs-covid-info/nhs-covid-info.component";
import { HeaderComponent } from "./components/header/header.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { TablesComponent } from "./components/pages/tables/tables.component";
import { TableControlsComponent } from "./components/table-controls/table-controls.component";
import { TableWrapperComponent } from "./components/table-wrapper/table-wrapper.component";
import { MixedChartComponent } from "./components/mixed-chart/mixed-chart.component";
import { ChartsComponent } from "./components/pages/charts/charts.component";
import { ChartControlsComponent } from "./components/chart-controls/chart-controls.component";
import { NotFoundComponent } from "./components/pages/not-found/not-found.component";
import { MixedChartControlsComponent } from "./components/mixed-chart-controls/mixed-chart-controls.component";
import { SingleChartComponent } from "./components/single-chart/single-chart.component";
import { SingleTableComponent } from "./components/single-table/single-table.component";
import { SingleStatPanelComponent } from "./components/single-stat-panel/single-stat-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NHSCovidInfoComponent,
    HeaderComponent,
    AboutComponent,
    TablesComponent,
    TableControlsComponent,
    TableWrapperComponent,
    MixedChartComponent,
    ChartsComponent,
    ChartControlsComponent,
    NotFoundComponent,
    MixedChartControlsComponent,
    SingleChartComponent,
    SingleTableComponent,
    SingleStatPanelComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
  ],
  providers: [
    CovidStatisticsService,
    NHSConditionMetaService,
    DateConversionService,
    HttpClient,
    ChartDataService,
    Title,
    Meta,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
